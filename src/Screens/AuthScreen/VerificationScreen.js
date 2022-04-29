import React,{useRef, useState} from 'react';
import {View, Text ,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView,Alert} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { postRequest , postFormDataRequest } from '../../Components/Helpers/ApiHelper';
import { useSelector } from 'react-redux';


import { Images,Colors } from '../../CommonConfig';
import { Header , Button } from '../../Components/Common';

const VerificationScreen = props =>{

const user = useSelector(state => state.Auth )
console.log(user)

const userFormData = new FormData();
// userFormData.append("role", user.role)
// userFormData.append("name",user.name)
// userFormData.append("email",user.email)
// userFormData.append("password",user.password )
// userFormData.append("gender", user.gender)
// userFormData.append("image", { uri: user.image.path, type: user.image.mime, name: })
// userFormData.append("phone_number", user.mobile)
// userFormData.append("store_name", user.store_name)
// userFormData.append("store_logo", user.store_logo)
// userFormData.append("license_id", user.license_id)
console.log(userFormData)
 
const countryCode = props.route.params.countryCode;
const phoneNumber = props.route.params.phoneNumber;

const [ otpValue, setOTPValue ] = useState('');



    const pressHandler = async(otpValue) => {
        const verifyOTP = {
            otpValue: otpValue,
            country_code: countryCode,
            phone_number: phoneNumber
        }
        const response = await postRequest('verifyOTP', verifyOTP);
        console.log(response);
        const resData = response.data;
        let errorMsg = 'Something went wrong!';
        if (response.success) {
          const registerData = {
            name: userFormData.name,
            email: userFormData.email,
            password:userFormData.password,
            gender: userFormData.gender,
            country_code: userFormData.countrycode,
            phone:userFormData.mobile,
            store_name:userFormData.store_name,
            // store_log:userFormData.store_log,
            license_id:userFormData.license_id
          }
            // CALL REGISTER API 
            const userResponse = await postRequest('register', registerData);
            console.log(userResponse);
            if (!userResponse.success) {
                if (userResponse.data.error === 'USER ALREADY EXISTS') {
                    errorMsg = "The credentials entered already exist. Please check the details.";
                } 
                Alert.alert("Error!", errorMsg, [{text: "Okay"}]);
            } else {
                //SUCCESS  then Route
                props.navigation.navigate('HomeScreen')
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
          onPress={() => pressHandler(otpValue)}
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
