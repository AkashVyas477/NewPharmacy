import React from 'react';
import {View, Text , StyleSheet} from 'react-native';
import Selector from '../../Components/Common/LanguageSelector';
import Header from '../../Components/Common/Header'

const LanguageScreen = props =>{
    return(
        <View style={styles.screen}>

            <View style={styles.header_sty}>
                <Header
                    Title="LanguageScreen"
                    onPress={() => props.navigation.goBack()}
                />
            </View>
            <Selector />
        </View>
    );
};

const  styles=StyleSheet. create({
    screen:{
        flex:1,
        backgroundColor:'white',
    },
     header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
});

export default LanguageScreen;