import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, Modal,StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from "formik";
import * as ImagePicker from 'react-native-image-crop-picker';
import SignUpValidationSchema from '../../../ForValidationSchema/SignupValidationSchema';
import { Images, Colors } from '../../../CommonConfig'
// import { Button,EyeButton,CheckBox,RadioButton, Header } from '../../../Components/Common';
import Button from '../../../Components/Common/Button';
import EyeButton from '../../../Components/Common/EyeButton';
import CheckBox from '../../../Components/Common/CheckBox';
import RadioButton from '../../../Components/Common/RadioButton';
import Header from '../../../Components/Common/Header';
import { postRequest } from '../../../Components/Helpers/ApiHelper';
import { useDispatch } from 'react-redux';
import * as registerAction from '../../../Store/Actions/register'
import { useTranslation } from 'react-i18next';


const PharmacistSignUpScreen = props => {
    const { t, i18n } = useTranslation()
    const role = props.route.params.role

    const [tnc, setTnc] = useState(false);
    const [tncTouched, setTncTouched] = useState(false)
    const tncHandler = () => {
        setTncTouched(true)
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
            console.log(image);
            setSelectedImage(image)
            setModalVisible(!modalVisible)
        });
    }


    const dispatch = useDispatch();


    return (
        
            <View style={styles.screen}>
            <StatusBar backgroundColor={Colors.PRIMARY} barStyle='light-content' />
                {/* SignUp  */}
                <View style={styles.Header}>
                    <Header
                        Title={t("auth:SIGNUP")}
                        onPress={() => props.navigation.goBack()}
                    />
                </View>

                <KeyboardAwareScrollView>
                {/* SignUp  */}
                {/* Profile */}
                <View style={styles.Profile}>
                    <View style={{ borderRadius: 50, overflow: 'hidden' }}>
                        {selectedImage ? <Image source={{ uri: selectedImage.path }} style={{ height: 100, width: 100 }} /> : <Image source={Images.SignupPlaceholder} style={styles.ProfileImg} />}
                    </View>
                    <View>
                        <TouchableOpacity style={styles.addIcon} onPress={() => setModalVisible(true)} >
                            <Image source={Images.AddIcon} style={styles.AddImgIcon} />
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
                                        onPress={() => { setModalVisible(false) }}
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
                <View style={styles.formik} >
                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            passwordConfirm: "",
                            gender: '',
                            licenseId: '',
                            storeName: '',

                        }}
                        onSubmit={values => {
                            const data = { username: values.username, email: values.email, password: values.password, passwordConfirm: values.passwordConfirm, gender: values.gender, storeName: values.storeName, licenseId: values.licenseId, role, selectedImage }
                            // console.log(dispatch)
                            dispatch(registerAction.addDetails(data));
                            props.navigation.navigate('PhoneNumberScreen', { data })
                        }}
                        validationSchema={SignUpValidationSchema}
                    >
                        {({ values, errors, setFieldTouched, touched, handleChange, isValid, setFieldValue, handleSubmit }) => (
                            <View >
                                {/* Input Text */}
                                <View>
                                    <Text style={styles.main} > {t('auth:Username')} </Text>
                                    <TextInput
                                        value={values.username}
                                        style={styles.customCss}
                                        onBlur={() => setFieldTouched('username')}
                                        onChangeText={handleChange('username')}
                                        placeholderTextColor={Colors.placeHolder}
                                        color={Colors.Sp_Text}
                                        placeholder={t('auth:Username')}
                                        autoCapitalize='none'

                                    />
                                    {touched.username && errors.username &&
                                        <Text style={styles.errorText}>{t('valid:Usernameisrequired')}</Text>
                                    }
                                    <Text style={styles.main} > {t('auth:Email')} </Text>
                                    <TextInput
                                        value={values.email}
                                        style={styles.customCss}
                                        onBlur={() => setFieldTouched('email')}
                                        onChangeText={handleChange('email')}
                                        placeholderTextColor={Colors.placeHolder}
                                        color={Colors.Sp_Text}
                                        placeholder={t('auth:Email')}
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                    />
                                    {touched.email && errors.email &&
                                        <Text style={styles.errorText}>{t('valid:Emailisarequiredfield')}</Text>
                                    }

                                    {/* Store Name */}
                                    <View>
                                        <Text style={styles.main} > {t('auth:StoreName')} </Text>
                                        <TextInput
                                            value={values.storeName}
                                            style={styles.customCss}
                                            onBlur={() => setFieldTouched('storeName')}
                                            onChangeText={handleChange('storeName')}
                                            placeholderTextColor={Colors.placeHolder}
                                            color={Colors.Sp_Text}
                                            placeholder={t('auth:StoreName')}
                                            autoCapitalize='none'

                                        />
                                        {touched.storeName && errors.storeName &&
                                            <Text style={styles.errorText}>{t('valid:StoreNameisrequired')}</Text>
                                        }
                                    </View>

                                    {/*License Id */}
                                    <View>
                                        <Text style={styles.main} > {t('auth:LicenseID')} </Text>
                                        <TextInput
                                            value={values.licenseId}
                                            style={styles.customCss}
                                            onBlur={() => setFieldTouched('licenseId')}
                                            onChangeText={handleChange('licenseId')}
                                            placeholderTextColor={Colors.placeHolder}
                                            color={Colors.Sp_Text}
                                            placeholder={t('auth:LicenseID')}
                                            autoCapitalize='none'

                                        />
                                        {touched.licenseId && errors.licenseId &&
                                            <Text style={styles.errorText}>{t('valid:LicenseIDisrequired')}</Text>
                                        }
                                    </View>
                                    {/*License Id end */}

                                    <View>
                                        {/* Gender */}
                                        <Text style={styles.main} > {t('common:Gender')} </Text>
                                        <View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                {/* male button */}
                                                <View >
                                                    <RadioButton
                                                        label={t("common:Male")}
                                                        onPress={() => {
                                                            maleHandler()
                                                            setFieldValue('gender', 'male')
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
                                                            setFieldValue('gender', 'female')
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
                                    <View style={{ padding: 1, paddingHorizontal: 2 }}>
                                        <Text style={styles.main} > {t('auth:Password')} </Text>
                                        <View style={i18n.language === "ar" ? styles.password_sty1 : styles.password_sty}>
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
                                            <EyeButton style={i18n.language === "ar" ? styles.eye_sty_ar : styles.eye_sty} tnceye={!tnceye} onEyePress={() => { setTncEye(!tnceye) }} />
                                        </View>
                                        {touched.password && errors.password &&
                                          <Text style={styles.errorText}>{t('valid:Passwordcannotbelessthan6characters')}</Text>
                                            // <Text style={styles.errorText}>{errors.password}</Text>
                                        }
                                    </View>
                                    <View style={{ padding: 1, paddingHorizontal: 2 }}>
                                        <Text style={styles.main} > {t('auth:ConfirmPassword')} </Text>
                                        <View style={i18n.language === "ar" ? styles.password_sty1 : styles.password_sty}>
                                            <TextInput
                                                value={values.passwordConfirm}
                                                // style={{paddingLeft:20}}
                                                placeholderTextColor={Colors.placeHolder}
                                                color={Colors.Sp_Text}
                                                placeholder={t('auth:ConfirmPassword')}
                                                onBlur={() => setFieldTouched('passwordConfirm')}
                                                onChangeText={handleChange('passwordConfirm')}
                                                secureTextEntry={!tnceyeconf ? true : false}
                                                autoCapitalize='none'
                                            />
                                            <EyeButton style={i18n.language === "ar" ? styles.eye_sty_ar : styles.eye_sty} tnceye={!tnceyeconf} onEyePress={() => { setTncEyeconf(!tnceyeconf) }} />
                                        </View>
                                        {touched.password && errors.passwordConfirm &&
                                          <Text style={styles.errorText}>{t('valid:Passwordsdoesnotmatch')}</Text>
                                            // <Text style={styles.errorText}>{errors.password}</Text>
                                        }
                                    </View>
                                    {/* Password end */}
                                </View>
                                {/* /* Terms & conditions */}

                                <View style={i18n.language === "ar" ? styles.terms_sty_ar : styles.terms_sty} >
                                    <TouchableOpacity onPress={tncHandler} style={{ paddingRight: 5, marginTop: 5 }} >
                                        {tnc ? <Image source={Images.CheckBoxActive} style={styles.checkbox} /> :
                                            <Image source={Images.CheckBoxInactive} style={styles.checkbox} />}
                                    </TouchableOpacity>
                                    <Text style={styles.tandc} >{t('auth:Acceptto')} <Text style={styles.sp_tandc} >{t('auth:TermsandConditions')}</Text> {t('auth:and')} <Text style={styles.sp_tandc}>{t('auth:PrivacyPolicy')} </Text>{t('auth:forthisapp')} </Text>
                                    {/* <Text style={styles.tandc} >Accept to <Text style={styles.sp_tandc} >Terms {'&'} Conditions</Text> and <Text style={styles.sp_tandc}>Privacy Policy </Text>for       this app </Text> */}
                                </View>
                                {tncTouched ? (tnc ? null : <Text style={styles.errorText}>{t('auth:Pleasecheckthetermsandconditions')}</Text>) : null}
                                {/* {tncTouched ? (tnc ? null : <Text style={styles.errorText}>Please check the terms and conditions.</Text>) : null} */}
                                {/* Terms & conditions */}
                                {/* Next Button */}
                                <View>
                                    <Button
                                        label={t("auth:Next")}
                                        disabled={!isValid}
                                        onPress={tnc ? handleSubmit : null}
                                    />
                                    <View style={styles.signup_sty}>
                                        <TouchableOpacity onPress={() => { props.navigation.navigate('Login') }} >
                                            <View style={styles.touchsignup}>
                                            <Text style={styles.signup} > {t('auth:AlreadyhaveanAccount')} <Text style={styles.sp_signup} > {t('auth:Login')} </Text>   </Text>
                                                {/* <Text style={styles.signup} > Already have an Account? <Text style={styles.sp_signup} > Login </Text>   </Text> */}
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
    Header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
         padding: 10
    },
    arrow: { height: 20, width: 30 },
    addIcon: {
        left: Dimensions.get('window').width * 0.12,
        bottom: Dimensions.get('window').width * 0.1,
    },
    TextSignUp: {
        fontSize: 25,
        color: 'black',
        paddingLeft: 115,
    },
    Profile: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10
    },
    ProfileImg: {
        height: 125,
        width: 125
    },
    AddImgIcon: {
        height: 50,
        width: 50
    },
    formik: { padding: 10 },

    customCss: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderBottomColor,
        width: '100%',
        paddingBottom: 2,
        justifyContent: 'space-evenly'
    },
    customCss_ar: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderBottomColor,
        // width: '100%',
        paddingBottom: 2,
        justifyContent: 'space-between'
    },
    main: {
        color: Colors.Sp_Text,
        paddingLeft: 3

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
    errorText: {
        fontSize: 11,
        color: Colors.Error_Textcolor
    },
    tandc: {
        color: Colors.Sp_Text,
        textAlign: 'auto',
    },
    sp_tandc: {
        color: Colors.Blue

    },
    signup: {
        color: Colors.Gray,
        marginBottom: 10,
        fontSize: 20,
    },
    eye_sty_ar: {
        paddingLeft: 25
    },
    eye_sty: { 
        paddingRight: 25
     },
    sp_signup: {
        color: Colors.Sp_Text,
        marginBottom: 50

    },
    checkbox: {
        height: 20,
        width: 20
    },
    signup_sty: {
        width: "100%",
        marginTop: 10
    },
    touchsignup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    password_sty1: {
        // flexDirection: 'row',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: Colors.borderBottomColor,
        borderBottomWidth: 1,
     
    },
    password_sty: {
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
    terms_sty: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,
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

});

export default PharmacistSignUpScreen;