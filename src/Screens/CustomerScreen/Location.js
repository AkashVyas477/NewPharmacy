import React from 'react';
import {View, Text , StyleSheet , Image, ImageBackground, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Images, Colors } from '../../CommonConfig';

const LocationScreen = props =>{
    return(
    <View>
        <KeyboardAwareScrollView> 
            {/* Header And Menu start */}
        <View style={styles.screen}>  
            <View style={styles.Header}>
                <View>
                    <TouchableOpacity   >
                            <Image source={Images.Menu} style={{ height: 20, width:25 }} />
                    </TouchableOpacity>
                </View>
                    <Text style={styles.Text_Sty}>
                        MANAGE ADDRESS
                    </Text>
            </View>
        </View>
        {/* Header And Menu end */}
        <View>
            <View>
              
            </View>
        </View>
        </KeyboardAwareScrollView>
    </View>
    );
};

const  styles=StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'white',
        padding:10, 
    
    },
    Text_Sty:{
        paddingLeft:75,
        fontSize:20
    },
    Header:{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10 ,
        elevation: 3,

        
    }
});

export default LocationScreen;