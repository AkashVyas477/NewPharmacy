import React, { useRef, useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, StatusBar, ActivityIndicator } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { postRequest, postFormDataRequest, } from '../../Components/Helpers/ApiHelper';
import { useSelector } from 'react-redux';
import { Images, Colors } from '../../CommonConfig';
import { Header , Button } from '../../Components/Common';
import { CommonActions, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { elementsThatOverlapOffsets } from 'react-native/Libraries/Lists/VirtualizeUtils';
import { useTranslation } from 'react-i18next';
import messaging from '@react-native-firebase/messaging';
import { set } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const VerificationScreen = props => {
  const {t}=useTranslation()
  const [isLoading, setisLoading]=useState(false)
  const [ loading, setLoading ] = useState(false)

  useEffect( () => {
    messaging().getToken().then( async(token) => { 
        console.log("\n\n Token: ",token)
        await AsyncStorage.setItem('deviceToken', token)
     });
},[])
  const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const ResendpressHandler = async(countryCode, phoneNumber) => {
    setisLoading(true)
    const OTPData = {
        country_code: '+91',
        phone_number: phoneNumber,
        channel: "sms",
    }
    const response = await postRequest('generateOTP', OTPData);
    console.log(response)
    if (response.success) {
        Toast.show("OTP sent Successfuly")
        setisLoading(false)
    } else {}
}


  const countryCode = props.route.params.countryCode;
  const phoneNumber = props.route.params.phoneNumber;
  const data = props.route.params.params
  const [otp, setOTPValue] = useState('');
  const pressHandler = async (otp) => {
    setLoading(true)
    const verifyOTP = {
      otp: otp,
      country_code: countryCode,
      phone_number: phoneNumber,
    }
    const response = await postRequest('verifyOTP', verifyOTP);
    const resData = response.data;
    let errorMsg = 'Something went wrong!';
    if (response.success) {
      const user = new FormData();
      user.append('image', { 
        uri: data.selectedImage.path, 
        type: data.selectedImage.mime, 
        name: makeid(10)
      })
      user.append('role', data.role)
      user.append('name', data.username)
      user.append('email', data.email)
      user.append('password', data.password)
      user.append('gender',data.gender)
      user.append("country_code", countryCode)
      user.append("phone", phoneNumber)
      user.append('store_name',data.storeName)
      user.append('license_id',data.licenseId)
      console.log("FormData\n",user)

      const res = await fetch('https://mobile-pharmacy.herokuapp.com/register',{
        method: 'POST',
        body: user,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
     const  registerResponse = await res.json()
      if(registerResponse.message==="Customer created successfully" || registerResponse.message==="Pharmacist created successfully"){
        if(data.role ===2){
          props.navigation.navigate('AddNewAddress')
        }
        const loginData={
          email:data.email.toLowerCase(),
          password:data.password,
          device_token: (await AsyncStorage.getItem('deviceToken'))
        }
        console.log("login data \n",loginData)
        const response = await postRequest('login',loginData);
        const resData = response.data
        if(response.success){
          try{
                      await AsyncStorage.setItem('role',resData.user.role.toString())
                      await AsyncStorage.setItem('token', resData.token)
                      await AsyncStorage.setItem('refreshToken', resData.refreshToken)
                      await AsyncStorage.setItem('user', JSON.stringify(resData.user))
                      await AsyncStorage.setItem('isLogin', "1")
          }catch(error){
            console.log("error\n",error)
          }
          if (resData.user.role ===1){
            props.navigation.dispatch(
              CommonActions.reset({
                index:0,
                routes:[{name:'CustomerDrawer'}]
              })
            )
            setLoading(false)
          }
        }else{
          if (resData.ErrorMessage === "User already exists!"){
            Toast.show(" User does not exist! ");
            setLoading(false)
          }else if(resData.ErrorMessage === "Invalid Password!"){
            Toast.show("Incorrect Password")
            setLoading(false)
          }
        }
      }
      else{
        console.log("regisrespones\n",registerResponse)
        setLoading(false)
      }
    } 
    else {
      if (resData.ErrorMessage === "Invalid OTP entered!") {
        errorMsg = "Invalid OTP entered!"
      }
      Alert.alert("Error", errorMsg, [{ text: "Okay" }])
      setLoading(false)
    }
  }

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={Colors.PRIMARY} barStyle='light-content' />
        <View style={styles.header1}>
          <Header
            Title={t("auth:VERIFICATIONCODE")}
            onPress={() => props.navigation.goBack()}
          />
        </View>
        <KeyboardAwareScrollView>

        <View style={{ alignItems: 'center' }} >
          <Image source={Images.Mobile} style={styles.logo_sty} />
        </View>
        {/* Text  */}
          <View style={{padding:10}}>
            <Text style={styles.text}> {t('auth:WaitingforAutomaticallydetectandSMSsentto')} </Text>
            <TouchableOpacity onPress={() => { props.navigation.navigate('PhoneNumberScreen') }} >
              <Text style={styles.text} >{countryCode}-{phoneNumber}<Text style={styles.Touchtext} > {t('auth:Wrongnumber')}</Text></Text>
            </TouchableOpacity>
          </View>
        
        {/* Text  */}

        {/* Code input Start */}
        <View style={{ flex: 3,justifyContent:'space-between' }}>
          <View style={styles.body}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 0.5 }}>
                <OTPInputView
                  pinCount={4}
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.OtpInputCellUnfocused}
                  codeInputHighlightStyle={styles.OtpInputCell}
                  placeholderCharacter="-"
                  onCodeFilled={(code) => { setOTPValue(code) }}
                />
              </View>
            </View>
          </View>
        </View>
        </KeyboardAwareScrollView>
         {/* Button */}
  <View style={styles.Button}>
          <Button
            label="Verify Now"
            onPress={() => pressHandler(otp)}
            showActivityIndicator={loading}
          />
      <View style={{flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.resend_code}>Didn't Get the Code? </Text>
          <TouchableOpacity onPress={() => ResendpressHandler(countryCode, phoneNumber)} 
          disabled={loading}
          >
            <Text style={styles.resend}>Resend Code</Text>
          </TouchableOpacity>
        </View>
        </View>
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
  screen: {
    flex: 1,
  },
  Button:{
    padding:15
  },
  text: {
    textAlign: 'center',
    alignItems: 'center'
  },
  resend:{
    color:Colors.PRIMARY,
    fontWeight:'bold',
    fontSize: 18
},
  resend_code:{
    fontWeight:'bold',
    color:Colors.Gray,
    fontSize:18
},
  Touchtext: {
    color: Colors.TouchText,
    fontSize: 15,
    textAlign: 'center',
  },
  logo_sty: {
    height: 192,
    width: 120,
    marginTop: 20,
  },
  OtpInputCell: {
    backgroundColor: Colors.White,
    borderRadius: 5,
    borderWidth: 0,
    height: 60,
    width: 60
  },
  OtpInputCellUnfocused: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    borderWidth: 0,
    height: 60,
    width: 60
  },
  body: {
    flex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 35,
    paddingTop: 30,
    justifyContent: 'space-between'
  },

});





export default VerificationScreen;
