import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity,Dimensions, TextInput } from 'react-native';


const { width } = Dimensions.get('window')
const height = width * 100 / 0.6
const { width: screenWidth } = Dimensions.get('window')
const MedicinesImagesPreview = props =>{
    return(
        <View style={styles.screen}>
       <Image source={{uri: props.image}} resizeMode="stretch" style={styles.imageContainer} />
       </View>
    );
};

const  styles=StyleSheet.create({
    screen:{
        flexGrow:1,
    },
    imageContainer: {
        height: width * 0.8,
        width: width * 1,
        opacity: 0.7
    }
    
});

export default MedicinesImagesPreview;