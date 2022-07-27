import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import CustomerRoute from '../Screens/CustomerScreen/CustomerRoute'
import CustomerDrawer from '../Screens/CustomerScreen/CustomerDrawer'
import AuthStackScreen from '../Screens/AuthScreen/AuthStackscreen';
import SplashScreen from '../Screens/SplashScreen'
import DrawerNavigator from '../Screens/CustomerScreen/CustomerRoute';
import PharamaDrawerNavigator from '../Screens/PharamacistScreen/PharamcistRoute';
import LanguageScreen from '../Screens/LanguageScreen';



const AppStack = createStackNavigator();
const AppNavigator = props => {

   
    return(
        <NavigationContainer>
            <AppStack.Navigator headerMode='none' initialRouteName='Splash'>
            <AppStack.Screen name="Splash" component={SplashScreen}/>
                <AppStack.Screen name='Auth' component={AuthStackScreen} />
                {/* DrawerNavigator = CustomerDrawer  */}
                <AppStack.Screen name ='CustomerDrawer' component={DrawerNavigator}/> 
                 {/* PharamaDrawerNavigator = PharamacistDrawer  */}
                <AppStack.Screen name='PharamacistDrawer' component={PharamaDrawerNavigator}/>
                <AppStack.Screen name = 'LanguageScreen' component={LanguageScreen}/>



            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;
