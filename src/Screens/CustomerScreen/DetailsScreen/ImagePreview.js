import React ,{useState} from 'react';
import {View, Text , StyleSheet , Image, Dimensions} from 'react-native';
import { Header } from '../../../Components/Common';
import {Colors, Images} from '../../../CommonConfig';
import PrescriptionData from '../../../DummyData/PrescriptoinDummydata';
import PharamaciesData from '../../../DummyData/DummyData';


const Preview = props =>{
    const [selectedImage, setSelectedImage] = useState(null)
    const pid = props.route.params.id
    const selectedItem =PrescriptionData.find(item => item.id === pid)
    // const selectedItem =PharamaciesData.find(item => item.simg === image)
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
 
    <Image source={selectedItem.PrescriptionImg} style={styles.Preview} /> 
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
