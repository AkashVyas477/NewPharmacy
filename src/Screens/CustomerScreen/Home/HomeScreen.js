import React,{useState, useEffect, useReducer} from 'react';
import {View, Text , StyleSheet ,TouchableOpacity, Image ,FlatList,ScrollView, ActivityIndicator, PermissionsAndroid,  Platform,} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { Images, Colors } from '../../../CommonConfig';
// import Pharamacies from '../../Components/Shop/Pharamacies';
// import PharamaciesData from '../../DummyData/DummyData';
import { getWithParams,refreshtoken,getParams} from '../../../Components/Helpers/ApiHelper';
import GetLocation from 'react-native-get-location'
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { getCurrentPosition } from 'react-native-geolocation-service';

const HomeScreen = props =>{  
    const [ pharmacyList, setPharmacyList ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [length, setLength] = useState(0)
    const [ addresses, setAddresses ] = useState([])
    const [ activeAddress, setActiveAddress ] = useState({})  
    
    useEffect(()=>{

            const update = props.navigation.addListener('focus',async() => {
           setIsLoading(true)
        });
        
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            getNearByPharmacy(location.latitude,location.longitude);
        //   console.log(location.longitude);
        //   console.log(location.latitude);
        })
        .catch(error => {
            const { code, message } = error;
            // console.warn(code, message);
        })
        return update;
    },[isLoading,props.navigation])

   
    const getNearByPharmacy = async(latitude,longitude) => {
        const response = await getParams(`customer/getNearByPharmacy/v1?latitude=${latitude}&longitude=${longitude}`)
        if(response.success) {
            setLength(response.data.length)
            setPharmacyList(response.data.data)
            setIsLoading(false)
            // Toast.show(' NearByPharmacy available currently!')
         } else {
            setIsLoading(false) 
            Toast.show('There is no NearByPharmacy available currently!')
        }  
      
}

// Rendering Data of Near By Pharmacy 
    const renderPharmacyList = data => {
//   console.log("data             ",data)
        return (
            <View style={styles.card}>
                 <TouchableOpacity onPress={() => {props.navigation.navigate('Pharamacies_Detail', {pharmacy:data.item,}) }}>
                <View style={styles.Card_Sty}>
                        <Image source={{ uri: data.item.store_image }} style={styles.Image_Sty} resizeMode={'stretch'} />
                    <View style={styles.Text_sty}>
                        <View >
                            <Text style={styles.Pname}>{data.item.store_name.toUpperCase()}</Text>
                        </View>
                        <View >
                            <Text  style={styles.name}>{data.item.address.primary_address}</Text>
                        </View>
                        <View>
                            <Text  style={styles.name}>{data.item.address.addition_address_info}</Text>
                        </View>
                        <View>
                        <Text  style={styles.name}>{data.item.distance} Km</Text>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
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
                            {/* <TouchableOpacity  onPress={() => { props.navigation.navigate('LocationScreen' ) }}> */}
                            {/* <Text style={{padding:10}}>
                                Current Location
                            </Text>
                                <View>
                            
                                </View> */}
                            {/* <View >
                            <Text style={{color:'#0DC314', paddingLeft:7, marginBottom:10}}> 374  WIlliam S Canning Blvd <Image source={Images.Pencil} style={{ height:15 ,  width:15,}} /> </Text>
                            </View> */}
                            {/* </TouchableOpacity> */}
                            </View>
                        </View>
                        </View>


                    {/* Dtabase */}
          
                <View style={{ padding: 10 }}>
                    <View style={{alignItems:'center'}}>
                            { 
                            isLoading ?
                            <View style={styles.loader}>
                                <ActivityIndicator size={40} color={Colors.PRIMARY} />
                            </View>
                            :
                            length === 0 ?
                            <View>
                            <Text>No Pharmacies found</Text>
                        </View>
                            :
                            <View>
                            <Text style={{color:'#717D7E', fontSize:17, padding:10, textAlign:'center'}}>
                            Near By Pharmacies
                            </Text>
                                <FlatList
                                    // padding={30}
                                    data={pharmacyList}
                                    keyExtractor={item => item.id}
                                    renderItem={renderPharmacyList}
                                    isLoading='false'
                                />
                                </View>
                            }
                            
                        
                    </View>
                </View>



                {/* <View style={{ flex: 10, padding: 10 }} >
                    {isLoading ?
                        (
                            <View style={styles.loader}>
                                <ActivityIndicator size={65} color={Colors.PRIMARY} />
                            </View>
                        )
                        :
                        pharmacyList.length === 0 ?
                            (
                                <View>
                                    <Text>No Near By Pharmacies found </Text>
                                </View>
                            )
                            :
                            <FlatList
                                // padding={30}
                                data={pharmacyList}
                                keyExtractor={item => item.id}
                                renderItem={renderPharmacyList}
                            />
                    }
                </View> */}
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
    card:{
        flex: 1,
        flexGrow:1,
        shadowColor:Colors.White,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height:2 },
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
        // paddingRight:10,
        
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
        padding: 20,
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },

    
   
});

export default HomeScreen;