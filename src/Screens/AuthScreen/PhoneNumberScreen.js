import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image,TextInput, Alert,I18nManager  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import CountryPicker from 'react-native-country-codes-picker';

import * as registerAction from '../../Store/Actions/register';
import{ Colors, Images }from '../../CommonConfig';
// import { Header, Button } from '../../Components/Common';
import Header from '../../Components/Common/Header';
import Button from '../../Components/Common/Button';
import { postRequest } from '../../Components/Helpers/ApiHelper';
import { useTranslation } from 'react-i18next';



const PhoneNumberScreen = props => {
const {t,i18n}=useTranslation()
    const params = props.route.params.data
//    console.log("userdata    ",params)
    const [isLoading, setisLoading]=useState(false)
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');
    // const [callingCode, setcallingCode]= useState('+91')
    const [phoneNumber, setPhoneNumber ] = useState('');
    
    // const dispatch = useDispatch()

    const pressHandler = async(countryCode, phoneNumber) => {
        setisLoading(true);
        const OTPData = {
            country_code: '+91',
            phone_number: phoneNumber,
            channel: "sms",
            // mobile: phoneNumber
        }
        const response = await postRequest('generateOTP', OTPData);
        console.log(response)
        let errorMsg = 'Something went wrong!';
        if (response.success) {
            setisLoading(false);
            props.navigation.navigate('VerificationScreen',{countryCode: countryCode, phoneNumber: phoneNumber,params})
        } else {
            setisLoading(false);
            Alert.alert("Error",errorMsg,[{text:"Okay"}])
        }
    }

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={Colors.PRIMARY} barStyle='light-content' />
                {/* <StatusBar backgroundColor={Colors.ORANGE} barStyle='light-content' /> */}

                {/* HEADER */}
                <View style={styles.header1}>
                    <Header 
                    Title={t("auth:PHONENUMBER")}
                    onPress={() => (props.navigation.goBack())}
                    />
                </View>

                <KeyboardAwareScrollView>
                <View style={styles.screen1}>
                    <Image source={Images.PhoneNumberImg} style={styles.phoneNoImg} />
                    </View>
                    <View  >
                      <Text style={styles.text}>
                        {t('auth:WeWillSendYouAVerificationCodeToVerifyYourPhoneNUMBER')}
                        </Text>
                    </View>

                         {/* BODY */}
                    <View >
                    <View style={styles.body}>                     
                        <Text style={styles.textPhoneNo} >{t('auth:PhoneNumber')}</Text>
                        <View style={i18n.language === "ar" ? styles.action_ar : styles.action}>
                                        {/* <Ionicon name="call" color={Colors.PRIMARY} size={20} style={{ flex: 0.5 }} /> */}
                                        <Text style={{ flex: 0.7, fontWeight: 'bold' }}>{countryCode}</Text>
                                        <TouchableOpacity onPress={() => setShow(true)} style={{ flex: 0.4 }}>
                                            <Image source={Images.DropDown} style={{height:10,width:10}}  /> 
                                        </TouchableOpacity>
                                        <View style={{ width: 0, borderColor: Colors.Gray, borderWidth: 0.3, height: 30, marginRight: 10 }} ></View>
                                        <TextInput
                                        //   value={values.phone}
                                            style={styles.textPhoneNosty}
                                            keyboardType="phone-pad"
                                            maxLength={10}
                                            onChangeText={(val)=>{setPhoneNumber(val)}}
                                            placeholderTextColor={Colors.placeHolder}
                                            color={Colors.Sp_Text}
                                            placeholder={t("auth:PhoneNumber")}
                                        />
                                    </View>
                            <View style={{marginTop:20}}>
                            <Button
                            disabled={ phoneNumber.length === 10 ? false : true } 
                            onPress={() => pressHandler(countryCode, phoneNumber)}
                            showActivityIndicator={isLoading}
                            // disabled={isLoading}   
                            label={t("auth:Next")}
                            />
                            </View>

                        {/* <TouchableOpacity style={styles.sendCode} disabled={ phoneNumber.length === 10 ? false : true } onPress={() => pressHandler(countryCode, phoneNumber)}>
                            <Text style={styles.sendCodeText}>Send Code</Text>
                        </TouchableOpacity> */}
                        
                    </View>
                   
                </View>
                </KeyboardAwareScrollView>
            <CountryPicker
                show={show}
                style={{
                    modal:{
                        height:500,
                        backgroundColor:Colors.LIGHTER_GREY,
                    },
                    countryButtonStyles:{
                        height:80
                    },
                    flag: {
                        fontSize:30
                    },
                    dialCode: {
                        fontSize:20,
                        fontWeight:'bold'
                    },
                    countryName: {
                        fontSize:20
                    }
                }}
                pickerButtonOnPress={(item) => {
                    setCountryCode(item.dial_code);
                    setShow(false);
                }}
            />
           
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
        backgroundColor: Colors.White

    },
    screen1: {
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
    textPhoneNosty:{
        flex: 3.5,
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
    action_ar: {
        flexDirection: 'row-reverse',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.LIGHTER_GREY,
        paddingBottom: 10,
        alignItems: 'center',
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