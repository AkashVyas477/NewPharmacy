import React,{useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity ,TextInput,Modal} from 'react-native';
import { Header, Button, } from '../../../Components/Common';
import { Images, Colors } from '../../../CommonConfig';
import * as ImagePicker from 'react-native-image-crop-picker';


const PrescriptionImageScreen = props => {
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

                <View style={{ flexDirection: 'row', marginTop: 20 }} >

                    <View style={{ marginLeft: 20, }}  >
                    {selectedImage ? <Image source={{ uri: selectedImage }} style={{ height: 100, width: 100, }} /> :<Image source={Images.PlaceholderImage} style={{ height: 100, width: 100, }} />}
                    </View>

                    {/* <View style={{ marginLeft: 20, }}  >
                        <Image source={Images.PlaceholderImage} style={{ height: 100, width: 100, }} />
                    </View> */}

                    <View style={{ marginLeft: 10, marginBottom:20}}  >
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image source={Images.Placeholder} style={{ height: 100, width: 100, }} />
                        </TouchableOpacity>
                        {/* MOdal for add image */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        // onRequestClose={() => {
                        //     setModalVisible(!modalVisible);
                        // }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Choose option: </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ margin: 5 }}>
                                        <TouchableOpacity   onPress={takeFromCamera}>
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
                                        <TouchableOpacity  onPress={pickFromGallery} >
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

                    {/* Image  */}
                </View>
            {/* divideing Screen   */}
                <View style={styles.navBar}>
                </View>
            {/* divideing Screen   */}

            <View style={styles.main}>
                <View   style={{ flexDirection:'row', justifyContent:'space-between', padding:10, marginTop:15}}>

                <View>
                <Text style={{marginLeft: 15, fontSize:17}}>
                    Medicine Name
                </Text>
                
                </View>

                <View>
                <TouchableOpacity>
                <Text style={{color:Colors.orange , marginRight:10 , fontSize:15, fontWeight:'bold'}}>
                    ADD
                </Text>
                </TouchableOpacity>
                </View>  
                </View>


                <View style={{width:"100%",padding:5,paddingLeft:10,paddingRight:10}} >
               
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderBottomWidth:0.5}}>
                <TextInput 
                placeholder='Medicine Name '
                />
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity>
                <Image source={Images.EditTools} style={{width:20, height:20 ,marginRight:10}} />
                </TouchableOpacity>
                <TouchableOpacity>
                <Image source={Images.Delet} style={{width:20, height:25}} />
                </TouchableOpacity>
                </View>
                 </View>
                </View>

                {/* Text Note */}
                <View style={{marginLeft: 15, fontSize:17,padding:10, marginTop:15}}>
                        <Text>
                            Text Note
                        </Text>
                    </View>
                    <View style={{width:"100%",padding:5,paddingLeft:10,paddingRight:10}}>
                    <View style={{borderBottomWidth:0.5}}>
                    <TextInput 
                    placeholder='Text Note'
                    />
                    </View>
                    </View>
            </View>
            <View>
                <Button  
                 label="Submit"
                 />
            </View>

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
        height:10,
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
});

export default PrescriptionImageScreen;