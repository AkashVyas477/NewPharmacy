import React,{useRef} from 'react';
import {View, Text ,TextInput, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { color } from 'react-native-reanimated';


import { Images,Colors } from '../../CommonConfig';
import { Header , Button } from '../../Components/Common';

const VerificationScreen = props =>{

  const countryCode = props.route.params.countryCode;
  const phoneNumber = props.route.params.phoneNumber;

  const pin1ref = useRef(null);
  const pin2ref = useRef(null);
  const pin3ref = useRef(null);
  const pin4ref = useRef(null);
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
                         <View style={{}}>
                           <View>
                           <Text style={styles.text}> Waiting for Automatically detect and SMS sent to {countryCode}-{phoneNumber}</Text>
                           <TouchableOpacity onPress={() => {props.navigation.navigate('PhoneNumberScreen')}} > 
                           <Text style={styles.Touchtext}> Wrong number ? </Text>
                           </TouchableOpacity>
                           </View>
                           <View>
                          
                          </View>
                         </View>
                      {/* Text  */}
                         
            {/* logo */}

            {/* Code input Start */}

          <View style={styles.codeInPut}>
        <View style={styles.optContainer}>
           <TextInput
          ref={pin1ref}
            autoFocus={true}
            maxLength={1}
            keyboardType='phone-pad'
          onKeyPress={({nativeEvent}) => {
          nativeEvent.key === 'Backspace' ? null : pin2ref.current.focus();
          }}
            style={styles.opt}
          />
          <TextInput
          ref={pin2ref}
          maxLength={1}
          keyboardType='numeric'
         onKeyPress={({nativeEvent}) => {
           nativeEvent.key === 'Backspace' ? pin1ref.current.focus() : pin3ref.current.focus();
       }}
            style={styles.opt}
          />
          <TextInput
          ref={pin3ref}
          maxLength={1}
          keyboardType='numeric'
          onKeyPress={({nativeEvent}) => {
            nativeEvent.key === 'Backspace' ? pin2ref.current.focus() : pin4ref.current.focus();
        }}
            style={styles.opt}
          />
          <TextInput
          ref={pin4ref}
          maxLength={1}
          keyboardType='numeric'
          onKeyPress={({nativeEvent}) => {
            nativeEvent.key === 'Backspace' ? pin3ref.current.focus() : pin4ref.current.blur();
        }}
            style={styles.opt}
          />
            </View>
            {/* Button */}
          
          </View>
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
    codeInPut:{
         flex: 0.75 , 
         paddingBottom:10
        },
    screen: {
        flex: 1,
    },
    text: {
        padding: 20,
        textAlign: 'center',
        alignItems:'center'
    },
    Touchtext:{
        color: Colors.TouchText,
        fontSize:15,
        textAlign:'center', 
      
    },
    Button: {
        color: Colors.ButtonTextColor,
        textAlign: 'center',
    },
    buttoncon: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        height: 50,
        width: "100%",
        justifyContent: 'center',
    },
    customCss: {
        padding: 10,
        marginBottom: 12,
        borderBottomWidth:1,
        marginTop: 5,
        width: '100%',
    },
    optContainer: {
      flex: 0.6,
      justifyContent: 'space-evenly',
      flexDirection: 'row'
    },
    opt:{
      fontWeight: '600',
      alignSelf: 'center',
      padding: 10,
      fontSize: 20,
      height: 55,
      borderBottomColor: 'grey',
      borderBottomWidth: 2,
      justifyContent: 'center',
      textAlign: 'center'
    },

    Verification_sty:{
          marginTop: 10, 
          padding: 10
    },
    arrow_sty:{
         height: 20,
          width: 30 
        },
        VerificationTitle_sty:{
             fontSize: 25, 
             color: Colors.Sp_Text,
              paddingLeft: 40,
             },
             logo_sty:{ 
                 height: 192,
                  width: 120,
                   marginTop: 20,
                 },
                //  wrongNo_sty:{fontSize:20,},

});

export default VerificationScreen;
