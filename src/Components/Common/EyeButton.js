import { StyleSheet,Image, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import { Images } from '../../CommonConfig';


const EyeButton = ({onEyePress,tnceye ,style}) => {   
    return (
        <TouchableOpacity onPress={onEyePress} style={style}>
            {tnceye ? <Image source={Images.InactiveEye}  style={styles.eyeIcon} /> :
                <Image source={Images.ActiveEye}style={styles.eyeIcon} />
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