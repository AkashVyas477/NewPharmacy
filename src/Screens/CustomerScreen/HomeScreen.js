import React,{useState, useEffect, useReducer} from 'react';
import {View, Text , StyleSheet ,TouchableOpacity, Image ,FlatList,ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { Images, Colors } from '../../CommonConfig';
// import Pharamacies from '../../Components/Shop/Pharamacies';
// import PharamaciesData from '../../DummyData/DummyData';
import { getPostLogin, getPreLogin} from '../../Components/Helpers/ApiHelper';


import Toast from 'react-native-simple-toast';




const HomeScreen = props =>{

    const [ pharmacyList, setPharmacyList ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    useEffect(()=>{
        getNearByPharmacy();
        setIsLoading(false)
    },[])

    const getNearByPharmacy = () => {
        getPostLogin('customer/getNearByPharmacy/1')
        .then( (res) => {
            console.log(res.data.data)
            return res.data.data
        })
        .then( (array) => {
            console.log(array)
            setPharmacyList(array)
        })
        .catch((err) => 
            console.log(err)
            ) 
    }


    // const renderPharmacyList = itemData => {
    //     // console.log(itemData.item);
    //     return (
    //         <View style={styles.card}>
    //             <Image source={{uri: itemData.item.store_image}} style={styles.Image_Sty} resizeMode={'stretch'}/>
    //         </View>
    //     )
    // }

// console.log(pharmacyList)
    // console.log(PharamaciesData)
    return(
        <View>
            <View>     
            <View style={styles.screen}>     
              {/*Logo + Icon  */}
                 <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <View>
                            <TouchableOpacity onPress={() =>props.navigation.toggleDrawer()}  >
                                <Image source={Images.Menu} style={{ height: 20, width:25 }} />
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
                    <View >
                    <View style={{alignItems:'center'}}>
                        <Text style={{color:'#717D7E', fontSize:17, padding:10}}>
                            Near By Pharmacies
                        </Text>

                       <View>
                            <FlatList
                            data={pharmacyList}
                            keyExtractor={item => item.id}
                            renderItem={({data})=> {
                                // console.log(pharmacyList)
                                console.log("XYZ             ",data);
                                return(
                                    <View>
                                    
                                    {/* <pharmacyList
                                    pimage={user.data.store_image}
                                    pname={user.store_name}
                                    paddress={user.address}
                                    pdistance={user.distance}
                                    onClick={()=>{props.navigation.navigate('Pharamacies_Detail',{id:user.id})} }
                                    /> */}
                                     </View>                            
                                )
                            }}
                            />
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
        // alignItems:'center',
       
      },
    Card_Sty:{ 
        flexDirection: 'row',
        padding: 5,
     },

    Image_Sty:{
        height: 90, width: 120,
    },
    Text_sty:{ 
        flexDirection: 'column', marginLeft: 5
     },

     Pname:{
         fontWeight:'bold',
         color: Colors.Sp_Text
     }
    
   
});

export default HomeScreen;