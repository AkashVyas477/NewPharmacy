
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput,ActivityIndicatorsd } from 'react-native';
import { Formik } from 'formik';
import AddressValidationSchema from '../../../../ForValidationSchema/AddressValidationSchema';
import * as addressActions from '../../../../Store/Actions/address';
import { getCurrentPosition } from 'react-native-geolocation-service';
import GetLocation from 'react-native-get-location'
// import Geolocation from 'react-native-geolocation-service';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Images, Colors } from '../../../../CommonConfig';
import Header from '../../../../Components/Common/Header';
import Button from '../../../../Components/Common/Button';
import { add } from 'react-native-reanimated';

const AddAddres = props => {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)
    const address= props.route.params.address
    // console.log("address\n",address)


    // useEffect(() => {
    //     const update = props.navigation.addListener('focus', async () => {
    //         setIsLoading(true)

    //         GetLocation.getCurrentPosition({
    //             enableHighAccuracy: true,
    //             timeout: 15000,
    //         })
    //             .then(location => {
    //                 // onPressAdd(location.latitude, location.longitude);
    //                 console.log(location);

    //             })
    //             .catch((error) => {
    //                 // console.log(error)
    //                 const { code, message } = error;
    //                 // console.log(code, message);
    //             })

    //     });
    //     return update
    // }, [props.navigation])

 
    const onPressAdd = async (values) => {
        setIsLoading(true)
        const data = {
            primary_address: values.primary_address,
            addition_address_info: values.addition_address_info,
            latitude:'',
            longitude:'',
        }
        GetLocation.getCurrentPosition({enableHighAccuracy:true,timeout:15000,})
        setIsLoading(false)
        console.log("address\n", data)
       
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
            <KeyboardAwareScrollView>
                <Formik
                    initialValues={{
                        // primary_address: address.primary_address,
                        // addition_address_info: address.addition_address_info,
                        primary_address: '',
                        addition_address_info: '',
                    }}
                    // onSubmit={(values) => onPressAdd(values)}
                    onSubmit={(values) => onPressAdd(values)}
                    validationSchema={AddressValidationSchema}
                >
                    {({ values, errors, setFieldTouched, touched, handleChange, setFieldValue, isValid, handleSubmit }) => (
                        <View style={styles.screen2}>
                            <Text style={styles.title}>
                                Primary address
                            </Text>
                            <View style={styles.container}>
                                <TextInput
                                    value={values.primary_address}
                                    onBlur={() => setFieldTouched("primary_address")}
                                    onChangeText={handleChange("primary_address")}
                                    placeholderTextColor={Colors.placeHolder}
                                    color={Colors.Sp_Text}
                                    placeholder='Primary address'
                                    autoCapitalize='sentences'

                                />
                            </View>
                            {touched.primary_address && errors.primary_address &&
                                <Text style={{ fontSize: 11, color: Colors.Error_Textcolor, margin: 10 }} >{errors.primary_address}</Text>
                            }



                            <Text style={styles.title}>
                                ADDRESS
                            </Text>
                            <View style={styles.container}>
                                <TextInput
                                    value={values.addition_address_info}
                                    onBlur={() => setFieldTouched('addition_address_info')}
                                    onChangeText={handleChange('addition_address_info')}
                                    placeholder='Enter address'
                                    keyboardType='default'
                                    autoCapitalize='sentences'
                                />
                            </View>
                            {touched.addition_address_info && errors.addition_address_info &&
                                <Text style={{ fontSize: 11, color: Colors.Error_Textcolor, margin: 10 }} >{errors.addition_address_info}</Text>
                            }

                            <Button
                                showActivityIndicator={isLoading}
                                label="Add"
                                onPress={handleSubmit}
                            disabled={isValid || !isLoading}
                            />

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
        backgroundColor: Colors.White,
        padding: 5
    },
    header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.White,
    },
    screen2: {
        padding: 10,
        backgroundColor: Colors.White,

    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#999',
        marginTop: 15
    },
    container: {
        flexDirection: 'row',
        borderColor: Colors.Sp_Text,
        borderWidth: 1,
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 5,
        marginTop: 10
    },

});

export default AddAddres;