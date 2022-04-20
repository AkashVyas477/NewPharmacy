import React from 'react';
import {View, Text , StyleSheet} from 'react-native';
import { Header, Button } from '../../Components/Common';
import {Images,Colors} from '../../CommonConfig'

const CustomerProfileScreen = props =>{
    return(
        <View style={styles.screen}>
            <View style={styles.header}>
            <Header  
            Title="PROFILE"
            
            />
            </View>
        </View>
    );
};

const  styles=StyleSheet. create({
    screen:{
        flex:1,
        backgroundColor:'white',
    },

    header:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 5, 
        padding: 10 
    },
});

export default CustomerProfileScreen;