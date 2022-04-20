import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions,Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from "formik";
import * as ImagePicker from 'react-native-image-crop-picker';
import SignUpValidationSchema from '../../../ForValidationSchema/SignupValidationSchema';
import {Images,Colors} from '../../../CommonConfig'
import { Button,EyeButton,CheckBox,RadioButton, Header } from '../../../Components/Common';
import { postRequest } from '../../../Components/Helpers/ApiHelper';
import { useDispatch } from 'react-redux';

const PharmacistSignUpScreen = props =>{

    const [tnc, setTnc] = useState(false);
    const tncHandler = () => {
        setTnc(state => !state);
    };

    const [male, setMale] = useState(false);
    const maleHandler = () => {
        setMale(true);
    setFemale(false);
    };

    const [female, setFemale] = useState(false);
    const femaleHandler = () => {
        setFemale(true);
        setMale(false);
    };
    
    const [tnceye, setTncEye] = useState(false);
    const [tnceyeconf, setTncEyeconf] = useState(false);


  
const [selectedImage, setSelectedImage] = useState(null)
const [modalVisible, setModalVisible] = useState(false);
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
        console.log(image);
         setSelectedImage(image.path)
         setModalVisible(!modalVisible)
     });
}


const dispatch= useDispatch();


    return (
        <KeyboardAwareScrollView>
        <View style={styles.screen}>

            {/* SignUp  */}
            <View style={styles.Header}>
                <Header 
                Title="SIGN UP"
                onPress={() => props.navigation.goBack()}
                />
            </View>
            {/* SignUp  */}
            {/* Profile */}
            <View style={styles.Profile}>
                <View style={{borderRadius:50,overflow:'hidden'}}>
                {selectedImage ? <Image source={{ uri: selectedImage}} style={{height:100,width:100}}/> : <Image source={Images.SignupPlaceholder} style={styles.ProfileImg} />}
                </View>
                <View>
                    <TouchableOpacity style={styles.addIcon} onPress={()=>setModalVisible(true) } >
                    <Image source={Images.AddIcon}style={styles.AddImgIcon} />
                    </TouchableOpacity>

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
                                onPress={() => {setModalVisible(false)}}
                            >
                            <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </Modal>

                </View>
            </View>
            {/* Profile */}
            {/* Formik */}
            <View style={styles.formik} >
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: ''
                    }}
                    onSubmit={values => {
                        const data = {username: values.username, email: values.email, password: values.password}
                        console.log(data)
                        dispatch(AuthAction.addDetails(data));
                        
                        props.navigation.navigate('PhoneNumberScreen')
                    }} 
                    validationSchema={SignUpValidationSchema}
                >
                    {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                        <View >
                            {/* Input Text */}
                            <View>
                                <Text style={styles.main} > Username </Text>
                                <TextInput
                                    value={values.username}
                                    style={styles.customCss}
                                    onBlur={() => setFieldTouched('username')}
                                    onChangeText={handleChange('username')}
                                    placeholder="Username"
                                    autoCapitalize='none'

                                />
                                {touched.username && errors.username &&
                                    <Text style={styles.errorText}>{errors.username}</Text>
                                }
                                <Text style={styles.main} > Email </Text>
                                <TextInput
                                    value={values.email}
                                    style={styles.customCss}
                                    onBlur={() => setFieldTouched('email')}
                                    onChangeText={handleChange('email')}
                                    placeholder="E-mail"
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                />
                                {touched.email && errors.email &&
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                }

                                {/* Store Name */}
                            <View>
                            <Text style={styles.main} > Store Name </Text>
                                <TextInput
                                    value={values.storeName}
                                    style={styles.customCss}
                                    onBlur={() => setFieldTouched('storeName')}
                                    onChangeText={handleChange('storeName')}
                                    placeholder="StoreName"
                                    autoCapitalize='none'
                                   
                                />
                                {touched.storeName && errors.storeName &&
                                    <Text style={styles.errorText}>{errors.storeName}</Text>
                                }
                            </View>

                            {/*License Id */}
                            <View>
                            <Text style={styles.main} > License ID </Text>
                                <TextInput
                                    value={values.licenseId}
                                    style={styles.customCss}
                                    onBlur={() => setFieldTouched('licenseId')}
                                    onChangeText={handleChange('licenseId')}
                                    placeholder="License ID "
                                    autoCapitalize='none'
                                   
                                />
                                {touched.licenseId && errors.licenseId &&
                                    <Text style={styles.errorText}>{errors.licenseId}</Text>
                                }
                            </View>
                                 {/*License Id end */}

                                <View>
                                    {/* Gender */}
                                <Text style={styles.main} > Gender </Text>
                                <View>
                                    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                                    {/* male button */}
                                       <View >
                                            <RadioButton 
                                            label="Male" 
                                            onPress={maleHandler}
                                            state={male}
                                            />
                                            </View> 
                                    {/* male button  end*/}
                                       {/* Female button */}
                                            <View >
                                            <RadioButton 
                                            label="Femal" 
                                            onPress={femaleHandler}
                                            state={female}
                                            />
                                                
                                       {/* Female button */}
                                       </View>
                                        </View> 
                                 </View>  
                                  {/* Gender end */}  
                                </View>
                                
                                 {/* Password Start */}  
                                 <View>
                                    <Text style={styles.main} > Password </Text>
                                    <View  style={styles.password_sty}>
                                        <TextInput
                                            value={values.password}
                                            style={styles.customCss}
                                            placeholder="Password"
                                            onBlur={() => setFieldTouched('password')}
                                            onChangeText={handleChange('password')}
                                            secureTextEntry={tnceye ? true : false}
                                            autoCapitalize='none'
                                        />
                                        <EyeButton style={styles.eye_sty} tnceye={!tnceye} onEyePress={ () => {setTncEye(!tnceye)} }/>
                                    </View>
                                    {touched.password && errors.password &&
                                        <Text style={styles.errortext}>{errors.password}</Text>
                                    }
                                </View>
                                    <View  >
                                <Text style={styles.main} > Confirm Password </Text>
                                <View  style={styles.password_sty}>
                                <TextInput
                                    value={values.passwordConfirm}
                                    style={styles.customCss}
                                    placeholder='confirm Password'
                                    onBlur={() => setFieldTouched('passwordConfirm')}
                                    onChangeText={handleChange('passwordConfirm')}
                                    secureTextEntry={tnceyeconf ? true : false}
                                    autoCapitalize='none'
                                />
                                
                                <EyeButton style={styles.eye_sty} tnceye={!tnceyeconf} onEyePress={ () => {setTncEyeconf(!tnceyeconf)} }/>

                                </View>
                                {touched.passwordConfirm && errors.passwordConfirm &&
                                    <Text style={styles.errortext}>{errors.passwordConfirm}</Text>
                                }
                                </View>
                                {/* Password end */}  
                            </View>
                            {/* /* Terms & conditions */}
                            <View  >
                                <View style={{ flexDirection: 'row',marginTop:15, marginBottom: 15, }} >
                                    <TouchableOpacity onPress={tncHandler} style={{paddingRight:5}} >
                                        {tnc ? <Image source={Images.CheckBoxActive} style={styles.checkbox} /> :
                                            <Image source={Images.CheckBoxInactive} style={styles.checkbox} />}
                                    </TouchableOpacity>
                                    <View style={{}}>
                                        <Text style={styles.tandc} >Accept to<Text style={styles.sp_tandc} >Terms and Conditions</Text> and <Text style={styles.sp_tandc}>Privacy Policy</Text>
                                            <Text style={styles.tandc} > for this app</Text></Text>
                                    </View>
                                </View>
                            </View>
                            {/* Terms & conditions */}
                            {/* Next Button */}
                            <View>
                                <TouchableOpacity onPress={() => {
                                    props.navigation.navigate('PhoneNumberScreen')
                                }}>
                                    <View style={styles.buttoncon}>
                                        <Text style={styles.Button}> Next </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.signup_sty}>
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('Login') }} >
                                        <View style={styles.touchsignup}>
                                            <Text style={styles.signup} > Already have an Account? <Text style={styles.sp_signup} > Login </Text>   </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/* Next Button */}
                                {/* Input Text */}
                            </View>
                        </View>

                    )}
                </Formik>
            </View >
            {/* Formik */}
        </View >
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor:Colors.backgroundColor,
    },
    Header:{
         flexDirection: 'row',
          alignItems: 'center',
           marginTop: 5, padding: 10 
        },
    arrow:{ height: 20, width: 30 },
    addIcon: {
        left: Dimensions.get('window').width * 0.12,
        bottom: Dimensions.get('window').width * 0.1,
    },
    TextSignUp:{
        fontSize: 25,
        color: 'black',
        paddingLeft: 115,
         },
    Profile:{ 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginTop: 10 
    },
    ProfileImg:{
        height: 125,
         width: 125 
        },
    AddImgIcon:{ 
        height: 50, 
        width: 50 
    },
    formik:{ padding:10 },
    
    customCss: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderBottomColor,
        width: '100%',
        paddingBottom:2,
        justifyContent: 'space-evenly'
    },
    main: {
        color: 'black',
        marginTop:10,

    },
    Button: {
        color: 'white',
        textAlign: 'center',

    },
    buttoncon: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        height: 40,
        width: "100%",
        justifyContent: 'center',
    },
    text: {
        padding: 10,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    errorText:{ 
        fontSize: 11, 
        color: 'red' 
    },
    tandc: {
        color: Colors.Sp_Text

    },
    sp_tandc: {
        color: Colors.Blue

    },
    signup: {
        color: Colors.Gray,
        marginBottom:10,
        fontSize: 20,



    },
    eye_sty:{paddingRight:20},
    sp_signup: {
        color: Colors.Sp_Text,
        marginBottom: 50

    }, 
    checkbox:{ 
        height: 20, 
        width: 20 
    },
    signup_sty:{ 
        width: "100%", 
        marginTop: 10 
    },
    touchsignup:{ 
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center'
     },
     password_sty:{ 
         flexDirection: 'row', 
         justifyContent:'space-evenly',
         alignItems: 'center', 
         paddingLeft:15
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
            marginVertical:5,
            width:200
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
            fontWeight:"bold",
            fontSize:20
        },

});

export default PharmacistSignUpScreen;