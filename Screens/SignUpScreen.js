import React from 'react';
import {View, Text , StyleSheet} from 'react-native';

const SignupScreen = props =>{
    return(
        <View style={styles.screen}>
            <Text>
            Signup Screen! 
            </Text>
        </View>
    );
};

const  styles=StyleSheet. create({
    screen:{
        flex:1,
        
        backgroundColor:'white',
    }
});

export default SignupScreen;