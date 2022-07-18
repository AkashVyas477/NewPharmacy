import React from 'react';
import { Image, View } from 'react-native';
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

import SplashScreen from '../SplashScreen';
import DrawerContent from './PharamcistDrawer';

const Drawer = createDrawerNavigator()


const PharamaDrawerNavigator = props => {
    return (
        <Drawer.Navigator headerMode='none' drawerStyle={{ width :'70%'}} drawerContent={ props => <DrawerContent {...props}/>}>
            
            <Drawer.Screen name='PharamaHome' component={PharamaHomeStackScreen} />
            <Drawer.Screen name='PharamaProfile' component={PharamUserStackScreen}/>
            
        </Drawer.Navigator>
    )
}

export default PharamaDrawerNavigator;



const PharamaHomeStack = createStackNavigator()
const PharamaHomeStackScreen = props => {
    return (
        <PharamaHomeStack.Navigator headerMode='none'>
            <PharamaHomeStack.Screen name='PharamaHome' component={PharamaHomeScreen} />
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