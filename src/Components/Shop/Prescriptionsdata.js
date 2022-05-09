import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react'

import { Colors, Images } from '../../CommonConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window')
const height = width * 100 / 0.6
const PrescriptionScreenData  = (props) => {
    return (
        <View style={{flex: 1}} >
            <SafeAreaView >
        <View style={styles.card}>
            <TouchableOpacity onPress={props.onClick} >
            
                <View style={styles.Card_Sty}>
                <Image source={props.image} style={styles.Image_Sty} />
                    <View style={styles.Text_sty}>
                        <View >
                            <Text style={styles.name}>{props.name}</Text>
                        </View>
                        <View >
                            <Text >{props.details}</Text>
                        </View>
                        <View>
                            <Text>{props.quotes}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
        </View>

    )
}
export default PrescriptionScreenData
const styles = StyleSheet.create({

    card: {
        paddingLeft:15,
        padding:5,
      },
    Card_Sty:{ 
        flexDirection: 'row',
        // padding: 5,
     },

    Image_Sty:{
        height: 90, width: 120,
        borderRadius:40,
        overflow: 'hidden'
    },
    Text_sty:{ 
        flexDirection: 'column', marginLeft: 5
     },

     name:{
         fontWeight:'bold',
         color: Colors.Sp_Text
     }
});