import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput, ActivityIndicatorsd } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'
import AddressValidationSchema from '../../../../ForValidationSchema/AddressValidationSchema';
import * as addressActions from '../../../../Store/Actions/address';
import { getCurrentPosition } from 'react-native-geolocation-service';
import GetLocation from 'react-native-get-location'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Images, Colors } from '../../../../CommonConfig';
import {Header,Button,CheckButton}from '../../../../Components/Common'
import { useDispatch } from 'react-redux';
import { postPostLogin,deletePost } from '../../../../Components/Helpers/ApiHelper';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditAddress = props => {
    const { t,i18n } = useTranslation();
    const address = props.route.params.item
    const [radio, setRadio] = useState(address.address_type);
    const [select, setIsSelect] = useState(false)
    const [delLoader, setDelLoader] = useState(false)
    const [editLoader, setEditLoader] = useState(false)
    const [activeAddress, setActiveAddress] = useState({})

    const onPressDelete = async()=>{
        setDelLoader(true)
        const data={
            id:address.id
        }
        const DeleteResponse = await deletePost(`deleteAddress/${address.id}`)
        if(!DeleteResponse.success){
            console.log(DeleteResponse.data)
        }else{
            Toast.show('Address deleted successfully!')
            props.navigation.goBack()
        }
        console.log("delete\n",data)
        setDelLoader(false)
    }

    const onPressSave= async(values)=>{
        setEditLoader(true)
        let lat, long;
        await GetLocation.getCurrentPosition({
            enableHighAccuracy:true,
            timeout:15000,
        })
        .then(location => {
     
            lat = location.latitude;
            long = location.longitude;
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
        const data= {
            id:address.id,
            addition_address_info:values.addition_address_info,
            address_type:values.address_type,
            primary_address:values.primary_address,
            is_select: values.is_select,
            latitude:lat,
            longitude:long
        }
        console.log("address\n", data)
        const SaveResponse = await postPostLogin(`updateAddress/${address.id}`,data)
        console.log("EditAddress\n",SaveResponse)
        if(!SaveResponse.success){
            console.log(SaveResponse.data);
        }else{
            await AsyncStorage.setItem('activeAddress', JSON.stringify(data))
            Toast.show('Addres edited Successfuly!')
            props.navigation.goBack();
        }
        setEditLoader(false)
    }


    return (
        <View style={styles.screen}>
            <View style={styles.header_sty}>
                <Header
                    Title={t('common:EditAddress')}
                    onPress={() => props.navigation.goBack()}
                />
            </View>

            <Formik
                initialValues={{
                    address_type: address.address_type,
                    primary_address: address.primary_address,
                    addition_address_info: address.addition_address_info,
                    is_select: address.is_select,
                }}
                onSubmit={values=> onPressSave(values)}
                validationSchema={
                    yup.object().shape({
                        address_type: yup.number(),
                        primary_address: yup.string(),
                        addition_address_info: yup.string(),
                        is_select: yup.number(),
                    })
                }
            >
                {({ values, errors, setFieldTouched, touched, handleChange, setFieldValue, isValid, handleSubmit }) => (
                    <>
                    <KeyboardAwareScrollView>
                        <View style={styles.inputContainer}>
                            <Text style={styles.title}>{t('common:AddressType')}</Text>
                            <View style={i18n.language === "ar" ? styles.AddressTypeimg_ar : styles.AddressTypeimg}>
                                <View style={i18n.language === "ar" ? styles.radioBtnContainer_ar : styles.radioBtnContainer}>
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
                                    <Text style={styles.radioBtnText}>{t('common:Home')}</Text>
                                </View>
                                <View style={i18n.language === "ar" ? styles.radioBtnContainer_ar : styles.radioBtnContainer}>
                                    {radio === 1 ?
                                      <Image source={Images.OfficeActive} style={styles.acheckIcon} />
                                        :
                                        <TouchableOpacity onPress={() => {
                                            setRadio(1)
                                            setFieldTouched('address_type')
                                            setFieldValue('address_type', 1)
                                        }}>
                                           <Image source={Images.OfficeInactive} style={styles.checkIcon} />
                                        </TouchableOpacity>
                                    }
                                    <Text style={styles.radioBtnText}>{t('common:Office')}</Text>
                                </View>

                                <View style={i18n.language === "ar" ? styles.radioBtnContainer_ar : styles.radioBtnContainer}>
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
                                    <Text style={styles.radioBtnText}>{t('common:Other')}</Text>
                                </View>

                            </View>

                            <Text style={styles.title}>{t('common:Primaryaddress')}</Text>
                            <View style={i18n.language === "ar" ? styles.container_ar : styles.container}>
                                <TextInput 
                                    value={values.primary_address}
                                    onBlur={ () => setFieldTouched('primary_address')}
                                    onChangeText={handleChange('primary_address')}
                                    placeholder={t("common:Enteraddress")}
                                    keyboardType='default'
                                />
                            </View>

                            <Text style={styles.title}>{t('common:ADDRESS')}</Text>
                            <View style={i18n.language === "ar" ? styles.container_ar : styles.container}>
                                <TextInput 
                                    value={values.addition_address_info}
                                    onBlur={ () => setFieldTouched('addition_address_info')}
                                    onChangeText={handleChange('addition_address_info')}
                                    placeholder={t("common:Enteraddress")}
                                    keyboardType='default'
                                />
                            </View>

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
                             showActivityIndicator={delLoader}
                             label={t("common:Delete")}
                             onPress={onPressDelete}
                            />
                            <Button
                            showActivityIndicator={editLoader}
                             label={t("common:Save")}
                             onPress={handleSubmit}
                            />
                        </View>
                      
                        </>
                        
                )}
            </Formik>
            


        </View>
    )
}

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
    inputContainer: {
        flex: 1,
        padding: 15,
    },
    AddressTypeimg:{ 
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        alignItems: 'center' 
    },
    AddressTypeimg_ar:{ 
        flexDirection: 'row-reverse', 
        justifyContent: 'space-evenly', 
        alignItems: 'center' 
    },
    radioBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioBtnContainer_ar: {
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    radioBtnText: {
    fontWeight: 'bold', 
    fontSize: 20, 
    padding: 5

    },
    title:{
        fontSize:18,
        fontWeight:'700',
        color:'#999',
        marginTop:15
    },
    container:{
        flexDirection:'row', 
        borderColor:Colors.Sp_Text, 
        borderWidth:1, 
        justifyContent:'space-between', 
        padding:4, 
        borderRadius:5, 
        marginTop:10
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

})
export default EditAddress