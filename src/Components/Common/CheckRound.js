import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Images } from '../../CommonConfig';


const CheckRound = ({
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
                <Image source={Images.ActiveRoundCheck} style={styles.checkIcon} /> :
                <Image source={Images.InactiveCheckBox} style={styles.checkIcon} />
            }
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    checkIcon: {
        height: 24,
        width: 24
    },
})
export default CheckRound;