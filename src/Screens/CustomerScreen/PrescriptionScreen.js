import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const PrescriptionScreen = props => {

    // const [current , setCurrent ] = useState(false);
    // const [past, setPast ] = useState(false);
    // const [ showButtonColor, setShowButtonColor]=useState();


    // const currentHandler = () => {
    //     setCurrent(true);
    //     setPast(false);
    //     setShowButtonColor(true);

    // };
    // const pastHandler = () => {
    //     setCurrent(false);
    //     setPast(true);
    //     setShowButtonColor(true);
    // };

    return (
        <View>
            <KeyboardAwareScrollView>
                <View style={styles.screen}>
                    {/*Logo + Icon  */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <View>
                            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}  >
                                <Image source={require('../../assets/Icons/Edit-Add/menu.png')} style={{ height: 20, width: 25 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingLeft: 100 }}>
                            <Image source={require('../../assets/Icons/AppIcon/headerAppIcon.png')} style={{ height: 60, width: 130, }} />
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
                                    <Text style={{ color: '#0DC314', paddingLeft: 7, marginBottom: 10 }}> 374  WIlliam S Canning Blvd <Image source={require('../../assets/Icons/Edit-Add/pencil.png')} style={{ height: 15, width: 15, }} /> </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ paddingBottom: 10, }}>
                        <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'center', width: "90%", marginLeft: 20, }} >
                            <View style={{ width: "50%" }}>
                                {/* <TouchableOpacity>
                            <Text style={{textAlign:'center', paddingRight:40,}}>
                                Current
                            </Text>
                            </TouchableOpacity> */}

                                <TouchableOpacity
                                    // style={styles.loginScreenButton}
                                    // onPress={() => navigate('HomeScreen')}
                                    underlayColor='#fff'>
                                    <Text style={{textAlign:'center', paddingRight:40}}>Current</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.line} ></View>
                            <View style={{ width: "50%" }}>
                                {/* <TouchableOpacity >
                            <Text style={{textAlign:'center'}}>
                                Past
                            </Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                    // style={styles.loginScreenButton}
                                    // onPress={() => navigate('HomeScreen')}
                                    underlayColor='#fff'>
                                    <Text style={{textAlign:'center', paddingRight:40}}>Past</Text>
                                </TouchableOpacity>
                            </View>
                        </View>



                    </View>
                </View>


                {/* Img */}
                <View style={{ alignItems: 'center', paddingTop: 60, }}>
                    <Image source={require('../../assets/Icons/logo/emptyPlacholder.png')} style={{ height: 200, width: 300, }} />
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
                        <Image source={require('../../assets/Icons/location/nav.png')} style={{
                            height: 120, width: 70,
                            left: Dimensions.get('window').width * 0.18,
                            bottom: Dimensions.get('window').width * 0.01,
                        }} />
                    </View>


                    <View>
                        <TouchableOpacity>
                            <Image source={require('../../assets/Icons/Image/fabIcon.png')} style={{
                                height: 60, width: 60,
                                left: Dimensions.get('window').width * 0.34,
                                bottom: Dimensions.get('window').width * 0.1,
                            }} />
                        </TouchableOpacity>
                    </View>
                    {/* <Text style={{color:'#717D7E', fontSize:17, padding:10}}>
                        Near By Pharmacies
                    </Text> */}
                </View>
                {/* Dtabase */}
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },
    line: {
        borderWidth: 1,
        borderColor: 'grey'
    },
});
export default PrescriptionScreen;