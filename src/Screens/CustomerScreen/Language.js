import React from 'react';
import {View, Text , StyleSheet} from 'react-native';

const LanguageScreen = props =>{
    return(
        <View style={styles.screen}>
            <Text>
            LanguageScreen
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

export default LanguageScreen;