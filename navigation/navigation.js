import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStackScreen from '../Screens/Auth/AuthStackscreen';
import DrawerNavigator from '../Screens/customerRoute';

const AppStack = createStackNavigator();
const AppNavigator = props => {
    return(
        <NavigationContainer>
            <AppStack.Navigator headerMode='none'>
                <AppStack.Screen name='Auth' component={AuthStackScreen} />
                <AppDrawer.Screen name ='Drawer' component={DrawerNavigator}/> 
            </AppStack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigator;