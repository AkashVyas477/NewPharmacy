import React,{useState} from 'react';
import {View, Text , StyleSheet , TextInput , TouchableOpacity,Alert} from 'react-native';
import { Header, Button,EyeButton } from '../../../Components/Common';
import { Colors} from '../../../CommonConfig';

import { Formik } from "formik";
import * as yup from 'yup';
import { ref } from 'yup';

import { postPostLogin,refreshtoken } from '../../../Components/Helpers/ApiHelper';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChangePassword = props => {
    const [tnceye, setTncEye] = useState(false);
    const [cuEye, setCuEye] = useState(true)
    const [newEye, setNewEye] = useState(true)
    const [conEye, setConEye] = useState(true)

    const onPressSave = async(values) => {
        const data = {
            currentPassword : values.currentPass,
            newPassword : values.newPass
        }
        const response = await postPostLogin('changePassword', data)
        if(response.success) { //Change Password Fail
            
            // Token Expired Error
            if(response.data.error === 'User not Authenticated') { 
                const refToken = await AsyncStorage.getItem('refreshToken') 
                const refreshData = {
                    refreshToken: refToken
                }
                const refreshResponse = await refreshToken(refreshData)
                if(refreshResponse.success) {
                    //Refresh Fail
                    // LOG OUT IF THIS ERROR RISES

                    console.log("REFRESH FAIL     ",refreshResponse)
                } else {
                    // Refresh Success
                    await AsyncStorage.setItem('token', refreshResponse.data.token)
                    const reResponse = await postPostLogin('changePassword', data)
                    if(reResponse.success){
                        if(reResponse.data.error === 'Invalid Current password!' ){
                            Toast.show('Invalid Password entered')
                        }
                    } else {
                        Toast.show('Password changed successfully!')
                        props.navigation.goBack();
                    }
                }
            }

            //Invalid Password entered Error
            if(response.data.error === 'Invalid Current password!') {
                Toast.show('Invalid Password entered')
            }

        } else { // Change Password Success
            Toast.show('Password changed successfully!')
            props.navigation.goBack();
        }
    }

    return (
        <View style={styles.screen}>
{/* Header  */}
            <View style={styles.header}>
                <Header
                    Title="CHANGE PASSWORD"
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
                            <Text style={styles.inputLabel}>Current Password</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    value = { values.currentPass }
                                    onBlur={() => setFieldTouched('currentPass')}
                                    onChangeText={handleChange('currentPass')}
                                    placeholder="Current Password"
                                    // secureTextEntry={cuEye}
                                    secureTextEntry={cuEye ? true : false}
                                />
                                <EyeButton
                                tnceye={cuEye}onEyePress={() => {setCuEye(!cuEye)}} 
                                /> 
                                {/* <TouchableOpacity onPress={() => {setCuEye(!cuEye)}}>  </TouchableOpacity> */}
                            </View>
                            {touched.currentPass && errors.currentPass && <Text style={styles.error}>{errors.currentPass}</Text>}   

                            <Text style={styles.inputLabel}>New Password</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    value = { values.newPass }
                                    onBlur={() => setFieldTouched('newPass')}
                                    onChangeText={handleChange('newPass')}
                                    placeholder="New Password"
                                    // secureTextEntry={newEye}
                                    secureTextEntry={newEye ? true : false}
                                />
                                <EyeButton
                                tnceye={newEye}onEyePress={() => {setNewEye(!newEye)}} 
                                /> 
                                {/* <TouchableOpacity onPress={() => {setNewEye(!newEye)}}> </TouchableOpacity> */}
                            </View>
                            {touched.newPass && errors.newPass && <Text style={styles.error}>{errors.newPass}</Text>}

                            <Text style={styles.inputLabel}>Confirm Password</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    value = { values.confirmPass }
                                    onBlur={() => setFieldTouched('confirmPass')}
                                    onChangeText={handleChange('confirmPass')}
                                    placeholder="Confirm Password"
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
                        disabled={!isValid}
                         label="Save"
                         onPress={handleSubmit}
                        />

                    </View>
                )}
            </Formik>
            </View>

        </View>
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