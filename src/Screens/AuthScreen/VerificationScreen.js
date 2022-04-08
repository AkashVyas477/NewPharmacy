import React,{useRef} from 'react';
import {View, Text ,TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Images,Colors } from '../../CommonConfig';

const VerificationScreen = props =>{

  const pin1ref = useRef(null);
  const pin2ref = useRef(null);
  const pin3ref = useRef(null);
  const pin4ref = useRef(null);
    return(
        <View style={styles.screen}>
             <KeyboardAwareScrollView>
            {/* VERIFICATION  */}
            <View style={styles.Verification_sty}>
                <View>
                    <TouchableOpacity onPress={() => (props.navigation.goBack())} >
                        <Image source={Images.Arrow} style={styles.arrow_sty} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.VerificationTitle_sty} >
                   VERIFICATION CODE
                </Text>
            </View>
            {/* VERIFICATION  */}

            {/* logo */}
            <View style={styles.screen}>
                        <Image source={Images.Mobile} style={styles.logo_sty} />
                    </View>
                    <View>
                      <View >
                        <Text style={styles.text}> Waiting for Automatically detect and SMS sent to +7752773315  
                        <View>
                         <TouchableOpacity onPress={() => {props.navigation.navigate('PhoneNumberScreen')}} style={styles.wrongNo_sty} > 
                         <Text style={styles.Touchtext}> Wrong number ? </Text>
                         </TouchableOpacity>
                         </View>
                         </Text>
                         </View>
                    </View>
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
        </View>
            {/* Code input End */}

            {/* Next Button start  */}
            <View style={styles.buton_style}>
                    <TouchableOpacity style={styles.Touch} onPress={() => { props.navigation.navigate('HomeScreen') }} >
                        <View style={styles.buttoncon}>
                            <Text style={styles.Button}>
                                Verify Now
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Next Button end */}
            </KeyboardAwareScrollView>
        </View>
    );
};

const  styles=StyleSheet. create({

    buton_style:{ 
        width: "100%", 
    },
    Touch:{ 
        padding: 20
     },

    codeInPut:{
         flex: 0.75 
        },
    screen: {
        flex: 1,
        alignItems: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    text: {
        padding: 20,
        paddingHorizontal: 10,
        textAlign: 'center',
        alignItems:'center',
        justifyContent:'center'
    },
    Touchtext:{
        color: Colors.TouchText,
        
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
      // borderTopWidth:2,
      // borderLeftWidth:2,
      // borderRightWidth:2,
      // backgroundColor:'#0DC314',
      justifyContent: 'center',
      textAlign: 'center'
    },

    Verification_sty:{
        flexDirection: 'row',
         alignItems: 'center',
          marginTop: 5, 
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
                   marginTop: 20
                 },
                 wrongNo_sty:{fontSize:20},

});

export default VerificationScreen;
