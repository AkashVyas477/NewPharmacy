import React, { useEffect, useCallback, useState ,useRef} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image,ScrollView } from 'react-native';
import { Colors, Images } from '../../../CommonConfig'
import { Header } from '../../../Components/Common'
import { useTranslation } from "react-i18next";
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getPreLogin } from "../../../Components/Helpers/ApiHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';
import io from 'socket.io-client';

var socket;

const ChatScreen = (props) => {
    const { t, i18n } = useTranslation()
    const chatData = props.route.params.Data
    const UserName = props.route.params.UserName
    // console.log("Chatuser---------->",user)
    // console.log("Chat Data=======>\n",chatData)

    const [loading, setLoading] = useState(true)
    const messageScroll = useRef(null)

    const [messages, setMessages] = useState([]);
    // const [msg, setMsg] = useState([]);
    const [chat, setChat] = useState('')
    const [user, setUser] = useState({})

    const getMessage = async () => {
        const response = await getPreLogin(`chat/allMessage/${chatData.id}`)
        // console.log("GetMessage------->\n",response.data)
        if (response.success) {
            setMessages(response.data.data)
            socket.emit("Join chat", chatData.id);

        } else {
            console.log(response)
        }
    }

    const getProfile = async () => {
        setUser(JSON.parse(await AsyncStorage.getItem("user")))
    }


    useEffect(() => {
        getProfile()
        socket = io('https://mobile-pharmacy.herokuapp.com')
        getMessage()
        setLoading(false)
    }, [])

    // console.log(messages)

    // useEffect(() => {
    //     setMessages([
    //       {
    //         _id: 1,
    //         text: 'Hello developer',
    //         createdAt: new Date(),
    //         user: {
    //           _id: 2,
    //           name: 'React Native',
    //           avatar: 'https://placeimg.com/140/140/any',
    //         },
    //       },
    //     ])
    //   }, [])
    

    // useEffect(() => {
    //     const msg = []
    //     messages.map(
    //         (data)=> {
    //             msg.push({
    //                 _id: data.id,
    //                 text: data.content,
    //                 createdAt: new Date(),
    //                 user: {
    //                     id: data.sender.id,
    //                     name: data.sender.name,
    //                     avatar: data.sender.image,
    //                 }
    //             })
    //         }
    //     )
    //     setMsg(msg)
    // }, [])

    useEffect(()=>{
     
    })


    // const onSend = useCallback((messages = []) => {
    //     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // }, [])


    // const renderSend = (props) => {
    //     return (
    //         <Send {...props}>
    //             <View>
    //                 <Ionicon name='send' size={30} style={{ marginBottom: 5, marginRight: 5 }} color={Colors.PRIMARY} />
    //             </View>
    //         </Send>
    //     )

    // }

    // const scrollToBottomComponent = () => {
    //     return (
    //         <Ionicon name='ios-caret-down' size={30} color={Colors.Gray} />
    //     )
    // }
    // const renderBubble = (props) => {
    //     return (
    //         <Bubble
    //             {...props}
    //             wrapperStyle={{
    //                 right: {
    //                     backgroundColor: Colors.PRIMARY
    //                 }
    //             }}
    //             textStyle={{
    //                 right: {
    //                     color: Colors.White
    //                 }
    //             }}
    //         />
    //     )
    // }




    return (
        <View style={styles.screen1}>
            {/* Header  */}
            <View style={styles.header_sty}>
                <Header
                    Title={UserName}
                    onPress={() => props.navigation.goBack()}
                />
            </View>
            {/* Chat message  */}
            <ScrollView  showsVerticalScrollIndicator={false} ref={messageScroll} onContentSizeChange={() => { messageScroll.current.scrollToEnd({animated: false}) }}>
            {messages.map((item,index)=>{
                return(
                    <>
                    <View key={index} style={{ alignSelf: item?.senderId === user.id ? 'flex-end' : 'flex-start', paddingHorizontal:10, paddingVertical:5, marginVertical:5 ,borderRadius:5, maxWidth:'60%' , backgroundColor: item?.senderId !== user.id ? Colors.Gray : Colors.PRIMARY }}>
                         <Text style={{color: item?.senderId === user.id ? Colors.White : Colors.Sp_Text, fontSize:18}} >{item?.content}</Text>
                    </View>
                    <Text style={{alignSelf: item?.senderId === user.id ? 'flex-end' : 'flex-start', color: Colors.Gray, fontSize:12}}>{moment(item.createdAt).format('Do MMM yy, hh:mm A')}</Text>
                    </>
                )
            })}
            </ScrollView>

            {/* <GiftedChat
            messages={}
            /> */}



            {/* <GiftedChat
                // messages={msg}
            // user={{}}
            // onSend={messages => onSend(messages)}
            // user={chatData.id}
            // renderBubble={renderBubble}
            // alwaysShowSend
            // renderSend={renderSend}
            // scrollToBottom
            // scrollToBottomComponent={scrollToBottomComponent}
            /> */}

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 2,
        backgroundColor: Colors.White

    },
    header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
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

    screen1: {
        flex: 1,
        width: '100%',
        padding: 2,
        justifyContent: 'space-between'
    }
})

export default ChatScreen;