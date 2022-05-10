import React from 'react';
import {View, Text , StyleSheet , Image, Dimensions} from 'react-native';
import { Header } from '../../../Components/Common';
import {Colors, Images} from '../../../CommonConfig';
import PharamaciesData from '../../../DummyData/DummyData';


const PharamaciesImagePreview = props =>{
  
    // const pid = props.route.params.id
    // const selectedItem =PharamaciesData.find(item => item.id === pid)
    // console.log(PharamaciesData)
    const currentPharmacy = props.route.params.id
    console.log(currentPharmacy);
    return(
        <View style={styles.screen}>
                <View  style={styles.header_sty}>
                <Header
                Title="PREVIEW"
                onPress={() => props.navigation.goBack()}
                />
                </View>
<View  style={{alignItems:'center'}}>
<Image source={currentPharmacy.store_image} style={styles.Preview} /> 
</View>

        </View>
    );
};

export default PharamaciesImagePreview;

const  styles=StyleSheet. create({
    screen:{
        
       
    },
    header_sty:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10 
    },
    Preview:{
        height:275,
        width:'80%',
        borderRadius: 50,
        overflow: 'hidden', 
        marginTop:150, 
        marginLeft:5, 
        marginRight:5
    }
});
