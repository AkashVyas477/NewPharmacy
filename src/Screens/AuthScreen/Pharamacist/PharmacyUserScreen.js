import React from 'react';
import {View, Text ,TextInput, StyleSheet , TouchableOpacity, Image} from 'react-native';

const pharmacyuserscreen = props =>{
    return(
        <View style={styles.screen}>
{/* Screen partation for button and ID */}

            <View style={styles.screen2}>
                 {/* Logo & HeaderText */}
            <View  style={styles.Header}>
              <View>
                  <TouchableOpacity onPress={() => (props.navigation.goBack())} >      
                    <Image source={require('../../../assets/Icons/Arrow/arrow.png')} style={styles.arrow} />
              </TouchableOpacity>
              </View>
        <Text style={styles.HeaderText} >
            LOGIN AS PHARMACY USER
        </Text>  
        </View>
            {/* Logo & HeaderText */}
            {/* Input  */}
        <View style={styles.text_sty} >
                        <Text style={styles.text}>
                            Pharmacy ID
                            </Text>
                        <View style={styles.TextInput} >
                            <TextInput  
                                placeholder="Pharamacy ID Number"
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
             {/* Input  */}
                    </View>
{/* Screen partation for button and ID */}
                    <View style={styles.button_sty}>
                    <TouchableOpacity style={styles.touch} onPress={()=>{props.navigation.navigate('Login')}} >
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
    screen2:{
        width:"100%"
    },
    Header:{
        flexDirection:'row',
        alignItems:'center',
        padding:10
    },
    arrow:{
        height:20,
         width:30
        },
    HeaderText:{
        fontSize:20,
        color:'black',
        paddingLeft:30
    },
    text_sty:{
        paddingTop:40,
         width:"100%"
        },
     text:{ 
        color: 'black',
        marginBottom: 1,
        paddingLeft:3 
        },
    TextInput:{
         borderBottomColor: '#e8e8e8', 
         borderBottomWidth:1 ,
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
    },
    button_sty:{width:"100%",},
    touch:{padding:20},
});

export default pharmacyuserscreen;