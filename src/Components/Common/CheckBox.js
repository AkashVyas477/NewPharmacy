import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Images } from '../../CommonConfig';


const CheckBox = ({
    style,
    onPress
}) => {
    const [tnc, setTnc] = useState(false);
    const tncHandler = () => {
        setTnc(state => !state);
    };
    return (
        <TouchableOpacity onPress={tncHandler}>
            {tnc ?
                <Image source={Images.CheckBoxActive} style={styles.checkIcon} /> :
                <Image source={Images.CheckBoxInactive} style={styles.checkIcon} />
            }
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    checkIcon: {
        height: 20,
        width: 20
    },
})
export default CheckBox;