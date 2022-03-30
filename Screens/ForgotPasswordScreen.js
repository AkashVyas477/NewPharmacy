import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput,Button,SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Formik } from 'formik'
import * as yup from 'yup'



const ForgotPasswordScreen = props => {
    return (
   
        <View style={styles.screen}>
          <KeyboardAwareScrollView>
          <View  style={{flexDirection:'row',alignItems:'center',padding:10}}>
              <View>
                  <TouchableOpacity onPress={() => (props.navigation.goBack())} >      
                    <Image source={require('../assets/image/Icons/arrow.png')} style={{height:20, width:30}} />
              </TouchableOpacity>
              </View>
        <Text style={{fontSize:25,color:'black',paddingLeft:50}} >
            FORGOT PASSWORD
        </Text>
    </View>
              <View style={styles.screen}>
                <Image source={require('../assets/image/Icons/forgotPLock.png')} style={{ height: 300, width: "86%", marginTop:20}} />
                </View>
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
                    <View >
                        <Text style={{ color: 'black', marginBottom: 1, paddingLeft:3 }} >E-mail</Text>
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

                <TouchableOpacity style={{padding:20}} onPress={()=>{props.navigation.navigate('Login')}} >
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
        alignItems:'center',
        justifyContent:'center'
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
        textAlign:'center',
       
    },
    buttoncon:{
        backgroundColor:'#0DC314',
        borderRadius:10,
        height:40,
        width: "100%",
        
        justifyContent:'center'
       
    }
});

export default ForgotPasswordScreen;