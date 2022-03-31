import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Formik } from "formik";
import * as yup from 'yup';

const CustomerSignupScreen = props => {

    const [tnc, setTnc] = useState(false);
    const tncHandler = () => {
        setTnc(state => !state);
    };
    const [male, setMale] = useState(false);
    const maleHandler = () => {
        setMale(state => !state);
    setFemale(false);
    };

    const [female, setFemale] = useState(false);
    const femaleHandler = () => {
        setFemale(state => !state);
        setMale(false);
    };
    
    const [tnceye, setTncEye] = useState(false);
    const [tnceyeconf, setTncEyeconf] = useState(false);
    


    return (

        <KeyboardAwareScrollView>
        <View style={styles.screen}>

            {/* SignUp  */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, padding: 10 }}>
                <View>
                    <TouchableOpacity onPress={() => (props.navigation.goBack())} >
                        <Image source={require('../assets/image/Icons/arrow.png')} style={{ height: 20, width: 30 }} />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 25, color: 'black', paddingLeft: 115, }} >
                    Sign Up
                </Text>
            </View>
            {/* SignUp  */}
            {/* Profile */}
            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
                <View >
                    <Image source={require('../assets/image/Icons/signupPlaceholder.png')} style={{ height: 125, width: 125 }} />
                </View>
                <View>
                    <TouchableOpacity style={styles.addIcon}>
                        <Image source={require('../assets/image/Icons/addIcon.png')} style={{ height: 50, width: 50 }} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Profile */}
            {/* Formik */}
            <View style={{ padding: 10 }} >
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        // gender: '',
                        password: ''
                    }}
                    onSubmit={values => Alert.alert(JSON.stringify(values))}
                    validationSchema={yup.object().shape({
                        username: yup
                            .string()
                            .required('Username is required.'),
                        email: yup
                            .string()
                            .email()
                            .required('Email is required.'),
                        // gender: yup
                        //     .number()
                        //     .max(10)
                        //     .required(),
                        password: yup
                            .string()
                            .min(3, 'Password can not be less than 3 characters.')
                            .max(11, 'Password can not be more than 12 characters long.')
                            .required(),
                        passwordConfirm: yup
                            .string()
                            .label('Password Confirm')
                            .required()
                            .oneOf([yup.ref('password')], 'Passwords does not match'),
                    })}
                >
                    {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                        <View >
                            {/* Input Text */}
                            <View>
                                <Text style={styles.main} > Username </Text>
                                <TextInput
                                    value={values.username}
                                    style={styles.customCss}
                                    onBlur={() => setFieldTouched('username')}
                                    onChangeText={handleChange('username')}
                                    placeholder="Username"

                                />
                                {touched.username && errors.username &&
                                    <Text style={{ fontSize: 11, color: 'red' }}>{errors.username}</Text>
                                }
                                <Text style={styles.main} > Email </Text>
                                <TextInput
                                    value={values.email}
                                    style={styles.customCss}
                                    onBlur={() => setFieldTouched('email')}
                                    onChangeText={handleChange('email')}
                                    placeholder="E-mail"
                                    keyboardType='email-address'
                                />
                                {touched.email && errors.email &&
                                    <Text style={{ fontSize: 11, color: 'red' }}>{errors.email}</Text>
                                }
                                
                                <View>
                                    {/* Gender */}
                                <Text style={styles.main} > Gender </Text>
                                <View>
                                    {/* male button */}
                                       <View style={{flexDirection:'row' ,justifyContent:'space-evenly'}}>
                                           <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <TouchableOpacity onPress={maleHandler} >
                                           { !male ?<Image source={require('../assets/image/Icons/roundCheckInactive.png')} style={{ height: 28, width: 28, }} />
                                            :
                                                <Image source={require('../assets/image/Icons/roundCheckActive.png')} style={{ height: 28, width: 28, }} />
                                            }
                                            </TouchableOpacity>
                                            <Text style={{paddingLeft:5}} >Male </Text> 
                                            </View> 
                                    {/* male button  end*/}
                                       {/* Female button */}
                                            <View style={{flexDirection:'row' ,justifyContent:'space-evenly'}}>
                                           <View style={{flexDirection:'row', alignItems:'center'}}>
                                            <TouchableOpacity  onPress={femaleHandler}>
                                           { !female ?<Image source={require('../assets/image/Icons/roundCheckInactive.png')} style={{ height: 28, width: 28, }} />
                                            :
                                                <Image source={require('../assets/image/Icons/roundCheckActive.png')} style={{ height: 28, width: 28, }} />
                                            }
                                            </TouchableOpacity>
                                            <Text style={{paddingLeft:5}} >Female</Text>
                                            </View>
                                       {/* Female button */}
                                       </View>
                                        </View> 
                                 </View>  
                                  {/* Gender end */}  
                                </View>

                                <View>
                                    <Text style={styles.main} > Password </Text>
                                    <View  style={{ flexDirection: 'row', justifyContent:'space-evenly',alignItems: 'center'}}>
                                        <TextInput
                                            value={values.password}
                                            style={styles.customCss}
                                            placeholder="Password"
                                            onBlur={() => setFieldTouched('password')}
                                            onChangeText={handleChange('password')}
                                            secureTextEntry={tnceye ? true : false}
                                        />
                                        <TouchableOpacity onPress={() => setTncEye(!tnceye)} >
                                            {tnceye ? <Image source={require('../assets/image/Icons/activeEye.png')} style={{ height: 15, width: 24, }} /> :
                                                <Image source={require('../assets/image/Icons/inactiveEye.png')} style={{ height: 15, width: 24, }} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    {touched.password && errors.password &&
                                        <Text style={{ fontSize: 11, color: 'red' }}>{errors.password}</Text>
                                    }
                                </View>
                                    <View>
                                <Text style={styles.main} > Confirm Password </Text>
                                <View  style={{ flexDirection: 'row', justifyContent:'space-evenly',alignItems: 'center'}}>
                                <TextInput
                                    value={values.passwordConfirm}
                                    style={styles.customCss}
                                    placeholder='confirm Password'
                                    onBlur={() => setFieldTouched('passwordConfirm')}
                                    onChangeText={handleChange('passwordConfirm')}
                                    secureTextEntry={tnceyeconf ? true : false}
                                />
                                <TouchableOpacity onPress={() => setTncEyeconf(!tnceyeconf)} >
                                    {tnceyeconf ? <Image source={require('../assets/image/Icons/activeEye.png')} style={{ height: 15, width: 24, }} /> :
                                        <Image source={require('../assets/image/Icons/inactiveEye.png')} style={{ height: 15, width: 24, }} />
                                    }
                                </TouchableOpacity>
                                </View>
                                {touched.passwordConfirm && errors.passwordConfirm &&
                                    <Text style={{ fontSize: 11, color: 'red' }} >{errors.passwordConfirm}</Text>
                                }
                                </View>
                            </View>
                            {/* Terms & conditions */}
                            <View  >
                                <View style={{ flexDirection: 'row',marginTop:15, marginBottom: 15, }} >
                                    <TouchableOpacity onPress={tncHandler} >
                                        {tnc ? <Image source={require('../assets/image/Icons/checkboxActive.png')} style={{ height: 20, width: 20 }} /> :
                                            <Image source={require('../assets/image/Icons/checkboxInactive.png')} style={{ height: 20, width: 20 }} />}
                                    </TouchableOpacity>
                                    <View style={{}}>
                                        <Text style={styles.tandc} >Accept to<Text style={styles.sp_tandc} >Terms and Conditions</Text> and <Text style={styles.sp_tandc}>Privacy Policy</Text>
                                            <Text style={styles.tandc} > for this app</Text></Text>
                                    </View>
                                </View>
                            </View>
                            {/* Terms & conditions */}
                            {/* Next Button */}
                            <View>
                                <TouchableOpacity onPress={() => {
                                    props.navigation.navigate('PhoneNumberScreen')
                                }}>
                                    <View style={styles.buttoncon}>
                                        <Text style={styles.Button}> Next </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: "100%", marginTop: 10 }}>
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('Login') }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={styles.signup} > Already have an Account? <Text style={styles.sp_signup} > Login </Text>   </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/* Next Button */}
                                {/* Input Text */}
                            </View>
                        </View>

                    )}
                </Formik>
            </View >
            {/* Formik */}
        </View >
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },
    addIcon: {
        left: Dimensions.get('window').width * 0.12,
        bottom: Dimensions.get('window').width * 0.1,
    },
    customCss: {
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
        width: '100%',
        paddingBottom:2,
        justifyContent: 'space-evenly'
    },
    main: {
        color: 'black',
        marginTop: 20

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
        justifyContent: 'center',
    },
    text: {
        padding: 10,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    tandc: {
        color: 'black'

    },
    sp_tandc: {
        color: 'blue'

    },
    signup: {
        color: 'gray',
        marginBottom: 50,
        fontSize: 20,



    },
    sp_signup: {
        color: 'black',
        marginBottom: 50

    }
});

export default CustomerSignupScreen;