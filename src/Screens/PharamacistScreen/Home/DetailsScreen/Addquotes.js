import { StyleSheet, Alert, Text, TextInput, View, ScrollView, StatusBar, Image, Dimensions, ActivityIndicator, TouchableOpacity, ImageBackground, FlatList, Modal } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Colors, Images } from '../../../../CommonConfig';
import { Header, Button, } from '../../../../Components/Common';

import { getWithParams, postPostLogin } from '../../../../Components/Helpers/ApiHelper';
import MedicinesImages from '../../../../Components/Common/MedicinesImages'
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';

import Toast from 'react-native-simple-toast'
import { useTranslation } from 'react-i18next';

const Addquotes = (props) => {
    const { t,i18n } = useTranslation()
    const refRBSheet=useRef({});
    const userRequest = props.route.params.prescription
    // console.log("Quotes======>\n",userRequest.quotes)
    // console.log("Detail\n", userRequest.quotes)
    const [user, setUser] = useState({});
    // console.log("user------->",user)


    const getuser = async () => {
        setUser(JSON.parse(await AsyncStorage.getItem('user')))
    }


    useEffect(() => {
        const update = props.navigation.addListener('focus', () => {
            getuser()
        });
        return update;
    }, [props.navigation,user])

    

    const [modalVisible, setModalVisible] = useState(false);
    const [submitLoader, setSubmitLoader] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [priceing, setPriceing] = useState('')
    const [notes, setNote] = useState('')

    const onpressSubmit = async () => {
        setSubmitLoader(true)
        const data = {
            price: priceing,
            text_note: notes
        }
        const response = await postPostLogin(`pharmacist/addQuote?prescriptionId=${userRequest.id}`, data)
        let errorMessage = "Check Quotes"
        if (response.success) {
            Toast.show("Quote created successfully")
            props.navigation.navigate('PharamaHome')
        } else {
            Alert.alert('Error', errorMessage, [{ text: "Okay" }])
        }
        setSubmitLoader(false)
        // setModalVisible(false) 
    }


    const onPressOrederComplete = async()=>{
        setIsLoading(true)
        const completedquote = userRequest.quotes.find(item=>item.is_complete===1) 
        const quote = {
            quoteId: completedquote.id
        }
    console.log("quotesId-------------->",quote)
  
    const response= await postPostLogin(`pharmacist/changeOrderStatus`,quote)
    console.log(response)
    if (response.data.message == "Order completed successfully and user picked up order from store.") {
        Toast.show(`${t('common:Ordercompletedsuccessfully')}`)
    }
    else{
        console.log(response.data.message);
    }
    props.navigation.navigate('PharamaHome')
   
    setIsLoading(false)
    }
    
    const addressType = (address_type) => {
        if (address_type === 0) return <Text>{t("common:Home")}</Text>
        if (address_type === 1) return <Text>{t("common:Office")}</Text>
        if (address_type === 2) return<Text>{t("common:Other")}</Text>
    }

    const addressimage = (address_type) => {
        if (address_type === 0) return Images.HomeActive
        if (address_type === 1) return Images.OfficeActive
        if (address_type === 2) return Images.OfficeActive
    }

    const type = (is_complete) => {
        if (is_complete === 0) return <Text style={{ color: Colors.Error_Textcolor }}>{t("common:NotComplete")}</Text>
        if (is_complete === 1) return <Text style={{ color: Colors.PRIMARY }}>{t("common:Completed")}</Text>
    }

    const status = (is_complete) => {
        if (is_complete === 0) return <Text style={{ color: Colors.orange, textAlign: "right" }}>{t("common:Pendding")}</Text>
        if (is_complete === 1) return <Text style={{ color: Colors.PRIMARY, textAlign: "right" }}>{t("common:Approve")}</Text>
        if (is_complete === 2) return <Text style={{ color: Colors.Error_Textcolor, textAlign: "right" }}>{t("common:NotApprove")}</Text>
    }

    const is_complete = userRequest.quotes.map(item => {
        return item.is_complete;
    });



    return (
        // ----------> Header <--------------- //
        <View style={styles.screen} >
            <View style={styles.header_sty}>
                <Header
                    Title={t('common:DETAILS')}
                    onPress={() => props.navigation.goBack()}
                />
            </View>

            <ScrollView>
                {/* Images of Prescription */}
                <FlatList
                    data={userRequest.images_list}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    renderItem={({ item }) => {
                        return (
                            <View style={{ opacity: 0.7 }}>
                                <MedicinesImages
                                    image={item}
                                />
                            </View>

                        )
                    }}
                />

                {/*Customer Details   */}
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10 }}>
                        <View >
                            <View style={styles.userDisply}>
                                <Image source={{ uri: userRequest.user_image }} style={styles.userImage} />
                                <Text style={styles.userName}>{userRequest.user.toUpperCase()}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                                <Image source={Images.Calendar} style={{ height: 20, width: 20, }} />
                                <Text style={styles.text3}>{moment(userRequest.createdAt).format('DD/MM/YYYY') + ' at ' + moment(userRequest.createdAt).format('hh:mm A')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 1 }}>
                                <Image source={Images.Quotes} style={{ height: 18, width: 20, }} />
                                <Text style={styles.text2}>{userRequest.total_quotes}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ marginBottom: 40 }} onPress={()=> refRBSheet.current.open()} >
                            <Image source={Images.MapLocate} style={{ height: 24, width: 17, }} />
                        </TouchableOpacity>
                        <RBSheet
                            ref={refRBSheet}
                            closeOnDragDown={true}
                            closeOnPressMask={false}
                            customStyles={{
                                wrapper: {
                                    backgroundColor: "transparent"
                                   
                                },
                                draggableIcon: {
                                    backgroundColor: "#000"
                                }
                            }}
                        >
                               
                                <View style={i18n.language === "ar" ? styles.addressTypeimg_ar : styles.addressTypeimg}>
                                <Image source={addressimage(userRequest?.address.address_type)} style={{ height: 40, width: 40 }} />
                                <View>
                                    <Text style={styles.Address}>
                                    {userRequest?.address.primary_address}
                                    </Text>
                                <Text style={styles.Address}>{userRequest?.address.addition_address_info.toUpperCase()}</Text>
                                </View>
                                </View>
                        
                        </RBSheet>
                    </View>
                </View>
                {/*Text Note By Customer  */}
                <View style={styles.card}>
                    <Text style={{ alignItems: 'center', justifyContent: 'flex-start', fontWeight: 'bold', color: Colors.Sp_Text, fontSize: 15 }}>
                        {t('common:TextNoteByCustomer')}
                    </Text>
                    <Text style={{ textAlign: 'auto', padding: 10 }}>{userRequest.text_note}</Text>
                </View>
                {/* List Of Medicines */}
                <View style={styles.card}>
                        <Text style={{ alignItems: 'center', justifyContent: 'flex-start', fontWeight: 'bold', color: Colors.Sp_Text, fontSize: 15 }}>
                            {t('common:ListOfMedicines')}
                        </Text>
                        {userRequest.medicine_list.map(item => {
                            return (
                                <View key={item}>
                                    <Text style={{ borderBottomWidth: 0.5, width: '95%', margin: 5, fontSize: 15, fontWeight: 'bold' }}>
                                        {item.toUpperCase()}
                                    </Text>
                                </View>
                            )
                        })}
                </View>
                {/* Quote Price && Text note added */}
                <View style={styles.card}>
                        {userRequest.quotes.map(item => {
                            if (item.store_name === user.store_name) {
                                return (
                                    <View key={item}>
                                        <View style={{justifyContent:'space-between', flexDirection:"row", padding:5}}>
                                            <Text style={{ alignItems: 'center', justifyContent: 'flex-start', fontWeight: 'bold', color: Colors.Sp_Text, fontSize: 15 }}>
                                                {t('common:QuotePrice')}
                                            </Text>
                                            <Text>
                                                {status(item.is_complete)}
                                            </Text>
                                        </View>
                                        <Text style={{ borderBottomWidth: 0.5, width: '95%', margin: 5, fontSize: 15, fontWeight: 'bold' }}>
                                            ${item.price}
                                        </Text>

                                        <Text style={{ alignItems: 'center', justifyContent: 'flex-start', fontWeight: 'bold', color: Colors.Sp_Text, fontSize: 15 }}>
                                            {t('common:TextNote')}
                                        </Text>
                                        <Text style={{ borderBottomWidth: 0.5, width: '95%', margin: 5, fontSize: 15, fontWeight: 'bold' }}>
                                            {item.text_note}
                                        </Text>
                                    </View>
                                )
                            }
                        })}
                </View>



                {/* Adding Quotes */}
                 {!userRequest.quotes.find(quote => {
                    
                     return quote.storeId === user.store_id
                 }) ?
                     <View style={styles.card}>
                         <TouchableOpacity onPress={() => { setModalVisible(true) }} style={{ flexDirection: 'row', alignItems: 'center', }} >
                            <Image source={Images.GreenAdd} style={{ height: 20, width: 20 }} />
                         <Text style={{ padding: 5, alignItems: 'center', fontWeight: 'bold', color: Colors.Sp_Text, fontSize: 20 }}>
                                 {t('common:AddQuotesHere')}
                             </Text>
                        </TouchableOpacity>
                     </View>
                    :
                     <View>
                    {!userRequest.quotes.find(quote=>{return user.store_id === quote.is_complete})?
                          <View>
                          {is_complete.includes(1)?
                          <Button
                          label={t("common:MarkOrderAsCompleted")}
                          onPress={onPressOrederComplete}
                          showActivityIndicator={isLoading}
                          />
                          :null
                      }
                       </View>
                         :null
                        } 
                     </View>
                 } 

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => { setModalVisible(false) }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Add Quote Here </Text>

                            {/* Price And Note */}
                            <View style={{}}>
                                <View style={{ marginTop: 10, }}>
                                    <Text>{t('common:Price')} </Text>
                                    <TextInput
                                        placeholder={t('common:Price')}
                                        keyboardType='number-pad'
                                        style={{ borderWidth: 1, width: "100%" }}
                                        onChangeText={(e) => { setPriceing(e) }}

                                    />
                                </View>

                                <View style={{ marginTop: 10, }}>
                                    <Text >{t('common:Note')}</Text>
                                    <TextInput
                                        placeholder={t('common:NotesforCustomer')}
                                        multiline
                                        style={{ borderWidth: 1, width: "100%" }}
                                        onChangeText={(e) => { setNote(e) }}
                                    />
                                </View>
                            </View>
                            {/* Price And Note */}


                            {/* Submit & close  Button  */}
                            <View style={{ flexDirection: 'row-reverse', marginTop: 30 }}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    disabled={(!priceing || !notes || submitLoader) ? true : false}
                                    style={[styles.buttonModal, styles.buttonClose]}
                                    onPress={onpressSubmit}
                                >
                                    {submitLoader ? <ActivityIndicator size={'small'} color={Colors.White} /> : <Text style={styles.textStyle}>{t('common:Submit')}</Text>}
                                </TouchableOpacity>


                                <TouchableOpacity
                                    style={[styles.buttonModal, styles.buttonClose]}
                                    onPress={() => { setModalVisible(false) }}
                                >
                                    <Text style={styles.textStyle}>{t('common:Close')}</Text>
                                </TouchableOpacity>
                            </View>
                            {/* Submit & close  Button  */}

                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>


    )
}

