import React from 'react';
import {View, Text , StyleSheet} from 'react-native';

const PastPrescriptionScreen = props =>{
    return(
        <View style={styles.screen}>
            <Text>
            PastPrescriptionScreen
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

export default PastPrescriptionScreen;