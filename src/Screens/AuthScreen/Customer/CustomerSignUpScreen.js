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
import { useTranslation } from 'react-i18next';


const CustomerSignupScreen = props => {

    const {t, i18n}=useTranslation()
    const role = props.route.params.role

    const [tnc, setTnc] = useState(false);
    const [tncTouched, setTncTouched] = useState(false)
    const tncHandler = () => {
        setTncTouched(true)
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
        }).then(image => {
           
            setSelectedImage(image)
            console.log(image)
            setModalVisible(!modalVisible)
      });
}
const pickFromGallery = () => {
    ImagePicker.openPicker({
        }).then(image => {
           
            setSelectedImage(image)
            console.log(image)
            setModalVisible(!modalVisible)
        });
}

const dispatch= useDispatch();
    


    return (

      
        <View style={styles.screen}>
        <StatusBar backgroundColor={Colors.PRIMARY} barStyle='light-content' />

            {/* SignUp  */}
            <View style={styles.Header}>
                <Header 
                Title= {t("auth:SIGNUP")}
                onPress={() => props.navigation.goBack()}
                />
            </View>
            {/* SignUp  */}
            {/* Profile */}
            <KeyboardAwareScrollView >
            <View style={styles.Profile}>
                <View style={{borderRadius:50,overflow:'hidden'}}>
                {selectedImage ? <Image source={{ uri: selectedImage.path}} style={{height:100,width:100,}}/> :<Image source={Images.SignupPlaceholder} style={styles.ProfileImg} />}
                </View>
                <View>
                    <TouchableOpacity style={styles.addIcon}   onPress={()=>setModalVisible(true) } >
                        <Image source={Images.AddIcon} style={styles.addIconImg} />
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
                                onPress={() => {setModalVisible(false)}}
                            >
                            <Text style={styles.textStyle}>{t('common:Close')}</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </Modal>
             
                    

                </View>
            </View>
            {/* Profile */}
            {/* Formik */}
            <View style={styles.Formik_sty} >
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        gender:'',
                        password: '',
                        passwordConfirm:'',
                        
                    }}
                    onSubmit={(values) =>{
                        const data = {username:values.username, email:values.email, password:values.password, gender:values.gender, role ,selectedImage}
                        
                        props.navigation.navigate('PhoneNumberScreen',{data})
                    }}
                   
                    validationSchema={SignUpValidationSchemaCustomer}
                >
                    {({ values, errors, setFieldTouched, touched, handleChange, isValid, setFieldValue , handleSubmit }) => (
                        <View >
                            {/* Input Text */}
                            <View>
                                <Text style={styles.main} > {t('auth:Username')} </Text>
                                <TextInput
                                    value={values.username}
                                    style={styles.customCss}
                                    placeholderTextColor={Colors.placeHolder}
                                    color={Colors.Sp_Text}
                                    onBlur={() => setFieldTouched('username')}
                                    onChangeText={handleChange('username')} 
                                    placeholder={t('auth:Username')} 
                                    autoCapitalize='none'

                                />
                                {touched.username && errors.username &&
                                    <Text style={styles.errortext}>{t('valid:Usernameisrequired')}</Text>
                                }
                                <Text style={styles.main} > {t('auth:Email')}</Text>
                                <TextInput
                                    value={values.email}
                                    style={styles.customCss}
                                    placeholderTextColor={Colors.placeHolder}
                                    color={Colors.Sp_Text}
                                    onBlur={() => setFieldTouched('email')}
                                    onChangeText={handleChange('email')}
                                    placeholder={t('auth:Email')}
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                />
                                {touched.email && errors.email &&
                                    <Text style={styles.errortext}>{t('valid:Emailisarequiredfield')}</Text>
                                }
                                
                                <View >
                                    {/* Gender */}
                                <Text style={styles.main} > {t('common:Gender')} </Text>
                                <View>
                                <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                                    {/* male button */}
                                       <View >
                                            <RadioButton 
                                            label={t("common:Male" )}
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
                                            label={t("common:Female")}
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
                                <View >
                                    <Text style={styles.main} > {t('auth:Password')} </Text>
                                    <View  style={i18n.language === "ar" ? styles.password_sty1 : styles.password_sty}>
                                        <TextInput
                                            value={values.password}
                                            // style={styles.customCss}
                                            placeholderTextColor={Colors.placeHolder}
                                            color={Colors.Sp_Text}
                                            placeholder={t('auth:Password')}
                                            onBlur={() => setFieldTouched('password')}
                                            onChangeText={handleChange('password')}
                                            secureTextEntry={!tnceye ? true : false}
                                            autoCapitalize='none'
                                        />
                                        <EyeButton style={i18n.language === "ar" ? styles.eye_sty_ar : styles.eye_sty} tnceye={!tnceye} onEyePress={ () => {setTncEye(!tnceye)} }/>
                                    </View>
                                    {touched.password && errors.password &&
                                        <Text style={styles.errortext}>{t('valid:Passwordcannotbelessthan6characters')}</Text>
                                    }
                                </View>
                                    <View >
                                <Text style={styles.main} > {t('auth:ConfirmPassword')} </Text>
                                <View  style={i18n.language === "ar" ? styles.password_sty1 : styles.password_sty}>
                                <TextInput
                                    value={values.passwordConfirm}
                                    // style={styles.customCss}
                                    placeholderTextColor={Colors.placeHolder}
                                    color={Colors.Sp_Text}
                                    placeholder={t('auth:ConfirmPassword')}
                                    onBlur={() => setFieldTouched('passwordConfirm')}
                                    onChangeText={handleChange('passwordConfirm')}
                                    secureTextEntry={!tnceyeconf ? true : false}
                                    autoCapitalize='none'
                                />
                                
                                <EyeButton style={i18n.language === "ar" ? styles.eye_sty_ar : styles.eye_sty} tnceye={!tnceyeconf} onEyePress={ () => {setTncEyeconf(!tnceyeconf)} }/>

                                </View>
                                {touched.passwordConfirm && errors.passwordConfirm &&
                                    <Text style={styles.errortext}>{t('valid:Passwordsdoesnotmatch')}</Text>
                                }
                                </View>
                                {/* Password end */}  
                            </View>
                             
                            {/* Terms & conditions */}
                            <View  >
                                <View style={i18n.language === "ar" ? styles.terms_sty_ar : styles.terms_sty} >
                                    <TouchableOpacity onPress={tncHandler} style={{paddingRight:5,marginTop:5}} >
                                        {tnc ? <Image source={Images.CheckBoxActive} style={styles.checkbox} /> :
                                            <Image source={Images.CheckBoxInactive} style={styles.checkbox} />}
                                    </TouchableOpacity>
                                            <Text style={styles.tandc} >{t('auth:Acceptto')} <Text style={styles.sp_tandc} >{t('auth:TermsandConditions')}</Text> {t('auth:and')}<Text style={styles.sp_tandc}>{t('auth:PrivacyPolicy')} </Text>{t('auth:forthisapp')} </Text>
                                </View>
                                {tncTouched ? (tnc ? null : <Text style={styles.errortext}>{t('auth:Pleasecheckthetermsandconditions')}</Text>) : null}

                            </View>
                            {/* Terms & conditions */}
                            {/* Next Button */}
                            <View>
                                <Button
                                label={t("auth:Next")}
                                disabled={!isValid }
                                onPress={tnc ? handleSubmit: null}
                                />
                                 {/* Next Button */}
                                 </View>

                                <View style={styles.login_sty}>
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('Login') }} >
                                        <View style={styles.signup_sty}>
                                            <Text style={styles.signup} >{t('auth:AlreadyhaveanAccount')} <Text style={styles.sp_signup} > {t('auth:Login')} </Text>   </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                        </View>

                    )}
                </Formik>
            </View >
            </KeyboardAwareScrollView>
            {/* Formik */}
        </View >
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    Header:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 5, 
        padding: 10 
    },
    addIcon: {
        left: Dimensions.get('window').width * 0.12,
        bottom: Dimensions.get('window').width * 0.1,
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
    addIconImg:{ 
        height: 50, 
        width: 50 
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
        paddingLeft: 3
    },
    tandc: {
        color: Colors.Sp_Text,
       

    },
    sp_tandc: {
        color: Colors.Blue

    },
    signup: {
        color: Colors.Gray,
        // marginBottom: 50,
        fontSize: 20,

    },
    sp_signup: {
        color: 'black',
        marginBottom: 50

    },
   
    eye_sty_ar:{
        paddingLeft:25
     },
   eye_sty:{
       paddingRight:25
    },
    password_sty1:{ 
        flexDirection: 'row-reverse', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        borderBottomColor: Colors.borderBottomColor,
        borderBottomWidth: 1,
     },
   password_sty:{ 
       flexDirection: 'row', 
       justifyContent: 'space-between',
       alignItems: 'center', 
       borderBottomColor: Colors.borderBottomColor,
       borderBottomWidth: 1,
    },
    terms_sty_ar: {
        flexDirection: 'row-reverse',
        marginTop: 10,
        marginBottom: 5,

    },
   terms_sty:{ 
       flexDirection: 'row',
       marginTop:12, 
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