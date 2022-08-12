import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, Modal,ActivityIndicator } from 'react-native';
import { Header, Button, RadioButton } from '../../../Components/Common';
import { Images, Colors } from '../../../CommonConfig'
import * as ImagePicker from 'react-native-image-crop-picker';

import CountryPicker from 'react-native-country-codes-picker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { postPostLogin } from '../../../Components/Helpers/ApiHelper';

import { Formik } from "formik";
import * as yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Ionicon from 'react-native-vector-icons';

import PropTypes from 'prop-types';
import from from 'react-native-country-codes-picker';
import { useTranslation } from 'react-i18next';

const CustomerProfileEditScreen = props => {
    const {t}= useTranslation()

    const user = props.route.params.user
    const [selectedImage, setSelectedImage] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');
    const [callingCode, setcallingCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [images, setImages] = useState([])
    const pressHandler = async (countryCode, phoneNumber) => { props.navigation.navigate() }

    const [gender, setGender] = useState(user.gender);
    const maleHandler = () => {
        setGender('MALE');
        
    };
    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

    const takeFromCamera = () => {
        ImagePicker.openCamera({
        }).then(image => {
            setImages([...images, image])
            // console.log("Selected Images        ", image.path);
            setSelectedImage(image)
            setModalVisible(!modalVisible)
        });
    }
    const pickFromGallery = () => {
        ImagePicker.openPicker({
        }).then(image => {
            setImages([...images, image])
            // console.log("Selected Images        ", image);
            setSelectedImage(image)
            setModalVisible(!modalVisible)
        });
    }
    const femaleHandler = () => {
        setGender('FEMALE');
    };
        const onPressSave =async(values)=>{
            setIsLoading(true);
            const formdata = new FormData();
            formdata.append("name",values.name)
            // formdata.append("email",values.email)
            formdata.append("country_code",values.country_code)
            formdata.append("gender",values.gender)
            formdata.append("phone",values.phone)
        if(selectedImage){
            formdata.append("image",{
                uri:selectedImage?.path,
                type:selectedImage?.mime,
                name:makeid(10),
            })
        }

            console.log("data       ", formdata._parts)
            const res= await fetch('https://mobile-pharmacy.herokuapp.com/updateProfile',
            {
                method:'POST',
                body:formdata,
                headers:{
                    'content-Type':'multipart/form-data',
                    Authorization: 'Bearer ' + (await AsyncStorage.getItem('token'))
                }
            })
            const response = await res.json()
            // const resData= response.data
            console.log(response)
            await AsyncStorage.setItem('user', JSON.stringify(response.user))
            
            Toast.show("Profile Update Successfully")
            // Toast.show(`${t('common:ProfileUpdateSuccessfully')}`)
            props.navigation.goBack()

        }


    return (

        <View style={styles.screen}>
            < KeyboardAwareScrollView>
                {/* Header */}
                <View style={styles.header}>
                    <Header
                        Title={t('common:EDITPROFILE')} 
                        onPress={() => props.navigation.goBack()}
                    />
                </View>
                {/* Body */}

                <View style={styles.profileImg_Style}>
                    {selectedImage ? <Image source={{ uri: selectedImage.path }} style={styles.profileImg}/> : <Image source={{uri:user.image}} style={styles.profileImg} />}
                </View>
                <View>
                    <TouchableOpacity style={styles.addIcon} onPress={() => setModalVisible(true)} >
                        <Image source={Images.Camera} style={styles.addIconImg} />
                    </TouchableOpacity>
                    {/* <View style={styles.centeredView}> */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>{t('common:Chooseoption')} </Text>
                                <TouchableOpacity
                                    style={[styles.buttonModal, styles.buttonClose]}
                                    onPress={pickFromGallery}
                                >
                                    <Text style={styles.textStyle}>{t('common:Choosefromgallery')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonModal, styles.buttonClose]}
                                    onPress={takeFromCamera}
                                >
                                    <Text style={styles.textStyle}>{t('common:UseCamera')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonModal, styles.buttonClose]}
                                    onPress={() => { setModalVisible(false) }}
                                >
                                    <Text style={styles.textStyle}>{t('common:Close')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    {/* </View> */}
                </View>

                {/* Details */}

                <Formik
                
                    initialValues={{
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        country_code:user.country_code,
                        gender:user.gender
                    }}
                    
                    onSubmit={(values) => onPressSave(values)}
                    validationSchema={yup.object().shape({
                        name: yup.string(),
                        email: yup.string().email('Please enter a valid email.'),
                        phone: yup.number().min(10,'Phone number should be ten number '),
                        country_code: yup.string(),
                        gender:yup.string()
                    })}
                >
                    {({ values, handleChange, isValid, handleSubmit, setFieldTouched }) => (
                        <View style={{ paddingHorizontal: 5, marginLeft: 10, marginRight: 10, fontSize: 17 }} >
{/* UserName */}
                            <Text style={styles.text_footer}>{t('common:Username')}</Text>
                            <View style={styles.action}>
                       
                                <TextInput
                                    value={values.name}
                                    onBlur={() => setFieldTouched('name')}
                                    onChangeText={handleChange('name')}
                                    placeholder={t('common:Enterusername')}
                                    placeholderTextColor={Colors.placeHolder}
                                    color={Colors.Sp_Text}
                                    style={styles.textInput}
                                />
                            </View>
{/* Email */}
                            <Text style={{ ...styles.text_footer, marginTop: 15 }}>{t('common:Email')}</Text>
                            <View style={styles.action}>
                            
                                <TextInput
                                    value={values.email}
                                    onBlur={() => setFieldTouched('email')}
                                    onChangeText={handleChange('email')}
                                    placeholderTextColor={Colors.placeHolder}
                                    color={Colors.Sp_Text}
                                    placeholder={t('common:Enteremail')}
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                />
                            </View>
{/* PhoneNumber */}
                            <View>
                                <View >
                                    <Text style={{ ...styles.text_footer, marginTop: 15 }} >{t('common:PhoneNumber')}</Text>
                                    <View style={styles.action} >
                                     
                                        <Text style={{ marginLeft:10, flex: 0.5, fontWeight: 'bold' }}>{countryCode}</Text>
                                        <TouchableOpacity onPress={() => setShow(true)} style={{ flex: 0.4 }}>
                                            <Image source={Images.DropDown} style={{height:10,width:10}}  /> 
                                        
                                            </TouchableOpacity>
                                        <View style={{ width: 0, borderColor: Colors.Gray, borderWidth: 0.7, height: 30, marginRight: 10 }} ></View>
                                        <TextInput
                                          value={values.phone.toString()}
                                            style={{ flex: 3.5 }}
                                            keyboardType="phone-pad"
                                            maxLength={10}
                                            placeholderTextColor={Colors.placeHolder}
                                            color={Colors.Sp_Text}
                                            onChangeText={handleChange('phone')}
                                            placeholder={t('common:PhoneNumber')}
                                        />
                                    </View>
                                </View> 
                            </View>
{/* Gender */}
                            <View>
                                <Text style={{ ...styles.text_footer, marginTop: 15, paddingHorizontal: 5, }}>
                                    {t('common:Gender')}
                                </Text>
                                    <View style={{ paddingHorizontal: 1,  fontSize: 17, borderBottomWidth: 1, borderColor: Colors.borderBottomColor }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 8 }}>
                                                    <RadioButton
                                                   value={values.gender}
                                                        label={t("common:Male")}
                                                        onPress={maleHandler}
                                                        state={gender === 'MALE'}
                                                        
                                                    />
                                                <View style={{ marginLeft: 125 }}>
                                                    <RadioButton
                                                  value={values.gender}
                                                        label={t("common:Female")}
                                                        onPress={femaleHandler}
                                                        state={gender === 'FEMALE'}
                                                      
                                                    />
                                                </View>
                                            </View>
                                    </View>
                            </View>
{/* Save Button  */}
                            <View style={{ marginTop: 20 }}>
                           
                             <Button
                                    label={t('common:Save')}
                                    showActivityIndicator={isLoading}
                                    onPress={ handleSubmit } 
                                   disabled={isValid}
                                /> 
                            </View>
                        </View>
                    

                    )}
                </Formik>
                
            </KeyboardAwareScrollView>
            <CountryPicker
                show={show}
                style={{
                    modal:{
                        height:500,
                        backgroundColor:Colors.LIGHTER_GREY,
                    },
                    countryButtonStyles:{
                        height:80
                    },
                    flag: {
                        fontSize:30
                    },
                    dialCode: {
                        fontSize:20,
                        fontWeight:'bold'
                    },
                    countryName: {
                        fontSize:20
                    }
                }}
                pickerButtonOnPress={(item) => {
                    setCountryCode(item.dial_code);
                    setShow(false);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        padding: 10
    },
    profileImg:{ 
        height: 145, 
        width: 145,
        borderRadius:68
       
    },
    profileImg_Style: {
        borderRadius: 50,
        overflow: 'hidden',
        alignItems: 'center',
        padding: 10
    },
    addIcon: {
        left: Dimensions.get('window').width * 0.57,
        bottom: Dimensions.get('window').width * 0.1,
    },
    addIconImg: {
        height: 45,
        width: 45
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.White,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 5,
        width: 200
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: Colors.Gray,
    },
    textStyle: {
        color: Colors.White,
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    },

    body: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    textPhoneNo: {
        color: Colors.Gray,
        paddingLeft: 5
    },
    text_footer:{
        color:Colors.Gray,
        fontSize:15,
        fontWeight:'bold',
        marginVertical:5,
        marginHorizontal: 10
    },
    action: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderBottomColor,
        alignItems: 'center',
    },
    // action:{
    //     flexDirection:'row',
    //     borderBottomWidth:0.5,
    //     borderBottomColor:Colors.borderBottomColor,
    //     // paddingVertical: 10
    // },
    textInput:{
        marginHorizontal:5
    },

});

export default CustomerProfileEditScreen;