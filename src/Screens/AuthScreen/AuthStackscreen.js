import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import LoginScreen from './LoginScreen';
import RollSignUpScreen from './RollSignUpScreen';
import PharmacyUserScreen from './Pharamacist/PharmacyUserScreen';
import PharmacistSignUpScreen from './Pharamacist/PharmacistSignUpScreen';
import CustomerSignupScreen from './Customer/CustomerSignUpScreen';
import PhoneNumberScreen from './PhoneNumberScreen';
import VerificationScreen from './VerificationScreen';



 

const AuthStack = createStackNavigator();
const AuthStackScreen = ({ navigation }) => {
    return(
        <AuthStack.Navigator headerMode='none' initialRouteName='Login' >
             <AuthStack.Screen name="Login" component={LoginScreen} />
             <AuthStack.Screen name="RollSignUpScreen" component={RollSignUpScreen}/>
            <AuthStack.Screen name="FORGOT PASSWORD" component={ForgotPasswordScreen}  />
            <AuthStack.Screen name="LOGIN AS PHARMACY USER" component={PharmacyUserScreen} />
            <AuthStack.Screen name="CustomerSignup" component={CustomerSignupScreen} />
            <AuthStack.Screen name="PharmacistSingup" component={PharmacistSignUpScreen} />
            <AuthStack.Screen name="PhoneNumberScreen" component={PhoneNumberScreen} />
            <AuthStack.Screen name="VerificationScreen" component={VerificationScreen} />
        </AuthStack.Navigator>
    );
}
export default AuthStackScreen;