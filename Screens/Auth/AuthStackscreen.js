import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPasswordScreen from '../ForgotPasswordScreen';
import LoginScreen from '../LoginScreen';
import RollSignUpScreen from '../RollSignUpScreen';
import PharmacyUserScreen from '../PharmacyUserScreen';
import PharmacistSignUpScreen from '../PharmacistSignUpScreen';
import CustomerSignupScreen from '../CustomerSignUpScreen';

 

const AuthStack = createStackNavigator();
const AuthStackScreen = ({ navigation }) => {
    return(
        <AuthStack.Navigator headerMode='none' >
             <AuthStack.Screen name="Login" component={LoginScreen} />
             <AuthStack.Screen name="RollSignUpScreen" component={RollSignUpScreen}/>
            <AuthStack.Screen name="FORGOT PASSWORD" component={ForgotPasswordScreen}  />
            <AuthStack.Screen name="LOGIN AS PHARMACY USER" component={PharmacyUserScreen} />
            <AuthStack.Screen name="CustomerSignup" component={CustomerSignupScreen} />
            <AuthStack.Screen name="PharmacistSingup" component={PharmacistSignUpScreen} />
        </AuthStack.Navigator>
    );
}
export default AuthStackScreen;