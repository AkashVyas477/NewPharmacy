import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPasswordScreen from '../ForgotPasswordScreen';
import LoginScreen from '../LoginScreen';
import SignUpScreen from '../SignUpScreen';
import PharmacyUserScreen from '../PharmacyUserScreen'
 

const AuthStack = createStackNavigator();
const AuthStackScreen = ({ navigation }) => {
    return(
        <AuthStack.Navigator screenOptions={{
            headerTitleAlign:'center'
        }} >
             <AuthStack.Screen name="Login" component={LoginScreen} options={{
                 headerShown: false
             }}/>
             <AuthStack.Screen name="SignUp Screen" component={SignUpScreen}/>
            <AuthStack.Screen name="FORGOT PASSWORD" component={ForgotPasswordScreen}  />
            <AuthStack.Screen name="LOGIN AS PHARMACY USER" component={PharmacyUserScreen} />
        </AuthStack.Navigator>
    );
}
export default AuthStackScreen;