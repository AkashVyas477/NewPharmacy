import React from 'react';
import {View, Text , StyleSheet , Image, Dimensions} from 'react-native';
import { Header } from '../../Components/Common';
import {Colors, Images} from '../../CommonConfig';
import PrescriptionData from '../../DummyData/PrescriptoinDummydata';

const Preview = props =>{
    const pid = props.route.params.id
    const selectedItem =PrescriptionData.find(item => item.id === pid)
    console.log(PrescriptionData)
    return(
        <View style={styles.screen}>
                <View  style={styles.header_sty}>
                <Header
                Title="PREVIEW"
                onPress={() => props.navigation.goBack()}
                />
                </View>
<View  style={{alignItems:'center'}}>
<Image source={selectedItem.PrescriptionImg} style={{height:'75%',width:'100%'}} />
</View>

        </View>
    );
};

export default Preview;

const  styles=StyleSheet. create({
    screen:{
        
       
    },
    header_sty:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10 
    },
});
