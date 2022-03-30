import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput,Dimensions } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';

const CustomerSignupScreen = props => {
    return (
        <View style={styles.screen}>

            {/* SignUp  */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, padding: 10 }}>
                <View>
                    <TouchableOpacity onPress={() => (props.navigation.goBack())} >
                        <Image source={require('../assets/image/Icons/arrow.png')} style={{ height: 20, width: 30 }} />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 25, color: 'black', paddingLeft: 125, }} >
                    Sign Up
                </Text>
            </View>
            {/* SignUp  */}
            {/* Profile */}
            <View  style={{flexDirection:'column',alignItems:'center' ,marginTop:10}}>
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
            <View>
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
                                .required('Name is required.'),
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
                            <View style={styles.mainWrapper}>

                                <View>
                                    <Text style={{color:'gray'}}> Usernae </Text>
                                    <Text style={{ color: 'white' }}>Name</Text>
                                    <TextInput
                                        value={values.name}
                                        style={styles.customCss}
                                        onBlur={() => setFieldTouched('name')}
                                        onChangeText={handleChange('name')}
                                        placeholder="Name"

                                    />
                                    {touched.name && errors.name &&
                                        <Text style={{ fontSize: 11, color: 'red' }}>{errors.name}</Text>
                                    }

                                    <Text style={{ color: 'white' }} >Email</Text>
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
                                    <Text style={{ color: 'white' }} >Password</Text>
                                    <TextInput
                                        value={values.password}
                                        style={styles.customCss}
                                        placeholder="Password"
                                        onBlur={() => setFieldTouched('password')}
                                        onChangeText={handleChange('password')}
                                        secureTextEntry={true}
                                    />
                                    {touched.password && errors.password &&
                                        <Text style={{ fontSize: 11, color: 'red' }}>{errors.password}</Text>
                                    }
                                    <Text style={{ color: 'white' }}> Confirm Password </Text>
                                    <TextInput
                                        value={values.passwordConfirm}
                                        style={styles.customCss}
                                        placeholder='confirm Password'
                                        onBlur={() => setFieldTouched('passwordConfirm')}
                                        onChangeText={handleChange('passwordConfirm')}
                                        secureTextEntry={true}
                                    />
                                    {touched.passwordConfirm && errors.passwordConfirm &&
                                        <Text style={{ fontSize: 11, color: 'red' }} >{errors.passwordConfirm}</Text>
                                    }
                                </View>


                                <TouchableOpacity  onPress={() => {
                                    props.navigation.navigate('PhoneVerification')
                                }}>
                                    <Text style={styles.signin}> SIGN UP </Text>
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 40 }}>
                                    <Text style={{ color: 'white' }}> Already have account? </Text>
                                    <TouchableOpacity onPress={() => {
                                        props.navigation.goBack()
                                    }} >
                                        <Text style={{ color: '#4ef001', fontWeight: 'bold', fontSize: 20 }} >  SignIn </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
            </View>
            {/* Formik */}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },
    addIcon:{
        left: Dimensions.get('window').width *0.12,
        bottom: Dimensions.get('window').width * 0.1,
    },
    customCss: {
       
        borderBottomWidth:1,
        borderBottomColor:'#e8e8e8',
       
        borderRadius: 10,
       
        width: '100%',
       
    },
});

export default CustomerSignupScreen;