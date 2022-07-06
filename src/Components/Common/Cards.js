import { StyleSheet,Text, View , Image,TouchableOpacity } from "react-native"
import React,{useEffect,useState} from "react"
import { useSelector,useDispatch} from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Images,Colors} from '../../CommonConfig'
import * as CardAction from '../../Store/Actions/CardAction'
const Cards=(props)=>{
    const dispatch = useDispatch()

  const activeCard = useSelector(state => state.Card.activeMethodID)

    const logoSelector = (brand) => {
        if(brand === 'Visa'){
          return Images.Visa;
        }
        // else if(brand === 'American Express'){
        //   return Images.UsaExpress;
        // }
        // else if(brand === 'Master Card'){
        //   return Images.mastercard;
        // }
      }
    
      // const [ activateCard, setActivateCard ] = useState( {} )
      //     console.log("\n\nActive CARD       ",activateCard)
    
      //   useEffect( async() => {
      //     setActivateCard( JSON.parse( await AsyncStorage.getItem('activateCard')))
      //   },[]) 

        return (
            <TouchableOpacity style={{...styles.main, 
            borderRadius:props.id === activeCard ? 10: 10, 
            borderColor: props.id === activeCard ? Colors.primary: null, 
            borderWidth: props.id === activeCard ? 1 : 0, 
            elevation: props.id === activeCard ? 0 : 0.01 }} 
            onPress={async() => {dispatch(CardAction.activatePayment(props.id))}}>
        
            <Image  source={logoSelector(props.brand)}  style={styles.imageStyle} />
            <Text style={styles.cardnum} > **** **** ****{props.number}</Text>
         
          </TouchableOpacity>
         
        )
 
}

const styles = StyleSheet.create({
    main:{
        flexDirection: 'row',
        alignItems:'center',
        paddingHorizontal: 15,
        padding: 10,
        marginLeft: 15,
        elevation:10,
        overflow:'hidden',
        backgroundColor:Colors.White,
        borderRadius:10
    },
    imageStyle:{
        height: 50,
        width: 50
    },
    cardnum:{
        fontSize: 18,
        color: Colors.Gray
    }
});

export default Cards;