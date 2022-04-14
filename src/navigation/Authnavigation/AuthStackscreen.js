import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPasswordScreen from '../../Screens/AuthScreen/ForgotPasswordScreen';
import LoginScreen from '../../Screens/AuthScreen/LoginScreen';
import RollSignUpScreen from '../../Screens/AuthScreen/RollSignUpScreen';
import PharmacyUserScreen from '../../Screens/AuthScreen/Pharamacist/PharmacyUserScreen';
import PharmacistSignUpScreen from '../../Screens/AuthScreen/Pharamacist/PharmacistSignUpScreen';
import CustomerSignupScreen from '../../Screens/AuthScreen/Customer/CustomerSignUpScreen';
import PhoneNumberScreen from '../../Screens/AuthScreen/PhoneNumberScreen';
import VerificationScreen from '../../Screens/AuthScreen/VerificationScreen';
import LocationScreen from '../../Screens/CustomerScreen/Location';



 

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
            <AuthStack.Screen name="PhoneNumberScreen" component={PhoneNumberScreen} />
            <AuthStack.Screen name="VerificationScreen" component={VerificationScreen} />
            <AuthStack.Screen name="LocationScreen" component={LocationScreen} />
        </AuthStack.Navigator>
    );
}
export default AuthStackScreen;