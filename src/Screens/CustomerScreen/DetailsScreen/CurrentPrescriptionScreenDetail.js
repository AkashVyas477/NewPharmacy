import { StyleSheet, Text, View, ScrollView, StatusBar, Image, Dimensions, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import PrescriptionData from '../../../DummyData/PrescriptoinDummydata';
import { Colors, Images } from '../../../CommonConfig';
import { Header, Button } from '../../../Components/Common';
import { getWithParams } from '../../../Components/Helpers/ApiHelper';
import moment from 'moment';

const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const CurrentPrescriptionScreen = props => {
    // const [prescriptionList, setprescriptionList] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    // useEffect(() => {
    //     getPrescriptionList();
    //     setIsLoading(false)
    // }, [])
    // const getPrescriptionList = async () => {
    //     const response = await getWithParams ('customer/getPrescriptionsList/?page=1&state=current')
      
    //     // console.log(response.data);
    //     if (!response.success) {
    //         setprescriptionList(response.data)
    //         console.log(response.data);
    //         // Toast.show('Records Found !')
    //         // console.log("GetPrescription:    ",prescriptionList);
    //     } else {
    //         // Toast.show('No Records Found !')
    //     }
    // }

    // const pid = props.route.params.id
    // const selectedItem = PrescriptionData.find(item => item.id === pid)

    const currentprescription = props.route.params.prescription
    console.log(currentprescription);

    const height = width * 100 / 0.6
    const [active, setActive] = useState(0);

    // const change = ({ nativeEvent }) => {
    //     const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    //     if (slide !== active) {
    //         setActive(slide);
    //     }
    // }
    return (

        <View style={{flex:1}} >
           
            <View >
                <View style={{ alignItems: 'center', }} >
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Preview', { currentprescription:data}) }}> 
                        <ImageBackground source={{uri:currentprescription.prescription_images[0].url}} resizeMode="cover" style={styles.imageContainer}>

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
            <View >
           
                    
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.text} >{currentprescription.name.toUpperCase()}</Text>
                                <Text style={styles.text2}>{currentprescription.quotes.length}</Text>
                                <Text style={styles.text3}>{moment(currentprescription.createdAt).format('DD/MM/YYYY')+' at '+moment(currentprescription.createdAt).format('hh-mm A')}</Text>
                            </View>
                            <View style={{ alignItems: 'center', marginBottom:40}} >
                                <Text style={{ alignItems: 'flex-end', paddingRight: 10, color: '#F39C12' }}>
                                    { currentprescription.status === 0 ? <Text> Pending</Text>:<Text style={{color:Colors.PRIMARY}}> Completed</Text>  }
                                     {/* {currentprescription.status}  */}
                                </Text>
                            </View>
                        </View>
                    </View>

                   

                    <View style={styles.card2}>
                        <Text style={{ alignItems: 'center', justifyContent: 'flex-start' }}> Text Note By Pharamacies</Text>
                        <Text style={{ textAlign: 'auto', padding: 10 }}>{currentprescription.text_note}</Text>
                    </View>

                    
                
                    <View style={styles.card2}>
                        <Text style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                            List Of Medicines
                        </Text>
                        <View>
                            {currentprescription.medicines.map( item => {
                                return(
                                    <View key={item.id}>
                                        <Text>{item.name}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        
                    </View>
                     
                    <View style={styles.card2}>
                        <View>
                            <Text style={{marginBottom:5}}>
                                Pharmacist Replied
                            </Text>
                            <Text>
                                Apollo Pharmacy
                            </Text>
                        </View>
                    </View>
                    <View style={styles.card2}>
                        <Text>
                            Medkart Pharmacy
                        </Text>
                    </View>
                    <View style={styles.card2}>
                        <Text>
                            Medkart Pharmacy
                        </Text>
                    </View>

              
            </View>
            
            </ScrollView>
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
        // backgroundColor: 'white',

        margin: 10,
        // flexDirection:'row',

        // alignItems:'flex-end',

    },

    card2: {
        backgroundColor: Colors.White,
        height: 100,
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
});

export default CurrentPrescriptionScreen;