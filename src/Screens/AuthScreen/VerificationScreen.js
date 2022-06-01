import React,{useRef, useState} from 'react';
import {View, Text ,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView,Alert,StatusBar} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { postRequest , postFormDataRequest } from '../../Components/Helpers/ApiHelper';
import { useSelector } from 'react-redux';


import { Images,Colors } from '../../CommonConfig';
import  Header  from '../../Components/Common/Header';
import  Button  from '../../Components/Common/Button';
// import { Header , Button } from '../../Components/Common';
import { useRoute } from '@react-navigation/native';

const VerificationScreen = props =>{

const user = useSelector(state => state.Auth)
// console.log(user)

 
const countryCode = props.route.params.countryCode;
const phoneNumber = props.route.params.phoneNumber;

const [ otp, setOTPValue ] = useState('');

    const pressHandler = async(otp) => {
        const verifyOTP = {
            otp: otp,
            country_code: countryCode,
            phone_number: phoneNumber,
            // channel:"sms"
        }
   
        const response = await postRequest('verifyOTP', verifyOTP);
        // console.log(response);
        const resData = response.data;
        let errorMsg = 'Something went wrong!';
        if (response.success) {
          const registerData = user.role == '1' ? {
            role:user.role,
            name: user.name,
            email: user.email,
            password:user.password,
            gender: user.gender,
            country_code: user.country_code,
            phone:user.phone_number,
          } :
          {
            role:user.role,
            name: user.name,
            email: user.email,
            password:user.password,
            gender: user.gender,
            country_code: user.country_code,
            phone:user.phone_number,
            storeName:user.storeName,
            // store_log:user.store_log,
            licenseId:user.licenseId
          }
          console.log(registerData,'register Data');
            // CALL REGISTER API 
            const registerResponse = await postRequest('register', registerData);
            console.log(registerResponse);
            if (!registerResponse.success) {
                if (registerResponse.data.error === 'USER ALREADY EXISTS') {
                    errorMsg = "The credentials entered already exist. Please check the details.";
                } 
                Alert.alert("Error!", errorMsg, [{text: "Okay"}]);
            } else {
                //SUCCESS  then Route
                props.navigation.navigate('Drawer', { screen: 'Home' })
            }
         } 
         else {
            if( resData.error ==="Invalid OTP entered!"){
                errorMsg = "Invalid OTP entered!"
            }
            Alert.alert("Error",errorMsg,[{text:"Okay"}])
        }
    }



    return(
        <View style={styles.screen}>
           <StatusBar backgroundColor={Colors.PRIMARY} barStyle='light-content' />
          <ScrollView>
            {/* Header  */}
            <View style={styles.header1}>
            <Header 
            Title="VERIFICATION CODE"
            onPress={() => props.navigation.goBack()}
            />
            </View>
            {/* Header end */}

            {/* logo */}
                      <View style={{alignItems:'center'}} >
                        <Image source={Images.Mobile} style={styles.logo_sty} />
                      </View>
                      {/* Text  */}
                         <View >
                           <View>
                           <Text style={styles.text}> Waiting for Automatically detect and SMS sent to </Text>
                           <TouchableOpacity onPress={() => {props.navigation.navigate('PhoneNumberScreen')}} > 
                           <Text style={styles.text} >{countryCode}-{phoneNumber}<Text style={styles.Touchtext} > Wrong number ? </Text></Text>
                           </TouchableOpacity>
                           </View>
                         </View>
                      {/* Text  */}   
            {/* logo */}

            {/* Code input Start */}

            <View style={{flex:3}}>
                <View style={styles.body}>
                    <View style={{flex:1}}>
                        <View style={{flex:0.5}}>
                            <OTPInputView 
                                pinCount={4}
                                autoFocusOnLoad
                                codeInputFieldStyle = {styles.OtpInputCellUnfocused }
                                codeInputHighlightStyle ={styles.OtpInputCell}
                                placeholderCharacter="-"
                                onCodeFilled = {(code) => {setOTPValue(code)}}
                            />
                        </View>
                    </View>
                </View>
            </View>
          {/* Button */}
          <View style={{padding:20}} >
          <Button
          label="Verify Now"
          onPress={() => pressHandler(otp)}
        />
        </View>
          </ScrollView>
      </View>
    );
};
const  styles=StyleSheet. create({
  header1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    padding: 10
  },
  screen: {
    flex: 1,
  },
  text: {

    textAlign: 'center',
    alignItems: 'center'
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
  // resend: {
  //   color: Colors.ORANGE,
  //   fontWeight: 'bold',
  //   fontSize: 18
  // },
  // resend_code: {
  //   fontWeight: 'bold',
  //   color: Colors.GREY,
  //   fontSize: 18
  // },

  OtpInputCell: {
    backgroundColor: Colors.White,
    borderRadius: 5,
    borderWidth: 0,
    height: 60,
    width: 60
  },
  OtpInputCellUnfocused: {
    backgroundColor: Colors.PRIMARY ,
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
