import { StyleSheet, Text, View, ScrollView, StatusBar, Image, Dimensions, TouchableOpacity, ImageBackground, FlatList, Modal, Platform, ActivityIndicator } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import PrescriptionData from '../../../DummyData/PrescriptoinDummydata';
import { Colors, Images } from '../../../CommonConfig';
import Header from '../../../Components/Common/Header';
import Button from '../../../Components/Common/Button';
import RadioButton from '../../../Components/Common/RadioButton';
import CheckRound from '../../../Components/Common/CheckRound';
// import { Header, Button, RadioButton, CheckRound,} from '../../../Components/Common';
import { getWithParams } from '../../../Components/Helpers/ApiHelper';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import MedicinesImages from '../../../Components/Common/MedicinesImages'
import { deletePost } from '../../../Components/Helpers/ApiHelper';
import moment from 'moment';


const { width } = Dimensions.get('window')
const height = width * 100 / 0.6
const { width: screenWidth } = Dimensions.get('window')

const CurrentPrescriptionScreen = props => {

    const [first, setfirst] = useState(false);
    const firstHandler = () => {
        setfirst(state => !state);
        setsecond(false);
        setthird(false);
        setfourth(false);
    };

    const [second, setsecond] = useState(false);
    const secondHandler = () => {
        setsecond(state => !state);
        setfirst(false);
        setthird(false);
        setfourth(false);
    };

    const [third, setthird] = useState(false);
    const thirdHandler = () => {
        setthird(state => !state);
        setfirst(false);
        setsecond(false);
    };

    const [fourth, setfourth] = useState(false);
    const fourthHandler = () => {
        setfourth(state => !state);
        setfirst(false);
        setsecond(false);
        setthird(false);
    };


    const [delLoader, setDelLoader] = useState(false)
    const [CheckPharamcist, setCheckPharamcist] = useState(false);
    const CheckRoundHandler = () => {
        setCheckPharamcist(state => !state);
    };
    const currentprescription = props.route.params.prescription
    const [modalVisible, setModalVisible] = useState(false);
    const height = width * 100 / 0.6



    const onPressDelete = async () => {
        console.log("Delet:     ", currentprescription.id)
        setDelLoader(true)
        const data = {
            PrescriptionId: currentprescription.id
        }
        const deleteResponse = await deletePost(`customer/deletePrescription/${currentprescription.id}`)
        if (!deleteResponse.success) {
            console.log(deleteResponse.data)
        } else {
            props.navigation.goBack()
        }
        setDelLoader(false)
    }




    const statusText = (status) => {
        switch (status) {
            case 0:
                return "Pending"
            case 1:
                return "Completed"
            case 2:
                return "Rejected"
            default:
                return 'Past Order!'
        }
    }

    return (
        <View style={{ flex: 1 }} >
            
            <View style={styles.header_sty}>
                <Header
                    Title="DETAILS"
                    onPress={() => props.navigation.goBack()}
                />
            </View>
            <FlatList
                data={currentprescription.prescription_images}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                renderItem={({ item }) => {
                    // console.log("\n\n image     ",item);
                    return (
                        <View>
                            <MedicinesImages
                                image={item.url}
                                id={item.id}
                                onClick={() => { props.navigation.navigate('Preview', { images123: item, }) }}
                            />
                        </View>
                    )
                }}
            />
            {/* <ImageBackground source={{ uri: currentprescription.prescription_images[0].url }} resizeMode="cover" style={styles.imageContainer}></ImageBackground> */}
            <ScrollView>
                <View>
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.text} >{currentprescription.name.toUpperCase()}</Text>
                                <Text style={styles.text3}>{moment(currentprescription.createdAt).format('DD/MM/YYYY') + ' at ' + moment(currentprescription.createdAt).format('hh-mm A')}</Text>
                                <Text style={styles.text2}>{currentprescription.quotes.length}</Text>
                            </View>
                            <View style={{ alignItems: 'center', marginBottom: 40 }} >
                                <Text style={{ alignItems: 'flex-end', paddingRight: 10, color: '#F39C12' }}>
                                    {/* {currentprescription.status === 0 ? <Text style={{ color: Colors.orange }}> Pending</Text> : <Text style={{ color: Colors.PRIMARY }}> Completed</Text>} */}
                                    {/* {currentprescription.status}  */}
                                    <Text style={{ color: currentprescription.status === 1 ? Colors.PRIMARY : Colors.orange, fontWeight: 'bold', marginTop: 10 }}>{statusText(currentprescription.status)}</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.card2}>
                        <Text style={{ alignItems: 'center', justifyContent: 'flex-start', fontWeight: 'bold', color: Colors.Sp_Text, fontSize: 15 }}>
                            Text Note
                        </Text>
                        <Text style={{ textAlign: 'auto', padding: 10 }}>{currentprescription.text_note}</Text>
                    </View>
                    <View style={styles.card2}>
                        <Text style={{ alignItems: 'center', justifyContent: 'flex-start', fontWeight: 'bold', color: Colors.Sp_Text, fontSize: 15 }}>
                            List Of Medicines
                        </Text>
                        <View>
                            {currentprescription.medicines.map(item => {
                                return (
                                    <View key={item.id}>
                                        <Text style={{ borderBottomWidth: 0.5, width: '95%', margin: 5, fontSize: 15, fontWeight: 'bold' }}>
                                            {item.name.toUpperCase()}
                                        </Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View style={styles.card2}>
                        <Text style={{ alignItems: 'center', justifyContent: 'flex-start', fontWeight: 'bold', fontSize: 15, color: Colors.Sp_Text, marginBottom: 8 }}>
                            Pharamacist Replied
                        </Text>
                        <View >
                            {currentprescription.quotes.map(item => {
                                return (
                                    <View key={item.id} >
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 15 }}>
                                            <Text style={{ fontWeight: 'bold', color: Colors.Sp_Text }}>{item.store_name.toUpperCase()}</Text>
                                            <CheckRound
                                                onPress={() => {
                                                    CheckRoundHandler()
                                                }}
                                                state={setCheckPharamcist}
                                            />
                                        </View>
                                        <Text>{moment(item.createdAt).format('DD/MM/YYYY') + ' at ' + moment(currentprescription.createdAt).format('hh-mm A')}</Text>
                                        <Text style={{ color: Colors.PRIMARY, marginBottom: 18 }}>${item.price}</Text>
                                        <Text style={{ marginBottom: 10, borderBottomWidth: 0.5, paddingBottom: 10 }}>{item.text_note}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Delet Prescription  */}
            <View style={{ flexDirection: 'row', backgroundColor: Colors.PRIMARY, width: '100%', height: 55 }}>
                <View >
                    <TouchableOpacity onPress={() => { setModalVisible(true) }} >
                        <Text style={{ padding: 10, marginLeft: 45, color: Colors.White, marginTop: 10 }}>
                            DELETE REQUEST
                        </Text>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => { setModalVisible(false) }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Choose option: </Text>
                                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                        <Text style={{ marginRight: 5 }}>Product is Missing in the Package</Text>
                                        <RadioButton
                                            onPress={() => {
                                                firstHandler()
                                            }}
                                            state={first}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                        <Text style={{ marginRight: 15 }}>Don't want the product anymore </Text>
                                        <RadioButton
                                            onPress={() => {
                                                secondHandler()
                                            }}
                                            state={second}
                                        // state={'second'}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                        <Text style={{ marginRight: 15 }}>Don't like the size of thr Product </Text>
                                        <RadioButton
                                            onPress={() => {
                                                thirdHandler()
                                            }}
                                            state={third}
                                        // state={'third'}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                        <Text style={{ marginRight: 85 }}>Receive Wrong Items </Text>
                                        <RadioButton
                                            onPress={() => {
                                                fourthHandler()
                                            }}
                                            state={fourth}
                                        // state={'fourth'}
                                        />
                                    </View>

                                    <TouchableOpacity
                                        style={[styles.buttonModal, styles.buttonClose]}
                                        onPress={onPressDelete}
                                    >
                                        {delLoader ? <ActivityIndicator size={25} color={Colors.White} /> : <Text style={styles.textStyle}>Delet</Text>}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.buttonModal, styles.buttonClose]}
                                        onPress={() => { setModalVisible(false) }}
                                    >
                                        <Text style={styles.textStyle}>Close</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </Modal>
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 20, borderRightWidth: 0.5, borderColor: Colors.White }}></View>
                <View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('OrderScreen')}  >

                        <Text style={{ padding: 10, marginLeft: 45, color: Colors.White, marginTop: 10 }}>
                            Buy Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>


    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },
    header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.White

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
    imageContainer: {
        // height: width * 0.5,
        // width: width * 1.1,
        // opacity: 0.7
        height: 50,
        width: 50
    },
    card: {
        backgroundColor: Colors.White,
        height: 90,
        width: 390,
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

    card2: {
        flexGrow: 1,
        backgroundColor: Colors.White,

        width: 390,
        paddingLeft: 5,
        shadowColor: Colors.White,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        margin: 10,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.White,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 5,
        width: 200
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
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    },

    container: {
        // flex: 1,
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    imageContainer: {
        // flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {

        resizeMode: 'cover',
    },
});

export default CurrentPrescriptionScreen;