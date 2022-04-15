import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react'

import { Colors, Images } from '../../CommonConfig';
const { width } = Dimensions.get('window')
const height = width * 100 / 0.6
const PrescriptionScreenData  = (props) => {
    return (
        <View  style={styles.card}>
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
            
        
    )
}
export default PrescriptionScreenData
const styles = StyleSheet.create({

    card: {
        backgroundColor:Colors.White,
        height:100,
        width: 380,
        justifyContent:'center',
        paddingLeft: 5,
        shadowColor:Colors.White,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        // backgroundColor: 'white',
        marginBottom:5,
        margin:10,
        // alignItems:'center',
       
      },
    Card_Sty:{ 
        flexDirection: 'row',
        padding: 5,
     },

    Image_Sty:{
        height: 90, width: 120,
    },
    Text_sty:{ 
        flexDirection: 'column', marginLeft: 5
     },

     name:{
         fontWeight:'bold',
         color: Colors.Sp_Text
     }
});