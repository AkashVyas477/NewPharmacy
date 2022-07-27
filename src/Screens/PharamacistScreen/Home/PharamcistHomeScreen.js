import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, ActivityIndicator, PermissionsAndroid, Platform, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { Images, Colors } from '../../../CommonConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import { getParams } from '../../../Components/Helpers/ApiHelper';
import { useTranslation } from 'react-i18next';


const PharamaHomeScreen = props => {

    const {t}= useTranslation()
    const [user, setUser] = useState({});
    const [length, setLength] = useState(0)
    const [prescriptionList, setPrescriptionList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getuser = async () => {
        setUser(JSON.parse(await AsyncStorage.getItem('userInfo')))
    }

    useEffect(() => {
        // console.log("info\n", user)
    }, [user])

    useEffect(() => {
        const update = props.navigation.addListener('focus', () => {
            getPrescription()
            getuser()
        });
        return update;
    }, [props.navigation])


    const getPrescription = async () => {
        const response = await getParams('pharmacist/getRequests?page=1')
        // console.log("prescription\n",response)
        if (response.success) {
            setLength(response.data.length)
            setIsLoading(false)
            setPrescriptionList(response.data.data)
        } else {
            setIsLoading(false)
            Toast.show('There is no Prescription available currently!')
        }
    }

    const renderprescriptionList = data => {
        // console.log("data             ", data.item)
        return (
            <View style={styles.card}>
                <TouchableOpacity
                 onPress={() => {props.navigation.navigate('Addquotes',{prescription:data.item}) }}
                >
                    <View style={styles.Card_Sty}>
                        <View>
                            <Image source={{ uri: data.item.Prescription_image }} style={styles.Image_Sty} />
                            <View style={styles.userDisply}>
                            <Image source={{ uri: data.item.user_image }} style={styles.userImage} /> 
                            <Text style={styles.userName}>{data.item.user}</Text>
                            </View>
                            {/* <Image source={{ uri: data.item.user_image }} style={styles.userImage} />
                            <Text style={styles.userName}>{data.item.user}</Text> */}
                        </View>
                        <View style={{flexDirection: 'row' }}>
                        <View style={styles.Text_sty}>
                            <View >
                                <Text style={styles.Pname}>{data.item.prescription_name}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 1 }}>
                                <Image source={Images.Calendar} style={{ height: 20, width: 20, }} />
                                <Text style={styles.name}>{moment(data.item.createdAt).format('DD/MM/YYYY') + ' at ' + moment(data.item.createdAt).format('hh:mm A')}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={Images.Quotes} style={{ height: 18, width: 20, }} />
                                <Text style={styles.name}>{data.item.total_quotes}</Text>
                            </View>
                        </View>

                        {/* <View style={{}} >
                                {data.item.status === 0 ? <Text style={{ color: Colors.orange }}> Pending</Text> : <Text style={{ color: Colors.PRIMARY }}> Completed</Text>}
                            </View> */}

                            </View>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <View style={styles.screen}>
            {/*Logo + Icon  */}
            <View style={styles.screen1}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                        <Image source={Images.Menu} style={styles.MenuStyle2} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        {user.store_name}
                    </Text>
                    <View >
                        <Image source={Images.Logout} style={styles.MenuStyle1} />
                    </View>
                </View>
            </View>

            <View style={{ padding: 10 }}>
                <View style={{ alignItems: 'center' }}>
                    {
                        isLoading ?
                            <View style={styles.loader}>
                                <ActivityIndicator size={40} color={Colors.PRIMARY} />
                            </View>
                            :
                            length === 0 ?
                                <View>
                                    <Text>{t('common:NoPrescriptionfound')}</Text>
                                </View>
                                :
                                <View>
                                    <Text style={{ color: '#717D7E', fontSize: 17, padding: 10, textAlign: 'center' }}>
                                        {t('common:PrescriptionList')}
                                    </Text>
                                    <FlatList
                                        // padding={30}
                                        data={prescriptionList}
                                        keyExtractor={item => item.id}
                                        renderItem={renderprescriptionList}
                                        isLoading='false'
                                    />
                                </View>
                    }


                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    screen1: {
        backgroundColor: 'white',
        elevation: 5
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        padding: 10
    },
    MenuStyle2: {
        height: 20,
        width: 20,
    },
    MenuStyle1: {
        tintColor: Colors.White,
        backgroundColor: Colors.White,
        height: 28,
        width: 27,
    },
    headerText: {
        fontWeight: '700',
        fontSize: 20
    },
    Image_Sty: {
        height: 170,
        width: 290,
        borderRadius: 10,
        opacity: 0.8
    },
    userDisply:{
        flexDirection:'row',
        alignItems:'center',
        width:"100%",
        position: 'absolute',
        backgroundColor:'rgba(0,0,0,0.2)',
        left: Dimensions.get('window').width * 0,
        top: Dimensions.get('window').width * 0.3,
    },
    userImage: {
        // flex: 3,
        height:40 ,
        width: 40,
        aspectRatio:1,
        borderRadius: 20,
    },
    userName: {
        flex:7,
        padding: 10,
        // backgroundColor: 'rgba(0,0,0,0.4)',
        color: Colors.White,
        fontWeight: '600',
    },
    card: {
        flex: 1,
        flexGrow: 1,
        // shadowColor:Colors.White,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 5,
        margin: 10,
        justifyContent: 'center',
        width: Dimensions.get('screen').width *0.9
    },
    Card_Sty: {
        // flexDirection: 'row',
        padding: 5,
        marginBottom: 5
    },
    Text_sty: {
        // flexDirection: 'row',
        marginLeft: 5,
        paddingLeft: 10,
        // padding: 5
    },

    Pname: {
        fontWeight: 'bold',
        color: Colors.Sp_Text,
        fontSize: 17,
        // padding: 5

    },
    name: {
        padding: 2
    },
    loader: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },



});

export default PharamaHomeScreen;