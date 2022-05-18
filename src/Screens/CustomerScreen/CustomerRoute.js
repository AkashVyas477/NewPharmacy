import React from 'react';
import { Image, View } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Images, Colors } from '../../CommonConfig';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


// Home Screens
import HomeScreen from '../CustomerScreen/Home/HomeScreen';
//LogInScren
import LoginScreen from '../AuthScreen/LoginScreen'


// Prescriptions
import PrescriptionScreen from '../CustomerScreen/Home/PrescriptionScreen';
// Language
import LanguageScreen from '../CustomerScreen/Language';
// LogoutScreen

//LocationScreen
import LocationScreen from '../CustomerScreen/Profile/Address/Location';
//Current Screen
import CurrentPrescriptionScreen from '../CustomerScreen/DetailsScreen/CurrentPrescriptionScreenDetail';
//Past Screen
import PastPrescriptionScreen from '../CustomerScreen/DetailsScreen/PastPrescriptionScreenDetail';
//PharamaciesDetail
import PharamaciesDetail from '../CustomerScreen/DetailsScreen/PharamaciesDetail';
// Create Request
import PrescriptionImageScreen from '../CustomerScreen/Home/PrescriptionImageScreen';
//ImagePreview
import Preview from '../CustomerScreen/DetailsScreen/ImagePreview';
// PharamaciesIamgePreview
import PharamaciesImagePreview from '../CustomerScreen/DetailsScreen/PharamaciesImagePreview';
// Profile
import CustomerProfileScreen from '../CustomerScreen/Profile/CustomerProfileScreen'
//EditProfile
import CustomerProfileEditScreen from '../CustomerScreen/Profile/CustomerProfileEditScreen '
//ChangePassword
import  ChangePassword from '../CustomerScreen/Profile/ChangePassword'
// orderScreen
import OrderScreen from '../CustomerScreen/DetailsScreen/OrderScreen/OrderScreen';
import SplashScreen from '../SplashScreen';
import DrawerContent from './CustomerDrawer';

const Drawer = createDrawerNavigator()
const DrawerNavigator = props => {
    return (
        <Drawer.Navigator headerMode='none' drawerContent={ ({props}) => <DrawerContent {...props}/>}>
            {/* <Drawer.Screen name ='UserStack' component={UserStackScreen} 
            options={{
                drawerIcon:()=> <Image source={Images.SignupPlaceholder} style={{height:50, width:50, borderRadius:50, overflow:'hidden'}}/>,
                drawerLabel:" USer "
            }}
            /> */}
            <Drawer.Screen name='Home' component={TabNavigator} 
            options={{
                drawerIcon: () => <Image source={Images.homeIcon} style={{ height: 20, width: 20,  }} />,
            }} />

            {/* <Drawer.Screen name='AddresStack' component={AddresStackScreen} options={{
                drawerLabel: 'Manage Address',
                drawerIcon: () => <Image source={Images.LocationPin} style={{ height: 27, width: 20, }} />,

            }} /> */}

            {/* <Drawer.Screen name='Language' component={LanguageScreen} options={{
                drawerLabel:'Language',
                drawerIcon:()=> <Image source={Images.Language} style={{height: 30, width: 30,}} />,
            }} /> */}

            {/* <Drawer.Screen name ='LogOut' component={SplashScreen} options={{
                drawerLabel:'Log Out', 
                drawerIcon:()=> <Image source={Images.Logout} style={{height: 30, width: 27,}} />,
            }}/> */}

            {/* <Drawer.Screen name ='Address' component={ManageAddress} /> */}
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
// export default HomeStackScreen;

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
            <AddresStack.Screen name='ManageAddress' component={LocationScreen} />
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
// export default UserStackScreen;






// const TopTab = createMaterialTopTabNavigator();

// const MyTabs = props=> {
//   return (
//     <TopTab.Navigator>
//       <TopTab.Screen name="Current" component={CurrentPrescriptionScreen}  />
//       <TopTab.Screen name="Past" component={PastPrescriptionScreen} />
//     </TopTab.Navigator>
//   );
// }

