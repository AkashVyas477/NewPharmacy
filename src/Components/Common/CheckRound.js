import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Images } from '../../CommonConfig';


const CheckRound = ({style,onPress }) => {
    const [tnc, setTnc] = useState(false);
    const tncHandler = () => {
        setTnc(state => !state);
    };
    return (
        <TouchableOpacity onPress={tncHandler}>
            {tnc ?
                <Image source={Images.ActiveRoundCheck} style={styles.acheckIcon} /> :
                <Image source={Images.InactiveCheckBox} style={styles.checkIcon} />
            }
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    checkIcon: {
        height: 25,
        width: 25
    },
    acheckIcon: {
        height: 26,
        width: 25
    },
})
export default CheckRound;