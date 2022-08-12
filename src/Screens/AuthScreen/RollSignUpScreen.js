// import { FastField } from 'formik';
import React,{useState} from 'react';
import { useTranslation } from 'react-i18next';
import {View, Text , StyleSheet, Image, TouchableOpacity ,StatusBar} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux';
import {Images, Colors} from '../../CommonConfig'
// import { Button } from '../../Components/Common';
import Button from '../../Components/Common/Button';
import * as  registerAction from '../../Store/Actions/register'

const RollSignupScreen = props =>{
    const {t,i18n}=useTranslation()

    const dispatch= useDispatch();
    const [customer , setCustomer ] = useState(false);
    const [pharamacist, setPharmacist ] = useState(false);
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
       
        <View style={styles.screen}>
        <StatusBar backgroundColor={Colors.PRIMARY} barStyle='light-content' />
            {/* Title start */}
            <Text style={styles.text1} >
           {t('auth:WhoAreyou')} 
            </Text>
            <View style={i18n.language === "ar" ? styles.TitleText_ar : styles.TitleText} >
            <Text  style={styles.text2}>
            {t('auth:Howdoyouwanttouse')}
            </Text>
            <Text  style={styles.text3}  >
            {t('auth:MobilePharmacy')}
            </Text>
            </View>
            {/* Title start */}

            {/* RollSelction Start */}
            <View style={{alignItems:'center',padding:10}}>
            <View style={{flexDirection:'column', marginTop:5,alignItems:'center'}} >
                <TouchableOpacity onPress={customerHandler} >
                    {!customer?<Image source={Images.CustomerInactive} style={styles.customerIcon1} />:
                    <Image source={Images.CustomerActive}  style={styles.customerIcon2 } />}
                </TouchableOpacity>
                <Text style={styles.customerText} >
                    {t('auth:Customer')}
                </Text>
                </View>

                <View style={{flexDirection:'column', marginTop:20,alignItems:'center'}} >
                <TouchableOpacity onPress={pharmacistHandler} >
                    {!pharamacist?<Image source={Images.PharmistInactive} style={styles.pharmistIcon1} />:
                    <Image source={Images.PharmistActive}  style={styles.pharmistIcon2  }  />}
                </TouchableOpacity>
                <Text style={styles.pharmistText} >
                    {t('auth:Pharmacist')}
                </Text>
                </View>
            </View>
           
            {/* RollSelction end */}
                    {showButton ?<Button
                        onPress={()=>{
                            dispatch(registerAction.setUserRole(customer?1:2))
                            customer ? props.navigation.navigate('CustomerSignup',{role:customer ? 1:2}) : 
                            props.navigation.navigate('PharmacistSingup',{role:customer?1:2}) 

                            console.log(registerAction.setUserRole(customer?1:2));
                        }}
                        label={customer ? `${t("auth:ImCustomer")}`: `${t("auth:ImPharmacist")}`}    />
                : null}
        </View>
        
      
    );
};




const  styles=StyleSheet. create({
    screen:{
        flex:1,
        padding:6,
    },
    TitleText_ar:{
        flexDirection:'row-reverse',
        alignItems:'center',
        padding:10},

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
        // paddingLeft:20
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'

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