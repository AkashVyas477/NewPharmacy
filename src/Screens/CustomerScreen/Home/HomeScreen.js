import React,{useState, useEffect, useReducer} from 'react';
import {View, Text , StyleSheet ,TouchableOpacity, Image ,FlatList,ScrollView, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { Images, Colors } from '../../../CommonConfig';
// import Pharamacies from '../../Components/Shop/Pharamacies';
// import PharamaciesData from '../../DummyData/DummyData';
import { getPostLogin, getWithParams,refreshtoken} from '../../../Components/Helpers/ApiHelper';
import GetLocation from 'react-native-get-location'
import Geolocation from 'react-native-geolocation-service';


import Toast from 'react-native-simple-toast';




const HomeScreen = props =>{

    const [ pharmacyList, setPharmacyList ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [length, setLength] = useState(0)
    const [ addresses, setAddresses ] = useState([])
    const [ activeAddress, setActiveAddress ] = useState({})
    
    useEffect(()=>{
  
        setIsLoading(false);

        GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
            .then(location => {
              
              location.latitude.toFixed()
              location.longitude.toFixed()
              console.log(location.longitude);
              console.log(location.latitude);
              getNearByPharmacy();
            })
            .catch(error => {
                const { code, message } = error;
                // console.warn(code, message);
            })
        
    },[])
   
    const getNearByPharmacy = async() => {
        const response = await getWithParams('customer/getNearByPharmacy/v1')
        console.log("\n\nGET NearByPharmacy        ",JSON.stringify(response));
        // console.log("PharmacyList:         ", pharmacyList);
        refreshtoken().then(async (res) => {
        if(response.success) {
            setPharmacyList(response.data)
            // Toast.show(' NearByPharmacy available currently!')
            console.log("PharmacyList:         ", pharmacyList);
        } else {
            Toast.show('There is no NearByPharmacy available currently!')
        }
       
        })
}


    // const getNearByPharmacy = async() => {
    //     const response = await getPostLogin('customer/getNearByPharmacy')
    //     // console.log("GET NearByPharmacy     \n\n\n\n",JSON.stringify(response));
    //     if(!response.success) {
    //         setPharmacyList(response.data.data)
    //         // Toast.show(' NearByPharmacy available currently!')
    //         // console.log("PharmacyList:         ", pharmacyList);
    //     } else {
    //         Toast.show('There is no NearByPharmacy available currently!')
    //     }
       
    // }

  // const getAddresses = async() => {
    //     const response = await getPostLogin('getAddress')
    //     console.log(response.data);
    //     if(response.success) {
    //         setAddresses()
    //         const aAddress = response.data.data.find( item => { return( item.is_active === true ) } )
    //         setActiveAddress(aAddress)
    //     } else {
    //         console.log(response);
    //     }
    // }


    // GetLocation.getCurrentPosition({
    //     enableHighAccuracy: true,
    //     timeout: 15000,
    // })
    // .then(location => {
    //     // console.log(location);
        
    // })
    // .catch(error => {
    //     const { code, message } = error;
    //     // console.warn(code, message);
    // })


// Rendering Data of Near By Pharmacy 
    const renderPharmacyList = data => {
        console.log(data);
        return (
            <View style={styles.card}>
                 {/* <TouchableOpacity onPress={() => {props.navigation.navigate('Pharamacies_Detail', {pharmacy:data.item,}) }}>
                <View style={styles.Card_Sty}>
                        <Image source={{ uri: data.item.store_image }} style={styles.Image_Sty} resizeMode={'stretch'} />
                    <View style={styles.Text_sty}>
                        <View >
                            <Text style={styles.Pname}>{data.item.store_name.toUpperCase()}</Text>
                        </View>
                        <View >
                            <Text  style={styles.name}>{data.item.address}</Text>
                        </View>
                        <View>
                            <Text  style={styles.name}>{data.item.distance}</Text>
                        </View>
                    </View>
                </View>
                </TouchableOpacity> */}
            </View>
        )
    }
    return(
        <View>
            <View>     
            <View style={styles.screen}>     
              {/*Logo + Icon  */}
                 <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <View>
                            <TouchableOpacity onPress={() =>props.navigation.toggleDrawer()}  >
                                <Image source={Images.Menu} style={{ height: 20, width:25 }}  />
                            </TouchableOpacity>
                        </View>
                        <View style={{paddingLeft:100}}>
                        <Image source={Images.HeaderAppIcon} style={{ height:60 ,  width:130,}} />
                        </View>
                        </View>
               {/*Logo + Icon  */}
               {/* Location  */}
                        <View>
                            <View>
                            <TouchableOpacity  onPress={() => { props.navigation.navigate('LocationScreen' ) }}>
                            <Text style={{padding:10}}>
                                Location
                            </Text>
                            <View >
                            <Text style={{color:'#0DC314', paddingLeft:7, marginBottom:10}}> 374  WIlliam S Canning Blvd <Image source={Images.Pencil} style={{ height:15 ,  width:15,}} /> </Text>
                            </View>
                            </TouchableOpacity>
                            </View>
                        </View>
                        </View>


                    {/* Dtabase */}
          
                <View>
                    <View style={{alignItems:'center'}}>
                        <Text style={{color:'#717D7E', fontSize:17, padding:10}}>
                            Near By Pharmacies
                        </Text>
                            <View style={{ padding: 10 }}>
                            { isLoading ?
                            <View style={styles.loader}>
                                <ActivityIndicator size={65} color={Colors.PRIMARY} />
                            </View>
                            :
                            // pharmacyList.length === 0 ?
                            // (<View>
                            //     <Text>No Near By Pharmacies found </Text>
                            // </View>
                            // )
                            // :
                                <FlatList
                                    // padding={30}
                                    data={pharmacyList}
                                    keyExtractor={item => item.id}
                                    renderItem={renderPharmacyList}
                                />
                            }
                            </View>
                        
                    </View>
                </View>
                    {/* Dtabase */}

        </View>
        </View>
    );
};

const  styles=StyleSheet. create({
    screen:{
        backgroundColor:'white',
        elevation:5
    },
    // card: {
    //     flexGrow:1,
    //     width: 380,
    //     paddingRight: 10,
    //     justifyContent:'center',
    //     paddingLeft: 5,
    //     shadowColor:Colors.White,
    //     shadowOpacity: 0.26,
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowRadius: 8,
    //     elevation: 5,
    //     borderRadius: 10,
    //     backgroundColor: 'white',
    //     marginBottom:5,
    //     margin:10,
    //     // alignItems:'center',
    //   },
    card:{
        flexGrow:1,
        shadowColor:Colors.White,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom:5,
        margin:10,
        justifyContent:'center',
    },
    Card_Sty:{ 
        flexDirection: 'row',
        padding:5,
        paddingRight:10,
        
     },

    Image_Sty:{
        height: 90, width: 90,
        borderRadius: 10,
    },
    Text_sty:{ 
        flexDirection: 'column', 
        marginLeft: 5, 
        paddingLeft:10,
        padding: 5
     },

     Pname:{
         fontWeight:'bold',
         color: Colors.Sp_Text,
         fontSize:17,
         padding:5

     },
     name:{
        padding:2
    },
    loader:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },

    
   
});

export default HomeScreen;