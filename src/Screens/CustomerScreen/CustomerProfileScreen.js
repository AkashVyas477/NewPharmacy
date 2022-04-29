import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, Modal, } from 'react-native';
import { Header, Button } from '../../Components/Common';
import {Images,Colors} from '../../CommonConfig'
import * as ImagePicker from 'react-native-image-crop-picker';
import  CountryPicker from 'react-native-country-picker-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const CustomerProfileScreen = props =>{
    const [show, setShow] = useState(false);
    const [isLoading, setisLoading]=useState(false)
    const [countryCode, setCountryCode] = useState('IN');
    const [callingCode, setcallingCode]= useState('+91')
    const [phoneNumber, setPhoneNumber ] = useState('');
    // const pressHandler = async(countryCode, phoneNumber) => { props.navigation.navigate( ) }
        

    return(
        <View style={styles.screen}>
             <KeyboardAwareScrollView>
    {/* Header */}
            <View style={styles.header}>
              
            <TouchableOpacity  onPress={() =>props.navigation.toggleDrawer()}>
            <Image source={Images.Menu}  style={styles.MenuStyle} />
            </TouchableOpacity>
            <Text  style={styles.headerText}>
            PROFILE
            </Text>
            </View>
    {/* Body */}

             <View style={styles.SignupPlaceholder_Style}>
          <Image source={Images.SignupPlaceholder} style={styles.profileImg} />
            </View>
                <View>
                    <TouchableOpacity style={styles.addIcon}   onPress={()=> props.navigation.navigate('Edit_Profile')} >
                        <Image source={Images.EditPencil} style={styles.addIconImg} />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={{paddingHorizontal:5, marginLeft:20, fontSize:17}}> 
                        Username
                    </Text>
                    <View >
                    <View style={{paddingHorizontal:1, marginLeft:20,marginRight:20, fontSize:17,borderBottomWidth:1, borderColor:Colors.borderBottomColor}}>
                    <TextInput 
                    placeholder="UserName" 
                    />
                    </View>
                    </View>
                </View>

                <View >
                    <Text style={{ paddingTop:15,paddingHorizontal:5, marginLeft:20, fontSize:17}}> 
                        Email Id
                    </Text>
                    <View >
                    <View style={{paddingHorizontal:1, marginLeft:20,marginRight:20, fontSize:17,borderBottomWidth:1, borderColor:Colors.borderBottomColor}}>
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
                            <Text style={{flex:0.5, fontWeight:'bold'}}>{callingCode}</Text>
                            <TouchableOpacity onPress={() => setShow(true)} style={{flex: 0.5}}>
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
                                    containerButtonStyle={{ alignItems: 'center',}}
                                />
                                </TouchableOpacity>
                            <View style={{width:0, borderColor: Colors.borderBottomColor, borderWidth:0.5, height:30, marginRight:10}} ></View>
                            <TextInput 
                                style={{flex:3.5}}
                                keyboardType= "phone-pad"
                                maxLength={10}
                                onChangeText = { (val) => {setPhoneNumber(val)} }
                            />
                        </View>
                        </View>   
                        </View> 

                        <View >
                    <Text style={{paddingHorizontal:10, marginLeft:15, fontSize:17}}> 
                        Gender
                    </Text>
                    <View >
                    <View style={{paddingHorizontal:1, marginLeft:20,marginRight:20, fontSize:17,borderBottomWidth:1, borderColor:Colors.borderBottomColor}}>
                    <TextInput 
                    placeholder="Gender" 
                    />
                    </View>
                    </View>
                </View>

                        <View style={{marginTop:20}}>
                            <Button
                            disabled={ phoneNumber.length === 10 ? false : true } 
                            // onPress={() => pressHandler(callingCode, phoneNumber)}
                            onPress ={()=> props.navigation.navigate('ChangePassword')} 
                            label="Change Password"
                            />
                            </View>

                            <View style={{marginTop:20}}>
                            <Button
                            disabled={ phoneNumber.length === 10 ? false : true } 
                            onPress={() =>{props.navigation.navigate('Login')}}
                            label="Log Out"
                            />
                            </View>
                            </KeyboardAwareScrollView>

        </View>
    );
};

const  styles=StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'white',
    },

    header:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 5, 
        padding:10
    },
    profileImg:{ 
        height: 145, 
        width: 145,
       
    },
    addIcon: {
        left: Dimensions.get('window').width * 0.58,
        bottom: Dimensions.get('window').width * 0.1,
    },
    addIconImg:{ 
        height: 45, 
        width: 45 
    },
    MenuStyle:{
        height: 25,
        width: 25 ,
    },
    headerText:{ 
        marginLeft:125, 
        fontSize:20, 
        fontWeight:'bold', 
        color:Colors.Sp_Text,
    },
    SignupPlaceholder_Style:{
        borderRadius:50,
        overflow:'hidden',
        alignItems:'center', 
        paddingTop:10
    },

  body:{
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    textPhoneNo:{
        color: Colors.Gray,
        paddingLeft:5
    },
    action:{
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderBottomColor,
        paddingBottom: 10,
        alignItems: 'center',
    }, 
    

});

export default CustomerProfileScreen;


