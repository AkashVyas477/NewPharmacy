import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput, ActivityIndicatorsd } from 'react-native';
import { Formik } from 'formik';
import AddressValidationSchema from '../../../../ForValidationSchema/AddressValidationSchema';
import * as addressActions from '../../../../Store/Actions/address';
import { getCurrentPosition } from 'react-native-geolocation-service';
import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Images, Colors } from '../../../../CommonConfig';
import {Header, Button, CheckButton} from '../../../../Components/Common'
import { add } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { postPostLogin } from '../../../../Components/Helpers/ApiHelper';
import Toast from 'react-native-simple-toast';

const AddNewAddres = props => {
    const { t,i18n } = useTranslation();

    const dispatch = useDispatch();
    
    
    const [isLoading, setIsLoading] = useState(false)
    //0-Home 1-Work 2-Other
    const [radio, setRadio] = useState()
    const [select, setIsSelect] = useState(false)
    
    const onPressAdd = async (values,latitude,longitude) => {
        setIsLoading(true)
        let lat, long;
        await GetLocation.getCurrentPosition({
            enableHighAccuracy:true,
            timeout:15000,
        })
        .then(location => {
            // console.log(location.latitude,location.longitude);
            lat = location.latitude;
            long = location.longitude;
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
        
        const data = {
            address_type: values.address_type,
            primary_address: values.primary_address,
            addition_address_info: values.addition_address_info,
            is_select: values.is_select,
            latitude:lat,
            longitude:long
        }
        
        
        console.log("address\n", data)

        const response = await postPostLogin('addAddress',data)
        if (response.success){
            dispatch(addressActions.addAddress(values))
            Toast.show('address added')
            props.navigation.navigate('AddresScreen');
        }

        setIsLoading(false)

    }
    return (
        <View style={styles.screen}>
            {/* Header*/}
            <View style={styles.header_sty}>
                <Header
                    Title={t('common:ManageAddress')}
                    onPress={() => props.navigation.goBack()}
                />
            </View>
                    <Formik
                        initialValues={{
                            address_type: '',
                            primary_address: '',
                            addition_address_info: '',
                            is_select:'',
                        }}
                        onSubmit={(values) => onPressAdd(values)}
                        validationSchema={AddressValidationSchema}
                    >
                        {({ values, errors, setFieldTouched, touched, handleChange, setFieldValue, isValid, handleSubmit }) => (
                            <>
                             <KeyboardAwareScrollView>
                           <View style={styles.screen2} >

                                <Text style={styles.title}>{t('common:AddressType')}</Text>
                                <View style={i18n.language === "ar" ? styles.AddressTypeimg_ar : styles.AddressTypeimg}>
                                    <View style={i18n.language === "ar" ? styles.radiobtn_styl_ar : styles.radiobtn_styl}>
                                        {radio === 0 ?
                                            <Image source={Images.HomeActive} style={styles.acheckIcon} />
                                            :
                                            <TouchableOpacity onPress={() => {
                                                setRadio(0)
                                                setFieldTouched('address_type')
                                                setFieldValue('address_type', 0)
                                            }}>
                                                <Image source={Images.HomeInactive} style={styles.checkIcon} />
                                            </TouchableOpacity>
                                        }
                                        <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 5 }}>
                                            {t('common:Home')}
                                        </Text>
                                    </View>

                                    <View style={i18n.language === "ar" ? styles.radiobtn_styl_ar : styles.radiobtn_styl}>
                                        {radio === 1 ?
                                            <Image source={Images.OfficeActive} style={styles.acheckIcon} />
                                            :
                                            <TouchableOpacity onPress={() => {
                                                setRadio(1)
                                               
                                                setFieldValue('address_type', 1)
                                            }}>
                                                <Image source={Images.OfficeInactive} style={styles.checkIcon} />
                                            </TouchableOpacity>
                                        }
                                        <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 5 }}>
                                            {t('common:Office')}
                                        </Text>
                                    </View>

                                    <View style={i18n.language === "ar" ? styles.radiobtn_styl_ar : styles.radiobtn_styl}>
                                        {radio === 2 ?
                                            <Image source={Images.CurrentActive} style={styles.acheckIcon} />
                                            :
                                            <TouchableOpacity onPress={() => {
                                                setRadio(2)
                                                setFieldTouched('address_type')
                                                setFieldValue('address_type', 2)
                                            }}>
                                                <Image source={Images.CurrentLInactive} style={styles.checkIcon} />
                                            </TouchableOpacity>
                                        }
                                        <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 5 }}>
                                           {t("common:Other")}
                                        </Text>
                                    </View>

                                </View>
                                {touched.address_type && errors.address_type &&
                                    <Text style={{ fontSize: 11, color: Colors.Error_Textcolor, margin: 10 }} >{errors.address_type}</Text>}

                                <Text style={styles.title}>
                                    {t('common:Primaryaddress')}
                                </Text>
                                <View style={i18n.language === "ar" ? styles.container_ar : styles.container}>
                                    <TextInput
                                        value={values.primary_address}
                                        onBlur={() => setFieldTouched("primary_address")}
                                        onChangeText={handleChange("primary_address")}
                                        placeholderTextColor={Colors.placeHolder}
                                        color={Colors.Sp_Text}
                                        placeholder={t('common:Primaryaddress')}
                                        autoCapitalize='sentences'

                                    />
                                </View>
                                {touched.primary_address && errors.primary_address &&
                                    <Text style={{ fontSize: 11, color: Colors.Error_Textcolor, margin: 10 }} >{errors.primary_address}</Text>
                                }
                                <Text style={styles.title}>
                                    {t('common:ADDRESS')}
                                </Text>
                                <View style={i18n.language === "ar" ? styles.container_ar : styles.container}>
                                    <TextInput
                                        value={values.addition_address_info}
                                        onBlur={() => setFieldTouched('addition_address_info')}
                                        onChangeText={handleChange('addition_address_info')}
                                        placeholder={t('common:Enteraddress')}
                                        keyboardType='default'
                                        autoCapitalize='sentences'
                                    />
                                </View>
                                {touched.addition_address_info && errors.addition_address_info &&
                                    <Text style={{ fontSize: 11, color: Colors.Error_Textcolor, margin: 10 }} >{errors.addition_address_info}</Text>
                                }

                                <View style={i18n.language === "ar" ? styles.defaultAddress_ar : styles.defaultAddress}>
                                    <TouchableOpacity 
                                    onPress={()=>{
                                        setIsSelect(!select)
                                        setFieldTouched('is_select')
                                        setFieldValue('is_select', select ? 0:1)
                                    } } 
                                    >
                                        {select  ?
                                        <Image source={Images.CheckBoxActive} style={styles.checkIcon} /> :
                                         <Image source={Images.CheckBoxInactive} style={styles.checkIcon} />
                                        
                                        }
                                    </TouchableOpacity>
 
                                    <Text style={{ fontWeight: 'bold', fontSize:15, padding:5,color: '#999', }}>
                                        {t('common:SaveAddressAsDefault')}
                                    </Text>
                                </View>
                               
                            </View>

                            </KeyboardAwareScrollView>
                            <View>
                             <Button
                             showActivityIndicator={isLoading}
                             label={t('common:Save')}
                             onPress={handleSubmit}
                            disabled={isLoading}
                         />
                         </View>
                         </>
                        )}
                    </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.White,
        padding: 5,
        justifyContent:'space-between'
    },
    header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.White,
    },
    screen2: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.White,
       

    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#999',
        marginBottom: 10,
        marginTop: 15
    },
    container: {
        flexDirection: 'row',
        borderColor: Colors.Sp_Text,
        borderWidth: 0.5,
        justifyContent: 'space-between',
        padding:4,
        borderRadius:7,
        marginTop: 5,
    },
    container_ar: {
        flexDirection: 'row-reverse',
        borderColor: Colors.Sp_Text,
        borderWidth: 0.5,
        justifyContent: 'space-between',
        padding:4,
        borderRadius:7,
        marginTop: 5,
    },
    AddressTypeimg:{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' },
    AddressTypeimg_ar:{ flexDirection: 'row-reverse', justifyContent: 'space-evenly', alignItems: 'center' },
    radiobtn_styl:{ flexDirection: 'row', alignItems: 'center', padding: 5 },
    radiobtn_styl_ar:{ flexDirection: 'row-reverse', alignItems: 'center', padding: 5 },
    checkIcon: {
        height: 28,
        width: 28,

    },
    acheckIcon: {
        height: 28,
        width: 28
    },
    defaultAddress:{ 
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop:15
     },
     defaultAddress_ar:{ 
        flexDirection: 'row-reverse', 
        alignItems: 'center',
        marginTop:15
     }

});

export default AddNewAddres;