import React,{useState, useEffect, useReducer} from 'react';
import {View, Text , StyleSheet ,TouchableOpacity, Image ,FlatList,ScrollView, ActivityIndicator, PermissionsAndroid,  Platform,} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { Images, Colors } from '../../../CommonConfig';



const PharamaHomeScreen = props =>{  
 
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
                        </View>


                    {/* Dtabase */}
          
                
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
    // card:{
    //     flex: 1,
    //     flexGrow:1,
    //     shadowColor:Colors.White,
    //     shadowOpacity: 0.26,
    //     shadowOffset: { width: 0, height:2 },
    //     shadowRadius: 8,
    //     borderRadius: 10,
    //     backgroundColor: 'white',
    //     marginBottom:5,
    //     margin:10,
    //     justifyContent:'center',
    //     // width: 80
    // },
    // Card_Sty:{ 
    //     flexDirection: 'row',
    //     padding:5,
    //     // paddingRight:10,
        
    //  },

    // Image_Sty:{
    //     height: 90, 
    //     width: 90,
    //     borderRadius: 10,
    // },
    // Text_sty:{ 
    //     flexDirection: 'column', 
    //     marginLeft: 5, 
    //     paddingLeft:10,
    //     padding: 5
    //  },

    //  Pname:{
    //      fontWeight:'bold',
    //      color: Colors.Sp_Text,
    //      fontSize:17,
    //      padding:5

    //  },
    //  name:{
    //     padding:2
    // },
    // loader:{
    //     padding: 20,
    //     justifyContent:'center',
    //     alignItems:'center',
    //     flex:1
    // },

    
   
});

export default PharamaHomeScreen;