import React from 'react';
import {View, Text , StyleSheet} from 'react-native';

const CurrentPrescriptionScreen = props =>{
    return(
        <View style={styles.screen}>
            <Text>
            CurrentPrescriptionScreen
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

export default CurrentPrescriptionScreen;