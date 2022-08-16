import React, { useEffect, useState,useRef } from 'react';
import { Image, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import { CommonActions, useRoute } from '@react-navigation/native';
import { Images, Colors } from '../../CommonConfig';
import TabNavigator from '../../Screens/CustomerScreen/CustomerRoute'
import RBSheet from 'react-native-raw-bottom-sheet';
import { Button } from '../../Components/Common';
import { useTranslation } from 'react-i18next';

const DrawerContent = (props) => {
  const { t } = useTranslation();
  const refRBSheet=useRef({});
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const getProfile = async() => {
    setUser(JSON.parse(await AsyncStorage.getItem("user")))
    console.log("user   ", user)
}


useEffect(()=>{
    const update = props.navigation.addListener('focus',()=>{
        getProfile();
    })
    return update;

},[props.navigation])



  return (
    <>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <TouchableOpacity onPress={() => { props.navigation.navigate('Profile') }}>
              <View style={{ flexDirection: "row", margin: 15 }}>
                {selectedImage ? <Avatar.Image source={Images.SignupPlaceholder} size={50} />
                  : <Avatar.Image source={{ uri: user.image }} size={50} />
                }
                <View style={{ marginLeft: 15, }}>
                  <Title style={styles.title}>
                    {user.name}
                  </Title>
                  <View>
                    <Text style={{ color: Colors.placeHolder }}>
                      {user.email}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

                <View style={styles.drawerSection}>
                  <TouchableOpacity onPress={() => { props.navigation.navigate('Home') }}>
                  <View style={{ flexDirection: "row", margin: 15, alignItems:'center' }}>
                <Image source={Images.Homemenu} style={{ height: 30, width: 30 }} />
                <View style={{ marginLeft: 15, }}>
                  <View>
                    <Text style={{color:Colors.Gray}}>
                    {t('navigate:Home')}
                    </Text>
                  </View>
                </View>
              </View>
                  </TouchableOpacity>
                </View>


                <View style={styles.drawerSection}>
                  <TouchableOpacity 
                  onPress={() => { props.navigation.navigate('AddresScreen') }}
                  >
                  <View style={{ flexDirection: "row", margin: 15,alignItems:'center' }}>
                  <Image source={Images.LocationPin}
                  style={{ height: 38, width: 28 }}
                />
                <View style={{ marginLeft: 15, }}>
                  <View>
                    <Text style={{color:Colors.Gray}}>
                    {t('navigate:ManageAddress')}
                    </Text>
                  </View>
                </View>
              </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.drawerSection}>
                  <TouchableOpacity 
                  onPress={() => { props.navigation.navigate('LanguageScreen') }}
                  >
                  <View style={{ flexDirection: "row", margin: 15,alignItems:'center' }}>
                  <Image source={Images.Language}
                  style={{ height: 30, width: 30 }}
                />
                <View style={{ marginLeft: 15, }}>
                  <View>
                    <Text style={{color:Colors.Gray}}>
                    {t('navigate:Language')}
                    </Text>
                  </View>
                </View>
              </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.drawerSection}>
                  <TouchableOpacity 
                //  onPress={()=> refRBSheet.current.open()}
                  onPress={() =>
                    Alert.alert(
                      `${t('common:Logout')}`,
                      `${t('common:Doyouwanttologout')}`,
                      // 'Do you want to logout?',
                      [
                        { text: `${t('common:Cancel')}`, onPress: () => { return null } },
                        {
                          text: `${t('common:Confirm')}`, onPress: () => {
                            AsyncStorage.clear();
                            // props.navigation.navigate('Auth')

                            props.navigation.dispatch(
                              CommonActions.reset({
                                index:0,
                                routes:[{name:'Auth'}]
                              })
                            )
                          }
                        },
                      ],
                      { cancelable: false }
                    )
                  }
                  >
                  <View style={{ flexDirection: "row", margin: 15,alignItems:'center' }}>
                  <Image source={Images.Logout}
                  style={{ height: 32, width: 30 }}
                />
                <View style={{ marginLeft: 15, }}>
                  <View>
                    <Text style={{color:Colors.Gray}}>
                    {t('navigate:LogOut')}
                    </Text>
                  </View>
                </View>
              </View>
                  </TouchableOpacity>
                </View>

          {/* <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              container:{
                backgroundColor:Colors.backgroundColor
              },
              wrapper: {
                backgroundColor: "transparent"

              },
              draggableIcon: {
                backgroundColor: Colors.PRIMARY
              }
            }}
          >

            <View style={{padding:10,paddingLeft:20,alignItems:'center'}}>
              <Text style={{fontSize:20,justifyContent:'center'}}>
              {t('common:Doyouwanttologout')}
              </Text>
            </View>
            <View style={{flexDirection:'column',justifyContent:'space-between',alignItems:'center',}}>
              <TouchableOpacity style={styles.rbButton} onPress={()=> refRBSheet.current.close()}  >
                            <Text style={styles.rbOk}>{t('common:Cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rbButton} onPress={()=>{
                AsyncStorage.clear();
                 props.navigation.navigate('Auth')
              } } >
                            <Text style={styles.rbOk}>{t('common:Confirm')}</Text>
              </TouchableOpacity>
            </View>
          </RBSheet> */}
        </View>
      </DrawerContentScrollView>

    </>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: Colors.PRIMARY
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    borderBottomWidth:0.2,
    borderBottomColor:Colors.Gray
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rbOk:{
    fontSize:20,
    fontWeight:'bold', 
    textAlign:'center',
    color: Colors.ButtonTextColor,
},
rbButton:{
  backgroundColor:Colors.PRIMARY,
  justifyContent:'center', 
  alignItems:'center',
  borderRadius: 25,
  height: 50,
  width: "50%",
  marginBottom:15
},
});

export default DrawerContent;
