import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-number-input';

import { Formik } from 'formik'
import PhoneNumberVAlidationSchema from '../../ForValidationSchema/PhoneNoValidationSchema';
import { Colors, Images } from '../../CommonConfig'
import { Header } from '../../Components/Common';


const PhoneNumberScreen = props => {
    const [phoneNumber, setphoneNumber] = useState('');
    const phoneInput = useRef(null);


    return (
        <View style={styles.screen}>
            <KeyboardAwareScrollView>
                <View >
                    {/* Logo And Text start */}
                    <View style={styles.logoText}>
                        {/* <View>
                            <TouchableOpacity onPress={() => (props.navigation.goBack())} >
                                <Image source={Images.Arrow} style={styles.arrow}/>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.phoneNoText} >
                            PHONE NUMBER
                        </Text> */}
                        <Header Title="PHONE NUMBER" />

                    </View>
                    <View style={styles.screen}>
                    <Image source={Images.PhoneNumberImg} style={styles.phoneNoImg} />
                    </View>
                    <View  >
                        <Text style={styles.text}>
                            We Will Send You A Verification Code To Verify Your Phone NUMBER
                        </Text>

                    </View>
                    {/* Logo And Text end */}
                    {/* Phone Number Start */}
                    <View>
                        <Formik
                            initialValues={{

                                mobile:'',
                            }}

                            onSubmit={values => Alert.alert(JSON.stringify(values))}
                            validationSchema={PhoneNumberVAlidationSchema}
                        >
                            {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (

                                <View>
                                    <Text style={styles.textPhoneNo}>Phone Number</Text>

                                    <PhoneInput
                                        ref={phoneInput}
                                        style={styles.customCss}
                                        defaultValue={phoneNumber}
                                        defaultCode="IN"
                                        layout="first"
                                        autoFocus
                                        containerStyle={styles.phoneContainer}
                                        textContainerStyle={styles.textInput}
                                        onChangeFormattedText={text => {
                                        setphoneNumber(text);
                                        }}
                                    />
                                </View>
                            )}

                        </Formik>
                    </View>
                </View>

                {/* Phone number end */}

                {/* Next Button start  */}
                <View style={styles.button_sty}>
                    <TouchableOpacity style={styles.button_sty} onPress={() => { props.navigation.navigate('VerificationScreen') }} >
                        <View style={styles.buttoncon}>
                            <Text style={styles.Button}>
                                Next
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Next Button end */}

            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    logoText:{ 
        flexDirection: 'row',
         alignItems: 'center',
         padding: 10
         },
    arrow:{ 
        height: 20,
         width: 30 
        },
        phoneNoText:{ 
            fontSize: 25, 
            color: Colors.Sp_Text, 
            paddingLeft: 65 
        },
    phoneNoImg:{ 
        height: 200,
         width: 190, 
         marginTop: 20 
        },
    textPhoneNo:{ 
            color: Colors.Sp_Text,
             marginBottom: 5
             },
    
    text: {
        padding: 20,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    Button: {
        color: 'white',
        textAlign: 'center',

    },
    buttoncon: {
        backgroundColor:Colors.PRIMARY,
        borderRadius: 10,
        height: 50,
        width: "100%",
        justifyContent: 'center',
    },
    button_sty:{
         width: "100%",
         },

    touch:{ 
        padding: 20 
    },
    customCss: {
        padding: 10,
        marginBottom: 12,
        borderBottomWidth:1,
        marginTop: 5,
        width: '100%',
        
    },
    phoneContainer: {
        width: '100%',
        height: 70,
        marginBottom: 15,
       
    },
    textInput: {
        paddingVertical: 0,
      
    },



});

export default PhoneNumberScreen;