export default Addquotes;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    addressTypeimg:{ 
        flexDirection: 'row', 
        alignItems: 'center',
        padding:5 
    },
    addressTypeimg_ar:{ 
        flexDirection: 'row-reverse', 
        alignItems: 'center',
        padding:5 
    },
    header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.White
    },

    userDisply: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        height: 40,
        width: 40,
        aspectRatio: 1,
        borderRadius: 20,
    },
    userName: {
        padding: 10,
        fontWeight: '600',
    },

    Address:{
        padding: 5,
        paddingLeft: 20,
        fontSize:20,
        fontWeight: '600',
    },

    card: {
        flexGrow: 1,
        backgroundColor: Colors.White,
        justifyContent: 'center',
        paddingLeft: 5,
        shadowColor: Colors.White,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 10,
        margin:5,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 10,
        color: Colors.Sp_Text
    },
    text2: {
        fontSize: 15,
        paddingLeft: 10,
        color: Colors.Sp_Text
    },
    text3: {

        fontSize: 10,
        paddingLeft: 10,
        marginTop: 5,
        color: Colors.Sp_Text
    },

    centeredView: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    modalView: {
        width: "90%",
        margin: 20,
        backgroundColor: Colors.White,
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    },

    buttonModal: {
        flexGrow: 1,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 5,
        margin: 5
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: Colors.PRIMARY,
    },
    textStyle: {
        color: Colors.White,
        fontWeight: "bold",
        textAlign: "center"
    },



})