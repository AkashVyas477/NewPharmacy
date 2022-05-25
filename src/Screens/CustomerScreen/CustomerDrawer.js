import React from 'react';
import { Image, View, StyleSheet,Alert } from 'react-native';
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
import TabNavigator from '../../Screens/CustomerScreen/CustomerRoute'
import { TouchableOpacity } from 'react-native-gesture-handler';

const DrawerContent = (props) => {

    return (
        <>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <TouchableOpacity onPress={() => { props.navigation.navigate('Profile') }} >
              <View style={{ flexDirection: "row", margin: 15 }}>
                <Avatar.Image
                  source={Images.SignupPlaceholder}
                  size={50}
                />
                <View style={{ marginLeft: 15, }}>
                  <Title style={styles.title}>
                    User
                  </Title>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Image source={Images.homeIcon}
                  style={{ height: 30, width: 30 }}
                />
              )}
              label="Home"
              onPress={() => { props.navigation.navigate('Home') }}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Image source={Images.LocationPin}
                  style={{ height: 38, width: 28 }}
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
                  style={{ height: 30, width: 30 }}
                />
              )}
              label="Language"
              onPress={() => { props.navigation.navigate('LanguageScreen') }}
            />

          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Image source={Images.Logout}
                  style={{ height: 32, width: 30 }}
                />
              )}
              label="Log Out"
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
  drawerSection1: {
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
