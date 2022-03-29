import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput,Button,SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Formik } from 'formik'
import * as yup from 'yup'



const ForgotPasswordScreen = props => {
    return (
    
        <View style={styles.screen}>
          <KeyboardAwareScrollView>
                <Image source={require('../assets/image/Icons/forgotPLock.png')} style={{ height: 300, width: "84%", }} />
                <View  >
                <Text style={styles.text}>
                    Pleas Enter the Email Address Below, You will Receive a link to Create a new Password via Email.
                </Text>
                
            </View>
            <View style={styles.mainWrapper} >
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
                    <View style={{ padding: 10 }} >
                        
                        <Text style={{ color: 'black', marginBottom: 1 }} >E-mail</Text>
                        <View style={{ borderBottomColor: '#e8e8e8', borderBottomWidth: 1, }} >
                            <TextInput
                                value={values.email}
                                // style={styles.customCss}
                                onBlur={() => setFieldTouched('email')}
                                onChangeText={handleChange('email')}
                                placeholder="E-mail"
                                keyboardType='email-address'
                            />
                            {touched.email && errors.email &&
                                <Text style={{ fontSize: 11, color: 'red' }}>{errors.email}</Text>
                            }

                        </View>
                       
                        {/* <Button 
                    color='#0DC314'
                    title='Send'
                    disabled={!isValid}
                    onPress={handleSubmit}
                    style={styles.Button}
                /> */}

                <TouchableOpacity onPress={()=>{props.navigation.navigate('Login')}} >
                    <View style={styles.buttoncon}>
                        <Text style={styles.Button}>
                            Send
                        </Text>
                    </View>
                </TouchableOpacity>
                    </View>
                   
                )}
            </Formik>
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
    },
    Button:{
        color:'white',
        textAlign:'center'
    },
    buttoncon:{
        backgroundColor:'#0DC314',
        borderRadius:10,
        height:30
    }
});

export default ForgotPasswordScreen;