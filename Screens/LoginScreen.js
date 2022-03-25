import React, { useState } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Button,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { Formik } from 'formik'
import * as yup from 'yup'


import AppIcon from '../assets/image/Icons/appIcon.png';
import CheckboxInactive from '../assets/image/Icons/checkboxInactive.png';
import CheckboxActive from '../assets/image/Icons/checkboxActive.png';
import Or from '../assets/image/Icons/or.png';


const LoginScreen = () => {
    // const [email, setemail] = useState('');
    // const [password, setpassword] = useState('');

    // const onLoginPressed = () => {
    //     console.log("logIN");
    //     console.warn("LogIN")
    // }

    // const onForgotPasswordPressed = () => {
    //     console.log("ForgotPassword");
    //     console.warn("ForgotPassword")
    // }

    // const [tnc, setTnc] = useState(false);
    // const tncHandler = () => {
    //     setTnc(state => !state);

    // };
    // console.warn("tncHandler");

    return (
        // <View style={styles.root} >
        //     <Image source={AppIcon} style={styles.logo} resizeMode="contain" />
        //     <View  style={{ flexDirection: 'row', marginTop: 10 , justifyContent:'space-around'}}>
        //         <View style={{ flexDirection: 'row', marginTop: 10 }}>
        //             <TouchableOpacity onPress={tncHandler}>
        //                 {tnc ?
        //                     <Image source={require('../assets/image/Icons/checkboxInactive.png')} style={{ height: 20, width: 20 }} /> :
        //                     <Image source={require('../assets/image/Icons/checkboxActive.png')} style={{ height: 20, width: 20 }} />
        //                 }
        //             </TouchableOpacity>
        //             <Text>
        //                 Remember me
        //             </Text>
        //         </View>
        //         <CustomButton text="Forgot Password" onPress={onForgotPasswordPressed} type="Secondary" />
        //         {/* <TouchableOpacity>
        //             <Text>Forgot Password ? </Text>
        //         </TouchableOpacity> */}
        //     </View>
        //     <CustomButton text="Login" onPress={onLoginPressed} type="Primary" />
        //     <Image source={require('../assets/image/Icons/or.png')} style={{height:25, width:'100%'} }/> 
        // </View>

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
                <View style={styles.mainWrapper}>
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
                    <Button
                        color="blue"
                        title='Login'
                        disabled={!isValid}
                        onPress={handleSubmit}
                    />
                </View>
            )}
        </Formik>

    );

};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20
    },

    logo: {
        width: '70%',
        maxWidth: 500,
        height: 300,
    },
    customCss:{
        borderWidth: 1,
        padding: 10,
        marginBottom: 12,
        borderColor: '#cccccc',
    },
    mainWrapper: {
        padding: 40 
      }
});

export default LoginScreen;

