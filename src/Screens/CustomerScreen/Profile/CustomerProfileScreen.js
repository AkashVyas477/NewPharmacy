import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, Modal, Alert} from 'react-native';
// import { Header, Button } from '../../../Components/Common';
import Header from '../../../Components/Common/Header'
import  Button  from '../../../Components/Common/Button';
import {Images,Colors} from '../../../CommonConfig'
import * as ImagePicker from 'react-native-image-crop-picker';
import  CountryPicker from 'react-native-country-picker-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPreLogin } from '../../../Components/Helpers/ApiHelper';

import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast'

const CustomerProfileScreen = props =>{

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        getProfile()
    },[])

    const getProfile = async()=>{
        setUser(JSON.parse(await AsyncStorage.getItem("userInfo")))
    }

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

{/* Image */}
             <View style={styles.SignupPlaceholder_Style}>
          <Image source={{uri:user.image}} style={styles.profileImg} />
            </View>
                {/* <View>
                    <TouchableOpacity style={styles.addIcon}   onPress={()=> props.navigation.navigate('Edit_Profile',{user})} >
                        <Image source={Images.EditPencil} style={styles.addIconImg} />
                    </TouchableOpacity>
                </View> */}

{/* User Name */}
                <View>
                    <Text style={{paddingHorizontal:5, marginLeft:20, fontSize:17}}> 
                        Username
                    </Text>
                    <View >
                    <View style={{paddingHorizontal:1, marginLeft:20,marginRight:20, fontSize:17,borderBottomWidth:1, borderColor:Colors.borderBottomColor,marginTop:10}}>
                     <Text style={styles.value}>
                         {user.name}
                         </Text> 
                    </View>
                    </View>
                </View>
{/* Email */}
                <View >
                    <Text style={{ paddingTop:15,paddingHorizontal:5, marginLeft:20, fontSize:17}}> 
                        Email Id
                    </Text>
                    <View >
                    <View style={{paddingHorizontal:1, marginLeft:20,marginRight:20, fontSize:17,borderBottomWidth:1, borderColor:Colors.borderBottomColor,marginTop:10}}>
                    <Text style={styles.value}>
                         {user.email}
                         </Text> 
                    </View>
                    </View>
                </View>
{/* Phone Number */}
                <View >
                    <Text style={{ paddingTop: 15, paddingHorizontal: 5, marginLeft: 20, fontSize: 17 }}>
                        Phone Number
                    </Text>
                    <View >
                        <View style={{ paddingHorizontal: 1, marginLeft: 20, marginRight: 20, fontSize: 17, borderBottomWidth: 1, borderColor: Colors.borderBottomColor, marginTop: 10 }}>
                            <Text style={styles.value}>
                               {user.country_code}{user.phone}
                            </Text>
                        </View>
                    </View>
                </View>
                
{/* Gender */}
                <View >
                    <Text style={{ paddingTop: 15, paddingHorizontal: 5, marginLeft: 20, fontSize: 17 }}>
                        Gender
                    </Text>
                    <View >
                        <View style={{ paddingHorizontal: 1, marginLeft: 20, marginRight: 20, fontSize: 17, borderBottomWidth: 1, borderColor: Colors.borderBottomColor, marginTop: 10 }}>
                            <Text style={styles.value}>
                                {user.gender}
                            </Text>
                        </View>
                    </View>
                </View>

{/* Edit Profile Button   */}
                <View style={{ marginTop: 20 }}>
                    <Button
                        onPress={()=> props.navigation.navigate('Edit_Profile',{user})}
                        label="Edit Profile"
                    />
                </View>
{/* Change Password Button  */}
                        <View style={{marginTop:10}}>
                            <Button
                            onPress ={()=> props.navigation.navigate('ChangePassword')} 
                            label="Change Password"
                            />
                            </View>
{/* Logout Button  */}
                            <View style={{marginTop:10}}>
                            <Button
                            onPress={() =>
                                Alert.alert(
                                  'Log out',
                                  'Do you want to logout?',
                                  [
                                    { text: 'Cancel', onPress: () => { return null } },
                                    {
                                      text: 'Confirm', onPress: () => {
                                        AsyncStorage.clear();
                                        props.navigation.navigate('Auth')
                                      }
                                    },
                                  ],
                                  { cancelable: false }
                                )
                              }
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
    value:{
        
        fontSize:17,
        fontWeight:'700'
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
        borderRadius:68
       
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
        paddingTop:10,
        paddingBottom:20
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