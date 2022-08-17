import { StyleSheet, Text, View, ScrollView, StatusBar, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
// import PharamaciesData from '../../../DummyData/DummyData';
import { Colors,Images } from '../../../CommonConfig';
import { Header, Button , } from '../../../Components/Common';

import { getWithParams } from '../../../Components/Helpers/ApiHelper';
import { useTranslation } from 'react-i18next';


const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const PharamaciesDetail = (props) => {
    const {t}= useTranslation()

    const height = width * 100 / 0.6
    const [active, setActive] = useState(0);

    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x /nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
            setActive(slide);
        }
    }
    const currentPharmacy = props.route.params.pharmacy
    console.log(currentPharmacy);

    return (
        <View > 
            <View >
            <View  style={styles.header_sty}>
                <Header
                Title={t('common:DETAILS')}
                onPress={() => props.navigation.goBack()}
                />
           </View> 
       
            <ImageBackground source={{uri:currentPharmacy.store_image}} style={styles.imageContainer}></ImageBackground>
        
            </View>

<View>
   
        {/* Shop Name & address*/}
        <View style={styles.card}>
        <View style={{flexDirection:'row' ,alignItems:'center',justifyContent:'space-between'}}>
        <View>
        <Text style={styles.text} >{currentPharmacy.store_name}</Text>
        <Text style={styles.text2}>{currentPharmacy.address.primary_address}</Text>
        <Text style={styles.text2}>{currentPharmacy.address.addition_address_info}</Text>
        <Text style={styles.text3}>{currentPharmacy.distance}</Text>
        </View>
        <View style={{alignItems:'center', }} >
                <TouchableOpacity style={{alignItems:'flex-end', paddingRight:10}}>
                    <Image source={Images.MapLocate} style={{height:15,width:11,}} />
                </TouchableOpacity>
             </View>
        </View>
        </View>
</View>

        </View>
    )
}

export default PharamaciesDetail;

const styles = StyleSheet.create({

    header_sty:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10 ,
        backgroundColor:Colors.White
    },
    text:{
        fontWeight:'bold',
        fontSize:20, 
        padding:10, 
        color:Colors.Sp_Text
    },
    text2:{
        fontSize:15, 
        paddingLeft:10, 
        color:Colors.Sp_Text
    },
    text3:{
        fontSize:15, 
        paddingLeft:10, 
        paddingBottom:5,
        color:Colors.Sp_Text
    },
    imageContainer: {
        height: width *1 ,
        width: width * 1,
        opacity: 0.7
    },
    card: {
        flexGrow:1,
        backgroundColor:Colors.White,
        justifyContent:'center',
        paddingLeft: 5,
        shadowColor:Colors.White,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        marginBottom:5,
        margin:10,
      },
      card2: {
        backgroundColor:Colors.White,
        height:100,
        width: 380,
        paddingLeft: 5,
        shadowColor:Colors.White,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        marginBottom:5,
        margin:10,
      },
      wrapper: {
        flexDirection: 'row', 
        alignItems: 'center', 
        flex: 1
    },
      headerStyle: {
        flex: 0.5, 
        height: 30, 
        width:40, 
    },
      backIcon: {
        resizeMode: 'contain', 
        height:30, 
        width: 30 
    },
      headerText: {
        fontSize:20,
        color:Colors.White,
        fontWeight:'bold',
      },
})