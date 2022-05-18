import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import {
     createDrawerNavigator ,
     DrawerContentScrollView,
     DrawerItem
    } from '@react-navigation/drawer';
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
import TabNavigator from '../../Screens/CustomerScreen/CustomerRoute'
// import UserStackScreen from '../../Screens/CustomerScreen/CustomerRoute'
// import AddresStackScreen from '../../Screens/CustomerScreen/CustomerRoute'
// import LanguageStackScreen from '../../Screens/CustomerScreen/CustomerRoute'
// import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// const Drawer = createDrawerNavigator()
const DrawerContent = (props) => {

    return (
        <>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:"row", margin:15}}>
                              <Avatar.Image
                              source={Images.SignupPlaceholder} 
                              size={50}
                               />
                              <View style={{marginLeft:15,}}>
                                  <Title style= {styles.title}>
                                      User 
                                  </Title>
                              </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>

                    <DrawerItem
                icon={({color, size})=>(
                    <Image source={Images.homeIcon}
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
                            onPress={() => { }}
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
                    onPress={() => { }}
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
                onPress={()=>{}}
                />
            </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            {/* <Drawer.Section>
                <DrawerItem
                icon={({color, size})=>(
                    <Image source={Images.Logout}
                    style={{height:30,width:30}}
                    />
                )}
                label="Log Out"
                onPress={()=>{}}
                />
            </Drawer.Section> */}
        </>
        // <Drawer.Navigator headerMode='none'>
        //     {/* <Drawer.Screen name ='UserStack' component={UserStackScreen} 
        //     options={{
        //         drawerIcon:()=> <Image source={Images.SignupPlaceholder} style={{height:50, width:50, borderRadius:50, overflow:'hidden'}}/>,
        //         drawerLabel:" USer "
        //     }}
        //     /> */}
        //     {/* <Drawer.Screen name='Home' component={TabNavigator} 
        //     options={{
        //         drawerIcon: () => <Image source={require('../../Assets/Icons/HomeIcon/homeIcon.png')} style={{ height: 20, width: 20,  }} />,
        //     }} /> */}

        //     {/* <Drawer.Screen name='AddresStack' component={AddresStackScreen} options={{
        //         drawerLabel: 'Manage Address',
        //         drawerIcon: () => <Image source={require('../../Assets/Icons/location/locationPin.png')} style={{ height: 27, width: 20, }} />,

        //     }} /> */}

        //     {/* <Drawer.Screen name='Language' component={LanguageScreen} options={{
        //         drawerLabel:'Language',
        //         drawerIcon:()=> <Image source={Images.Language} style={{height: 30, width: 30,}} />,
        //     }} />

        //     <Drawer.Screen name ='LogOut' component={LoginScreen} options={{
        //         drawerLabel:'Log Out', 
        //         drawerIcon:()=> <Image source={Images.Logout} style={{height: 30, width: 27,}} />,
        //     }}/> */}

        //     {/* <Drawer.Screen name ='Address' component={ManageAddress} /> */}
        // </Drawer.Navigator>
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
