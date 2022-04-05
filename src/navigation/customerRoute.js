import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';


// Home Screens
import HomeScreen from '../Screens/HomeScreen';

// Prescriptions
import PrescriptionScreen from '../Screens/PrescriptionScreen';


const Drawer = createDrawerNavigator()
const DrawerNavigator = props =>{
    return(
        <Drawer.Navigator headerMode='none'>
            {/* <Drawer.Screen name ='Profile' component={ProfileScreen} /> */}
            <Drawer.Screen name ='Home' component={TabNavigator} />
            {/* <Drawer.Screen name ='Address' component={ManageAddress} /> */}
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;

const Tab = createBottomTabNavigator()
const TabNavigator = props =>{
    return(
        
        <Tab.Navigator >
            <Tab.Screen name='DASHBOARD' component={HomeStackScreen} />
            <Tab.Screen name='Prescription' component={PrescriptionStackScreen}/>
        </Tab.Navigator>
    )
}


const HomeStack = createStackNavigator()
const HomeStackScreen = props => {
    return (
        <HomeStack.Navigator headerMode='none'>
            <HomeStack.Screen name='Home' component={HomeScreen}/>
        </HomeStack.Navigator>
    )
}

const PrescriptionStack = createStackNavigator()
const PrescriptionStackScreen = props => {
    return (
        <PrescriptionStack.Navigator>
            <PrescriptionStack.Screen name='Prescription' component={PrescriptionScreen}/>
        </PrescriptionStack.Navigator>
    )
}