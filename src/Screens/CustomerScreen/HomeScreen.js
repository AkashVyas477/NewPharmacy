import React,{useState} from 'react';
import {View, Text , StyleSheet ,TouchableOpacity, Image ,FlatList,ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { Images, Colors } from '../../CommonConfig';
import Pharamacies from '../../Components/Shop/Pharamacies';
import PharamaciesData from '../../DummyData/DummyData';





const HomeScreen = props =>{
    console.log(PharamaciesData)
    return(
        <View>
            <ScrollView>     
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
                            <TouchableOpacity  onPress={() => { props.navigation.navigate('AddressStack', { screen:'ManageAddress' }) }}>
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
                    <View style={{alignItems:'center'}}>
                        <Text style={{color:'#717D7E', fontSize:17, padding:10}}>
                            Near By Pharmacies
                        </Text>

                       <View>
                            <FlatList
                            data={PharamaciesData}
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
                    {/* Dtabase */}
        </ScrollView>
        </View>
    );
};

const  styles=StyleSheet. create({
    screen:{
        flex:1,
        backgroundColor:'white',
    }
});

export default HomeScreen;