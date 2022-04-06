import React, { useState } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Button,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView

} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Formik } from 'formik'
import * as yup from 'yup'


import AppIcon from '../../assets/Icons/AppIcon/appIcon.png';
import { SafeAreaView } from 'react-native-safe-area-context';


const LoginScreen = (props) => {

    const [tnc, setTnc] = useState(false);
    const tncHandler = () => {
        setTnc(state => !state);
    };
    const [tnceye, setTncEye] = useState(false);

    return (
        <KeyboardAwareScrollView>
            {/* Full screen */}
            <View style={styles.mainWrapper}>
                {/* Logo */}

                <View style={styles.logoScreen}>
                    <Image source={AppIcon} style={styles.logo} resizeMode="cover" />
                </View>

                {/* Logo */}

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

                        password: yup
                            .string()
                            .min(3, 'Password can not be less than 3 characters.')
                            .max(11, 'Password can not be more than 12 characters long.')
                            .required(),
                    })}
                >
                    {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (

                        <View >
                            {/* Inputs */}
                            <View>
                                <Text style={styles.text} >E-mail</Text>
                                <View style={{ borderBottomColor: '#e8e8e8', borderBottomWidth: 1, }} >
                                    <TextInput
                                        value={values.email}
                                        style={styles.customCss}
                                        onBlur={() => setFieldTouched('email')}
                                        onChangeText={handleChange('email')}
                                        placeholder="E-mail"
                                    />
                                </View>
                                {touched.email && errors.email &&
                                    <Text style={styles.errortext}>{errors.email}</Text>
                                }
                            </View>

                            <View style={{ padding: 10, paddingHorizontal: 2 }} >
                                <Text style={styles.text}  >Password</Text>
                                <View style={styles.password_sty}>
                                    <TextInput
                                        value={values.password}
                                        style={styles.customCss}
                                        placeholder="Password"
                                        onBlur={() => setFieldTouched('password')}
                                        onChangeText={handleChange('password')}
                                        secureTextEntry={tnceye ? true : false}
                                    />
                                    <TouchableOpacity onPress={() => setTncEye(!tnceye)} >
                                        {tnceye ? <Image source={require('../../assets/Icons/EyeIcon/activeEye.png')} style={styles.eyeIcon} /> :
                                            <Image source={require('../../assets/Icons/EyeIcon/inactiveEye.png')} style={styles.eyeIcon} />
                                        }
                                    </TouchableOpacity>
                                </View>

                                {touched.password && errors.password &&
                                    <Text style={styles.errortext}>{errors.password}</Text>
                                }

                            </View>
                            {/* Row merge start  */}
                            <View style={styles.checkbox_sty} >
                                <View style={styles.check}>
                                    {/* Check box and Remember me Start */}
                                    <TouchableOpacity onPress={tncHandler}>
                                        {tnc ?
                                            <Image source={require('../../assets/Icons/CheckBox/checkboxActive.png')} style={styles.checkIcon} /> :
                                            <Image source={require('../../assets/Icons/CheckBox/checkboxInactive.png')} style={styles.checkIcon} />
                                        }
                                    </TouchableOpacity>
                                    <Text style={styles.remberme}>
                                        Remember me
                                    </Text>
                                </View>
                                {/* Check box and Remember me End */}
                                <View>
                                    {/* Forgot passWord start */}
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('FORGOT PASSWORD') }} >
                                        <Text>
                                            Forgot Password?
                                        </Text>
                                    </TouchableOpacity>
                                    {/* Forgot passWord end */}
                                </View>
                                {/* Row merge end    */}
                            </View>

                            <View>

                                <View>
                                    {/* Login button start */}
                                    <View style={styles.button_sty}>
                                        <TouchableOpacity style={{ padding: 20 }} onPress={() => { props.navigation.navigate('Drawer', { screen:'Home' }) }} >
                                            <View style={styles.buttoncon}>
                                                <Text style={styles.Button}>
                                                    Login
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Login button end */}
                                </View>

                                {/* Or image start */}
                                <View style={styles.or_sty}>
                                    <Image source={require('../../assets/Icons/Image/or.png')} style={styles.orImg} />
                                </View>

                                {/* Or image end */}
                                <View style={styles.pharmacyUser_sty}>
                                    {/* Pharmacy user login start */}

                                    <View style={styles.container} >
                                        <TouchableOpacity onPress={() => { props.navigation.navigate('LOGIN AS PHARMACY USER') }}>
                                            <View style={styles.pharmacyUserBox}>
                                                <Image source={require('../../assets/Icons/Image/pharmacyUser.png')} style={styles.pharmacyUserImg} />

                                                <Text style={{ fontWeight: 'bold' }}>
                                                    PharmacyUser
                                                </Text>
                                                <Image source={require('../../assets/Icons/Arrow/rightArrow.png')} style={styles.arrow} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Pharmacy user login end */}
                                </View>
                                <View>
                                    {/* Sing Up start */}
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('RollSignUpScreen') }} >
                                        <View style={styles.signup_sty}>
                                            <Text style={styles.signup} > Don't have Account? <Text style={styles.sp_signup} > Sign up </Text>   </Text>
                                        </View>

                                    </TouchableOpacity>
                                    {/* Sing Up start */}
                                </View>

                            </View>
                            {/* Inputs */}
                        </View>
                    )}
                </Formik>
            </View>
            {/* Full screen */}
        </KeyboardAwareScrollView>

    );

};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        padding: 10,


    },
    logoScreen:{ alignItems: 'center' },

    logo: {
        width: '70%',
        height: 250,
        marginBottom: 20,


    },
    customCss: {

        // paddingVertical:10,
        // paddingHorizontal:10,
        // marginBottom: 10
    },
    mainWrapper: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingHorizontal: 1,
        marginVertical: 20,
        width: '100%',
        marginVertical: 5,
        justifyContent: 'center',
        borderRadius: 25,
    },
    container: {
        backgroundColor: 'white',
        padding: 10,
        paddingTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,


    },

    signup: {
        color: '#D7DBDD',
    
        fontSize: 20


    },
    sp_signup: {
        color: 'black',
       
        fontWeight: 'bold'

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
    text:{ color: 'black', marginBottom: 1, paddingLeft: 3 },
    errortext:{ 
        fontSize: 11, 
        color: 'red' 
    },
    password_sty:{ 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
     },
     eyeIcon:{ 
         height: 15, 
         width: 24, 
        },
     checkbox_sty:{ 
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 25 
    },
    check:{ 
        flexDirection: 'row',
         marginLeft: 2 
        },
        checkIcon:{ 
            height: 20, 
            width: 20 
        },
    remberme:{ 
        marginLeft: 4
     },
    button_sty:{ 
        width: "100%",
     },
    or_sty:{ 
        paddingBottom: 5, 
        paddingTop: 5 
    },
    orImg:{ 
        height: 20, 
        width: '100%',
         marginTop:5
        },
    pharmacyUser_sty:{ paddingTop: 20 },
    pharmacyUserBox:{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 10 },
    pharmacyUserImg:{ height: 60, width: 40, overflow: 'hidden' },
    arrow:{ height: 20, width: 20 },
    signup_sty:{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15},
});

export default LoginScreen;

