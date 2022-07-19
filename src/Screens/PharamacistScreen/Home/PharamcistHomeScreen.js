import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, ActivityIndicator, PermissionsAndroid, Platform, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { Images, Colors } from '../../../CommonConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { getParams } from '../../../Components/Helpers/ApiHelper';


const PharamaHomeScreen = props => {
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
        console.log("data             ", data.item)
        return (
            <View style={styles.card}>
                <TouchableOpacity
                //  onPress={() => {props.navigation.navigate('Pharamacies_Detail', {pharmacy:data.item,}) }}
                >
                    <View style={styles.Card_Sty}>
                        <Image source={{ uri: data.item.Prescription_image}} style={styles.Image_Sty} resizeMode={'stretch'} />
                        <View style={styles.Text_sty}>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }






    return (
        <View>
            {/*Logo + Icon  */}
            <View style={styles.screen}>
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
                                    <Text>No Prescription found</Text>
                                </View>
                                :
                                <View>
                                    <Text style={{ color: '#717D7E', fontSize: 17, padding: 10, textAlign: 'center' }}>
                                        Prescription List
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
        // width: 80
    },
    Card_Sty: {
        flexDirection: 'row',
        padding: 5,
        // paddingRight:10,

    },
    Image_Sty: {
        height: 90,
        width: 90,
        borderRadius: 10,
    },
    Text_sty: {
        flexDirection: 'column',
        marginLeft: 5,
        paddingLeft: 10,
        padding: 5
    },

    Pname: {
        fontWeight: 'bold',
        color: Colors.Sp_Text,
        fontSize: 17,
        padding: 5

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