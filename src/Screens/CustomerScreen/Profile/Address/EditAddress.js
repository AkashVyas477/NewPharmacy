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
import Header from '../../../../Components/Common/Header';
import Button from '../../../../Components/Common/Button';
import CheckButton from '../../../../Components/Common/CheckButton';
import { add, Value } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { postPostLogin,deletePost } from '../../../../Components/Helpers/ApiHelper';
import Toast from 'react-native-simple-toast';

const EditAddress = props => {
    const { t } = useTranslation();
    const address = props.route.params.item
    // console.log("cureent address\n",address);
    const [radio, setRadio] = useState(address.address_type);
    const [select, setIsSelect] = useState(false)
    const [delLoader, setDelLoader] = useState(false)
    const [editLoader, setEditLoader] = useState(false)

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
            // console.log(location.latitude,location.longitude);
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
            Toast.show('Addres edited Successfuly!')
            props.navigation.goBack();
        }
        setEditLoader(false)
    }


    return (
        <View style={styles.screen}>
            <View style={styles.header_sty}>
                <Header
                    Title='Edit Address'
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
                            <Text style={styles.title}>Address Type</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <View style={styles.radioBtnContainer}>
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
                                    <Text style={styles.radioBtnText}>Home</Text>
                                </View>
                                <View style={styles.radioBtnContainer}>
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
                                    <Text style={styles.radioBtnText}>Office</Text>
                                </View>

                                <View style={styles.radioBtnContainer}>
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
                                    <Text style={styles.radioBtnText}>Other</Text>
                                </View>

                            </View>

                            <Text style={styles.title}>Primary Address</Text>
                            <View style={styles.container}>
                                <TextInput 
                                    value={values.primary_address}
                                    onBlur={ () => setFieldTouched('primary_address')}
                                    onChangeText={handleChange('primary_address')}
                                    placeholder="Enter address"
                                    keyboardType='default'
                                />
                            </View>

                            <Text style={styles.title}>ADDRESS</Text>
                            <View style={styles.container}>
                                <TextInput 
                                    value={values.addition_address_info}
                                    onBlur={ () => setFieldTouched('addition_address_info')}
                                    onChangeText={handleChange('addition_address_info')}
                                    placeholder="Enter address"
                                    keyboardType='default'
                                />
                            </View>

                            <View style={styles.defaultAddress}>
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
                                        Save Address As Default
                                    </Text>
                                </View>

                        </View>
                        </KeyboardAwareScrollView>

                        <View style={{ }}>
                            <Button
                             showActivityIndicator={delLoader}
                             label="Delete"
                             onPress={onPressDelete}
                            />
                            <Button
                            showActivityIndicator={editLoader}
                             label="Save"
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
        // backgroundColor: Colors.orange,
        // justifyContent:'space-between'
    },
    radioBtnContainer: {
        flexDirection: 'row',
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
        borderColor:Colors.BLACK, 
        borderWidth:1, 
        justifyContent:'space-between', 
        padding:4, 
        borderRadius:5, 
        marginTop:10
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
     }

})
export default EditAddress