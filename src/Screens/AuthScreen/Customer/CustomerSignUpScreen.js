import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, Modal,StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'react-native-image-crop-picker';
import { Formik } from "formik";
import SignUpValidationSchemaCustomer from '../../../ForValidationSchema/SignupValidationSchemaCustomer';
import { Images , Colors } from '../../../CommonConfig';
import {CheckBox,EyeButton,Button,RadioButton,Header} from '../../../Components/Common';
import messaging from '@react-native-firebase/messaging';
import * as registerAction from '../../../Store/Actions/register'
import { useDispatch } from 'react-redux';


const CustomerSignupScreen = props => {
    const [tnc, setTnc] = useState(false);
    const tncHandler = () => {
        setTnc(state => !state);
    };
    const [male, setMale] = useState(false);
    const maleHandler = () => {
        setMale(state => !state);
    setFemale(false);
    };

    const [female, setFemale] = useState(false);
    const femaleHandler = () => {
        setFemale(state => !state);
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
           
            setSelectedImage(image.path)
            setModalVisible(!modalVisible)
        });
}

const dispatch= useDispatch();
    


    return (

        <KeyboardAwareScrollView>
        <View style={styles.screen}>
        <StatusBar barStyle='light-content' />

            {/* SignUp  */}
            <View style={styles.header}>
                <Header 
                Title= "SIGN UP"
                onPress={() => props.navigation.goBack()}
                />
            </View>
            {/* SignUp  */}
            {/* Profile */}
            <View style={styles.profile}>
                <View style={{borderRadius:50,overflow:'hidden'}}>
                {selectedImage ? <Image source={{ uri: selectedImage}} style={{height:100,width:100,}}/> :<Image source={Images.SignupPlaceholder} style={styles.profileImg} />}
                </View>
                <View>
                    <TouchableOpacity style={styles.addIcon}   onPress={()=>setModalVisible(true) } >
                        <Image source={Images.AddIcon} style={styles.addIconImg} />
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
                                onPress={() => {setModalVisible(false)}}
                            >
                            <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </Modal>
                {/* </View> */}
                    

                </View>
            </View>
            {/* Profile */}
            {/* Formik */}
            <View style={styles.Formik_sty} >
                <Formik
                    initialValues={{
                        // image:{},
                        username: '',
                        email: '',
                        gender:'',
                        password: '',
                        passwordConfirm:'',
                        
                    }}
                    onSubmit={(values) =>{
                        const data = {username:values.username, email:values.email, password:values.password, gender:values.gender,}
                        dispatch(registerAction.addDetails(data));
                        console.log(data)
                        props.navigation.navigate('PhoneNumberScreen')
                    }}
                    // onSubmit={onPressRegister}
                    validationSchema={SignUpValidationSchemaCustomer}
                >
                    {({ values, errors, setFieldTouched, touched, handleChange, isValid, setFieldValue , handleSubmit }) => (
                        <View >
                            {/* Input Text */}
                            <View>
                                <Text style={styles.main} > Username </Text>
                                <TextInput
                                    value={values.username}
                                    style={styles.customCss}
                                    placeholderTextColor={Colors.borderBottomColor}
                                    color={Colors.Sp_Text}
                                    onBlur={() => setFieldTouched('username')}
                                    onChangeText={handleChange('username')} 
                                    placeholder="Username"
                                    autoCapitalize='none'

                                />
                                {touched.username && errors.username &&
                                    <Text style={styles.errortext}>{errors.username}</Text>
                                }
                                <Text style={styles.main} > Email </Text>
                                <TextInput
                                    value={values.email}
                                    style={styles.customCss}
                                    placeholderTextColor={Colors.borderBottomColor}
                                    color={Colors.Sp_Text}
                                    onBlur={() => setFieldTouched('email')}
                                    onChangeText={handleChange('email')}
                                    placeholder="E-mail"
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                />
                                {touched.email && errors.email &&
                                    <Text style={styles.errortext}>{errors.email}</Text>
                                }
                                
                                <View >
                                    {/* Gender */}
                                <Text style={styles.main} > Gender </Text>
                                <View>
                                <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                                    {/* male button */}
                                       <View >
                                            <RadioButton 
                                            label="Male" 
                                            onPress={() => {
                                                maleHandler()
                                                setFieldValue('gender','male')
                                            }}
                                            state={male}
                                          
                                          
                                            />
                                            </View> 
                                    {/* male button  end*/}
                                       {/* Female button */}
                                            <View >
                                            <RadioButton 
                                            label="Female"
                                            onPress={() => {
                                                femaleHandler()
                                                setFieldValue('gender','female')
                                            }}
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
                                            placeholderTextColor={Colors.borderBottomColor}
                                            color={Colors.Sp_Text}
                                            placeholder="Password"
                                            onBlur={() => setFieldTouched('password')}
                                            onChangeText={handleChange('password')}
                                            secureTextEntry={!tnceye ? true : false}
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
                                    placeholderTextColor={Colors.borderBottomColor}
                                    color={Colors.Sp_Text}
                                    placeholder='confirm Password'
                                    onBlur={() => setFieldTouched('passwordConfirm')}
                                    onChangeText={handleChange('passwordConfirm')}
                                    secureTextEntry={!tnceyeconf ? true : false}
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
                             
                            {/* Terms & conditions */}
                            <View  >
                                <View style={styles.terms_sty} >
                                    <TouchableOpacity onPress={tncHandler} style={{paddingRight:5}} >
                                        {tnc ? <Image source={Images.CheckBoxActive} style={styles.checkbox} /> :
                                            <Image source={Images.CheckBoxInactive} style={styles.checkbox} />}
                                    </TouchableOpacity>
                                    <View style={styles.textAlign} >
                                        <Text style={styles.tandc} >Accept to<Text style={styles.sp_tandc} >Terms and Conditions</Text> and <Text style={styles.sp_tandc}>Privacy Policy</Text>
                                            <Text style={styles.tandc} > for this app</Text></Text>
                                    </View>
                                </View>
                            </View>
                            {/* Terms & conditions */}
                            {/* Next Button */}
                            <View>
                                {/* <TouchableOpacity onPress={handleSubmit}>
                                    <Text>Next</Text>
                                </TouchableOpacity> */}
                                <Button
                                label="Next"
                                onPress={handleSubmit}
                                />
                                 {/* Next Button */}
                                 </View>

                                <View style={styles.login_sty}>
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('Login') }} >
                                        <View style={styles.signup_sty}>
                                            <Text style={styles.signup} > Already have an Account? <Text style={styles.sp_signup} > Login </Text>   </Text>
                                        </View>
                                    </TouchableOpacity>
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
        backgroundColor: Colors.backgroundColor,
    },
    header:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 5, 
        padding: 10 
    },
    headerText: {
        fontSize:20,
        color:Colors.Sp_Text,
        fontWeight:'bold',
    },
    addIcon: {
        left: Dimensions.get('window').width * 0.12,
        bottom: Dimensions.get('window').width * 0.1,
    },
    profile:{ 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginTop: 10 
    },
    profileImg:{ 
        height: 125, 
        width: 125 
    },
    addIconImg:{ 
        height: 50, 
        width: 50 
    },
    arrow:{ 
        height: 20, 
        width: 30 
    },
    Formik_sty:{ 
        padding: 10 
    },
    errortext:{ 
        fontSize: 11, 
        color:Colors.Error_Textcolor 
    },
    customCss: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderBottomColor,
        width: '100%',
        paddingBottom:2,
        justifyContent: 'space-evenly',
    },
    main: {
        color: Colors.Sp_Text,
        marginTop: 10

    },
    
    text: {
        padding: 10,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    tandc: {
        color: Colors.Sp_Text,
       

    },
    sp_tandc: {
        color: Colors.Blue

    },
    signup: {
        color: Colors.Gray,
        marginBottom: 50,
        fontSize: 20,

    },
    sp_signup: {
        color: 'black',
        marginBottom: 50

    },
    gendercheck:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1, 
        paddingBottom:5, 
        width:'40%' ,
        borderBottomColor: Colors.borderBottomColor,
    },
   
   
   eye_sty:{
       paddingRight:20
    },
   password_sty:{ 
       flexDirection: 'row', 
       justifyContent:'space-evenly',
       alignItems: 'center', 
       paddingLeft:15
    },
   terms_sty:{ 
       flexDirection: 'row',
       marginTop:15, 
       marginBottom: 15,
       paddingRight:5 
    },
   checkbox:{ 
       height: 20, 
       width: 20 
    },
   login_sty:{ 
       width: "100%",
        marginTop: 10 
    },
   signup_sty:{ 
       flexDirection: 'row', 
       alignItems: 'center', 
       justifyContent: 'center' 
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

export default CustomerSignupScreen;