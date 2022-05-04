import React,{useState, useEffect} from 'react';
import {View, Text , StyleSheet ,TouchableOpacity, Image ,FlatList,ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { Images, Colors } from '../../CommonConfig';
import Pharamacies from '../../Components/Shop/Pharamacies';
import PharamaciesData from '../../DummyData/DummyData';
import { getRequest } from '../../Components/Helpers/ApiHelper';
import Toast from 'react-native-simple-toast';




const HomeScreen = props =>{
    const [ pharmacyList, setPharmacyList ] = useState([])
    useEffect(()=>{
        getNearByPharmacy();
    },[])
    const getNearByPharmacy= async()=>{
        const response = await getRequest('customer/getNearByPharmacy')
        if(response.success) {
            setPharmacyList(response.data.getNearByPharmacy)
        } else {
            Toast.show('No NearByPharmacy available currently!')
        }
    }

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
                    <View style={styles.screen1} >
                    <View style={{alignItems:'center'}}>
                        <Text style={{color:'#717D7E', fontSize:17, padding:10}}>
                            Near By Pharmacies
                        </Text>

                       <View>
                            <FlatList
                            data={pharmacyList}
                            renderItem={({item})=> {
                                return(
                                    <View key={item.id} >
                                    <Pharamacies 
                                    pimage={item.simg}
                                    pname={item.sname}
                                    paddress={item.address}
                                    pdistance={item.distance}
                                    onClick={()=>{props.navigation.navigate('Pharamacies_Detail',{id:item.id})} }
                                    />
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
   
});

export default HomeScreen;