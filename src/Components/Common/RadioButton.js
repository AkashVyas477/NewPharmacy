import { View,StyleSheet, Image,Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Images,Colors } from '../../CommonConfig';

const RadioButton = props => {
    return (

    <View>
    <View style={styles.radiocheck}>                                  
     <TouchableOpacity onPress={props.onPress} >
     { props.state ?<Image source={Images.RoundCheckActive} style={styles.checkIcon}/>:
     <Image source={Images.RoundCheckInactive} style={styles.checkIcon}  />
    }
     </TouchableOpacity>
    <Text style={styles.radioText}>{props.label} </Text> 
    </View> 

    </View>
        );
    };

const styles = StyleSheet.create({
    radiocheck:{
        flexDirection:'row',
        alignItems:'center',
        // borderBottomWidth:1, 
        paddingBottom:5, 
        width:'60%' ,
        // borderBottomColor: Colors.borderBottomColor,
    },
    checkIcon:{ height: 28, width: 28, },
    radioText:{paddingLeft:5, color:Colors.Sp_Text},

})
export default RadioButton;