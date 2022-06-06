import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Modal, ScrollView, Dimensions, FlatList, Alert } from 'react-native';
// import { Header, Button, } from '../../../Components/Common';
import Header from '../../../Components/Common/Header';
import Button from '../../../Components/Common/Button';

import { Images, Colors } from '../../../CommonConfig';
import * as ImagePicker from 'react-native-image-crop-picker';
// import Ionicon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { postFormData } from '../../../Components/Helpers/ApiHelper';
// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { Method } from 'ionicons/dist/types/stencil-public-runtime';
import { string } from 'prop-types';



const PrescriptionImageScreen = props => {

    


    // const row = 2 
    const [numTextInputs, setNumTextInputs] = React.useState(0);

    const [selectedImage, setSelectedImage] = useState(null)
    const [images, setImages] = useState([])
    const [visible, setVisible] = React.useState(false);
    const close = () => setVisible(false);

    const [modalVisible, setModalVisible] = useState(false);
    const takeFromCamera = () => {
        ImagePicker.openCamera({
            width: 100,
            height: 100,
            cropping: true,
        }).then(image => {
            // images.push(image.path)
            setImages([...images, image])
            console.log("Selected Images        ", image.path);
            // setSelectedImage(image.path)
            setModalVisible(false)
        }).finally(close)
    }


    const pickFromGallery = () => {
        ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true,
        }).then(image => {
            setImages([...images, image])
            console.log("Selected Images        ", image);
            setModalVisible(false)
        }).finally(close)

    }

    const handleRemoveImgClick = () => {
        console.log("Image Removed   ", handleRemoveImgClick);
        setImages((prevImgs) => prevImgs.splice(1));
    };

    const [show, setShow] = useState(false);
    const [isLoading, setisLoading] = useState(false)

// From Data 
    const submit = async () => {
        const formdata = new FormData();
        formdata.append('image', {
            uri: images[0].path,
            type: images[0].mime,
            name: "1234",
        }
        )
        formdata.append("medicine",JSON.stringify(name))
        formdata.append("text_note",text_note)
        console.log("data       ", formdata._parts)   
let res = await fetch('https://mobile-pharmacy.herokuapp.com/customer/createPrescription',
{
    method:'post',
    body: formdata,
    headers:{
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer '+(await AsyncStorage.getItem('token'))
    }
})
let responseJson = await res.json();

console.log(responseJson,"ResponseJson")
};

