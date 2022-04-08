import { StyleSheet,Image, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import { Images } from '../../CommonConfig';
import { colorProps } from 'react-native-reanimated/src/reanimated2/UpdateProps';


const EyeButton = (props) => {   
    return (
        <TouchableOpacity onPress={props.onPress}  style={props.style}>
            {props.tnceye ? <Image source={Images.ActiveEye} style={styles.eyeIcon} /> :
                <Image source={Images.InactiveEye} style={styles.eyeIcon} />
            }
        </TouchableOpacity>
        
    );
};

const styles = StyleSheet.create({
    eyeIcon: {
        height: 15,
        width: 24,
    },

})
export default EyeButton;