import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-number-input';

import { Formik } from 'formik'
import * as yup from 'yup'



const PhoneNumberScreen = props => {
    const [phoneNumber, setphoneNumber] = useState('');
    const phoneInput = useRef(null);


    return (
        <View style={styles.screen}>
            <KeyboardAwareScrollView>
                <View >
                    {/* Logo And Text start */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <View>
                            <TouchableOpacity onPress={() => (props.navigation.goBack())} >
                                <Image source={require('../assets/image/Icons/arrow.png')} style={{ height: 20, width: 30 }} />
                            </TouchableOpacity>
                        </View>

                        <Text style={{ fontSize: 25, color: 'black', paddingLeft: 65 }} >
                            PHONE NUMBER
                        </Text>

                    </View>
                    <View style={styles.screen}>
                        <Image source={require('../assets/image/Icons/phoneNumberImg.png')} style={{ height: 200, width: 190, marginTop: 20 }} />
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

                                mobile: '',
                            }}

                            onSubmit={values => Alert.alert(JSON.stringify(values))}
                            validationSchema={yup.object().shape({

                            mobile: yup
                            .number()
                            .max(10)
                            .required(),
                            })}
                        >
                            {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (

                                <View>
                                    <Text style={{ color: 'black', marginBottom: 5 }}>Phone Number</Text>

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
                <View style={{ width: "100%", }}>
                    <TouchableOpacity style={{ padding: 20 }} onPress={() => { props.navigation.navigate('VerificationScreen') }} >
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
        backgroundColor: '#0DC314',
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