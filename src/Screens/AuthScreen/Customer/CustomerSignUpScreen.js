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
            <View style={styles.header}>
                <View>
                    <TouchableOpacity onPress={() => (props.navigation.goBack())} >
                        <Image source={require('../../../assets/Icons/Arrow/arrow.png')} style={styles.arrow} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerText} >
                    Sign Up
                </Text>
            </View>
            {/* SignUp  */}
            {/* Profile */}
            <View style={styles.profile}>
                <View >
                    <Image source={require('../../../assets/Icons/Image/signupPlaceholder.png')} style={styles.profileImg} />
                </View>
                <View>
                    <TouchableOpacity style={styles.addIcon}>
                        <Image source={require('../../../assets/Icons/Edit-Add/addIcon.png')} style={styles.addIconImg} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Profile */}
            {/* Formik */}
            <View style={styles.Formik_sty} >
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: ''
                    }}
                    onSubmit={values => Alert.alert(JSON.stringify(values))}
                    validationSchema={SignUpValidationSchema}
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
                                    <Text style={styles.errortext}>{errors.username}</Text>
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
                                    <Text style={styles.errortext}>{errors.email}</Text>
                                }
                                
                                <View >
                                    {/* Gender */}
                                <Text style={styles.main} > Gender </Text>
                                <View>
                                    {/* male button */}
                                       <View style={styles.gender_sty}>
                                           <View style={styles.gendercheck}>
                                           
                                            <TouchableOpacity onPress={maleHandler} >
                                           { !male ?<Image source={require('../../../assets/Icons/CheckBox/roundCheckInactive.png')} style={styles.checkIcon} />
                                            :
                                                <Image source={require('../../../assets/Icons/CheckBox/roundCheckActive.png')}style={styles.checkIcon}  />
                                            }
                                            </TouchableOpacity>
                                            <Text style={styles.genderText} >Male </Text> 
                                            </View> 
                                    {/* male button  end*/}
                                       {/* Female button */}
                                       <View style={styles.gendercheck}>
                                           <View style={styles.femaleGender}>
                                            <TouchableOpacity  onPress={femaleHandler}>
                                           { !female ?<Image source={require('../../../assets/Icons/CheckBox/roundCheckInactive.png')} style={styles.checkIcon}  />
                                            :
                                                <Image source={require('../../../assets/Icons/CheckBox/roundCheckActive.png')} style={styles.checkIcon} />
                                            }
                                            </TouchableOpacity>
                                            <Text style={styles.genderText} >Female</Text>
                                            </View>
                                       {/* Female button */}
                                       </View>
                                        </View> 
                                 </View>  
                                  {/* Gender end */}  
                                </View>
                                    {/* Password Start */}  
                                <View>
                                    <Text style={styles.main} > Password </Text>
                                    <View  style={styles.password_sty}>
                                        <TextInput
                                            value={values.password}
                                            style={styles.customCss}
                                            placeholder="Password"
                                            onBlur={() => setFieldTouched('password')}
                                            onChangeText={handleChange('password')}
                                            secureTextEntry={tnceye ? true : false}
                                        />
                                        <TouchableOpacity onPress={() => setTncEye(!tnceye)} style={styles.eye_sty} >
                                            {tnceye ? <Image source={require('../../../assets/Icons/EyeIcon/activeEye.png')} style={styles.eyeIcon}  /> :
                                                <Image source={require('../../../assets/Icons/EyeIcon/inactiveEye.png')} style={styles.eyeIcon}  />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    {touched.password && errors.password &&
                                        <Text style={styles.errortext}>{errors.password}</Text>
                                    }
                                </View>
                                    <View  >
                                <Text style={styles.main} > Confirm Password </Text>
                                <View  style={styles.password_sty}>
                                <TextInput
                                    value={values.passwordConfirm}
                                    style={styles.customCss}
                                    placeholder='confirm Password'
                                    onBlur={() => setFieldTouched('passwordConfirm')}
                                    onChangeText={handleChange('passwordConfirm')}
                                    secureTextEntry={tnceyeconf ? true : false}
                                />
                                <TouchableOpacity onPress={() => setTncEyeconf(!tnceyeconf)} style={styles.eye_sty} >
                                    {tnceyeconf ? <Image source={require('../../../assets/Icons/EyeIcon/activeEye.png')} style={styles.eyeIcon} /> :
                                        <Image source={require('../../../assets/Icons/EyeIcon/inactiveEye.png')}style={styles.eyeIcon}  />
                                    }
                                </TouchableOpacity>
                                </View>
                                {touched.passwordConfirm && errors.passwordConfirm &&
                                    <Text style={styles.errortext}>{errors.passwordConfirm}</Text>
                                }
                                </View>
                                {/* Password end */}  
                            </View>
                             
                            {/* Terms & conditions */}
                            <View  >
                                <View style={styles.terms_sty} >
                                    <TouchableOpacity onPress={tncHandler} style={{paddingRight:5}} >
                                        {tnc ? <Image source={require('../../../assets/Icons/CheckBox/checkboxActive.png')} style={styles.checkbox} /> :
                                            <Image source={require('../../../assets/Icons/CheckBox/checkboxInactive.png')} style={styles.checkbox} />}
                                    </TouchableOpacity>
                                    <View style={styles.textAlign} >
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
                                <View style={styles.login_sty}>
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('Login') }} >
                                        <View style={styles.signup_sty}>
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
    header:{ flexDirection: 'row', alignItems: 'center', marginTop: 5, padding: 10 },
    headerText:{ fontSize: 25, color: 'black', paddingLeft: 115, },
    addIcon: {
        left: Dimensions.get('window').width * 0.12,
        bottom: Dimensions.get('window').width * 0.1,
    },
    profile:{ flexDirection: 'column', alignItems: 'center', marginTop: 10 },
    profileImg:{ height: 125, width: 125 },
    addIconImg:{ height: 50, width: 50 },
    arrow:{ height: 20, width: 30 },
    Formik_sty:{ padding: 10 },
    errortext:{ fontSize: 11, color: 'red' },
    customCss: {
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
        width: '100%',
        paddingBottom:2,
        justifyContent: 'space-evenly',
    },
    gender_sty:{flexDirection:'row' ,justifyContent:'space-between',width:'100%', padding:5,},
    main: {
        color: 'black',
        marginTop: 10

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
        color: 'black',
       

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

    },
    gendercheck:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1, 
        paddingBottom:5, 
        width:'40%' ,
        borderBottomColor: '#e8e8e8',
    },
    checkIcon:{ height: 28, width: 28, },
    femaleGender:{flexDirection:'row', alignItems:'center'},
   genderText:{paddingLeft:5},
   eyeIcon:{ height: 15, width: 24, },
   eye_sty:{paddingRight:20},
   password_sty:{ flexDirection: 'row', justifyContent:'space-evenly',alignItems: 'center', paddingLeft:15},
   terms_sty:{ flexDirection: 'row',marginTop:15, marginBottom: 15,paddingRight:5 },
   checkbox:{ height: 20, width: 20 },
   login_sty:{ width: "100%", marginTop: 10 },
   signup_sty:{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },

    // textAlign: {
    //     // adjustsFontSizeToFit:true,
    //     // numberOfLines:'number'
    //     fontSize:fontSize
    // },
});

export default CustomerSignupScreen;