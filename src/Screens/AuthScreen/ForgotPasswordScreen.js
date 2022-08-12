import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView, Alert, StatusBar,ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik'
import ForgotPasswordValidation from '../../ForValidationSchema/ForgotPassword';
import { Colors, Images } from '../../CommonConfig'
import { Header,Button } from '../../Components/Common';
import messaging from '@react-native-firebase/messaging';
import { postRequest } from '../../Components/Helpers/ApiHelper';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ForgotPasswordScreen = props => {
    const { t, i18n } = useTranslation();
    useEffect(() => {
        messaging().getToken().then(async (token) => {
            console.log("\n\n Token: ", token)
            await AsyncStorage.setItem('deviceToken', token)
        });
    }, [])
    const [isLoading, setisLoading] = useState(false)
    const onPressSendLink = async (values) => {
        setisLoading(true);
        const data = {
            email: values.email.toLowerCase(),
             device_token: (await AsyncStorage.getItem('deviceToken'))
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
                <StatusBar backgroundColor={Colors.PRIMARY} barStyle='light-content' />
                {/* Header start */}
                <View style={styles.header_sty}>
                    <Header Title={t('auth:ForgotPassword')}
                        onPress={() => props.navigation.goBack()}
                    />
                </View>
                <KeyboardAwareScrollView>
                {/* Header start */}
                {/* logo start */}
                <View style={styles.image}>
                    <Image source={Images.ForgotPlock} style={styles.forgotLockImg} />
                </View>
                    <Text style={styles.text}>
                        {t('auth:PleasEntertheEmailAddressBelowYouwillReceivealinktoCreateanewPasswordviaEmail')}
                    </Text>

                {/* logo end */}
                    {/* Formik Start */}
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        onSubmit={onPressSendLink}
                        validationSchema={ForgotPasswordValidation}
                    >
                        {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                            <View style={styles.mainWrapper}>
                                <Text style={styles.formiText} >{t('auth:Email')}</Text>
                                <View style={styles.formiText_sty} >
                                    <TextInput
                                        value={values.email}
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
                               
                             </View>
                            )}
                    </Formik>
                   
                    {/* Formik End */}
            </KeyboardAwareScrollView>
            <Button
                             label={t('auth:Send')}
                             onPress={onPressSendLink}
                             showActivityIndicator={isLoading}
                            //  disabled={ isLoading}
                         />
        </View>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
        padding: 5,
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
        padding: 10,
        // backgroundColor:Colors.Gray
    },
    header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    forgotLockImg: { 
        height: 279, 
        width: "78%",
         marginTop: 20,
    },
    formiText: { 
        color: Colors.Sp_Text,
         marginBottom: 1, 
         paddingLeft: 3, 
         paddingLeft: 6, 
         paddingRight: 6
    },
    formiText_sty: { 
        borderBottomColor: Colors.borderBottomColor, 
        borderBottomWidth: 1, 
        paddingLeft: 5, 
        paddingRight: 5 
    },
    errorText: { 
        fontSize: 11, 
        color: Colors.Error_Textcolor 
    },

});

export default ForgotPasswordScreen;