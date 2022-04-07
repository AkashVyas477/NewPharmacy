import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStackScreen from './Authnavigation/AuthStackscreen';
import DrawerNavigator from './customerRoute';

const AppStack = createStackNavigator();
const AppNavigator = props => {
    return(
        <NavigationContainer>
            <AppStack.Navigator headerMode='none'>
                <AppStack.Screen name='Auth' component={AuthStackScreen} />
                <AppStack.Screen name ='Drawer' component={DrawerNavigator}/> 
            </AppStack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigator;