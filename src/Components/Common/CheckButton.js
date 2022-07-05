import { View,StyleSheet, Image,Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Images,Colors } from '../../CommonConfig';

const CheckButton = props => {
    return (

    <View>
    <View style={styles.check}>                                  
     <TouchableOpacity onPress={props.onPress} >
     { props.state ?<Image source={Images.ActiveRoundCheck} style={styles.checkIcon}/>:
     <Image source={Images.InactiveCheckBox} style={styles.InactivecheckIcon}  />
    }
     </TouchableOpacity>
    <Text style={styles.Text}>{props.label} </Text> 
    </View> 

    </View>
        );
    };

const styles = StyleSheet.create({
    check:{
        flexDirection:'row',
        alignItems:'center',
        // borderBottomWidth:1, 
        paddingBottom:5, 
        width:'70%' ,
        // borderBottomColor: Colors.borderBottomColor,
    },
    checkIcon:{ height: 29.5, width: 28.5, },
    InactivecheckIcon:{height: 29, width: 28.9,},
    Text:{paddingLeft:6, color:Colors.Sp_Text},

})
export default CheckButton;