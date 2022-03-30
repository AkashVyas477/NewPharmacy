import React from 'react';
import {View, Text ,TextInput, StyleSheet , TouchableOpacity, Image} from 'react-native';

const pharmacyuserscreen = props =>{
    return(
        <View style={styles.screen}>
            <View style={{width:"100%"}}>
            <View  style={{flexDirection:'row',alignItems:'center',padding:10}}>
              <View>
                  <TouchableOpacity onPress={() => (props.navigation.goBack())} >      
                    <Image source={require('../assets/image/Icons/arrow.png')} style={{height:20, width:30}} />
              </TouchableOpacity>
              </View>
        <Text style={{fontSize:20,color:'black',paddingLeft:30}} >
            LOGIN AS PHARMACY USER
        </Text>  
        </View>

        <View style={{paddingTop:40, width:"100%"}} >
                        <Text style={{ color: 'black', marginBottom: 1, paddingLeft:3 }}>
                            Pharmacy ID
                            </Text>
                        <View style={{ borderBottomColor: '#e8e8e8', borderBottomWidth:1 , }} >
                            <TextInput  
                                placeholder="Pharamacy ID Number"
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                    </View>

                    <View style={{width:"100%",}}>
                    <TouchableOpacity style={{padding:20}} onPress={()=>{props.navigation.navigate('Login')}} >
                    <View style={styles.buttoncon}>
                        <Text style={styles.Button}>
                            Verify now
                        </Text>
                    </View>
                </TouchableOpacity>
                    </View>
                    
            </View>
    );
};

const  styles=StyleSheet.create({
    screen:{
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'white',
        padding: 10,
        justifyContent:'space-between'        
    }, 
    text:{
        textAlign: 'center',
        padding: 10,
        paddingHorizontal: 10,
    },
    Button:{
        color:'white',
        textAlign:'center',
       
    },
    buttoncon:{
        backgroundColor:'#0DC314',
        borderRadius:10,
        height:40,
        width: "100%",
        justifyContent:'center',
        
       
    }
});

export default pharmacyuserscreen;