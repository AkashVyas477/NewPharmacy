import React,{useRef, useState} from 'react';
import {View, Text ,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { postRequest , postFormDataRequest } from '../../Components/Helpers/ApiHelper';
import { useSelector } from 'react-redux';


import { Images,Colors } from '../../CommonConfig';
import { Header , Button } from '../../Components/Common';

const VerificationScreen = props =>{

const [ otpValue, setOTPValue ] = useState('');

const countryCode = props.route.params.countryCode;
const phoneNumber = props.route.params.phoneNumber;


    const pressHandler = async(otpValue) => {
        const verifyOTP = {
            otpValue: otpValue,
            country_code: countryCode,
            phone_number: phonenNmber
        }
        const response = await postRequest('verifyOTP', verifyOTP);
        const resData = response.data;
        let errorMsg = 'Something went wrong!';
        if (response.success) {
            // CALL REGISTER API 
            const regResponse = await postFormDataRequest('register', userFormData );
            console.log(regResponse);
            if (!regResponse.success) {
                if (regResponse.data.error === 'USER ALREADY EXISTS') {
                    errorMsg = "The credentials entered already exist. Please check the details.";
                } 
                Alert.alert("Error!", errorMsg, [{text: "Okay"}]);
            } else {
                //SUCCESS  then Route
                props.navigation.navigate('SignInScreen')
            }
        } else {
            if( resData.error ==="Invalid OTP entered!"){
                errorMsg = "Invalid OTP entered!"
            }
            Alert.alert("Error",errorMsg,[{text:"Okay"}])
        }
    }



    return(
        <View style={styles.screen}>
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
                           {/* <Text style={styles.Touchtext}> Wrong number ? </Text> */}
                           {/* <Text style={styles.text} >{countryCode}-{phoneNumber}<Text style={styles.Touchtext} > Wrong number ? </Text></Text> */}
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
                                // placeholderTextColor={styles.otptext}
                                onCodeFilled = {(code) => {setOTPValue(code)}}
                            />
                        </View>

                        {/* Resend Code */}
                        {/* <View style={{flex:0.5, flexDirection:'row', justifyContent:'center'}}>
                            <Text style={styles.resend_code}>Didn't Get the Code? </Text>
                            <TouchableOpacity onPress={() => {props.navigation.navigate('NumberVerificationScreen')}} >
                                <Text style={styles.resend}>Resend Code</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>

                    {/* <View style={{flex:0.5}}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.verifyNow} onPress={() => pressHandler(otpValue)}>
                            <Text style={styles.verifyNowText}>Verify Now</Text>
                        </TouchableOpacity>
                    </View> */}

                </View>
            </View>



          {/* Button */}
          <Button
          label="Verify Now"
          onPress={() => { props.navigation.navigate('HomeScreen') }}
        />
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
  // otptext:{
  //   color: Colors.Sp_Text
  // },


  body: {
    flex: 3,
    // backgroundColor:Colors.White,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 35,
    paddingTop: 30,
    justifyContent: 'space-between'
  },

});

                



export default VerificationScreen;
