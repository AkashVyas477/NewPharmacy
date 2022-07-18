import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, Modal,ActivityIndicator} from 'react-native';
// import { Header, Button, RadioButton } from '../../../Components/Common';
import Header from '../../../Components/Common/Header'
import Button  from '../../../Components/Common/Button'
import RadioButton from '../../../Components/Common/RadioButton'

import { Images, Colors } from '../../../CommonConfig'
import * as ImagePicker from 'react-native-image-crop-picker';

import CountryPicker from 'react-native-country-codes-picker';
// import CountryPicker from 'react-native-country-picker-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { postPostLogin } from '../../../Components/Helpers/ApiHelper';

import { Formik } from "formik";
import * as yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Ionicon from 'react-native-vector-icons';

import PropTypes from 'prop-types';
import from from 'react-native-country-codes-picker';


const PharamcistProfileEditScreen = props => {

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

    // useEffect(() => {
    //     const update = props.navigation.addListener('focus', () => {
           
    //     });
    //     return update;
    // }, [props.navigation])


    const user = props.route.params.user
console.log("    user     ", user);
    const [selectedImage, setSelectedImage] = useState(null)
    console.log("Image\n",selectedImage)
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

    const takeFromCamera = () => {
        ImagePicker.openCamera({
            width: 100,
            height: 100,
            cropping: true,
        }).then(image => {
            // setImages([...images, image])
            console.log("Selected Images        ", image);
            setSelectedImage(image)
            setModalVisible(!modalVisible)
        });
    }
    const pickFromGallery = () => {
        ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true
        }).then(image => {
            // setImages([...images, image])
            console.log("Selected Images        ", image);
            setSelectedImage(image)
            setModalVisible(!modalVisible)
        });
    }

    
    const femaleHandler = () => {
        setGender('FEMALE');
    };


    // const onPressSave = async (values) => {
    //     setIsLoading(true)
    //     const data = {
    //         name: values.name,
    //         email: values.email,
    //         country_code:values.country_code,
    //         phone: values.phone,
    //         gender: values.gender
    //     }
    //     // console.log(data);
    //     const response = await postPostLogin ('updateProfile', data)
    //     console.log("on save       ",response);
    //     if(!response.success) {
    //         console.log(("Post Request Error"));
    //     } else {
    //        await AsyncStorage.setItem('userInfo', JSON.stringify(response.data))
    //         Toast.show('Profile updated successfully!')
    //         props.navigation.goBack();
    //     }
    //     setIsLoading(false)
    // }
        const onPressSave =async(values)=>{
            setIsLoading(true);
            const formdata = new FormData();
            formdata.append("name",values.name)
            // formdata.append("email",values.email)
            formdata.append("country_code",values.country_code)
            formdata.append("gender",values.gender)
            formdata.append("phone",values.phone)
            formdata.append("store_name",values.store_name)
            formdata.append("license_id",values.license_id)
            formdata.append("pharmacy_id",values.pharmacy_id)

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
                    'Content-Type':'multipart/form-data',
                    Authorization: 'Bearer ' + (await AsyncStorage.getItem('token'))
                }
            })
            const response = await res.json()
            // const resData= response.data
            console.log(response)
            
            // await AsyncStorage.setItem('userInfo', JSON.stringify(response.data))
            
            // Toast.show("Profile Update Successfully")
            // props.navigation.goBack()
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
                    {selectedImage ? <Image source={{ uri: selectedImage?.path }} style={styles.profileImg}/> : <Image source={{uri:user.image}} style={styles.profileImg} />}
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
                        store_name: user.store_name,
                        pharmacy_id:user.pharmacy_id,
                        license_id:user.license_id,
                        phone: user.phone,
                        country_code:user.country_code,
                        gender:user.gender, 

                    }}
                    
                    onSubmit={(values) => onPressSave(values)}
                    validationSchema={yup.object().shape({
                        name: yup.string(),
                        email: yup.string().email('Please enter a valid email.'),
                        store_name:yup.string(),
                        license_id:yup.string(),
                        pharmacy_id:yup.string(),
                        phone: yup.number().min(10,'Phone number should be ten number '),
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
{/* Store name */}
<Text style={{ ...styles.text_footer, marginTop: 15 }}>Store_name</Text>
                            <View style={styles.action}>
                                {/* <FontAwesome name="envelope" color={Colors.ORANGE} size={25}/> */}
                                <TextInput
                                    value={values.store_name}
                                    onBlur={() => setFieldTouched('store_name')}
                                    onChangeText={handleChange('store_name')}
                                    placeholderTextColor={Colors.placeHolder}
                                    color={Colors.Sp_Text}
                                    placeholder="Store_name"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                />
                            </View>     
{/* Pharmacy Id */}
<Text style={{ ...styles.text_footer, marginTop: 15 }}>Pharmacy Id</Text>
                            <View style={styles.action}>
                                {/* <FontAwesome name="envelope" color={Colors.ORANGE} size={25}/> */}
                                <TextInput
                                    value={values.pharmacy_id}
                                    onBlur={() => setFieldTouched('pharmacy_id')}
                                    onChangeText={handleChange('pharmacy_id')}
                                    placeholderTextColor={Colors.placeHolder}
                                    color={Colors.Sp_Text}
                                    placeholder="Pharmacy_id"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                />
                            </View>  
{/* License Id */}
<Text style={{ ...styles.text_footer, marginTop: 15 }}>License Id</Text>
                            <View style={styles.action}>
                                {/* <FontAwesome name="envelope" color={Colors.ORANGE} size={25}/> */}
                                <TextInput
                                    value={values.license_id}
                                    onBlur={() => setFieldTouched('license_id')}
                                    onChangeText={handleChange('license_id')}
                                    placeholderTextColor={Colors.placeHolder}
                                    color={Colors.Sp_Text}
                                    placeholder="License_id"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                />
                            </View>                                                     
{/* PhoneNumber */}
                            <View>
                                <View >
                                    <Text style={{ ...styles.text_footer, marginTop: 15 }} >Phone Number</Text>
                                    <View style={styles.action} >
                                        {/* <Ionicon name="call" color={Colors.PRIMARY} size={20} style={{ flex: 0.5 }} /> */}
                                        <Text style={{ marginLeft:10, flex: 0.5, fontWeight: 'bold' }}>{countryCode}</Text>
                                        <TouchableOpacity onPress={() => setShow(true)} style={{ flex: 0.4 }}>
                                            <Image source={Images.DropDown} style={{height:10,width:10}}  /> 
                                            {/* <Ionicon name="caret-down-outline" size={20} color={Colors.Sp_Text} /> */}
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
                                                //    value={values.gender}
                                                        label="Male"
                                                        onPress={maleHandler}
                                                        state={gender === 'MALE'}
                                                        
                                                    />
                                                   
                                                <View style={{ marginLeft: 125 }}>
                                                    <RadioButton
                                                //   value={values.gender}
                                                        label="Female"
                                                        onPress={femaleHandler}
                                                        state={gender === 'FEMALE'}
                                                      
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

export default PharamcistProfileEditScreen;