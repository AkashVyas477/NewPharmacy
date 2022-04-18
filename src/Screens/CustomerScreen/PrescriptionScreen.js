import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Images, Colors } from '../../CommonConfig';
import { Button } from '../../Components/Common';
import PrescriptionData from '../../DummyData/PrescriptoinDummydata';
import PrescriptionScreenData from '../../Components/Shop/Prescriptionsdata';
import { SafeAreaView } from 'react-native-safe-area-context';


const PrescriptionScreen = props => {


    const [state, setState] = useState('Current');
    return (
        <View style={styles.screen1} >

            <View style={styles.screen2}>
                {/*Logo + Menu  */}

                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <View>
                        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}  >
                            <Image source={Images.Menu} style={{ height: 20, width: 25 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingLeft: 100 }}>
                        <Image source={Images.HeaderAppIcon} style={{ height: 60, width: 130, }} />
                    </View>
                </View>

                {/*Logo + Icon  */}
                {/* Location  */}
                <View>
                    <View>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('AddressStack', { screen: 'ManageAddress' }) }}>
                            <Text style={{ padding: 10 }}>
                                Location
                            </Text>
                            <View >
                                <Text style={{ color: '#0DC314', paddingLeft: 7, marginBottom: 10 }}> 374  WIlliam S Canning Blvd <Image source={Images.Pencil} style={{ height: 15, width: 15, }} /> </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Current And Past Button   */}
                <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
                    <TouchableOpacity style={{ ...styles.currentPastButton, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: state === 'Current' ? Colors.PRIMARY : Colors.White }} onPress={() => setState('Current')}>
                        <Text style={{ color: state === 'Current' ? Colors.White : Colors.Gray }}>Current</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.currentPastButton, borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: state === 'Past' ? Colors.PRIMARY : Colors.White }} onPress={() => setState('Past')}>
                        <Text style={{ color: state === 'Past' ? Colors.White : Colors.Gray }}>Past</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Body */}

            <View style={{ padding:8,height:"100%"}}>

                <SafeAreaView >

                    {state === 'Current' ?
                        <View>
                            <FlatList
                                data={PrescriptionData}
                                renderItem={({ item }) => {
                                    return (
                                        // console.log(PrescriptionData),
                                        <View key={item.id} >
                                            <PrescriptionScreenData
                                                // id = { item.id }
                                                image={item.PrescriptionImg}
                                                name={item.PrescriptionName}
                                                details={item.Details}
                                                quotes={item.Quotes}
                                                onClick={() => { props.navigation.navigate('CurrentPrescriptionScreen_Data', { id: item.id }) }}
                                            />
                                        </View>
                                    )
                                }}
                            />

                            <View>
                                {/* <TouchableOpacity>
                                <Image source={Images.FabIcon} style={{ height: 60, width: 60 ,position:'absolute',left: Dimensions.get('window').width * 0.77,bottom: Dimensions.get('window').width * 0.6,}} />
                            </TouchableOpacity> */}
                            </View>
                        </View>

                        :
                        <View>
                            <FlatList
                            
                                data={PrescriptionData}
                                renderItem={({ item }) => {
                                    return (
                                        <View key={item.id} >
                                            <PrescriptionScreenData
                                                image={item.PrescriptionImg}
                                                name={item.PrescriptionName}
                                                details={item.Details}
                                                quotes={item.Quotes}
                                                onClick={() => { props.navigation.navigate('PastPrescriptionScreen_Data', { id: item.id }) }}
                                            />
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    }
                    {/* <View>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('PrescriptionImageScreen')
                        }} >
                            <Image source={Images.FabIcon} style={{ height: 60, width: 60, position: 'absolute', left: Dimensions.get('window').width * 0.77, bottom: Dimensions.get('window').width * 0.6, }} />
                        </TouchableOpacity>
                    </View> */}

                </SafeAreaView>

            </View>


            <View >
                <TouchableOpacity onPress={()=>{props.navigation.navigate('PrescriptionImageScreen') 
                    console.log('123')
            }}  >
                    <Image source={Images.FabIcon} style={{ height: 60, width: 60, position: 'absolute', left: Dimensions.get('window').width * 0.77, bottom: Dimensions.get('window').width * 0.1, }} />
                </TouchableOpacity>
            </View>


            {/* Img */}
            {/* <View style={{ alignItems: 'center', paddingTop: 20, }}>
                    <Image source={Images.EmptyPlacholder} style={{ height: 200, width: 300, }} />
                    <View>
                        <Text style={{ textAlign: 'center', padding: 10, fontWeight: 'bold', color: 'black', fontSize: 25 }}>
                            Looks empty!
                        </Text>
                        <Text style={{ textAlign: 'center', color: 'grey', fontSize: 15 }}>
                            Tap the Upload button to
                        </Text>
                        <Text style={{ textAlign: 'center', color: 'grey', fontSize: 15 }}>
                            create new post
                        </Text>
                    </View>


                    <View>
                        <Image source={Images.Nav} style={{
                            height: 120, width: 70,
                            left: Dimensions.get('window').width * 0.18,
                            bottom: Dimensions.get('window').width * 0.01,
                        }} />
                    </View>


                    <View>
                        <TouchableOpacity>
                            <Image source={Images.FabIcon} style={{
                                height: 60, width: 60,
                                left: Dimensions.get('window').width * 0.34,
                                bottom: Dimensions.get('window').width * 0.1,
                            }} />
                        </TouchableOpacity>
                    </View>
                    
                </View> */}


        </View>
    );
};

const styles = StyleSheet.create({
    screen1: {
        backgroundColor: 'white',
        flex: 1,
        paddingBottom : 200
    },
    screen2: {
        backgroundColor: 'white',
        elevation:2
    },
    line: {
        borderWidth: 1,
        borderColor: 'grey'
    },
    currentPastButton: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: Colors.Gray
    }
});
export default PrescriptionScreen;