import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image,TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import  CountryPicker from 'react-native-country-picker-modal';
import * as AuthActions from '../../Redux/Actions/AuthActions';
import{ Colors, Images }from '../../CommonConfig';
import { Header, Button } from '../../Components/Common';
import { postRequest } from '../../Components/Helpers/ApiHelper';



const PhoneNumberScreen = props => {
    const [isLoading, setisLoading]=useState(false)
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('IN');
    const [callingCode, setcallingCode]= useState('+91')
    const [phoneNumber, setPhoneNumber ] = useState('');
    
    const dispatch = useDispatch()

    const pressHandler = async(countryCode, phoneNumber) => {
        setisLoading(true);
        const data = {
            country_code:countryCode,
            phone_number:phoneNumber
        }
        dispatch(AuthActions.addPhone(data))

        const OTPData = {
            country_code: countryCode,
            phone_number: phoneNumber,
            channel: "sms",
            // mobile: phoneNumber
        }
        const response = await postRequest('generateOTP', OTPData);
        console.log(response)
        let errorMsg = 'Something went wrong!';
        if (response.success) {
            setisLoading(false);
            
            props.navigation.navigate('VerificationScreen',{countryCode: countryCode, phoneNumber: phoneNumber})
        } else {
            setisLoading(false);
            Alert.alert("Error",errorMsg,[{text:"Okay"}])
        }
    }

    return (
        <View style={styles.screen}>
            <KeyboardAwareScrollView>
                {/* <StatusBar backgroundColor={Colors.ORANGE} barStyle='light-content' /> */}
                {/* HEADER */}
                <View style={styles.header1}>
                    <Header 
                    Title="PHONE NUMBER"
                    onPress={() => (props.navigation.goBack())}
                    />
                </View>
                <View style={styles.screen}>
                    <Image source={Images.PhoneNumberImg} style={styles.phoneNoImg} />
                    </View>
                    <View  >
                      <Text style={styles.text}>
                        We Will Send You A Verification Code To Verify Your Phone NUMBER
                        </Text>
                    </View>

                {/* BODY */}
                <View >
                    <View style={styles.body}>                     
                        <Text style={styles.textPhoneNo} >Phone Number</Text>
                        <View style={styles.action} >
                            <Text style={{flex:0.5, fontWeight:'bold'}}>{countryCode}</Text>
                            <TouchableOpacity onPress={() => setShow(true)} style={{flex: 0.5}}>
                                {/* <Image source={Images.DropDown} style={{height:10,width:10}}/> */}
                                <CountryPicker
                                    withFilter
                                    countryCode={countryCode}
                                    withFlag
                                    withAlphaFilter={false}
                                    withCallingCode
                                    onSelect={country => {
                                        console.log('country', country);
                                        const { cca2, callingCode } = country;
                                        setCountryCode(cca2);
                                        setcallingCode(callingCode[0]);
                                    }}
                                    containerButtonStyle={{ alignItems: 'center',}}
                                />
                                </TouchableOpacity>
                            <View style={{width:0, borderColor: Colors.Gray, borderWidth:0.5, height:30, marginRight:10}} ></View>
                            <TextInput 
                                style={{flex:3.5}}
                                keyboardType= "phone-pad"
                                maxLength={10}
                                onChangeText = { (val) => {setPhoneNumber(val)} }
                            />
                        </View>

                            <View style={{marginTop:20}}>
                            <Button
                            disabled={ phoneNumber.length === 10 ? false : true } 
                            onPress={() => pressHandler(callingCode, phoneNumber)}
                            showActivityIndicator={isLoading}
                            // disabled={isLoading}   
                            label="Next"
                            />
                            </View>

                        {/* <TouchableOpacity style={styles.sendCode} disabled={ phoneNumber.length === 10 ? false : true } onPress={() => pressHandler(countryCode, phoneNumber)}>
                            <Text style={styles.sendCodeText}>Send Code</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </KeyboardAwareScrollView>
           
        </View>
    );
};

const styles = StyleSheet.create({

    header1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        padding: 10
    },
    phoneNoImg: {
        height: 200,
        width: 190,
        marginTop: 20
    },
    screen: {
        flex: 1,
        alignItems: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.White

    },
    text: {
        padding: 20,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    textPhoneNo: {
        color: Colors.Gray,
        marginBottom: 5
    },

    sendCode: {
        backgroundColor: Colors.ORANGE,
        padding: 15,
        marginTop: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sendCodeText: {
        fontWeight: 'bold',
        color: Colors.WHITE,
        fontSize: 20
    },
    header: {
        flex: 1,
        backgroundColor: Colors.ORANGE,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerLabel: {
        color: Colors.WHITE,
        fontWeight: 'bold',
        fontSize: 26,
        margin: 10
    },
    headerText: {
        color: Colors.WHITE,
        fontWeight: '600',
        fontSize: 15,
        width: '100%',
        marginLeft: 10
    },
    body: {
        flex: 3,

        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    image: {
        marginVertical: 10,
        marginRight: 5,
        height: 180,
        width: 180
    },
    footerText: {
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5,
        color: Colors.GREY
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.LIGHTER_GREY,
        paddingBottom: 10,
        alignItems: 'center',
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 50
    },
});

export default PhoneNumberScreen;