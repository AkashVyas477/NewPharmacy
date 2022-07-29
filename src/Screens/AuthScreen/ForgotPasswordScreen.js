import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView, Alert, StatusBar,ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Formik } from 'formik'
import ForgotPasswordValidation from '../../ForValidationSchema/ForgotPassword';
import { Colors, Images } from '../../CommonConfig'
import Header from '../../Components/Common/Header'
import Button from '../../Components/Common/Button'

// import { Header,Button } from '../../Components/Common';
import messaging from '@react-native-firebase/messaging';
import { postRequest } from '../../Components/Helpers/ApiHelper';
import { useTranslation } from 'react-i18next';


const ForgotPasswordScreen = props => {
    const { t, i18n } = useTranslation();

    let deviceToken;
    useEffect(() => {
        // Get the device token
        messaging()
            .getToken()
            .then(token => {
                deviceToken = token
            });
    }, [])

    const [isLoading, setisLoading] = useState(false)
    const onPressSendLink = async (values) => {
        setisLoading(true);
        const data = {
            email: values.email.toLowerCase(),

            device_token: deviceToken
        };
        const response = await postRequest('forgotPassword', data);
        console.log(response)
        if (!response.success) {
            setisLoading(false);
            let errorMessage = "Check Your Email ";
            if (response.data.ErrorMessage === "Email Does not exists!") {
                errorMessage = "Email Does does not exist!"
            }
            Alert.alert('Error', errorMessage, [{ text: "Okay" }])
        } else {
            setisLoading(false);
            props.navigation.navigate('Login')
        }
    }



    return (

        <View style={styles.screen}>
            <KeyboardAwareScrollView>
                <StatusBar backgroundColor={Colors.PRIMARY} barStyle='light-content' />
                {/* Header start */}
                <View style={styles.header_sty}>
                    <Header Title={t('auth:ForgotPassword')}
                        onPress={() => props.navigation.goBack()}
                    />
                </View>
                {/* Header start */}
                {/* logo start */}
                <View style={styles.image}>
                    <Image source={Images.ForgotPlock} style={styles.forgotLockImg} />
                </View>

                <View>
                    <Text style={styles.text}>
                        {/* Pleas Enter the Email Address Below, You will Receive a link to Create a new Password via Email. */}
                        {t('auth:PleasEntertheEmailAddressBelowYouwillReceivealinktoCreateanewPasswordviaEmail')}
                    </Text>
                </View>

                {/* logo end */}
                <View style={styles.mainWrapper} >
                    {/* Formik Start */}
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        // onSubmit={values => Alert.alert(JSON.stringify(values))}
                        onSubmit={onPressSendLink}
                        validationSchema={ForgotPasswordValidation}
                    >
                        {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                            <View >
                                <Text style={styles.formiText} >{t('auth:Email')}</Text>
                                <View style={styles.formiText_sty} >
                                    <TextInput
                                        value={values.email}
                                        // style={styles.customCss}
                                        onBlur={() => setFieldTouched('email')}
                                        onChangeText={handleChange('email')}
                                        placeholderTextColor={Colors.placeHolder}
                                        color={Colors.Sp_Text}
                                        placeholder={t('auth:Email')}
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                    />
                                    {touched.email && errors.email &&
                                        <Text style={styles.errorText}>{errors.email}</Text>
                                    }

                                </View>
                                
                                <View style={{marginVertical: 50}}>
                                    <Button
                                        label={t('auth:Send')}
                                        onPress={handleSubmit}
                                        showActivityIndicator={isLoading}
                                        disabled={!isValid || isLoading}
                                    />
                                </View>
                            </View>)}
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
        backgroundColor: 'white',
       
    },

    sendNowButton:{
        paddingVertical:15,
        backgroundColor: Colors.PRIMARY,
        borderRadius:27,
        width:'90%',
        alignItems:'center'
    },
    sendNowText:{
        fontWeight:'bold',
        fontSize:15,
        color: Colors.White
    },

    image:{
        alignItems:'center'
    },
    text: {
        padding: 10,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    mainWrapper: {
        flex: 3,
        paddingHorizontal: 20,
        paddingVertical:30,
        width: '100%',
        // borderRadius: 25,
        // padding: 5
    },
    header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    arrow: {
        height: 20,
        width: 30
    },
    headerText: {
        fontSize: 25,
        color: Colors.Sp_Text,
        paddingLeft: 50
    },
    forgotLockImg: { height: 275, width: "80%", marginTop: 20, },

    formiText: { color: Colors.Sp_Text, marginBottom: 1, paddingLeft: 3, paddingLeft: 6, paddingRight: 6 },
    formiText_sty: { borderBottomColor: Colors.borderBottomColor, borderBottomWidth: 1, paddingLeft: 5, paddingRight: 5 },
    errorText: { fontSize: 11, color: Colors.Error_Textcolor },
    touch: { padding: 20 },


});

export default ForgotPasswordScreen;