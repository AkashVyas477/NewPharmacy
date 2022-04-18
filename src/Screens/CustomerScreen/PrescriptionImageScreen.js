import React from 'react';
import {View, Text , StyleSheet} from 'react-native';
import { Header,Button, } from '../../Components/Common';

const PrescriptionImageScreen = props =>{
    return(
        <View >
            <View style={styles.header_sty} >
                {/* <StatusBar backgroundColor={selectedItem.bgColor} barStyle='light-content' /> */}
                <Header
                    Title="DETAILS"
                    onPress={() => props.navigation.goBack()}
                />
            </View>

            <View style={styles.screen} >

            </View>
        </View>
    );
};

const  styles=StyleSheet. create({
    screen:{
        flex:1
    },
    header_sty:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10 
    },
});

export default PrescriptionImageScreen;