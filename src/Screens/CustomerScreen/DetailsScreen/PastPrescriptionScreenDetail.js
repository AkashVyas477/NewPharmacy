import { StyleSheet, Text, View, ScrollView, StatusBar, Image, Dimensions, ImageBackground,TouchableOpacity } from 'react-native'
import React, {  useState, useRef, useEffect  } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import PrescriptionData from '../../../DummyData/PrescriptoinDummydata';
import { Colors,Images } from '../../../CommonConfig';
import { Header, Button , } from '../../../Components/Common';
import moment from 'moment';


const { width } = Dimensions.get('window')
const height = width * 100 / 0.6

const PastPrescriptionScreen = props =>{

    // const pid = props.route.params.id
    // const selectedItem =PrescriptionData.find(item => item.id === pid)
    
    const prescription = props.route.params.prescription
    console.log(prescription);

    const height = width * 100 / 0.6
    const [active, setActive] = useState(0);

    // const change = ({ nativeEvent }) => {
    //     const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    //     if (slide !== active) {
    //         setActive(slide);
    //     }
    // }
    return(
        // <View > 
        //     <View style={styles.header_sty} >
        //         {/* <StatusBar backgroundColor={selectedItem.bgColor} barStyle='light-content' /> */}
        //         <Header
        //             Title="DETAILS"
        //             onPress={() => props.navigation.goBack()}
        //         />
        //     </View>


        //     {/* Image  */}
        //     <View>
        //         <TouchableOpacity  onPress={() => { props.navigation.navigate('Preview', { id: pid }) }}>
        //     <View style={{ alignItems: 'center', padding: 10 }} >
        //                 <Image source={selectedItem.PrescriptionImg} style={styles.imageContainer}/>
        //         </View>
        //         </TouchableOpacity>
        //     </View>

        // {/* Shop Name & address*/}
        // <View style={styles.card}>
        // <View style={{flexDirection:'row' ,alignItems:'center',justifyContent:'space-between'}}>
        // <View>
        // <Text style={styles.text} >{selectedItem.PrescriptionName}</Text>
        // <Text style={styles.text2}>{selectedItem.Details}</Text>
        // <Text style={styles.text3}>{selectedItem.Quotes}</Text>
        // </View>
        // <View style={{alignItems:'center', }} >
        //         <TouchableOpacity style={{alignItems:'flex-end', paddingRight:10}}>
        //             <Image source={Images.MapLocate} style={{height:15,width:11,}} />
        //         </TouchableOpacity>
        //      </View>
        // </View>
        // </View>

        // {/* Text Note By Pharamacies */}

        // <View style={styles.card2}>
        // <Text style={{alignItems:'center',justifyContent:'flex-start'}}> Text Note By Pharamacies</Text>
        // <Text style={{textAlign:'auto', padding:10}}>Detalis By Pharamacies</Text>
        // </View>
       
        // </View>
        
        <View style={{flex:1}} >
           
            <View >
                <View style={{ alignItems: 'center', }} >
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Preview', { prescription:data}) }}> 
                        <ImageBackground source={{uri:prescription.prescription_images[0].url}} resizeMode="cover" style={styles.imageContainer}>

                            <View style={styles.header_sty}>
                                <Header
                                    Title="DETAILS"
                                    onPress={() => props.navigation.goBack()}
                                />
                            </View>
                        </ImageBackground>
                    </TouchableOpacity> 
                </View>
            </View>
            <ScrollView>
            <View>
           
                    
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.text} >{prescription.name.toUpperCase()}</Text>
                                <Text style={styles.text3}>{moment(prescription.createdAt).format('DD/MM/YYYY')+' at '+moment(prescription.createdAt).format('hh-mm A')}</Text>
                                <Text style={styles.text2}>{prescription.quotes.length}</Text>
                                
                            </View>
                            <View style={{ alignItems: 'center', marginBottom:40}} >
                                <Text style={{ alignItems: 'flex-end', paddingRight: 10, color: '#F39C12' }}>
                                    { prescription.status === 0 ? <Text> Pending</Text>:<Text style={{color:Colors.PRIMARY}}> Completed</Text>  }
                                     {/* {currentprescription.status}  */}
                                </Text>
                            </View>
                        </View>
                    </View>

                   

                    <View style={styles.card2}>
                        <Text style={{ alignItems: 'center', justifyContent: 'flex-start', fontWeight:'bold', color:Colors.Sp_Text,fontSize:15 }}> 
                        Text Note 
                        </Text>
                        <Text style={{ textAlign: 'auto', padding: 10 }}>{prescription.text_note}</Text>
                    </View>

                    
                
                    <View style={styles.card2}>
                        <Text style={{ alignItems: 'center', justifyContent: 'flex-start', fontWeight:'bold', color:Colors.Sp_Text,fontSize:15 }}>
                            List Of Medicines
                        </Text>
                        <View>
                            {prescription.medicines.map( item => {
                                return(
                                    <View key={item.id}>
                                        <Text style={{borderBottomWidth:0.5, width:'95%', margin:5, fontSize:15, fontWeight:'bold'}}>
                                            {item.name.toUpperCase()}
                                            </Text>
                                    </View>
                                )
                            })}
                        </View>
                        
                    </View>
                     
                    {/* <View style={styles.card2}>
                        <Text  style={{ alignItems: 'center', justifyContent: 'flex-start', fontWeight:'bold',fontSize:15, color:Colors.Sp_Text, marginBottom:8 }}>
                           Pharamacist Replied
                        </Text>
                        <View >
                            {prescription.quotes.map( item => {
                                return(
                                    <View key={item.id} >
                                        <Text style={{fontWeight:'bold',color:Colors.Sp_Text}}>{item.store_name.toUpperCase()}</Text>
                                        <Text>{moment(item.createdAt).format('DD/MM/YYYY')+' at '+moment(prescription.createdAt).format('hh-mm A')}</Text>
                                        <Text style={{color:Colors.PRIMARY, marginBottom:18}}>${item.price}</Text>
                                        <Text style={{marginBottom:10, borderBottomWidth:0.5, paddingBottom:10}}>{item.text_note}</Text> 
                                    </View>
                                )
                            })}
                        </View>
                    </View> */}
            </View>
            
            </ScrollView>
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
        flex:1,
        backgroundColor:Colors.White,
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