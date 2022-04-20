import React, { useState,useEffect } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import { Images,Colors,Constants } from '../../CommonConfig';
import {CheckBox,EyeButton,Button} from '../../Components/Common';
import { postRequest } from '../../Components/Helpers/ApiHelper';
import messaging from '@react-native-firebase/messaging';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginValidationSchema from '../../ForValidationSchema/LoginValidationSchema'

import { Formik } from 'formik'



const LoginScreen = (props) => {

    let deviceToken;
    useEffect(() => {
        // Get the device token
        messaging()
          .getToken()
          .then(token => {
            deviceToken = token
          });
        },[])
        
    const [tnc, setTnc] = useState(false);
    const tncHandler = () => { 
        setTnc(state => !state);
    };
    const [tnceye, setTncEye] = useState(false);

    const [isLoading, setisLoading]=useState(false)
    const onPressLogin = async (values) => {
        setisLoading(true);
        const data = {
          email: values.email.toLowerCase(),
          password: values.password,
          device_token:deviceToken
        };
            const response = await postRequest('login', data);
            console.log(response)
            if(!response.success) {
                setisLoading(false);
                let errorMessage = "Something went wrong!";
                if(response.data.ErrorMessage === "User not exists!"){
                    errorMessage = "User does not exist!"
                }
                if(response.data.ErrorMessage === "Login Failed!") {
                    errorMessage = "Invalid Password!"
                }
                Alert.alert('Error',errorMessage,[{text:"Okay"}])
            } else {
                setisLoading(false);
                props.navigation.navigate('Drawer', { screen: 'Home' }) 
            }
    }
    

    return (
        <KeyboardAwareScrollView>
            {/* Full screen */}

            <View style={styles.mainWrapper}>
                {/* Logo */}
                <View style={styles.logoScreen}>
                    <Image source={Images.AppIcon} style={styles.logo} resizeMode="cover" />
                </View>
                {/* Logo */}

                <Formik

                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={onPressLogin}
                    validationSchema={LoginValidationSchema}
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
                                        keyboardType='email-address'
                                        autoCapitalize='none'

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
                                        secureTextEntry={tnceye ? false : true}
                                        autoCapitalize='none'

                                    />
                                    {/* <TouchableOpacity onPress={() => setTncEye(!tnceye)} >
                                        {tnceye ? <Image source={require('../../Assets/Icons/EyeIcon/activeEye.png')} style={styles.eyeIcon} /> :
                                            <Image source={require('../../Assets/Icons/EyeIcon/inactiveEye.png')} style={styles.eyeIcon} />
                                        }
                                    </TouchableOpacity> */}
                                     <EyeButton
                                       tnceye={tnceye}
                                       onEyePress={ () => {setTncEye(!tnceye)} }/>
                                </View>

                                {touched.password && errors.password &&
                                    <Text style={styles.errortext}>{errors.password}</Text>
                                }

                            </View>
                            {/* Row merge start  */}
                            <View style={styles.checkbox_sty} >
                                <View style={styles.check}>
                                    {/* Check box and Remember me Start */}
                                    <CheckBox/>
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
                                        <Button 
                                        showActivityIndicator={isLoading}
                                        label="Login"
                                        onPress={handleSubmit} 
                                        disabled={!isValid|| isLoading}   
                                        />
                                    </View>
                                    {/* Login button end */}
                                </View>

                                {/* Or image start */}
                                <View style={styles.or_sty}>
                                    <Image source={Images.or} style={styles.orImg} />
                                </View>

                                {/* Or image end */}
                                <View style={styles.pharmacyUser_sty}>
                                    {/* Pharmacy user login start */}

                                    <View style={styles.container} >
                                        <TouchableOpacity onPress={() => { props.navigation.navigate('LOGIN AS PHARMACY USER') }}>
                                            <View style={styles.pharmacyUserBox}>
                                                <Image source={Images.PharmacyUser} style={styles.pharmacyUserImg} />
                                                <Text style={{ fontWeight: 'bold' }}>
                                                    PharmacyUser
                                                </Text>
                                                <Image source={Images.RightArrow} style={styles.arrow} />
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


                                    {/* Remove this after completing desing */}
                <Button
                    label="Skip Login"
                    onPress={() => { props.navigation.navigate('Drawer', { screen: 'Home' }) }}
                />
                                     {/* Remove this after completing desing */}
           
           
           
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
    logoScreen: { alignItems: 'center' },

    logo: {
        width: '70%',
        height: 250,
        marginBottom: 20,


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
        backgroundColor: Colors.backgroundColor,
        padding: 10,
        paddingTop: 20,
        shadowColor: Colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,


    },

    signup: {
        color: Colors.Gray,
        fontSize: 20


    },
    sp_signup: {
        color: Colors.Sp_Text,
        fontWeight: 'bold'

    },
    Button: {
       color: Colors.ButtonTextColor,
        textAlign: 'center',

    },
    buttoncon: {
        backgroundColor:Colors.PRIMARY,
        borderRadius: 10,
        height: 50,
        width: "100%",
        justifyContent: 'center',
    },
    text: {
        color: Colors.Sp_Text,
        marginBottom: 1,
        paddingLeft: 3
    },
    errortext: {
        fontSize: 11,
        color: 'red'
    },
    password_sty: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomColor: Colors.borderBottomColor,
        borderBottomWidth: 1,
    },
    eyeIcon: {
        height: 15,
        width: 24,
    },
    checkbox_sty: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25
    },
    check: {
        flexDirection: 'row',
        marginLeft: 2
    },
    checkIcon: {
        height: 20,
        width: 20
    },
    remberme: {
        marginLeft: 4
    },
    button_sty: {
        width: "100%",
    },
    or_sty: {
        paddingBottom: 5,
        paddingTop: 5
    },
    orImg: {
        height: 20,
        width: '100%',
        marginTop: 5
    },
    pharmacyUser_sty: { paddingTop: 20 },
    pharmacyUserBox: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 10 },
    pharmacyUserImg: { height: 60, width: 40, overflow: 'hidden' },
    arrow: { height: 20, width: 20 },
    signup_sty: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 },
});

export default LoginScreen;