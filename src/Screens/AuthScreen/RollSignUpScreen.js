import { FastField } from 'formik';
import React,{useState} from 'react';
import {View, Text , StyleSheet, Image, TouchableOpacity , Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Images, Colors} from '../../CommonConfig'


const RollSignupScreen = props =>{
    const [customer , setCustomer ] = useState(false);
    const [pharamacy, setPharmacist ] = useState(false);
    const [ showButton, setShowButton]=useState(false);
    

    const customerHandler = () => {
        setCustomer(true);
        setPharmacist(false);
        setShowButton(true);
        
    };
    const pharmacistHandler = () => {
        setCustomer(false);
        setPharmacist(true);
        setShowButton(true);
    };


    return(
        <KeyboardAwareScrollView>
        <View style={styles.screen}>
            {/* Title start */}
            <Text style={styles.text1} >
           Who Are you 
            </Text>
            <View style={styles.TitleText} >
            <Text  style={styles.text2}>
                How do you want to use 
            </Text>
            <Text  style={styles.text3}  >
            Mobile Pharmacy?
            </Text>
            </View>
            {/* Title start */}

            {/* RollSelction Start */}
            <View style={{alignItems:'center',paddingTop:50}}>
            <View style={{flexDirection:'column', marginTop:5}} >
                <TouchableOpacity onPress={customerHandler} >
                    {!customer?<Image source={Images.CustomerInactive} style={styles.customerIcon1} />:
                    <Image source={Images.CustomerActive}  style={styles.customerIcon2} />}
                </TouchableOpacity>
                <Text style={styles.customerText} >
                    Customer
                </Text>
                </View>

                <View style={{flexDirection:'column', marginTop:20}} >
                <TouchableOpacity onPress={pharmacistHandler} >
                    {!pharamacy?<Image source={Images.PharmistInactive} style={styles.pharmistIcon1} />:
                    <Image source={Images.PharmistActive}  style={styles.pharmistIcon2}  />}
                </TouchableOpacity>
                <Text style={styles.pharmistText} >
                    Pharmacist
                </Text>
                </View>

                    {showButton ? <View style={styles.buttoncon} > 
                    
                        <TouchableOpacity onPress = {() => { customer ? props.navigation.navigate('CustomerSignup') : props.navigation.navigate('PharmacistSingup') }} >
                           <View >
                               {customer ? <Text style={styles.Button} >I' m Customer </Text> : <Text style={styles.Button}>I' m Pharmacist</Text>}
                            </View> 
                        </TouchableOpacity  >
                    </View> : null}


        
            </View>
            {/* RollSelction end */}
        </View>
        </KeyboardAwareScrollView>
    );
};




const  styles=StyleSheet. create({
    screen:{
        flex:1,
        padding:6,
    },
    TitleText:{
        flexDirection:'row',
        alignItems:'center',
        padding:10},

    text1:{
        paddingTop:20,
        paddingLeft:6,
        fontSize:30,
        fontWeight:'bold',
        color:Colors.Sp_Text

    },
    text2:{
       
        paddingLeft:3,
        fontSize:18

    },
    text3:{
        color:Colors.PRIMARY,
        paddingLeft:5,
        fontSize:18,
        fontWeight:'bold',

    },
    footer:{
        flex:1,
        justifyContent:'flex-end',
        width:'80%',
        paddingBottom:2
    },
    Button:{
        color:Colors.White,
        textAlign:'center',
        fontSize:20
       
    },
    buttoncon:{
       marginTop:30,
        backgroundColor:Colors.PRIMARY,
        borderRadius:10,
        height:40,
        width: "100%",
        justifyContent:'center'
    },
    customerText:{
        fontSize:30,
        paddingLeft:20
    },
    customerIcon1:{
        height:200,
         width:200
        },
    customerIcon2:{
        height:200,
         width:200
        },
        pharmistText:{
            fontSize:30,
            paddingLeft:20
        },
    pharmistIcon1:{
        height:200, 
        width:200
    },
    pharmistIcon2:{
        height:200,
         width:200
        },
});

export default RollSignupScreen;