const[text_note, setText_note]=useState('')
const [name, setname]= useState([''])
const [inputs, setInputs] = useState([{key: '', value: ''}]);

    const addHandler = ()=>{
      const _inputs = [...inputs];
      _inputs.push({key: '', value: ''});
      setInputs(_inputs);
    }
    
    const deleteHandler = (key)=>{
      const _inputs = inputs.filter((inputs,index) => index != key);
      setInputs(_inputs);
    }
  
    const inputHandler = (text, key)=>{
        const _inputs = [...inputs];
        _inputs[key].value = text;
        _inputs[key].key   = key;
        setInputs(_inputs);
        
      }

    return (
      
            <View style={styles.main}>
                <View style={styles.header_sty} >
                    {/* <StatusBar backgroundColor={selectedItem.bgColor} barStyle='light-content' /> */}
                    <Header
                        Title="CREATE REQUEST"
                        onPress={() => props.navigation.goBack()}
                    />
                </View>

                <View style={{ marginLeft: 20, marginTop: 20 }} >
                    <Text style={{ color: Colors.Sp_Text, fontSize: 15, fontWeight: 'bold' }}>
                        Upload Prescription details
                    </Text>
                </View>

                {/* Image  */}

                <View style={{ flexDirection: 'row', marginTop: 22, }} >

                    <View style={{ marginLeft: 10, marginBottom: 20, marginTop: 22, justifyContent: 'flex-start' }}  >
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Image source={Images.Placeholder} style={{ height: 100, width: 100, }} />
                        </TouchableOpacity>
                        {/* MOdal for add image */}
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
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ margin: 5 }}>
                                            <TouchableOpacity onPress={takeFromCamera}>
                                                <Image source={Images.Camera} style={{ height: 100, width: 100 }} />
                                            </TouchableOpacity>
                                            <View style={{ marginTop: 5 }}>
                                                <Text style={{ textAlign: 'center' }} >
                                                    Capture new photo
                                                </Text>
                                                <Text style={{ textAlign: 'center' }}>
                                                    of prescription
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ margin: 5 }}>
                                            <TouchableOpacity onPress={pickFromGallery} >
                                                <Image source={Images.Gallery} style={{ height: 100, width: 100 }} />
                                            </TouchableOpacity>
                                            <View style={{ marginTop: 5 }}>
                                                <Text style={{ textAlign: 'center' }}>
                                                    Upload
                                                </Text>
                                                <Text style={{ textAlign: 'center' }}>
                                                    prescription
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        style={[styles.buttonModal, styles.buttonClose]}
                                        onPress={() => { setModalVisible(false) }}
                                    >
                                        <Text style={styles.textStyle}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>


                    <View style={{ marginLeft: 20, flexDirection: 'row', }}>

                        <FlatList
                            numColumns={2}
                            data={images}
                            renderItem={(image) => {
                                //   console.log("Images       ",image);

                                return (
                                    <View>
                                        <View style={{
                                            top: Dimensions.get('window').width * 0.01,
                                            left: Dimensions.get('window').width * 0.23,
                                        }} >
                                            <TouchableOpacity
                                                onPress={handleRemoveImgClick}
                                            >
                                                <Image source={Images.Remove} style={{ height: 15, width: 15, }} />
                                            </TouchableOpacity>
                                        </View>
                                        <View key={image.id} style={{ flexGrow: 1, marginLeft: 5, padding: 5 }}>
                                            <Image source={{ uri: image.item.path }} style={{ height: 100, width: 100, borderRadius: 10 }} />
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>

                    {/* Image  */}
                </View>
                {/* divideing Screen   */}
                <View style={styles.navBar}>
                </View>
                {/* divideing Screen   */}
                <ScrollView>
                <View style={styles.main}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginTop: 15 }}>

                        <View>
                            <Text style={{ marginLeft: 15, fontSize: 17 }}>
                                Medicine Name
                            </Text>

                        </View>

                        <View>
                            <TouchableOpacity 
                            // onPress={() => setNumTextInputs(val => val + 1)}
                            onPress={addHandler}
                              >
                                <Text style={{ color: Colors.orange, marginRight: 10, fontSize: 15, fontWeight: 'bold' }}>
                                    ADD
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* <View style={{...styles.textInput,marginLeft:8, marginRight:8,padding:5 }}>
                        <TextInput
                           
                            placeholder="Medicine name"
                            onChangeText={e=> setname (e)}
                            value={name}
                        />
                    </View> */}

                    {/* <View  >
                        <View style={{flexDirection:'row', ...styles.textInput1,marginLeft:8, marginRight:8}} >
                                         <TextInput
                                            key={id}
                                            placeholder="Medicine name"
                                            onChangeText={e=> setname (e)}
                                            value={name}
                                        />
                    <View style={{ flexDirection: 'row',padding:5, }}>
                                        <TouchableOpacity onPress={() => setNumTextInputs(val => val + 1)} style={{paddingRight:10}} >
                                           <Image source={Images.EditTools} style={{ width: 25, height: 25 }} />
                                       </TouchableOpacity>

                                       <TouchableOpacity onPress={() => setNumTextInputs(val => val - 1)} >
                                           <Image source={Images.Delet} style={{ width: 20, height: 25 }} />
                                       </TouchableOpacity>
                                   </View>
                                        </View>
                     </View> */}


            {/* <ScrollView>
                    <View style={{ width: "100%", padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                        <View>
                            {[...Array(numTextInputs).keys()].map(key=> {
                                console.log(" id  ",key);
                                return (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...styles.textInput }}>
                                        <TextInput
                                            key={id}
                                            placeholder="Medicine name"
                                            onChangeText={e => setname(e)}
                                            value={name}
                                        />
                                        <TouchableOpacity onPress={() => setNumTextInputs(val => val - 1)} >
                                            <Image source={Images.Delet} style={{ width: 20, height: 25 }} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    </ScrollView> */}

                    <ScrollView >
                        <View style={{ width: "100%", padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                        {inputs.map((input, key) => (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...styles.textInput }}>
                                <TextInput 
                                placeholder={"Enter Name"} 
                                value={input.value} 
                                onChangeText={(text) => inputHandler(text,key)} 
                                // onChangeText={e => setname(e)}
                                />
                                <TouchableOpacity onPress={() => deleteHandler(key)}>
                                <Image source={Images.Delet} style={{ width: 20, height: 25 }} />
                                    {/* <Text style={{ color: "red", fontSize: 13 }}>Delete</Text> */}
                                </TouchableOpacity>
                            </View>
                        ))}
                        </View>
                    </ScrollView>

                    {/* Text Note */}
                    <View style={{ marginLeft: 15, fontSize: 17, padding: 10, marginTop: 15 }}>
                        <Text>
                            Text Note
                        </Text>
                    </View>
                    <View style={{ width: "100%", padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                        <View style={{ borderBottomWidth: 0.5 }}>
                            <TextInput
                                placeholder='Text Note'
                               onChangeText={e => setText_note(e)}
                               value={text_note}
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <Button
                        label="Submit"
                        onPress={submit}
                    />
                </View>
                </ScrollView>
            </View>
       
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.White
    },
    header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.White
    },
    navBar: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        height: 10,
    },
    // Medicine_name:{
    //     marginLeft:20, 
    //     marginTop:20,

    // },
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

    parent: { justifyContent: "flex-start", alignItems: "flex-start", },

    textInput: { alignItems:'center', justifyContent: 'space-between', borderBottomWidth: 0.5,paddingLeft: 10, paddingRight: 10 },
    textInput1: { justifyContent: 'space-between', borderBottomWidth: 0.5 , alignItems:'center', paddingLeft: 10, paddingRight: 10,},
});

export default PrescriptionImageScreen;