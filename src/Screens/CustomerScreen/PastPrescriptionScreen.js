import { StyleSheet, Text, View, ScrollView, StatusBar, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'

import PrescriptionData from '../../DummyData/PrescriptoinDummydata';
import { Colors,Images } from '../../CommonConfig';
import { Header, Button , } from '../../Components/Common';


const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const PastPrescriptionScreen = props =>{

    const pid = props.route.params.id
    const selectedItem =PrescriptionData.find(item => item.id === pid)
    

    const height = width * 100 / 0.6
    const [active, setActive] = useState(0);

    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
            setActive(slide);
        }
    }
    return(
        <View > 
            <View style={styles.header_sty} >
                {/* <StatusBar backgroundColor={selectedItem.bgColor} barStyle='light-content' /> */}
                <Header
                    Title="DETAILS"
                    onPress={() => props.navigation.goBack()}
                />
            </View>


            {/* Image  */}
            <View>
            <View style={{ alignItems: 'center', padding: 10 }} >
                        <Image source={selectedItem.PrescriptionImg} style={styles.imageContainer}/>
                </View>
            </View>

        {/* Shop Name & address*/}
        <View style={styles.card}>
        <View style={{flexDirection:'row' ,alignItems:'center',justifyContent:'space-between'}}>
        <View>
        <Text style={styles.text} >{selectedItem.PrescriptionName}</Text>
        <Text style={styles.text2}>{selectedItem.Details}</Text>
        <Text style={styles.text3}>{selectedItem.Quotes}</Text>
        </View>
        <View style={{alignItems:'center', }} >
                <TouchableOpacity style={{alignItems:'flex-end', paddingRight:10}}>
                    <Image source={Images.MapLocate} style={{height:15,width:11,}} />
                </TouchableOpacity>
             </View>
        </View>
        </View>

        {/* Text Note By Pharamacies */}

        <View style={styles.card2}>
        <Text style={{alignItems:'center',justifyContent:'flex-start'}}> Text Note By Pharamacies</Text>
        <Text style={{textAlign:'auto', padding:10}}>Detalis By Pharamacies</Text>
        </View>
       
        </View>
    
    );
};

const  styles=StyleSheet. create({
    screen:{
        flex:1,
        backgroundColor:'white',
    },
    header_sty:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10 
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
       
        fontSize:10, 
        paddingLeft:10, 
        marginTop:5,
        color:Colors.Sp_Text
    },
    imageContainer: {
        height: width *0.7 ,
        width: width * 0.9
    },
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
        // flexDirection:'row',
        
        // alignItems:'flex-end',
       
      },

      card2: {
        backgroundColor:Colors.White,
        height:100,
        width: 380,
        // justifyContent:'center',
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
        // flexDirection:'row',
        
        // alignItems:'flex-end',
       
      },
});

export default PastPrescriptionScreen;