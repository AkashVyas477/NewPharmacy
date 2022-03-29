import React from 'react';
import {View, Text , StyleSheet} from 'react-native';

const pharmacyuserscreen = props =>{
    return(
        <View style={StyleSheet.screen}>
            <Text>
            pharmacyuserscreen Screen! 
            </Text>
        </View>
    );
};

const  styles=StyleSheet. create({
    screen:{
        flex:1,
        
    }
});

export default pharmacyuserscreen;