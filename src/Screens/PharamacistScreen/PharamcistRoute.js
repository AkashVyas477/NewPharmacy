import React ,{useState,useEffect}from 'react';
import { Image, View,Text } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Images, Colors } from '../../CommonConfig';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


//LogInScren

import LoginScreen from '../AuthScreen/LoginScreen'
import PharamaHomeScreen from '../PharamacistScreen/Home/PharamcistHomeScreen';

// profile

import PharamcistProfileEditScreen from '../PharamacistScreen/Profile/PharamacistProfileEditScreen ';
import PharamcistProfileScreen from '../PharamacistScreen/Profile/PharamacistProfileScreen';
import PharamcistChangePassword from '../PharamacistScreen/Profile/PharamacistChangePassword';
import AddAddres from '../PharamacistScreen/Profile/Address/AddNewAddress';
import Address from '../PharamacistScreen/Profile/Address/Address';
import EditAddress from '../PharamacistScreen/Profile/Address/EditAddress';

import Addquotes from '../PharamacistScreen/Home/DetailsScreen/Addquotes';

import SplashScreen from '../SplashScreen';
import DrawerContent from './PharamcistDrawer';


const Drawer = createDrawerNavigator()


const PharamaDrawerNavigator = props => {

    return (
        <Drawer.Navigator headerMode='none' drawerStyle={{ width :'70%'}} drawerContent={ props => <DrawerContent {...props}/>}>
            
            <Drawer.Screen name='PharamaHome' component={PharamaHomeStackScreen} />
            <Drawer.Screen name='PharamaProfile' component={PharamUserStackScreen}/>
            <Drawer.Screen name='SaveAddress' component={AddresStackScreen}/>
            
        </Drawer.Navigator>
    )
}

export default PharamaDrawerNavigator;



const PharamaHomeStack = createStackNavigator()

const PharamaHomeStackScreen = props => {
    
    const [user, setUser] = useState({});
    const getuser = async () => {
        setUser(JSON.parse(await AsyncStorage.getItem('user'))) 
    }
    useEffect(() => {
        console.log("user\n",user)
    }, [user])

    return (
        <PharamaHomeStack.Navigator headerMode='none'>
            <PharamaHomeStack.Screen name='PharamaHome'
             component={PharamaHomeScreen}     />
            <PharamaHomeStack.Screen name='Addquotes' component={Addquotes} />
            
        </PharamaHomeStack.Navigator>
    )
}


const PharamUserStack = createStackNavigator()
const PharamUserStackScreen = props => {
    return(
        <PharamUserStack.Navigator headerMode='none'>
        <PharamUserStack.Screen name='PharamaProfile'component={PharamcistProfileScreen}/>
        <PharamUserStack.Screen name='PharamEdit_Profile'component={PharamcistProfileEditScreen}/>
        <PharamUserStack.Screen name='PharamChangePassword'component={PharamcistChangePassword}/>
        </PharamUserStack.Navigator>
    )
}

const AddresStack = createStackNavigator()
const AddresStackScreen = props => {
    return (
        <AddresStack.Navigator headerMode='none'>
            <AddresStack.Screen name='Address' component={Address} />
            <AddresStack.Screen name='AddAddress' component={AddAddres} />
            <AddresStack.Screen name='EditAddress' component={EditAddress}/>
        </AddresStack.Navigator>
    )
}