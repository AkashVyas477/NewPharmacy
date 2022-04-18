import { StyleSheet, Text, View, ScrollView, StatusBar, Image, Dimensions, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import React, { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import PrescriptionData from '../../DummyData/PrescriptoinDummydata';
import { Colors, Images } from '../../CommonConfig';
import { Header, Button } from '../../Components/Common';


const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const CurrentPrescriptionScreen = props => {

    const pid = props.route.params.id
    const selectedItem = PrescriptionData.find(item => item.id === pid)


    const height = width * 100 / 0.6
    const [active, setActive] = useState(0);

    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
            setActive(slide);
        }
    }
    return (

        <View >
            {/* Header */}
            <View >
                <View style={{ alignItems: 'center', }} >
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Preview', { id: pid }) }}
                    >
                        <ImageBackground source={selectedItem.PrescriptionImg} resizeMode="cover" style={styles.imageContainer}>

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
            {/* Header */}


            {/* Body */}
            <View>
                <ScrollView>
                    {/* Shop Name & address*/}
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.text} >{selectedItem.PrescriptionName}</Text>
                                <Text style={styles.text2}>{selectedItem.Details}</Text>
                                <Text style={styles.text3}>{selectedItem.Quotes}</Text>
                            </View>
                            <View style={{ alignItems: 'center', }} >
                                <Text style={{ alignItems: 'flex-end', paddingRight: 10, color: '#F39C12' }}>
                                    Pending
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Text Note By Pharamacies */}

                    <View style={styles.card2}>
                        <Text style={{ alignItems: 'center', justifyContent: 'flex-start' }}> Text Note By Pharamacies</Text>
                        <Text style={{ textAlign: 'auto', padding: 10 }}>Detalis By Pharamacies</Text>
                    </View>

                    {/* List of Medicines */}
                    {/* first Pharmacy */}
                    <View style={styles.card2}>
                        <Text style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                            List Of Medicines
                        </Text>
                        <View>
                            <Text>WellButrin</Text>
                        </View>
                        <View>
                            <Text>Amitriptyline</Text>
                        </View>
                        <View>
                            <Text>Citalopram</Text>
                        </View>
                    </View>
                    {/* Second Pharmacy */}
                    <View style={styles.card2}>
                        <View>
                            <Text>
                                Medkart Pharmacy
                            </Text>
                        </View>
                    </View>
                    {/* Third Pharmacy */}
                    <View style={styles.card2}>
                        <Text>
                            Medkart Pharmacy
                        </Text>
                    </View>

                </ScrollView>
            </View>
            {/* Body */}
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