import React from 'react';
import {View, Text , StyleSheet ,TouchableOpacity, Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const HomeScreen = props =>{
    return(
        <View>
            <KeyboardAwareScrollView>     
            <View style={styles.screen}>     
              {/*Logo + Icon  */}
                 <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <View>
                            <TouchableOpacity onPress={() =>props.navigation.toggleDrawer()}  >
                                <Image source={require('../../assets/Icons/Edit-Add/menu.png')} style={{ height: 20, width:25 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{paddingLeft:100}}>
                        <Image source={require('../../assets/Icons/AppIcon/headerAppIcon.png')} style={{ height:60 ,  width:130,}} />
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
                            <Text style={{color:'#0DC314', paddingLeft:7, marginBottom:10}}> 374  WIlliam S Canning Blvd <Image source={require('../../assets/Icons/Edit-Add/pencil.png')} style={{ height:15 ,  width:15,}} /> </Text>
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
                    </View>
                    {/* Dtabase */}
        </KeyboardAwareScrollView>
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