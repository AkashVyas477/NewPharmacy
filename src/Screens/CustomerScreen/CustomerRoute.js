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

//Screens from Customer 
import LanguageScreen from '../CustomerScreen/Language';

// Screens from Home in Customer 
import HomeScreen from '../CustomerScreen/Home/HomeScreen';
import PrescriptionScreen from '../CustomerScreen/Home/PrescriptionScreen';
import PrescriptionImageScreen from '../CustomerScreen/Home/PrescriptionImageScreen';

// Screens from Profile in Customer 
import LocationScreen from '../CustomerScreen/Profile/Address/Location';
import CustomerProfileScreen from '../CustomerScreen/Profile/CustomerProfileScreen';
import CustomerProfileEditScreen from '../CustomerScreen/Profile/CustomerProfileEditScreen ';
import  ChangePassword from '../CustomerScreen/Profile/ChangePassword';

// Screens from Details in Customer 
import CurrentPrescriptionScreen from '../CustomerScreen/DetailsScreen/CurrentPrescriptionScreenDetail';
import PastPrescriptionScreen from '../CustomerScreen/DetailsScreen/PastPrescriptionScreenDetail';
import PharamaciesDetail from '../CustomerScreen/DetailsScreen/PharamaciesDetail';
import Preview from '../CustomerScreen/DetailsScreen/ImagePreview';
import PharamaciesImagePreview from '../CustomerScreen/DetailsScreen/PharamaciesImagePreview';
import OrderScreen from '../CustomerScreen/DetailsScreen/OrderScreen/OrderScreen';



import SplashScreen from '../SplashScreen';

import DrawerContent from './CustomerDrawer';

const Drawer = createDrawerNavigator()
const DrawerNavigator = props => {
    return (
        <Drawer.Navigator headerMode='none' drawerContent={ props => <DrawerContent {...props}/>}>
          
            <Drawer.Screen name='Home' component={TabNavigator} />
            <Drawer.Screen name='Profile' component={UserStackScreen}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;

const Tab = createBottomTabNavigator()
const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = ['Pharamacies_Detail','CurrentPrescriptionScreen_Data',
    'PastPrescriptionScreen_Data','Preview',
     'PharamaciesImagePreview', 'Edit_Profile',
     'OrderScreen','PrescriptionImageScreen']
    if (hideOnScreens.indexOf(routeName) > -1) return false;
    return true;
};

const TabNavigator = props => {
    return (

        <Tab.Navigator tabBarOptions={{
            activeTintColor: '#cccccc',
            inactiveTintColor: '#cccccc',
            style: {
                height:65,
                paddingBottom: 10,
                borderBottomColor: 'green',
                borderBottomWidth: 1,
                overflow: 'scroll',
                
            }
        }}>

            <Tab.Screen
                name='HomeScreen'
                component={HomeStackScreen}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: 'DASHBOARD',
                    tabBarIcon: ({ focused }) => (
                        < Image source={require('../../Assets/Icons/HomeIcon/homeIcon.png')} style={{ height: 22, width: 25, marginTop: 15, tintColor: focused ? 'green' : '#cccccc' }} />
                    )
                })} />
            <Tab.Screen
                name='Prescription'
                component={PrescriptionStackScreen}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: 'PRESCRIPTION',
                    tabBarIcon: ({ focused }) => (
                        < Image source={require('../../Assets/Icons/HomeIcon/prescriptionIcon.png')} style={{ height: 25, width: 18, marginTop: 15, tintColor: focused ? 'green' : '#cccccc' }} />
                    )
                })} />
        </Tab.Navigator>
    )
}
// export default TabNavigator;


const HomeStack = createStackNavigator()
const HomeStackScreen = props => {
    return (
        <HomeStack.Navigator headerMode='none'>
            <HomeStack.Screen name='Home' component={HomeScreen} />
            <HomeStack.Screen name='Pharamacies_Detail' component={PharamaciesDetail} />
            <HomeStack.Screen name='CurrentPrescriptionScreen_Data' component={CurrentPrescriptionScreen} />
            <HomeStack.Screen name='PastPrescriptionScreen_Data' component={PastPrescriptionScreen} />
            <HomeStack.Screen name ='Preview'component={Preview}/>
            <HomeStack.Screen name ='PharamaciesImagePreview'component={PharamaciesImagePreview}/>
            {/* <HomeStack.Screen name='OrderScreen' component={OrderScreen}/> */}
            {/* <HomeStack.Screen name ='Edit_Profile'component={CustomerProfileEditScreen}/> */}
        </HomeStack.Navigator>
    )
}
// export  HomeStack;

const PrescriptionStack = createStackNavigator()
const PrescriptionStackScreen = props => {
    return (
        <PrescriptionStack.Navigator headerMode='none' >
            <PrescriptionStack.Screen name='Prescription' component={PrescriptionScreen} />
            <PrescriptionStack.Screen name='CurrentPrescriptionScreen_Data' component={CurrentPrescriptionScreen} />
            <PrescriptionStack.Screen name='PastPrescriptionScreen_Data' component={PastPrescriptionScreen} />
            <PrescriptionStack.Screen name='PrescriptionImageScreen' component={PrescriptionImageScreen} />
            <PrescriptionStack.Screen name='Preview' component={Preview} />
            <PrescriptionStack.Screen name='PharamaciesImagePreview' component={PharamaciesImagePreview} />
            <PrescriptionStack.Screen name='OrderScreen' component={OrderScreen} />
        </PrescriptionStack.Navigator>
    )
}
// export default PrescriptionStackScreen;


const AddresStack = createStackNavigator()
const AddresStackScreen = props => {
    return (
        <AddresStack.Navigator headerMode='none'>
            <AddresStack.Screen name='AddresStack' component={LocationScreen} />
        </AddresStack.Navigator>
    )
}
// export default AddresStackScreen;


const LanguageStack = createStackNavigator()
const LanguageStackScreen = props => {
    return(
        <LanguageStack.Navigator headerMode='none'>
        <LanguageStack.Screen name='Language' component={LanguageScreen}/>
        </LanguageStack.Navigator>
    )
}
// export default LanguageStackScreen;


const UserStack = createStackNavigator()
const UserStackScreen = props => {
    return(
        <UserStack.Navigator headerMode='none'>
        <UserStack.Screen name='Profile'component={CustomerProfileScreen}/>
        <UserStack.Screen name='Edit_Profile'component={CustomerProfileEditScreen}/>
        <UserStack.Screen name='ChangePassword'component={ChangePassword}/>
        </UserStack.Navigator>
    )
}
// export UserStackScreen;






// const TopTab = createMaterialTopTabNavigator();

// const MyTabs = props=> {
//   return (
//     <TopTab.Navigator>
//       <TopTab.Screen name="Current" component={CurrentPrescriptionScreen}  />
//       <TopTab.Screen name="Past" component={PastPrescriptionScreen} />
//     </TopTab.Navigator>
//   );
// }

