import { StyleSheet, Alert, Text, TextInput, View, ScrollView, StatusBar, Image, Dimensions, ActivityIndicator, TouchableOpacity, ImageBackground, FlatList, Modal } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Toast from 'react-native-simple-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../../../CommonConfig/Colors"
import Images from '../../../../CommonConfig/Image';
import Header from '../../../../Components/Common/Header';
import CheckRound from '../../../../Components/Common/CheckRound';
import { getPreLogin, postPostLogin } from "../../../../Components/Helpers/ApiHelper";
import { useTranslation } from "react-i18next";
import Ionicon from 'react-native-vector-icons/Ionicons';
import { object } from 'prop-types';
import Button from '../../../../Components/Common/Button';


const Address = (props) => {

    const [tnc, setTnc] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [address, setAddress] = useState([])
    const [activeAddress, setActiveAddress] = useState({})
    const { t } = useTranslation()

    const getactiveAddress = async () => {
        setActiveAddress(JSON.parse(await AsyncStorage.getItem('activeAddress')))
    }

    useEffect(() => {
    }, [activeAddress])
    // console.log("Active Address------->",activeAddress)
    
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getAddress();
        });
        return unsubscribe
    }, [props.navigation])

    const getAddress = async () => {
        setIsLoading(true)
        const response = await getPreLogin('getAddress')
        console.log("getAddress\n", response.data.data)
        if (response.success) {
            setAddress(response.data.data)
            setIsLoading(false)
        } else {
            console.log(response);
            setIsLoading(false)
        }
    }

    // const activatedAddress = async () => {
    //     if (object.keys(activeAddress ? activeAddress : {}).length === 0) {
    //         Toast.show('select an address')
    //     } else {
    //         await AsyncStorage.setItem('activeAddress', JSON.stringify(activeAddress))
    //         Toast.show('Address Activated')
    //         navigation.goBack()
    //     }
    // }

    const type = (address_type) => {
        if (address_type === 0) return "Home" 
        if (address_type === 1) return "Work"
        if (address_type === 2) return "Other"
    }

    const addressimage= (address_type)=>{
        if (address_type === 0) return Images.HomeActive
        if (address_type === 1) return Images.OfficeActive
        if (address_type === 2) return Images.OfficeActive 
    }
    const checkmark = (is_select)=>{
        if(is_select===0) return Colors.Gray 
        if(is_select===1) return Colors.PRIMARY
    }

    const renderAddress = ({ item }) => {
        return (<View style={styles.card}>
            <TouchableOpacity onPress={() => { props.navigation.navigate('EditAddress', { item }) }}>
                <View style={styles.Card_Sty}>
                    <View style={styles.Text_sty}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Image source={addressimage(item.address_type)} style={{ height: 40, width: 40 }} />
                            <View style={{ padding: 10, }}>
                                <Text style={styles.Pname}>{type(item.address_type)}</Text>
                                <Text style={styles.name}>{item.primary_address}</Text>
                                <Text style={styles.name}>{item.addition_address_info}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                            <Ionicon name={'checkmark-circle'} size={30} color={checkmark(item.is_select)} 
                            />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        )
    }

    if(isLoading) {
        return(
            <View style={styles.loader}>
                <ActivityIndicator size={65} color={Colors.PRIMARY} />
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            {/* Header*/}
            <View style={styles.header_sty}>
                <Header
                    Title="Manage Your Location"
                    onPress={() => props.navigation.goBack()}
                />
            </View>
            <View style={{flex:1,padding:10}}>
                <Text style={styles.label}>
                    Address
                </Text>
                {
                    address.length > 0 ?
                        <FlatList
                            data={address}
                            keyExtractor={item => item.id}
                            renderItem={renderAddress}
                        />
                        :
                        <View style={styles.backDropContainer}>
                            <Text>
                                No Address saved
                            </Text>
                            <Text>
                                Add Some Now!
                            </Text>
                        </View>
                }
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    loader:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: Colors.White
    },
    header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.White,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.Gray,
        marginBottom: 10,
        padding: 10
    },
    backDropContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backDropTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        color: Colors.Gray
    },
    backDropText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.Gray
    },
    Card_Sty:{ 

        flexDirection: 'row',
        padding:5,
        alignContent:'center',
        alignItems:'center', 
         justifyContent: 'space-between',
     },
     card:{
        flex: 1,
        shadowColor:Colors.White,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor:Colors.White,
        marginBottom: 5,
        margin: 10,
        justifyContent: 'center',
        width: Dimensions.get('screen').width *0.9
    },
    Text_sty:{ 
        flexDirection: 'column', 
        marginLeft: 5, 
        paddingLeft:10,
        padding: 5,
    
     },
     Pname:{
         fontWeight:'bold',
         color: Colors.Sp_Text,
         fontSize:17,
         padding:5

     },
     name:{
        padding:2
    },

    addressItem: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        width: '100%',
        flexDirection: 'row',
        borderBottomColor: Colors.Gray,
        marginBottom: 10,
        elevation:2,
        padding:10,
        backgroundColor:Colors.White
    },
    addressTag: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        textAlignVertical: 'center'
    },
    address: {
        flex: 1.5,
        fontSize: 16,
        color: Colors.GREY,
    },
    checkIcon: {
        height: 25,
        width: 25
    },
    acheckIcon: {
        height: 26,
        width: 25
    },

})
export default Address;