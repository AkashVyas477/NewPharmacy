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

import { Formik } from 'formik'
import * as yup from 'yup'


import AppIcon from '../assets/image/Icons/appIcon.png';
import { SafeAreaView } from 'react-native-safe-area-context';


const LoginScreen = (props) => {

    const [tnc, setTnc] = useState(false);
    const tncHandler = () => {
        setTnc(state => !state);
    };
    const [tnceye, setTncEye] = useState(false);

    return (
            <View style={styles.mainWrapper}>
                <View style={{alignItems:'center'}}>
                <Image source={AppIcon} style={styles.logo} resizeMode="cover" />
                </View>
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
                             <Text style={{ color: 'black',marginBottom:1, paddingLeft:3 }} >E-mail</Text>
                             <View  style= {{borderBottomColor: '#e8e8e8',borderBottomWidth: 1,}} >
                                <TextInput
                                    value={values.email}
                                    style={styles.customCss}
                                    onBlur={() => setFieldTouched('email')}
                                    onChangeText={handleChange('email')}
                                    placeholder="E-mail"
                                />
                                {touched.email && errors.email &&
                                    <Text style={{ fontSize: 11, color: 'red' }}>{errors.email}</Text>
                                }
                                </View>
                            <View style={{padding:10, paddingHorizontal:2}} >
                                <Text style={{ color: 'black', marginBottom:1, paddingLeft:3}} >Password</Text>
                                <View style={{ flexDirection: 'row', justifyContent:'space-between' ,alignItems: 'center', marginBottom: 25,  borderBottomColor: '#e8e8e8',borderBottomWidth: 1, }}>
                                    <TextInput
                                        value={values.password}
                                        style={styles.customCss}
                                        placeholder="Password"
                                        onBlur={() => setFieldTouched('password')}
                                        onChangeText={handleChange('password')}
                                        secureTextEntry={tnceye ? true : false}
                                    />
                                    <TouchableOpacity onPress={() => setTncEye(!tnceye)} >
                                        {!tnceye ? <Image source={require('../assets/image/Icons/activeEye.png')} style={{ height: 15, width: 24, }} /> :
                                            <Image source={require('../assets/image/Icons/inactiveEye.png')} style={{ height: 15, width: 24, }} />
                                        }
                                    </TouchableOpacity>
                                </View>

                                {touched.password && errors.password &&
                                    <Text style={{ fontSize: 11, color: 'red' }}>{errors.password}</Text>
                                }

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }} >
                                <View style={{ flexDirection: 'row',  marginLeft:2 }}>
                                    <TouchableOpacity onPress={tncHandler}>
                                        {tnc ?
                                            <Image source={require('../assets/image/Icons/checkboxActive.png')} style={{ height: 20, width: 20 }} /> :
                                            <Image source={require('../assets/image/Icons/checkboxInactive.png')} style={{ height: 20, width: 20 }} />
                                        }
                                    </TouchableOpacity>
                                    <Text  style={{ marginLeft:4 }}>
                                        Remember me
                                    </Text>
                                </View>

                                <View>
                                    <TouchableOpacity onPress={()=>{props.navigation.navigate('FORGOT PASSWORD')}} >
                                        <Text>
                                            Forgot Password?
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Button 
                                    color='#0DC314'
                                    title='Login'
                                    disabled={!isValid}
                                    onPress={handleSubmit}
                                    style={styles.Button}
                                />
                                <View style={{paddingBottom:3}}>
                                    <Image source={require('../assets/image/Icons/or.png')} style={{ height: 25, width: '100%' ,marginTop:10 }} />
                                    </View>
                                   <View style={styles.container} >
                                       <TouchableOpacity  onPress={()=>{props.navigation.navigate('LOGIN AS PHARMACY USER')}}>
                                           <View style={{ flexDirection: 'row', justifyContent:'space-evenly', alignItems: 'center', marginBottom: 25 }}>
                                       <Image source={require('../assets/image/Icons/pharmacyUser.png')} style={{ height:100 , width: '20%' ,overflow:'hidden'}} />
                                       
                                       <Text style={{fontWeight:'bold'}}>
                                          PharmacyUser 
                                       </Text>
                                       <Image source={require('../assets/image/Icons/rightArrow.png')} style={{ height: 20, width: 20}} />
                                       </View>
                                       </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={()=>{props.navigation.navigate('RollSignUpScreen')}} >
                                    <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
                                    <Text style={styles.signup} > Don't have Account? <Text style={styles.sp_signup} > Sign up </Text>   </Text>                                
                                    </View>
                                     </TouchableOpacity>
                        </View>
                        </View>
                    )}
                </Formik>
            </View> 
            
     
    );

};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        padding:10,


    },

    logo: {
        width: '70%',
        height: 300,
        marginBottom:20,
        

    },
    customCss: {
       
        // paddingVertical:10,
        // paddingHorizontal:10,
        // marginBottom: 10
    },
    mainWrapper: {
        paddingLeft:15,
        paddingRight:15,
        paddingHorizontal: 1,
        marginVertical: 20,
        width: '100%',
        marginVertical: 5,
        justifyContent: 'center',
        borderRadius: 25,
    },
    container:{
        shadowColor:'#000',
                shadowOffset: {
                    width: 0,
                    height: 10,
                },
                shadowOpacity:0.3,
                shadowRadius: 2.84,
                elevation: 1,
    },
        
    signup:{
        color:'gray',
        marginBottom:50,


    },
    sp_signup:{
        color:'black',
        marginBottom:50
        
    }
});

export default LoginScreen;
