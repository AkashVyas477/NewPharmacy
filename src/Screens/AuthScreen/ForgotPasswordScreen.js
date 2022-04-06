import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Formik } from 'formik'
import * as yup from 'yup'



const ForgotPasswordScreen = props => {
    return (

        <View style={styles.screen}>
            <KeyboardAwareScrollView>
                {/* Header start */}
                <View style={styles.header_sty}>
                    <View>
                        <TouchableOpacity onPress={() => (props.navigation.goBack())} >
                            <Image source={require('../../assets/Icons/Arrow/arrow.png')} style={styles.arrow} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.headerText} >
                        FORGOT PASSWORD
                    </Text>
                </View>
                {/* Header start */}
                {/* logo start */}
                <View style={styles.screen}>
                    <Image source={require('../../assets/Icons/AppIcon/forgotPLock.png')} style={styles.forgotLockImg} />
                </View>
                
                <View  >
                    <Text style={styles.text}>
                        Pleas Enter the Email Address Below, You will Receive a link to Create a new Password via Email.
                    </Text>

                </View>
                {/* logo end */}
                <View style={styles.mainWrapper} >
                    {/* Formik Start */}
                    <Formik

                        initialValues={{

                            email: '',
                            password: ''
                        }}
                        onSubmit={values => Alert.alert(JSON.stringify(values))}
                        validationSchema={yup.object().shape({

                            email: yup
                                .string()
                                .email()
                                .required('Email is required.'),
                        })}
                    >
                        {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                            <View >
                                <Text style={styles.formiText} >E-mail</Text>
                                <View style={styles.formiText_sty} >
                                    <TextInput
                                        value={values.email}
                                        // style={styles.customCss}
                                        onBlur={() => setFieldTouched('email')}
                                        onChangeText={handleChange('email')}
                                        placeholder="E-mail"
                                        keyboardType='email-address'
                                    />
                                    {touched.email && errors.email &&
                                        <Text style={styles.errorText}>{errors.email}</Text>
                                    }

                                </View>

                                {/* <Button 
                    color='#0DC314'
                    title='Send'
                    disabled={!isValid}
                    onPress={handleSubmit}
                    style={styles.Button}
                /> */}

                                <TouchableOpacity style={styles.touch} onPress={() => { props.navigation.navigate('Login') }} >
                                    <View style={styles.buttoncon}>
                                        <Text style={styles.Button}>
                                            Send
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        )}
                    </Formik>
                    {/* Formik End */}
                </View>
            </KeyboardAwareScrollView>
        </View>





    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        padding: 10,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    mainWrapper: {
        paddingHorizontal: 1,
        marginVertical: 20,
        width: '100%',
        marginVertical: 5,
        justifyContent: 'center',
        borderRadius: 25,
        padding: 5
    },
    Button: {
        color: 'white',
        textAlign: 'center',

    },
    buttoncon: {
        backgroundColor: '#0DC314',
        borderRadius: 10,
        height: 40,
        width: "100%",

        justifyContent: 'center'

    },
    header_sty:{ flexDirection: 'row', alignItems: 'center', padding: 10 },
    arrow:{ height: 20, width: 30 },
    headerText:{ fontSize: 25, color: 'black', paddingLeft: 50 },
    forgotLockImg:{ height: 300, width: "86%", marginTop: 20 },
    formiText:{ color: 'black', marginBottom: 1, paddingLeft: 3, paddingLeft:6,paddingRight:6 },
    formiText_sty:{ borderBottomColor: '#e8e8e8', borderBottomWidth: 1, paddingLeft:5, paddingRight:5  },
    errorText:{ fontSize: 11, color: 'red' },
    touch:{ padding: 20 },


});

export default ForgotPasswordScreen;