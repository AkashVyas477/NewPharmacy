import React,{useState} from 'react';
import {View, Text , StyleSheet , TextInput , TouchableOpacity,Alert} from 'react-native';
// import { Header, Button,EyeButton } from '../../../Components/Common';
import  Header from '../../../Components/Common/Header';
import  Button  from '../../../Components/Common/Button';
import  EyeButton  from '../../../Components/Common/EyeButton';
import { Colors} from '../../../CommonConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Formik } from "formik";
import * as yup from 'yup';
import { ref } from 'yup';

import { postPostLogin,refreshtoken } from '../../../Components/Helpers/ApiHelper';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
// import { Header } from '../../../Components/Common';


const ChangePassword = props => {
    const {t}= useTranslation()
    const [cuEye, setCuEye] = useState(true)
    const [newEye, setNewEye] = useState(true)
    const [conEye, setConEye] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const onPressSave = async(values) => {
        setIsLoading(true)
        const data = {
            currentPassword : values.currentPass,
            newPassword : values.newPass
        }
        const response = await postPostLogin('changePassword',data)
        // console.log(response);
        console.log( "\n\n\n\nPassword  Show in Console     ", data );
        console.log("\n\n\n\nPassword                  ", response);

        if (!response.success){
            let errorMessage="Wrong Current Password";
            if(response.data.error ==="Invalid Password" ){
                errorMessage="Check Current Password "
            }
            Alert.alert('Error',errorMessage,[{text:'Okay'}])
            setIsLoading(false)
        }else{
            Toast.show('Password changed successfully!')
            props.navigation.goBack();
           
        }
    }
    
    return (
        <KeyboardAwareScrollView>
        <View style={styles.screen}>
{/* Header  */}
            <View style={styles.header}>
                <Header
                    Title={t('common:CHANGEPASSWORD')}
                    onPress={() => props.navigation.goBack()}
                />
            </View>
<View style={styles.screen2}>
            <Formik
                initialValues={{
                    currentPass : '',
                    newPass : '',
                    confirmPass : ''
                }}
                onSubmit={ values => onPressSave(values)}
                validationSchema = { yup.object().shape({
                    currentPass: yup.string().required('Current password is required.').min(6,'Password must be atlease 6 characters long.'),
                    newPass: yup.string().required('New password is required.').min(6,'Password must be atlease 6 characters long.'),
                    confirmPass : yup.string().required('Please confirm your password.').oneOf([ref("newPass")],"Passwords do not match.")
                })}
            >
                { ({values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit}) => (
                    <View style={{flex:1, justifyContent:'space-between', paddingBottom:25}}>
                        
                        {/* Input Fields */}
                        <View>
                            <Text style={styles.inputLabel}>{t('common:CurrentPassword')}</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    value = { values.currentPass }
                                    onBlur={() => setFieldTouched('currentPass')}
                                    onChangeText={handleChange('currentPass')}
                                    placeholder={t('common:CurrentPassword')}
                                    autoCapitalize='none'
                                    // secureTextEntry={cuEye}
                                    secureTextEntry={cuEye ? true : false}
                                />
                                <EyeButton
                                tnceye={cuEye}onEyePress={() => {setCuEye(!cuEye)}} 
                                /> 
                                {/* <TouchableOpacity onPress={() => {setCuEye(!cuEye)}}>  </TouchableOpacity> */}
                            </View>
                            {touched.currentPass && errors.currentPass && <Text style={styles.error}>{errors.currentPass}</Text>}   

                            <Text style={styles.inputLabel}>{t('common:NewPassword')}</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    value = { values.newPass }
                                    onBlur={() => setFieldTouched('newPass')}
                                    onChangeText={handleChange('newPass')}
                                    placeholder={t('common:NewPassword')}
                                    autoCapitalize='none'
                                    // secureTextEntry={newEye}
                                    secureTextEntry={newEye ? true : false}
                                />
                                <EyeButton
                                tnceye={newEye}onEyePress={() => {setNewEye(!newEye)}} 
                                /> 
                                {/* <TouchableOpacity onPress={() => {setNewEye(!newEye)}}> </TouchableOpacity> */}
                            </View>
                            {touched.newPass && errors.newPass && <Text style={styles.error}>{errors.newPass}</Text>}

                            <Text style={styles.inputLabel}>{t('common:ConfirmPassword')}</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    value = { values.confirmPass }
                                    onBlur={() => setFieldTouched('confirmPass')}
                                    onChangeText={handleChange('confirmPass')}
                                    placeholder={t('common:ConfirmPassword')}
                                    autoCapitalize='none'
                                    // secureTextEntry={conEye}
                                    secureTextEntry={conEye ? true : false}
                                />
                                <EyeButton
                                tnceye={conEye}onEyePress={() => {setConEye(!conEye)}} 
                                /> 
                                {/* <TouchableOpacity onPress={() => {setConEye(!conEye)}}> </TouchableOpacity> */}
                            </View>
                            {touched.confirmPass && errors.confirmPass && <Text style={styles.error}>{errors.confirmPass}</Text>}
                        </View>

                        {/* Save Button */}
                        {/* <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={styles.saveButton}>
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity> */}
                        <Button
                        showActivityIndicator={isLoading}
                         label={t('common:Save')}
                         onPress={handleSubmit}
                         disabled={isValid || !isLoading}
                        />

                    </View>
                )}
            </Formik>
            </View>

        </View>
        </KeyboardAwareScrollView>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        // paddingHorizontal:25,
    },
    screen2:{
        flex:1,
        paddingHorizontal:25,
    },
    header:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 5, 
        padding:10
    },
    inputLabel:{
        marginTop:25,
        // fontWeight:'bold',
        color: Colors.Gray,
        fontSize: 18
    },
    inputContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding: 10,
        borderBottomColor: Colors.borderBottomColor,
        borderBottomWidth: 0.5
    },
    error:{ 
        fontSize: 11, 
        color: 'red' 
    },
    saveButton:{
        paddingVertical:15,
        width:'100%',
        backgroundColor: Colors.PRIMARY,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    saveText:{
        fontWeight:'bold',
        fontSize:20,
        color: Colors.White
    }
});

export default ChangePassword;