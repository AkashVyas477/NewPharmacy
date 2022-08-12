import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image,TextInput, Alert,I18nManager  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import CountryPicker from 'react-native-country-codes-picker';

import * as registerAction from '../../Store/Actions/register';
import{ Colors, Images }from '../../CommonConfig';
import { Header, Button } from '../../Components/Common';
import { postRequest } from '../../Components/Helpers/ApiHelper';
import { useTranslation } from 'react-i18next';



const PhoneNumberScreen = props => {
const {t,i18n}=useTranslation()
    const params = props.route.params.data

    const [isLoading, setisLoading]=useState(false)
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');

    const [phoneNumber, setPhoneNumber ] = useState('');
    


    const pressHandler = async(countryCode, phoneNumber) => {
        setisLoading(true);
        const OTPData = {
            country_code: '+91',
            phone_number: phoneNumber,
            channel: "sms",
        
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
                                        <Text style={{ flex: 0.7, fontWeight: 'bold' }}>{countryCode}</Text>
                                        <TouchableOpacity onPress={() => setShow(true)} style={{ flex: 0.4 }}>
                                            <Image source={Images.DropDown} style={{height:10,width:10}}  /> 
                                        </TouchableOpacity>
                                        <View style={{ width: 0, borderColor: Colors.Gray, borderWidth: 0.3, height: 30, marginRight: 10 }} ></View>
                                        <TextInput
                                            style={styles.textPhoneNosty}
                                            keyboardType="phone-pad"
                                            maxLength={10}
                                            onChangeText={(val)=>{setPhoneNumber(val)}}
                                            placeholderTextColor={Colors.placeHolder}
                                            color={Colors.Sp_Text}
                                            placeholder={t("auth:PhoneNumber")}
                                        />
                                    </View>
                    </View>
                </View>
                </KeyboardAwareScrollView>
                <View >
                            <Button
                            disabled={ phoneNumber.length === 10 ? false : true } 
                            onPress={() => pressHandler(countryCode, phoneNumber)}
                            showActivityIndicator={isLoading}
                            label={t("auth:Next")}
                            />
                            </View>
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
    body: {
        flex: 3,

        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
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
});

export default PhoneNumberScreen;