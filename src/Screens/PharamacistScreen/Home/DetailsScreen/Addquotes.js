import { StyleSheet, Text,TextInput, View, ScrollView, StatusBar, Image, Dimensions, TouchableOpacity, ImageBackground, FlatList,Modal } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
// import PharamaciesData from '../../../DummyData/DummyData';
import { Colors, Images } from '../../../../CommonConfig';
// import { Header, Button , } from '../../../Components/Common';
import Header from '../../../../Components/Common/Header';
import Button from '../../../../Components/Common/Button';
import { getWithParams } from '../../../../Components/Helpers/ApiHelper';
import MedicinesImages from '../../../../Components/Common/MedicinesImages'
import moment from 'moment';



const Addquotes = (props) => {

    const userRequest = props.route.params.prescription
    const [modalVisible, setModalVisible] = useState(false);
    const [submitLoader, setSubmitLoader] = useState(false)
    console.log("Detail\n", userRequest)


    return (
        <View style={styles.screen} > 
            <View  style={styles.header_sty}>
                <Header
                Title="DETAILS"
                onPress={() => props.navigation.goBack()}
                />
           </View>
           <ScrollView>
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

                    <View style={styles.card}>
                        <Text style={{ alignItems: 'center', justifyContent: 'flex-start', fontWeight: 'bold', color: Colors.Sp_Text, fontSize: 15 }}>
                            Text Note By Customer
                        </Text>
                        <Text style={{ textAlign: 'auto', padding: 10 }}>{userRequest.text_note}</Text>
                    </View>

                    <View style={styles.card}>
                        <View>
                        <Text style={{ alignItems: 'center', justifyContent: 'flex-start', fontWeight: 'bold', color: Colors.Sp_Text, fontSize: 15 }}>
                            List Of Medicines
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
                  
                    <View style={styles.card}>
                        <TouchableOpacity  onPress={() => { setModalVisible(true) }} style={{flexDirection:'row' ,alignItems:'center',}} >
                                <Image source={Images.GreenAdd} style={{height:20,width:20}} />
                            
                        <Text style={{ padding:5,alignItems: 'center', fontWeight: 'bold', color: Colors.Sp_Text, fontSize: 20 }}>
                            Add Quotes Here
                        </Text>
                        </TouchableOpacity>
                       
                    </View>

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
                            <Text>Price </Text>
                            <TextInput
                            style={{borderWidth:1, width:"100%"}}
                            />
                        </View>

                        <View style={{  marginTop: 10,}}>
                            <Text >Note </Text>
                            <TextInput
                            style={{borderWidth:1, width:"100%"}}
                            />
                        </View>
                        </View>
            {/* Price And Note */}


{/* Submit & close  Button  */}
                        <View style={{flexDirection:'row-reverse'}}>
                        <TouchableOpacity
                            style={[styles.buttonModal, styles.buttonClose]}
                            // onPress={onPressDelete}
                        >
                            {submitLoader ? <ActivityIndicator size={25} color={Colors.White} /> : <Text style={styles.textStyle}>Submit</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttonModal, styles.buttonClose]}
                            onPress={() => { setModalVisible(false) }}
                        >
                            <Text style={styles.textStyle}>Close</Text>
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
        // flex: 3,
        height: 40,
        width: 40,
        aspectRatio: 1,
        borderRadius: 20,
    },
    userName: {
        // flex:7,
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