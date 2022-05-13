import { StyleSheet, Text, View, ScrollView, StatusBar, Image, Dimensions, TouchableOpacity, ImageBackground, FlatList, Modal } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import PrescriptionData from '../../../DummyData/PrescriptoinDummydata';
import { Colors, Images } from '../../../CommonConfig';
import { Header, Button, RadioButton } from '../../../Components/Common';
import { getWithParams } from '../../../Components/Helpers/ApiHelper';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';

const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const CurrentPrescriptionScreen = props => {

    const [REQUEST, setREQUEST] = useState(false);
    const REQUESTHandler = () => {
        setREQUEST(state => !state);
    };
    const currentprescription = props.route.params.prescription
    // console.log(currentprescription);
    const [modalVisible, setModalVisible] = useState(false);

    const height = width * 100 / 0.6
    const [active, setActive] = useState(0);

    // const rendermedicines = currentprescription =>{
    //    console.log("\n\nDATA:       ",currentprescription);
    //     return (
    //         <View >
    //             <Text style={{ borderBottomWidth: 0.5, width: '95%', margin: 5, fontSize: 15, fontWeight: 'bold' }}>
    //                 {item.name.toUpperCase()}
    //             </Text>
    //         </View>
            
    //     )
    // }
    return (

        <View style={{ flex: 1 }} >

            <View >
                <View style={{ alignItems: 'center', }} >
                    <TouchableOpacity >
                        <ImageBackground source={{ uri: currentprescription.prescription_images[0].url }} resizeMode="cover" style={styles.imageContainer}>

                            <View style={styles.header_sty}>
                                <Header
                                    Title="DETAILS"
                                    onPress={() => props.navigation.goBack()}
                                />
                            </View>

                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
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
                                    {currentprescription.status === 0 ? <Text> Pending</Text> : <Text style={{ color: Colors.PRIMARY }}> Completed</Text>}
                                    {/* {currentprescription.status}  */}
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
                            {/* <FlatList
                            data={currentprescription}
                            keyExtractor={item => item.id}
                            renderItem={rendermedicines}
                            /> */}
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
                                        <Text style={{ fontWeight: 'bold', color: Colors.Sp_Text }}>{item.store_name.toUpperCase()}</Text>
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
            <View style={{ flexDirection: 'row', backgroundColor: Colors.PRIMARY, width: '100%', height: 55 }}>
                <View >
                    <TouchableOpacity onPress={() => setModalVisible(true)} >
                        <Text style={{ padding: 10, marginLeft: 45, color: Colors.White, marginTop: 10 }}>
                            DELETE REQUEST
                        </Text>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Choose option: </Text>
                                    {/* <TouchableOpacity
                                style={[styles.buttonModal, styles.buttonClose]} >
                            </TouchableOpacity> */}
                                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                        <Text style={{ marginRight: 5 }}>Product is Missing in the Package</Text>
                                        <RadioButton
                                            onPress={() => {
                                                REQUESTHandler()
                                            }}
                                            state={REQUEST}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                        <Text style={{ marginRight: 15 }}>Don't want the product anymore </Text>
                                        <RadioButton
                                        //  onPress={() => {
                                        //     REQUESTHandler()
                                        // }}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                        <Text style={{ marginRight: 15 }}>Don't like the size of thr Product </Text>
                                        <RadioButton
                                        //  onPress={() => {
                                        //     REQUESTHandler()
                                        // }}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                        <Text style={{ marginRight: 85 }}>Receive Wrong Items </Text>
                                        <RadioButton
                                        //  onPress={() => {
                                        //     REQUESTHandler()
                                        // }}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        style={[styles.buttonModal, styles.buttonClose]}
                                        onPress={() => { setModalVisible(false) }}
                                    >
                                        <Text style={styles.textStyle}>Submit</Text>
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
        padding: 10
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
        height: width * 0.7,
        width: width * 1,
        opacity: 0.7
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
});

export default CurrentPrescriptionScreen;