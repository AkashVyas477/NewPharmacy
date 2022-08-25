import React, { useEffect, useCallback, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image, FlatList } from 'react-native';
import { Colors, Images } from '../../../CommonConfig'
import { Header } from '../../../Components/Common'
import { useTranslation } from "react-i18next";
import { getPreLogin} from "../../../Components/Helpers/ApiHelper";
import moment from 'moment';
import io from 'socket.io-client';
import AsyncStorage from "@react-native-async-storage/async-storage";

// import MessageData from "../../../DummyData/ChatData";

let socket;

const Message = props => {
    const { t, i18n } = useTranslation()

    const [ loading, setLoading ] = useState(true)

    const [ socketConnected, setSocketConnected ] = useState(false)
    const [ user, setUser ] = useState({})

  
    useEffect(()=>{
        getAllChats()
        getProfile()
        socket= io('https://mobile-pharmacy.herokuapp.com')
        socket.emit('setup',user)
        socket.on('connected',()=>setSocketConnected(true))
    },[])
   
    useEffect( () => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getAllChats();
        })
        return unsubscribe;
    }, [props.navigation])


    const getProfile = async() => {
        setUser(JSON.parse(await AsyncStorage.getItem("user")))
    }


    const [allChats, setAllChats] = useState([])

    const getAllChats = async() => {
        setLoading(true)
        const response = await getPreLogin('chat/getChats')
        // console.log(response.data.chats)
        if(response.success) {
            setAllChats(response.data.chats)
            setLoading(false)
        } else {
            console.log(response);
            setLoading(false)
        }
    }

    if(loading){
        return(
            <View style={styles.loader}>
                <ActivityIndicator  size={65} color={Colors.PRIMARY}/>
            </View>
        )
    }




    const renderItem = data => {
        // console.log(data.item.store.image)
        return (

            <View style={styles.CardTouchable}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('ChatScreen', { UserName: data.item.chat_name, Data:data.item}) }}>
                    <View style={styles.UserInfo}>
                        <View style={styles.UserImgWrapper}>
                            <Image source={{uri:data.item.store.image}} style={styles.UserImg} />
                        </View>
                        <View style={styles.TextSection}>

                            <View style={styles.UserInfoText}>
                                <Text style={styles.UserName}>{data.item.chat_name}</Text>
                                <Text style={styles.PostTime}>{moment(data.item.updatedAt).format('hh:mm A')}</Text>
                            </View>
                            <Text style={styles.MessageText}>{data.item.lastMessage}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )

    }




    return (
        <View style={styles.screen}>
            {/* Header  */}
            <View style={styles.header_sty}>
                <View style={styles.wrapper}>
                    <TouchableOpacity
                        onPress={() => props.navigation.toggleDrawer()}
                        style={styles.headerStyle}>
                        <Image source={Images.Menu} style={styles.MenuIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Messages</Text>
                </View>
            </View>
            {/* Message */}
            <View style={styles.container}>
                <FlatList
                    data={allChats}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}

                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        backgroundColor:Colors.White

    },
    loader:{
        flex:1,
        backgroundColor: Colors.WHITE,
        justifyContent:'center',
        alignItems:'center'
    },
    header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.White,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1
    },
    headerStyle: {
        flex: 0.5,
        height: 30,
        width: 40,
    },
    MenuIcon: {
        resizeMode: 'contain',
        height: 25,
        width: 25
    },
    headerText: {
        fontSize: 20,
        color: Colors.Sp_Text,
        fontWeight: 'bold',
    },

    //message style
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        //    backgroundColor:'#ffffff'
    },
    CardTouchable: {
        width: "100%",
       
    },
    UserInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        
    },
    UserImgWrapper: {
        paddingTop: 15,
        paddingBottom: 15,
        alignItems:"center",
        justifyContent:"center"
    },
    UserImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    TextSection: {
        flexDirection: "column",
        justifyContent: "center",
        padding: 15,
        paddingLeft:0,
        marginLeft: 10,
        width: 300,
        // borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
      
    },
    UserInfoText: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5
    },
    UserName: {
        fontSize: 14,
        fontWeight: "bold",
    },
    MessageText: {
        fontSize: 14,
        color: Colors.Sp_Text
    },
    PostTime: {
        fontSize: 12,
        color: Colors.PRIMARY
    }


})

export default Message;