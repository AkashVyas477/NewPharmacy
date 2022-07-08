import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import CustomerRoute from '../Screens/CustomerScreen/CustomerRoute'
import CustomerDrawer from '../Screens/CustomerScreen/CustomerDrawer'
import AuthStackScreen from '../Screens/AuthScreen/AuthStackscreen';
import SplashScreen from '../Screens/SplashScreen'
import DrawerNavigator from '../Screens/CustomerScreen/CustomerRoute';


const AppStack = createStackNavigator();
const AppNavigator = props => {

   
    return(
        <NavigationContainer>
            <AppStack.Navigator headerMode='none' initialRouteName='Splash'>
            <AppStack.Screen name="Splash" component={SplashScreen}/>
                <AppStack.Screen name='Auth' component={AuthStackScreen} />
                <AppStack.Screen name ='Drawer' component={DrawerNavigator}/> 
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;
