import React ,{useEffect,useState}from 'react';
import { Image, View, StyleSheet,Alert,TouchableOpacity } from 'react-native';
import {
     createDrawerNavigator ,
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
import { Images, Colors } from '../../CommonConfig';
// import TabNavigator from '../../Screens/CustomerScreen/CustomerRoute'
import TabNavigator from '../../Screens/CustomerScreen/CustomerRoute'

const DrawerContent = (props) => {

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    getProfile()
  }, [props.navigation])


  const update = async () => {
    props.navigation.addListener('focus', () => {
      getProfile()
    });
  }

  const getProfile = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem("userInfo")))
   
  }
    return (
        <>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Profile') }}>
                        <View style={{flexDirection:"row", margin:15}}>
                        {selectedImage ? <Avatar.Image source={Images.SignupPlaceholder} size={50} />
                               : <Avatar.Image source={{uri:user.image}} size={50} />
                              }
                              <View style={{marginLeft:15,}}>
                                  <Title style= {styles.title}>
                                     {user.name}
                                  </Title>
                                  <View>
                                    <Text style={{color:Colors.placeHolder}}>
                                  {user.email}
                                  </Text>
                                  </View>
                              </View>
                        </View>
                        </TouchableOpacity>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>

                    <DrawerItem
                icon={({color, size})=>(
                    <Image source={Images.Homemenu}
                    style={{height:30,width:30}}
                    />
                )}
                label="Home"
                onPress={()=>{props.navigation.navigate('Home')}}
                /> 
                    </Drawer.Section>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Image source={Images.LocationPin}
                                style={{height:38,width:28}}
                                />
                            )}
                            label="Manage Address"
                            // onPress={()=>{props.navigation.navigate('LocationScreen')}}
                        />
                        </Drawer.Section>
                        <Drawer.Section style={styles.drawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Image source={Images.Language}
                            style={{height:30,width:30}}
                        />
                    )}
                    label="Language"
                    onPress={() => {props.navigation.navigate('LanguageScreen') }}
                />

                    </Drawer.Section>

                    <Drawer.Section  style={styles.drawerSection}>
                <DrawerItem
                icon={({color, size})=>(
                    <Image source={Images.Logout}
                    style={{height:32,width:30}}
                    />
                )}
                label="Log Out"
                onPress={()=>
                    Alert.alert(
                      'Log out',
                      'Do you want to logout?',
                      [
                        {text: 'Cancel', onPress: () => {return null}},
                        {text: 'Confirm', onPress: () => {
                          AsyncStorage.clear();
                          props.navigation.navigate('Auth')
                        }},
                      ],
                      { cancelable: false }
                    )  
                  }
                />
            </Drawer.Section>
                </View>
            </DrawerContentScrollView>

        </>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
    //   flex: 1,
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
  });

export default DrawerContent;
