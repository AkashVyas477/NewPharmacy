import { Image, StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { Colors, Images } from '../CommonConfig'
import messaging from '@react-native-firebase/messaging';
    
const SplashScreen = (props) => {
    
    useEffect( () => {
        messaging().getToken().then( async(token) => { 
            console.log("\n\n Token: ",token)
            await AsyncStorage.setItem('deviceToken', token)
         });
    },[])

    useEffect( () => {
        loadApp()
    },[])

    const loadApp = async() => {
        const isLogin = await AsyncStorage.getItem('isLogin');
        const role= await AsyncStorage.getItem('role')
        console.log(isLogin);
        if(isLogin ==="1"){
            if(role ==="1"){
                props.navigation.dispatch(CommonActions.reset({
                    index:0,
                    routes:[{name:'CustomerDrawer'}]
                }))
            }else if(role ==="2"){
                props.navigation.dispatch(CommonActions.reset({
                    index:0,
                    routes:[{name:'PharamacistDrawer'}]
                }))
            } else {
                navigation.dispatch(CommonActions.reset({
                    index:0,
                    routes: [{name:'Auth'}]
                }))
            }
        }else{
            props.navigation.dispatch(CommonActions.reset({
                index:0,
                routes:[{name:'Auth'}]
            }))
        }
    }

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={Colors.PRIMARY}/>
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