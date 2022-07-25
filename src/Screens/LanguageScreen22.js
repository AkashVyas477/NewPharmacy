import React from 'react';
import {View }from 'react-native';
import Selector from '../Components/Common/LanguageSelector';
export default function LanguageScreen () {
    return (
        <View style={{flex:1,  backgroundColor:'#fff'}}>
            <Selector />
        </View>
    )
}