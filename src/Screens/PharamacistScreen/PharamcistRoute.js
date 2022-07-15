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
import SplashScreen from '../SplashScreen';
import DrawerContent from './PharamcistDrawer';

const Drawer = createDrawerNavigator()


const PharamaDrawerNavigator = props => {
    return (
        <Drawer.Navigator headerMode='none' drawerContent={ props => <DrawerContent {...props}/>}>
            
            <Drawer.Screen name='PharamaHome' component={PharamaHomeStackScreen} />
            {/* <Drawer.Screen name='PharamaProfile' component={UserStackScreen}/> */}
            
        </Drawer.Navigator>
    )
}

export default PharamaDrawerNavigator;



const PharamaHomeStack = createStackNavigator()
const PharamaHomeStackScreen = props => {
    return (
        <PharamaHomeStack.Navigator headerMode='none'>
            <PharamaHomeStack.Screen name='PharamaHome' component={PharamaHomeScreen} />
            {/* <HomeStack.Screen name='Pharamacies_Detail' component={PharamaciesDetail} />
            <HomeStack.Screen name='CurrentPrescriptionScreen_Data' component={CurrentPrescriptionScreen} />
            <HomeStack.Screen name='PastPrescriptionScreen_Data' component={PastPrescriptionScreen} />
            <HomeStack.Screen name ='Preview'component={Preview}/>
            <HomeStack.Screen name ='PharamaciesImagePreview'component={PharamaciesImagePreview}/> */}
            {/* <HomeStack.Screen name='OrderScreen' component={OrderScreen}/> */}
            {/* <HomeStack.Screen name ='Edit_Profile'component={CustomerProfileEditScreen}/> */}
        </PharamaHomeStack.Navigator>
    )
}
