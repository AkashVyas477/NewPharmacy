import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, Modal,ActivityIndicator } from 'react-native';
// import { Header, Button, RadioButton } from '../../../Components/Common';
import Header from '../../../Components/Common/Header'
import Button  from '../../../Components/Common/Button'
import RadioButton from '../../../Components/Common/RadioButton'

import { Images, Colors } from '../../../CommonConfig'
import * as ImagePicker from 'react-native-image-crop-picker';

import CountryPicker from 'react-native-country-picker-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { postPostLogin } from '../../../Components/Helpers/ApiHelper';

import { Formik } from "formik";
import * as yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

import PropTypes from 'prop-types';


const CustomerProfileEditScreen = props => {

    const user = props.route.params.user
console.log("         ", user);
    const [selectedImage, setSelectedImage] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('IN');
    const [callingCode, setcallingCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const pressHandler = async (countryCode, phoneNumber) => { props.navigation.navigate() }

    const [male, setMale] = useState(false);
    const maleHandler = () => {
        setMale(state => !state);
        setFemale(false);
    };

    const takeFromCamera = () => {
        ImagePicker.openCamera({
            width: 100,
            height: 100,
            cropping: true,
        }).then(image => {

            setSelectedImage(image.path)
            setModalVisible(!modalVisible)
        });
    }
    const pickFromGallery = () => {
        ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true
        }).then(image => {

            setSelectedImage(image.path)
            setModalVisible(!modalVisible)
        });
    }

    

    const [female, setFemale] = useState(false);
    const femaleHandler = () => {
        setFemale(state => !state);
        setMale(false);
    };


    const onPressSave = async (values) => {
        setIsLoading(true)
        const data = {
            name: values.name,
            email: values.email,
            country_code:values.country_code,
            phone: values.phone,
            gender: values.gender
        }
        // console.log(data);
        const response = await postPostLogin ('updateProfile', data)
        console.log("on save       ",response);
        if(!response.success) {
            console.log(("Post Request Error"));
        } else {
           await AsyncStorage.setItem('userInfo', JSON.stringify(response.data))
            Toast.show('Profile updated successfully!')
            props.navigation.goBack();
        }
        setIsLoading(false)
    }




    return (

        <View style={styles.screen}>
            < KeyboardAwareScrollView>
                {/* Header */}
                <View style={styles.header}>
                    <Header
                        Title="EDIT PROFILE "
                        onPress={() => props.navigation.goBack()}
                    />
                </View>
                {/* Body */}

                <View style={styles.profileImg_Style}>
                    {selectedImage ? <Image source={{ uri: selectedImage }} style={styles.profileImg}/> : <Image source={{uri:user.image}} style={styles.profileImg} />}
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
                                <Text style={styles.modalText}>Choose option: </Text>
                                <TouchableOpacity
                                    style={[styles.buttonModal, styles.buttonClose]}
                                    onPress={pickFromGallery}
                                >
                                    <Text style={styles.textStyle}>Choose from gallery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonModal, styles.buttonClose]}
                                    onPress={takeFromCamera}
                                >
                                    <Text style={styles.textStyle}>Use Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonModal, styles.buttonClose]}
                                    onPress={() => { setModalVisible(false) }}
                                >
                                    <Text style={styles.textStyle}>Close</Text>
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
                        phone: yup.string().min(10,'Phone number should be ten number '),
                        country_code: yup.string(),
                        gender:yup.string()
                    })}
                >
                    {({ values, handleChange, isValid, handleSubmit, setFieldTouched }) => (
                        <View style={{ paddingHorizontal: 5, marginLeft: 10, marginRight: 10, fontSize: 17 }} >
{/* UserName */}
                            <Text style={styles.text_footer}>Username</Text>
                            <View style={styles.action}>
                                {/* <FontAwesome name="user" color={Colors.ORANGE} size={25}/> */}
                                <TextInput
                                    value={values.name}
                                    onBlur={() => setFieldTouched('name')}
                                    onChangeText={handleChange('name')}
                                    placeholder="Enter username"
                                    placeholderTextColor={Colors.placeHolder}
                                    color={Colors.Sp_Text}
                                    style={styles.textInput}
                                />
                            </View>
{/* Email */}
                            <Text style={{ ...styles.text_footer, marginTop: 15 }}>Email</Text>
                            <View style={styles.action}>
                                {/* <FontAwesome name="envelope" color={Colors.ORANGE} size={25}/> */}
                                <TextInput
                                    value={values.email}
                                    onBlur={() => setFieldTouched('email')}
                                    onChangeText={handleChange('email')}
                                    placeholderTextColor={Colors.placeHolder}
                                    color={Colors.Sp_Text}
                                    placeholder="Enter email"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                />
                            </View>
{/* PhoneNumber */}
                            <View>
                                <View >
                                    <Text style={{ ...styles.text_footer, marginTop: 15 }} >Phone Number</Text>
                                    <View style={styles.action} >
                                        <Text style={{ marginLeft:8, fontWeight: 'bold' }}>{callingCode}</Text>
                                        <TouchableOpacity onPress={() => setShow(true)} style={{ flex: 0.5 }}>
                                            {/* <Image source={Images.DropDown} style={{height:10,width:10}}  />  */}
                                            <CountryPicker
                                                withFilter
                                                countryCode={countryCode}
                                                // withFlag
                                                withAlphaFilter={false}
                                                withCallingCode
                                                onSelect={country => {
                                                    const { cca2, callingCode } = country;
                                                    setCountryCode(cca2);
                                                    setcallingCode(callingCode[0]);
                                                }}
                                                containerButtonStyle={{ alignItems: 'center', }}
                                            />
                                        </TouchableOpacity>
                                        <View style={{ width: 0, borderColor: Colors.borderBottomColor, borderWidth: 0.5, height: 30, marginRight: 10 }} ></View>
                                        <TextInput
                                            // value={values.phone}
                                            style={{ flex: 3.5 }}
                                            keyboardType="phone-pad"
                                            maxLength={10}
                                            placeholderTextColor={Colors.placeHolder}
                                            color={Colors.Sp_Text}
                                            onChangeText={handleChange('phone')}
                                            placeholder="Phone Number "
                                        />
                                    </View>
                                </View>
                            </View>
{/* Gender */}
                            <View>
                                <Text style={{ ...styles.text_footer, marginTop: 15, paddingHorizontal: 5, }}>
                                    Gender
                                </Text>
                                    <View style={{ paddingHorizontal: 1,  fontSize: 17, borderBottomWidth: 1, borderColor: Colors.borderBottomColor }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 8 }}>
                                                    <RadioButton
                                                   value={values.gender}
                                                        label="Male"
                                                        onPress={maleHandler}
                                                        state={male}
                                                    />
                                                <View style={{ marginLeft: 125 }}>
                                                    <RadioButton
                                                  value={values.gender}
                                                        label="Female"
                                                        onPress={femaleHandler}
                                                        state={female}
                                                    />
                                                </View>
                                            </View>
                                    </View>
                            </View>
{/* Save Button  */}
                            <View style={{ marginTop: 20 }}>
                            { isLoading ? <ActivityIndicator size={25} color={Colors.White}/> 
                            : <Button
                                    label="Save"
                                    // onPress={() => { props.navigation.navigate('Profile') }}
                                    onPress={ handleSubmit } 
                                   disabled={isValid || !isLoading}
                                /> }
                            </View>
                        </View>
                    )}
                </Formik>
            </KeyboardAwareScrollView>
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