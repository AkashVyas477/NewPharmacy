import React from 'react';
import {View, Text , StyleSheet} from 'react-native';

const PharmacistSignUpScreen = props =>{
    return(
        <View style={styles.screen}>
            <Text>
            PharmacistSignUpScreen
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

export default PharmacistSignUpScreen;