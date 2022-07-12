import { StyleSheet,Text, View , Image,TouchableOpacity } from "react-native"
import React from 'react'
import{useEffect,useState} from 'react'
import { useSelector,useDispatch} from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Images,Colors} from '../../CommonConfig'

import * as CardAction from '../../Store/Actions/CardAction'
import Ionicon from 'react-native-vector-icons/Ionicons';


const CreditCardDisplay = props => {

    const dispatch = useDispatch()

    const activeCard = useSelector(state => state.Card.activeMethodID)

    const logoSelector = (brand) => {
        if(brand === 'Visa') {
            return Images.Visa
        }
    }

    return (
        // <TouchableOpacity style={{...styles.cardItemContainer, 
        //     borderRadius:props.id === activeCard ? 10: 10, 
        //     borderColor: props.id === activeCard ? Colors.PRIMARY: null, 
        //     borderWidth: props.id === activeCard ? 1 : 0, 
        //     elevation: props.id === activeCard ? 0 : 0.01 }} 
        //     onPress={async() => {dispatch(CardAction.activatePayment(props.id)),
        //     await AsyncStorage.setItem('activateCard', JSON.stringify(props.item))}}>
        //     <Image  source={logoSelector(props.brand)}  style={styles.imageStyle} />
        //     <View style={styles.detailContainer}>
        //   <View style={{flexDirection:'row'}}>
            
        //     <Text style={styles.cardNumber} > **** **** ****{props.number}</Text>
        //     </View>
        //     <Text style={styles.expiry}>Expires {props.exp_month}/{props.exp_year}</Text>
        //     </View>
        //   </TouchableOpacity> 

        <View style={styles.cardItemContainer}>
            <Image source={ logoSelector(props.brand)} style={{height:80, width:80}}/>
            <View style={styles.detailContainer}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.cardNumber}>**** **** **** {props.number}</Text>
                    {/* <TouchableOpacity><Ionicon name="create-outline" size={20} color={ Colors.PRIMARY } /></TouchableOpacity> */}
                </View>
                <Text style={styles.expiry}>Expires {props.exp_month} / {props.exp_year}</Text>
            </View>
        </View>
    )
}

export default CreditCardDisplay

const styles = StyleSheet.create({
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
    cardNumber:{
        fontSize:18,
        fontWeight:'bold',
        marginRight:10
    },
    expiry:{
        fontWeight:'600',
        fontSize:16,
        color: Colors.GREY
    },
    imageStyle:{
        height: 80,
        width: 80
    },
})