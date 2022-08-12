import React from 'react';
import { Image, View } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Images, Colors } from '../../CommonConfig';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTranslation } from 'react-i18next';

//LogInScren
import LoginScreen from '../AuthScreen/LoginScreen'
//Screens from Customer 
import LanguageScreen from '../LanguageScreen';
// Screens from Home in Customer 
import HomeScreen from '../CustomerScreen/Home/HomeScreen';
import PrescriptionScreen from '../CustomerScreen/Home/PrescriptionScreen';
import PrescriptionImageScreen from '../CustomerScreen/Home/PrescriptionImageScreen';
// Screens from Profile in Customer 
import CustomerProfileScreen from '../CustomerScreen/Profile/CustomerProfileScreen';
import CustomerProfileEditScreen from '../CustomerScreen/Profile/CustomerProfileEditScreen ';
import  ChangePassword from '../CustomerScreen/Profile/ChangePassword';
import Address from '../CustomerScreen/Profile/Address/Address';
import AddNewAddres from '../CustomerScreen/Profile/Address/AddNewAddress';
import EditAddress from '../CustomerScreen/Profile/Address/EditAddress';
// Screens from Details in Customer 
import CurrentPrescriptionScreen from '../CustomerScreen/DetailsScreen/CurrentPrescriptionScreenDetail';
import PastPrescriptionScreen from '../CustomerScreen/DetailsScreen/PastPrescriptionScreenDetail';
import PharamaciesDetail from '../CustomerScreen/DetailsScreen/PharamaciesDetail';
import Preview from '../CustomerScreen/DetailsScreen/ImagePreview';
import PharamaciesImagePreview from '../CustomerScreen/DetailsScreen/PharamaciesImagePreview';
import OrderScreen from '../CustomerScreen/DetailsScreen/OrderScreen/OrderScreen';
import AddCard from '../CustomerScreen/Payment/AddCard';

import SplashScreen from '../SplashScreen';
import DrawerContent from './CustomerDrawer';
import navigate from '../../CommonConfig/Translations/en/navigate';
const Drawer = createDrawerNavigator()
const DrawerNavigator = props => {
    return (
        <Drawer.Navigator 
        headerMode='none' 
        drawerContent={ props => <DrawerContent {...props}/>}>
            <Drawer.Screen name='Home' component={TabNavigator} />
            <Drawer.Screen name='Profile' component={UserStackScreen}/>
            <Drawer.Screen name = 'LanguageScreen' component={LanguageStackScreen} />
            <Drawer.Screen name='AddresScreen' component={AddresStackScreen}/>
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
     'OrderScreen','CheckoutScreen','PrescriptionImageScreen','AddCard','LanguageScreen']
    if (hideOnScreens.indexOf(routeName) > -1) return false;
    return true;
};
const TabNavigator = props => {
    const { t } = useTranslation();
    return (
        <Tab.Navigator tabBarOptions={{
            activeTintColor: '#cccccc',
            inactiveTintColor: '#cccccc',
            style: {
                height:65,
                paddingBottom: 10,
               
                
            }
        }}>
            <Tab.Screen
                name='HomeScreen'
                component={HomeStackScreen}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: t('navigate:DASHBOARD'),
                    tabBarIcon: ({ focused }) => (
                        < Image source={require('../../assets/Icons/HomeIcon/homeIcon.png')} style={{ height: 22, width: 25, marginTop: 15, tintColor: focused ? 'green' : '#cccccc' }} />
                    )
                })} />
            <Tab.Screen
                name='Prescription'
                component={PrescriptionStackScreen}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: t('navigate:PRESCRIPTION'),
                    tabBarIcon: ({ focused }) => (
                        < Image source={require('../../assets/Icons/HomeIcon/prescriptionIcon.png')} style={{ height: 25, width: 18, marginTop: 15, tintColor: focused ? 'green' : '#cccccc' }} />
                    )
                })} />
        </Tab.Navigator>
    )
}



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
        </HomeStack.Navigator>
    )
}


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
            <PrescriptionStack.Screen name='AddCard' component={AddCard}/>
        </PrescriptionStack.Navigator>
    )
}
const AddresStack = createStackNavigator()
const AddresStackScreen = props => {
    return (
        <AddresStack.Navigator headerMode='none'>
            <AddresStack.Screen name='AddresScreen' component={Address} />
            <AddresStack.Screen name='AddNewAddres' component={AddNewAddres} />
            <AddresStack.Screen name='EditAddress' component={EditAddress} />
        </AddresStack.Navigator>
    )
}
const LanguageStack = createStackNavigator()
const LanguageStackScreen = props => {
    return(
        <LanguageStack.Navigator headerMode='none' >
        <LanguageStack.Screen name='LanguageScreen' component={LanguageScreen} />
        </LanguageStack.Navigator>
    )
}
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