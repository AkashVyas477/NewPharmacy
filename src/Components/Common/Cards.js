import { StyleSheet,Text, View , Image,TouchableOpacity } from "react-native"
import React,{useEffect,useState} from "react"
import { useSelector,useDispatch} from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Images,Colors} from '../../CommonConfig'
import * as CardAction from '../../Store/Actions/CardAction'
import Ionicon from 'react-native-vector-icons/Ionicons';
const Cards=(props)=>{
    const dispatch = useDispatch()

  const activeCard = useSelector(state => state.Card.activeMethodID)

    const logoSelector = (brand) => {
        if(brand === 'Visa'){
          return Images.Visa;
        }
      }
    

        return (
            <TouchableOpacity style={{...styles.cardItemContainer, 
            borderRadius:props.id === activeCard ? 10: 10, 
            borderColor: props.id === activeCard ? Colors.primary: null, 
            borderWidth: props.id === activeCard ? 1 : 0, 
            elevation: props.id === activeCard ? 0 : 0.01 }} 
            onPress={async() => {dispatch(CardAction.activatePayment(props.id))}}>
            <Image  source={logoSelector(props.brand)}  style={styles.imageStyle} />
            <View style={styles.detailContainer}>
          <View style={{flexDirection:'row'}}>
            
            <Text style={styles.cardNumber} > **** **** ****{props.number}</Text>
            </View>
            <Text style={styles.expiry}>Expires {props.exp_month}/{props.exp_year}</Text>
            </View>
          </TouchableOpacity>
         
        )
 
}

const styles = StyleSheet.create({
//   main:{
//     flexDirection: 'row',
//     alignItems:'center',
//     paddingHorizontal: 15,
//     padding: 10,
//     marginLeft: 15,
//     elevation:10,
//     overflow:'hidden',
//     backgroundColor:Colors.White,
//     borderRadius:10
// },
cardItemContainer:{
  flex:1,
  flexDirection:'row',
  alignItems:'center',
  paddingHorizontal: 15,
  padding:10,
  marginLeft: 15,
  elevation:10,
  overflow:'hidden',
  borderRadius:10, 
  backgroundColor:Colors.White,
  // marginVertical:5,
},
detailContainer:{
  flex:3,
  marginLeft:20,
  justifyContent:'space-evenly',
  height:'100%'
},
imageStyle:{
    height: 80,
    width: 80
},
// cardnum:{
//     fontSize: 18,
//     color: Colors.Gray
// },
cardNumber:{
  fontSize:18,
  fontWeight:'bold',
  marginRight:10
},
expiry:{
  fontWeight:'600',
  fontSize:16,
  color: Colors.GREY
}
});


export default Cards;