import React, { useEffect, useCallback, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Colors, Images } from '../../../CommonConfig'
import { Header } from '../../../Components/Common'
import { useTranslation } from "react-i18next";
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const ChatScreen = (props) => {
    const { t, i18n } = useTranslation()
    const user = props.route.params.UserName
    // console.log("Chatuser---------->",user)

    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])


    const renderSend = (props) => {
        return (
            <Send {...props}>

                <View>
                    <Ionicon name='send' size={30} style={{ marginBottom: 5, marginRight: 5 }} color={Colors.PRIMARY} />
                </View>
            </Send>
        )

    }

    const scrollToBottomComponent = () => {
        return (
            <Ionicon name='ios-caret-down' size={30} color={Colors.Gray} />
        )
    }
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: Colors.PRIMARY
                    }
                }}
                textStyle={{
                    right: {
                        color: Colors.White
                    }
                }}
            />
        )
    }


    return (
        <View style={styles.screen}>
            {/* Header  */}
            <View style={styles.header_sty}>
                <Header
                    Title={user}
                    onPress={() => props.navigation.goBack()}
                />
            </View>
            {/* Chat message  */}

            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderBubble={renderBubble}
                alwaysShowSend
                renderSend={renderSend}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding:2,
        backgroundColor:Colors.White

    },
    header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding:5,
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
})

export default ChatScreen;