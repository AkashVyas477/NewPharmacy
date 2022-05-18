import { Image, StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { Colors, Images } from '../CommonConfig'
import { refreshtoken } from '../Components/Helpers/ApiHelper';

const SplashScreen = (props) => {

    useEffect( () => {
        loadApp()
    },[])

    const loadApp = async() => {
        // const refData = {
        //     refreshToken: await AsyncStorage.getItem('refreshtoken')
        // }
        // const response = await refreshtoken( refData )
        // console.log(response);
        // if(!response.success){
        //     props.navigation.navigate('Auth')
        // } else {
        //     await AsyncStorage.setItem('token', response.token)
        //     await AsyncStorage.setItem('isLogin','true')
        //     props.navigation.navigate('Drawer', { screen: 'Home' })
        // }

        const isLogin = await AsyncStorage.getItem('isLogin');
        if (isLogin === "true"){
            props.navigation.dispatch(CommonActions.reset({
                index:0,
                routes:[{name:'Drawer'}]
            }))
        }else{
            props.navigation.dispatch(CommonActions.reset({
                index:0,
                routes:[{name:'Auth'}]
            }))
        }
    }

    return (
        <View style={styles.screen}>
            {/* <StatusBar backgroundColor={Colors.PRIMARY}/> */}
            <Image source={Images.AppIcon} resizeMode='cover' style={{width:300,height:300}} />
            <ActivityIndicator color={Colors.PRIMARY}  size={50}/>
           
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-evenly',
        padding:10,
     
    }
})