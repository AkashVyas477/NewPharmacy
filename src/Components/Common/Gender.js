import { View,StyleSheet, Image,Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Images,Colors } from '../../CommonConfig';
import { colorProps } from 'react-native-reanimated/src/reanimated2/UpdateProps';


const Gender = ({props}) => {
    // const [male, setMale] = useState(false);
    // const maleHandler = () => {
    //     setMale(state => !state);
    //     setFemale(false);
    // };

    // const [female, setFemale] = useState(false);
    // const femaleHandler = () => {
    //     setFemale(state => !state);
    //     setMale(false);
    return (

        <View>
    <View style={styles.gendercheck}>                                  
     <TouchableOpacity onPress={colorProps.onPress} >
     { props.male ?<Image source={Images.RoundCheckInactive} style={styles.checkIcon}/>:
     <Image source={Images.RoundCheckActive} style={styles.checkIcon}  />
    }
     </TouchableOpacity>
    <Text style={styles.genderText} >{label} </Text> 
    </View> 

    <View style={styles.femaleGender}>
    <TouchableOpacity  onPress={props.onPress}>
    { props.female ?<Image source={Images.RoundCheckInactive} style={styles.checkIcon}/>:
    <Iamge source={Images.RoundCheckActive} style={styles.checkIcon} />
    }
    </TouchableOpacity>
    <Text style={styles.genderText} >{label}</Text>
    </View>

    </View>
        );
    };

const styles = StyleSheet.create({
    gendercheck:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1, 
        paddingBottom:5, 
        width:'40%' ,
        borderBottomColor: Colors.borderBottomColor,
    },
    femaleGender:{
        flexDirection:'row', 
        alignItems:'center'
    },

})
export default Gender;