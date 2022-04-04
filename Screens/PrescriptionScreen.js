import React from 'react';
import {View, Text , StyleSheet} from 'react-native';

const PrescriptionScreen = props =>{
    return(
        <View style={styles.screen}>
            <Text>
            PrescritionScreen
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

export default PrescriptionScreen;