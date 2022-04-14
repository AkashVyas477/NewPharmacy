import React from 'react';
import { Image,View } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';



// Home Screens
import HomeScreen from '../Screens/CustomerScreen/HomeScreen';

// Prescriptions
import PrescriptionScreen from '../Screens/CustomerScreen/PrescriptionScreen';

//LocationScreen
import LocationScreen from '../Screens/CustomerScreen/Location';

import CurrentPrescriptionScreen from '../Screens/CustomerScreen/CurrentPrescriptionScreen';
import PastPrescriptionScreen from '../Screens/CustomerScreen/PastPrescriptionScreen';
import PharamaciesDetail from '../Screens/CustomerScreen/PharamaciesDetail';


const Drawer = createDrawerNavigator()
const DrawerNavigator = props =>{
    return(
        <Drawer.Navigator headerMode='none'>
            {/* <Drawer.Screen name ='Profile' component={ProfileScreen} /> */}
            <Drawer.Screen name ='Home' component={TabNavigator} options={{
                drawerIcon: () => <Image source={require('../Assets/Icons/HomeIcon/homeIcon.png')} style={{ height:35 ,  width:35,}}/>}} />
        
            <Drawer.Screen name ='AddressStack' component={AddresStackScreen} options={{
                    drawerLabel:'Manage Address',
                    drawerIcon: () => <Image source={require('../Assets/Icons/location/locationPin.png')} style={{ height:40 ,  width:30,}}/>,

                }}/>
                
            {/* <Drawer.Screen name ='Address' component={ManageAddress} /> */}
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;

const Tab = createBottomTabNavigator()
const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = ['Pharamacies_Detail']
    if(hideOnScreens.indexOf(routeName) > -1) return false;
    return true;
};
const TabNavigator = props =>{
    return(
        
        <Tab.Navigator tabBarOptions={{ 
            activeTintColor:'#cccccc', 
            inactiveTintColor:'#cccccc' , 
            style: { height: 75, 
            paddingBottom:10 , 
            borderBottomColor:'green' , 
            borderBottomWidth:1} }}>
            <Tab.Screen 
            name='HomeScreen' 
            component={HomeStackScreen}
            options={ ({route}) => ({
            tabBarVisible:getTabBarVisibility(route),
            tabBarLabel:'DASHBOARD',
            tabBarIcon:({focused})=> (
            < Image source={require('../Assets/Icons/HomeIcon/homeIcon.png')} style={{ height:22 ,  width:25, marginTop:15 , tintColor: focused? 'green' : '#cccccc' }}  /> 
            )  
            })}/>
            <Tab.Screen 
            name='Prescription' 
            component={PrescriptionStackScreen}
            options={ ({route}) => ({
            tabBarVisible:getTabBarVisibility(route),
            tabBarLabel:'PRESCRIPTION',
            tabBarIcon:({focused})=> (
            < Image source={require('../Assets/Icons/HomeIcon/prescriptionIcon.png')} style={{ height:25 ,width:18, marginTop:15,tintColor: focused? 'green' : '#cccccc'}} /> 
            )  
            })}/>

        </Tab.Navigator>
       
    )
}


// const TopTab = createMaterialTopTabNavigator();
//     function MyTabs() {
//         return (
//           <Tab.Navigator>
//             <Tab.Screen name="Current" component={CurrentPrescriptionScreen} />
//             <Tab.Screen name="Past" component={PastPrescriptionScreen} />
//           </Tab.Navigator>
//         );
//       }


const HomeStack = createStackNavigator()
const HomeStackScreen = props => {
    return (
        <HomeStack.Navigator headerMode='none'>
            <HomeStack.Screen name='Home' component={HomeScreen}/>
            <HomeStack.Screen name='Pharamacies_Detail' component={PharamaciesDetail}/>
        </HomeStack.Navigator>
    )
}

const PrescriptionStack = createStackNavigator()
const PrescriptionStackScreen = props => {
    return (
        <PrescriptionStack.Navigator headerMode='none' >
            <PrescriptionStack.Screen name='Prescription' component={PrescriptionScreen}/>
        </PrescriptionStack.Navigator>
    )
}

const AddresStack = createStackNavigator()
const AddresStackScreen = props => {
    return (
        <AddresStack.Navigator  headerMode='none'>
            <AddresStack.Screen name='ManageAddress' component={LocationScreen}/>
        </AddresStack.Navigator>
    )
}