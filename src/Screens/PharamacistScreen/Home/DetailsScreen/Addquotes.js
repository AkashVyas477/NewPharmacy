import { StyleSheet, Alert,Text,TextInput, View, ScrollView, StatusBar, Image, Dimensions,ActivityIndicator, TouchableOpacity, ImageBackground, FlatList,Modal } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
// import PharamaciesData from '../../../DummyData/DummyData';
import { Colors, Images } from '../../../../CommonConfig';
// import { Header, Button , } from '../../../Components/Common';
import Header from '../../../../Components/Common/Header';
import Button from '../../../../Components/Common/Button';
import { getWithParams, postPostLogin } from '../../../../Components/Helpers/ApiHelper';
import MedicinesImages from '../../../../Components/Common/MedicinesImages'
import moment from 'moment';

import Toast from 'react-native-simple-toast'
import { useTranslation } from 'react-i18next';



const Addquotes = (props) => {
    const {t}=useTranslation()

    // useEffect(() => {
    //     const update = props.navigation.addListener('focus', () => {
    //     });
    //     return update;
    // }, [props.navigation])

    const userRequest = props.route.params.prescription
    const [modalVisible, setModalVisible] = useState(false);
    const [submitLoader, setSubmitLoader] = useState(false)
    const [ isLoading ,setIsLoading ] = useState(false)
    const [priceing,setPriceing]=useState('')
    const [notes,setNote]=useState('')
    // const [id, setId] = useState()
    console.log("Detail\n", userRequest)

    const onpressSubmit = async ()=> {
        setSubmitLoader(true)
        const data = {
            price : priceing,
            text_note: notes
    }
    console.log("Quote data \n ",data)
    const response = await postPostLogin(`pharmacist/addQuote?prescriptionId=${userRequest.id}`,data)
    let errorMessage = "Check Quotes"
    if (response.success) {
    console.log("Quotes \n",response.data)
        Toast.show("Quote created successfully")
        props.navigation.navigate('PharamaHome')
    // setModalVisible(false)
    } else {
        // Alert.alert(response.error.message);
        Alert.alert('Error',errorMessage,[{text:"Okay"}])
        console.log("api\n",response)
    }
    setSubmitLoader(false)
    }

    return (
// ----------> Header <--------------- //
        <View style={styles.screen} > 
            <View  style={styles.header_sty}>
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
                    // console.log("image     ",item);
                    return (
                        <View style={{opacity:0.7}}>
                            <MedicinesImages
                                image={item}
                                // id={item}
                                // onClick={() => { props.navigation.navigate('Preview', { images123: item, }) }}
                            />
                        </View>
                        
                    )
                }}
            /> 
         
{/*Customer Details   */}          
            <View style={styles.card}>
                        <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' ,paddingRight:10}}>
                            <View >
                                    <View style={styles.userDisply}>
                                        <Image source={{ uri:userRequest.user_image}} style={styles.userImage} /> 
                                        <Text style={styles.userName}>{userRequest.user}</Text>
                                    </View>
                                {/* <Text style={styles.text} >{userRequest.user.toUpperCase()}</Text> */}
                                <View style={{flexDirection:'row',alignItems:'center', marginBottom:3}}>
                                        <Image source={Images.Calendar} style={{height:20,width:20 ,}}/>
                                        <Text style={styles.text3}>{moment(userRequest.createdAt).format('DD/MM/YYYY') + ' at ' + moment(userRequest.createdAt).format('hh:mm A')}</Text>
                                    </View> 
                                    <View style={{flexDirection:'row',alignItems:'center', marginBottom:1}}>
                                    <Image source={Images.Quotes} style={{height:18,width:20 ,}}/>
                                        <Text style={styles.text2}>{userRequest.total_quotes}</Text>
                                    </View> 
                            </View>
                            <View style={{ marginBottom: 40 }} >
                                <Image source={Images.MapLocate} style={{height:24,width:17,}}/>
                            </View> 
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
                        <View>
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
                    </View>
{/* Adding Quotes */}
                    <View style={styles.card}>
                        <TouchableOpacity  onPress={() => { setModalVisible(true) }} style={{flexDirection:'row' ,alignItems:'center',}} >
                                <Image source={Images.GreenAdd} style={{height:20,width:20}} />
                            
                        <Text style={{ padding:5,alignItems: 'center', fontWeight: 'bold', color: Colors.Sp_Text, fontSize: 20 }}>
                            {t('common:AddQuotesHere')}
                        </Text>
                        </TouchableOpacity>
                       
                    </View>

{/* After adding Quotes  */}
                    {/* <View style={styles.card}>
                        <View>
                        <Text style={{ alignItems: 'center', justifyContent: 'flex-start', fontWeight: 'bold', color: Colors.Sp_Text, fontSize: 15 }}>
                          Quote Price 
                            </Text>
                        </View>
                    </View> */}


{/* Add Quotes Modal  */}
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
                        <View  style={{}}>
                        <View style={{  marginTop: 10,}}>
                            <Text>{t('common:Price')} </Text>
                            <TextInput
                            placeholder={t('common:Price')}
                            keyboardType='number-pad'
                            style={{borderWidth:1, width:"100%"}}
                            onChangeText={(e) => { setPriceing(e) }}

                            />
                        </View>

                        <View style={{  marginTop: 10,}}>
                            <Text >{t('common:Note')}</Text>
                            <TextInput
                            placeholder={t('common:NotesforCustomer')} 
                            multiline
                            style={{borderWidth:1, width:"100%"}}
                            onChangeText={(e) => { setNote(e) }}
                            />
                        </View>
                        </View>
            {/* Price And Note */}


{/* Submit & close  Button  */}
                        <View style={{flexDirection:'row-reverse', marginTop:30}}>
                        <TouchableOpacity
                        activeOpacity={0.7}
                        disabled={(!priceing || !notes || submitLoader)? true : false}
                            style={[styles.buttonModal, styles.buttonClose]}
                            onPress={onpressSubmit}
                            // onPress={() => {console.log(priceing, notes);}}
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
        // backgroundColor: 'rgba(0,0,0,0.4)',
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
        margin: 10,
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
        flexGrow:1,
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
        // alignItems: "center",
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
        flexGrow:1,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 5,
        margin:5
        // width: 200
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