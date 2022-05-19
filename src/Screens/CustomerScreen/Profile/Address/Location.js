import React from 'react';
import {View, Text , StyleSheet , Image, ImageBackground, TouchableOpacity, TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Images, Colors } from '../../../../CommonConfig';

const LocationScreen = props =>{
    return(
    <View style={styles.screen}>
            {/* Header And Menu start */}
        <View >  
            <View style={styles.Header}>
                    <View>
                        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}  >
                            <Image source={Images.Menu} style={{ height: 20, width: 25 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.Text_Sty}>
                        MANAGE ADDRESS
                    </Text>
            </View>
        </View>
        {/* Header And Menu end */}
{/*         
        <View style={styles.screen2}> 
              <Text  style={styles.Text}>Current Address</Text>
              <TextInput 
              placeholder="Current Address"
              />
        </View> */}
       
    </View>
    );
};

const  styles=StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'white',
        padding:10, 
    
    },

    screen2:{
        flex:1,
        padding:10,
        backgroundColor:Colors.Error_Textcolor,
    },
    Text_Sty:{
        paddingLeft:75,
    },

    Text:{
        padding: 10,
        fontSize:25,

    },
    Header:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10 ,
        elevation: 3,

        
    }
});

export default LocationScreen;