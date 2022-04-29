import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, Modal } from 'react-native';
import { Header, Button, RadioButton } from '../../Components/Common';
import { Images, Colors } from '../../CommonConfig'
import * as ImagePicker from 'react-native-image-crop-picker';
import CountryPicker from 'react-native-country-picker-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const CustomerProfileEditScreen = props => {
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

    const [show, setShow] = useState(false);
    const [isLoading, setisLoading] = useState(false)
    const [countryCode, setCountryCode] = useState('IN');
    const [callingCode, setcallingCode] = useState('+91')
    const [phoneNumber, setPhoneNumber] = useState('');
    // const pressHandler = async (countryCode, phoneNumber) => { props.navigation.navigate() }

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
                {selectedImage ? <Image source={{ uri: selectedImage }} style={{ height: 100, width: 100, }} /> : <Image source={Images.SignupPlaceholder} style={styles.profileImg} />}
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

            {/* Body */}
          
            <View>
                <Text style={{ paddingHorizontal: 5, marginLeft: 20, fontSize: 17 }}>
                    Username
                </Text>
                <View >
                    <View style={{ paddingHorizontal: 1, marginLeft: 20, marginRight: 20, fontSize: 17, borderBottomWidth: 1, borderColor: Colors.borderBottomColor }}>
                        <TextInput
                            placeholder="UserName"
                        />
                    </View>
                </View>
            </View>

            <View >
                <Text style={{ paddingTop: 15, paddingHorizontal: 5, marginLeft: 20, fontSize: 17 }}>
                    Email Id
                </Text>
                <View >
                    <View style={{ paddingHorizontal: 1, marginLeft: 20, marginRight: 20, fontSize: 17, borderBottomWidth: 1, borderColor: Colors.borderBottomColor }}>
                        <TextInput
                            placeholder="Email"
                        />
                    </View>
                </View>
            </View>



            <View >
                <View style={styles.body}>
                    <Text style={styles.textPhoneNo} >Phone Number</Text>
                    <View style={styles.action} >
                        <Text style={{ flex: 0.5, fontWeight: 'bold' }}>{callingCode}</Text>
                        <TouchableOpacity onPress={() => setShow(true)} style={{ flex: 0.5 }}>
                            {/* <Image source={Images.DropDown} style={{height:10,width:10}}  /> */}
                            <CountryPicker
                                withFilter
                                countryCode={countryCode}
                                withFlag
                                withAlphaFilter={false}
                                withCallingCode
                                onSelect={country => {
                                    console.log('country', country);
                                    const { cca2, callingCode } = country;
                                    setCountryCode(cca2);
                                    setcallingCode(callingCode[0]);
                                }}
                                containerButtonStyle={{ alignItems: 'center', }}
                            />
                        </TouchableOpacity>
                        <View style={{ width: 0, borderColor: Colors.borderBottomColor, borderWidth: 0.5, height: 30, marginRight: 10 }} ></View>
                        <TextInput
                            style={{ flex: 3.5 }}
                            keyboardType="phone-pad"
                            maxLength={10}
                            onChangeText={(val) => { setPhoneNumber(val) }}
                        />
                    </View>
                </View>
            </View>

            <View >
                <Text style={{ paddingHorizontal: 10, marginLeft: 15, fontSize: 17 }}>
                    Gender
                </Text>
                <View >
                    <View style={{ paddingHorizontal: 1, marginLeft: 20, marginRight: 20, fontSize: 17, borderBottomWidth: 1, borderColor: Colors.borderBottomColor }}>
                        {/* <TextInput 
                    placeholder="Gender" 
                    /> */}
                        <View >
                            {/* Gender */}
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding:8 }}>
                                    {/* male button */}
                                    <View >
                                        <RadioButton
                                            label="Male"
                                            onPress={maleHandler}
                                            state={male}
                                        />
                                        {/* male button  end*/}
                                    </View>
                                    <View style={{marginLeft:125}}>
                                        {/* Female button */}
                                        <RadioButton
                                            label="Female"
                                            onPress={femaleHandler}
                                            state={female}
                                        />
                                        {/* Female button */}
                                    </View>
                                </View>
                            </View>
                            {/* Gender end */}
                        
                    </View>
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <Button
                    label="Save"
                    onPress={() => { props.navigation.navigate('Profile') }}

                />
            </View>
            </KeyboardAwareScrollView>
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
    profileImg: {
        height: 150,
        width: 150,

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
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    textPhoneNo: {
        color: Colors.Gray,
        paddingLeft: 5
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderBottomColor,
        paddingBottom: 10,
        alignItems: 'center',
    },

});

export default CustomerProfileEditScreen;