import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Images, Colors } from '../../../CommonConfig'
import { Formik } from 'formik'
import PharmacyUserValidation from '../../../ForValidationSchema/PharmacyUserValidationSchema';
import{ Button,Header} from '../../../Components/Common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const pharmacyuserscreen = props => {
    return (
        <View style={styles.screen}>
        <KeyboardAwareScrollView>
        <View >
            {/* Screen partation for button and ID */}
            <View style={styles.screen2}>
                {/* Logo & HeaderText */}
                <View style={styles.Header}>
                    <Header 
                    Title="LOGIN AS PHARMACY USER"
                    onPress={() => props.navigation.goBack()}
                    />
                </View>
                {/* Logo & HeaderText */}
                {/* Input  */}
                {/* Formik start */}

                <Formik

                    initialValues={{
                        idNo: ''
                    }}
                    onSubmit={() => { props.navigation.navigate('CustomerDrawer', { screen: 'Pharamacist' }) }}
                    validationSchema={PharmacyUserValidation}
                >
                    {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                        <View >
                        <View style={styles.text_sty} >
                            {/* Inputs */}
                            <View style={styles.TextInput}>
                                <Text style={styles.text} >Pharmacy ID</Text>
                                    <TextInput
                                        value={values.idNo}
                                        onBlur={() => setFieldTouched('idNO')}
                                        onChangeText={handleChange('idNo')}
                                        placeholderTextColor={Colors.placeHolder}
                                        color={Colors.Sp_Text}
                                        placeholder="Pharamacy ID Number"
                                        keyboardType='number-pad'

                                    />
                                </View>
                                {touched.idNo && errors.idNo &&
                                    <Text style={styles.errortext}>{errors.idNo}</Text>
                                }
                        </View>
                            </View>
                    )}
                </Formik>
        </View>
    </View>
    </KeyboardAwareScrollView>

            <View style={{ justifyContent: 'space-between' }} >
                <View >
                    <Button
                        label="Verify now"
                        onSubmit={() => { props.navigation.navigate('PharamacistDrawer', { screen: 'PharamaHome' }) }}
                    />
                </View>
            </View>
    </View>
    );
};

            const styles = StyleSheet.create({
                screen: {
                flex: 1,
            backgroundColor: Colors.White,
            padding: 10,
            justifyContent:'space-between'
    },
            screen2: {
                width: "100%"
    },
            Header: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10
    },
            arrow: {
                height: 20,
            width: 30
    },
            HeaderText: {
                fontSize: 20,
            color: Colors.Sp_Text,
            paddingLeft: 30
    },
            text_sty: {
                paddingTop: 40,
            width: "100%"
    },
            text: {
                color: Colors.Sp_Text,
            marginBottom: 1,
            paddingLeft: 3
    },
            TextInput: {
                borderBottomColor: Colors.borderBottomColor,
            borderBottomWidth: 1,
    },
            Button: {
                color: Colors.ButtonTextColor,
            textAlign: 'center',

    },
            buttoncon: {
                backgroundColor: Colors.PRIMARY,
            borderRadius: 10,
            height: 40,
            width: "100%",
            justifyContent: 'center',
    },
            button_sty: {width: "100%", },
            touch: {padding: 20 },
            errortext: 
            {
                fontSize: 11,
                color: 'red'
            },
});

            export default pharmacyuserscreen;