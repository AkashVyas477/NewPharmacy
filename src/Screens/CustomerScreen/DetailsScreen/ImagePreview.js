import React ,{useState} from 'react';
import {View, Text , StyleSheet , Image, Dimensions, ScrollView} from 'react-native';
import { Header } from '../../../Components/Common';
import {Colors, Images} from '../../../CommonConfig';

// import PrescriptionData from '../../../DummyData/PrescriptoinDummydata';
// import PharamaciesData from '../../../DummyData/DummyData';


const Preview = props =>{
    // const [selectedImage, setSelectedImage] = useState(null)
    // const pid = props.route.params.id
    // const selectedItem =PrescriptionData.find(item => item.id === pid)
    // const selectedItem =PharamaciesData.find(item => item.simg === image)
    const currentprescription = props.route.params.images
    const id = props.route.params.images
    const image_123= props.route.params.images123
    // console.log("\n\nData        ",id);
    console.log("\n\nData        ",image_123);
    return(
        <View style={styles.screen}>
                <View  style={styles.header_sty}>
                <Header
                Title="PREVIEW"
                onPress={() => props.navigation.goBack()}
                />
                </View>
<ScrollView 
horizontal
showsHorizontalScrollIndicator={false}
pagingEnabled
>
<View  style={{alignItems:'center'}}>

    <Image source={{uri:image_123.url}} resizeMode='center' style={styles.preview} /> 
   
</View>
</ScrollView>
        </View>
    );
};

export default Preview;

const  styles=StyleSheet. create({
    screen:{
        flex:1
       
    },
    header_sty:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10 
    },
    Preview:{
        height:210,
        width:'90%',
        borderRadius:40,
        overflow: 'hidden', 
        marginTop:180, 
        marginLeft:5, 
        marginRight:5
    },
    preview:
    {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
        resizeMode: 'contain',
        borderRadius:10,
        overflow: 'hidden', 
        marginTop:100, 
        // marginLeft:10, 
        // marginRight:10
    }
});
