import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, ActivityIndicator, PermissionsAndroid, Platform, Dimensions, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { Images, Colors } from '../../../CommonConfig';
import { getWithParams, refreshtoken, getParams } from '../../../Components/Helpers/ApiHelper';
import GetLocation from 'react-native-get-location'
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { getCurrentPosition } from 'react-native-geolocation-service';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = props => {

    const { t } = useTranslation()
    const [pharmacyList, setPharmacyList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [length, setLength] = useState(0)
    const [addresses, setAddresses] = useState([])
    const [activeAddress, setActiveAddress] = useState({})

    useEffect(() => {

        const update = props.navigation.addListener('focus', async () => {
            setIsLoading(true)
            await AsyncStorage.getItem('activeAddress')
                .then(address => {
                    setActiveAddress(JSON.parse(address))
                })

            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
                .then(location => {
                    getNearByPharmacy(location.latitude, location.longitude);
                })
                .catch((error) => {
                    const { code, message } = error;
                    console.log(code, message);
                })

        });

        return update;
    }, [props.navigation])


    const getNearByPharmacy = async (latitude, longitude) => {
        const response = await getParams(`customer/getNearByPharmacy/v1?latitude=${latitude}&longitude=${longitude}`)
        if (response.success) {
            setLength(response.data.length)
            setPharmacyList(response.data.data)
            setIsLoading(false)
        } else {
            setIsLoading(false)
            Toast.show(`${t('common:ThereisnoNearByPharmacyavailablecurrently')}`)
        }

    }

    // Rendering Data of Near By Pharmacy 
    const renderPharmacyList = data => {
        return (
            <View style={styles.card}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('Pharamacies_Detail', { pharmacy: data.item, }) }}>
                    <View style={styles.Card_Sty}>
                        <Image source={{ uri: data.item.store_image }} style={styles.Image_Sty} resizeMode={'stretch'} />
                        <View style={styles.Text_sty}>
                            <View >
                                <Text style={styles.Pname}>{data.item.store_name.toUpperCase()}</Text>
                            </View>
                            <View >
                                <Text style={styles.name}>{data.item.address.primary_address}</Text>
                            </View>
                            <View>
                                <Text style={styles.name}>{data.item.address.addition_address_info}</Text>
                            </View>
                            <View>
                                <Text style={styles.name}>{data.item.distance} Km</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.screen}>
            <View style={styles.headerbackgroung}>
                {/*Logo + Icon  */}
                <View style={styles.header_sty}>
                    <View style={styles.wrapper}>
                        <TouchableOpacity
                            onPress={() => props.navigation.toggleDrawer()}
                            style={styles.headerStyle}>
                            <Image source={Images.Menu} style={styles.MenuIcon} />
                        </TouchableOpacity>
                        <Image source={Images.HeaderAppIcon} style={{ height: 60, width: 130, }} />
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('AddresScreen') }}>
                        <Text style={{ padding: 10 }}>
                            {t('common:CurrentLocation')}
                        </Text>
                        <View>
                        </View>
                        <View >
                            <Text style={{ color: '#0DC314', paddingLeft: 7, marginBottom: 10 }}>{activeAddress?.primary_address}<Image source={Images.Pencil} style={{ height: 15, width: 15, }} /> </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Dtabase */}

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
                                    <Text>{t('common:NoPharmaciesfound')}</Text>
                                </View>
                                :
                                <View>
                                    <Text style={{ color: '#717D7E', fontSize: 17, padding: 10, textAlign: 'center' }}>{t('common:NearByPharmacies')}</Text>
                                    <FlatList
                                        data={pharmacyList}
                                        keyExtractor={item => item.id}
                                        renderItem={renderPharmacyList}
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
        flex: 1,
    },
    card: {
        flex: 1,
        shadowColor: Colors.White,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: Colors.White,
        marginBottom: 5,
        margin: 10,
        justifyContent: 'center',
        width: Dimensions.get('screen').width * 0.9
    },
    Card_Sty: {

        flexDirection: 'row',
        padding: 5,
        alignContent: 'center', alignItems: 'center'
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
    header_sty: {
        flexDirection: 'row',
        
        padding: 10,
    },
    headerbackgroung: { backgroundColor: Colors.White, elevation: 5 },
    wrapper: { flexDirection: 'row',alignItems: 'flex-start', flex: 1 },
    headerStyle: { flex: 0.5, height: 30, width: 40, },
    MenuIcon: { resizeMode: 'contain', height: 25, width: 25 },
    headerText: {
        fontSize: 20,
        color: Colors.Sp_Text,
        fontWeight: 'bold',
        //   paddingLeft:10
    },
});

export default HomeScreen;