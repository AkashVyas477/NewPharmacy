import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Images, Colors } from '../../../CommonConfig';
import { Button, Refresh } from '../../../Components/Common';

import { SafeAreaView } from 'react-native-safe-area-context';
import { getPostLogin, getWithParams, getParams } from '../../../Components/Helpers/ApiHelper';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import { getCurrentTimestamp } from 'react-native/Libraries/Utilities/createPerformanceLogger';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from 'react-i18next';


const PrescriptionScreen = props => {
    const {t}=useTranslation();

    const [prescriptionList, setprescriptionList] = useState([])
    const [PastPrescription, setpastprescriptionList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)
    const [isMoreItem, setIsMoreItem] = useState(false)
    

    const renderLoader = () => {
        return (
            <View style={styles.loaderStyle}>
                {isMoreItem ?
                    (
                        <ActivityIndicator size="large" />
                    ) : null}
            </View>
        );
    }

    const loadMoreItem = () => {
        setCurrentPage(currentPage + 1)
    };

    useEffect(()=>{
        getPrescriptionList()
        getPastPrescription()
    },[currentPage]);



    useEffect(() => {
        const update = props.navigation.addListener('focus', () => {
            setIsLoading(true)
            getPrescriptionList()
            getPastPrescription()
        });
        return update;
    }, [props.navigation])




    const getPrescriptionList = async () => {
        const response = await getParams(`customer/getPrescriptionsList/?page=${currentPage}&state=current&page_size=6`)
        if (response.success) {
            setprescriptionList([...prescriptionList, ...response.data.prescription])
            setIsMoreItem(true)
            setIsLoading(false)
        } else {
            setIsMoreItem(false)
            setIsLoading(false) 
        }
    }

    const getPastPrescription = async () => {
        const response = await getParams(`customer/getPrescriptionsList/?page=${currentPage}&state=past&page_size=6`)
        if (response.success) {
            setpastprescriptionList([...PastPrescription, ...response.data.prescription])
            setIsMoreItem(true)
            setIsLoading(false)
        } else {
            setIsMoreItem(false)
            setIsLoading(false)
            
        }
    }

    const renderprescription = data => {
        return (
            <View style={styles.card} >
                <TouchableOpacity onPress={() => { props.navigation.navigate('CurrentPrescriptionScreen_Data', { prescription: data.item, }) }}>
                    <View style={styles.Card_Sty}>
                        <Image source={{ uri: data.item.prescription_images[0].url }} style={styles.Image_Sty} resizeMode={'stretch'} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.Text_sty}>
                                <View >
                                    <Text style={styles.Pname}>{data.item.name.toUpperCase()}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={Images.Quotes} style={{ height: 18, width: 20, }} />
                                    <Text style={styles.name}>{data.item.quotes.length}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 1 }}>
                                    <Image source={Images.Calendar} style={{ height: 20, width: 20, }} />
                                    <Text style={styles.name}>{moment(data.item.createdAt).format('DD/MM/YYYY') + ' at ' + moment(data.item.createdAt).format('hh:mm A')}</Text>
                                </View>
                            </View>
                            <View style={{}} >
                                {data.item.status === 0 ? <Text style={{ color: Colors.orange }}> {t('common:Pending')}</Text> : <Text style={{ color: Colors.PRIMARY }}> {t('common:Completed')}</Text>}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    const Pastrenderprescription = data => {
        return (
            <View style={styles.card}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('PastPrescriptionScreen_Data', { prescription: data.item }) }}>
                    <View style={styles.Card_Sty}>
                        <Image source={{ uri: data.item.prescription_images[0].url }} style={styles.Image_Sty} resizeMode={'stretch'} />
                        <View style={{ flexDirection: 'row', }}>
                            <View style={styles.Text_sty}>
                                <View >
                                    <Text style={styles.Pname}>{data.item.name.toUpperCase()}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={Images.Quotes} style={{ height: 18, width: 20, }} />
                                    <Text style={styles.name}>{data.item.quotes.length}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 1 }}>
                                    <Image source={Images.Calendar} style={{ height: 20, width: 20, }} />
                                    <Text style={styles.name}>{moment(data.item.createdAt).format('DD/MM/YYYY') + ' at ' + moment(data.item.createdAt).format('hh-mm A')}</Text>
                                </View>
                            </View>
                            <View style={{}}>
                                {data.item.status === 0 ? <Text style={{ color: Colors.orange }}>{t('common:Pending')}</Text> :
                                    <Text style={{ color: Colors.PRIMARY }}>{t('common:Completed')}</Text>}
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>

        )
    }

    const [state, setState] = useState('Current');
    return (

        <View style={styles.screen1} >
            <View style={styles.screen2}>
                {/*Logo + Menu  */}

                <View style={{ flexDirection: 'row', alignItems: 'flex-start', padding: 10 }}>
                    <View>
                        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}  >
                            <Image source={Images.Menu} style={{ height: 20, width: 25 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingLeft: 100 }}>
                        <Image source={Images.HeaderAppIcon} style={{ height: 60, width: 130, }} />
                    </View>
                </View>

                {/* Current And Past Button   */}
                <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
                    <TouchableOpacity
                        style={{
                            ...styles.currentPastButton,
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                            backgroundColor: state === 'Current' ? Colors.PRIMARY : Colors.White
                        }}
                        onPress={() => setState('Current')}
                    >
                        <Text style={{ color: state === 'Current' ? Colors.White : Colors.Gray }}>{t('common:Current')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            ...styles.currentPastButton,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                            backgroundColor: state === 'Past' ? Colors.PRIMARY : Colors.White
                        }}
                        onPress={() => setState('Past')}
                    >
                        <Text style={{ color: state === 'Past' ? Colors.White : Colors.Gray }}>{t('common:Past')}</Text>
                    </TouchableOpacity>
                </View>

            </View>

            {/* Body */}

            <View style={{ padding: 8, height: "100%" }}>

                <SafeAreaView >

                    {
                        state === 'Current' ?
                            <View>
                                {/* If There is no data  */}
                                {isLoading ?

                                    <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                                        <ActivityIndicator size={50} color={Colors.PRIMARY} />
                                    </View>
                                    :
                                    prescriptionList.length === 0 ?
                                        <View style={{ alignItems: 'center', paddingTop: 80, }}>
                                            <Image source={Images.EmptyPlacholder} style={{ height: 200, width: 300, }} />
                                            <View>
                                                <Text style={{ textAlign: 'center', padding: 10, fontWeight: 'bold', color: 'black', fontSize: 25 }}>
                                                    {t('common:Looksempty')}
                                                </Text>
                                                <Text style={{ textAlign: 'center', color: 'grey', fontSize: 15 }}>
                                                    {t('common:TaptheUploadbuttonto')}
                                                </Text>
                                                <Text style={{ textAlign: 'center', color: 'grey', fontSize: 15 }}>
                                                    {t('common:createnewpost')}
                                                </Text>
                                            </View>
                                            <View>
                                                <Image source={Images.Nav} style={{
                                                    height: 160, width: 70,
                                                    left: Dimensions.get('window').width * 0.20,
                                                    bottom: Dimensions.get('window').width * 0.01,
                                                }} />
                                            </View>
                                        </View>
                                        :
                                        <View >
                                            <FlatList
                                                data={prescriptionList}
                                                keyExtractor={item => item.id}
                                                renderItem={renderprescription}
                                                ListFooterComponent={renderLoader}
                                                onEndReached={loadMoreItem}
                                                onEndReachedThreshold={0.1}
                                            />
                                        </View>
                                }
                            </View>
                            :
                            <View>
                                {/* If There is no data  */}
                                {PastPrescription.length === 0 ?
                                    <View style={{ alignItems: 'center', paddingTop: 80, }}>
                                        <Image source={Images.EmptyPlacholder} style={{ height: 200, width: 300, }} />
                                        <View>
                                            <Text style={{ textAlign: 'center', padding: 10, fontWeight: 'bold', color: 'black', fontSize: 25 }}>
                                            {t('common:Looksempty')}
                                            </Text>
                                            <Text style={{ textAlign: 'center', color: 'grey', fontSize: 15 }}>
                                            {t('common:TaptheUploadbuttonto')}
                                            </Text>
                                            <Text style={{ textAlign: 'center', color: 'grey', fontSize: 15 }}>
                                            {t('common:createnewpost')}
                                            </Text>
                                        </View>

                                        <View>
                                            <Image source={Images.Nav} style={{
                                                height: 160, width: 70,
                                                left: Dimensions.get('window').width * 0.20,
                                                bottom: Dimensions.get('window').width * 0.01,
                                            }} />
                                        </View>
                                    </View>
                                    :
                                    <View >
                                        <FlatList
                                            data={PastPrescription}
                                            keyExtractor={item => item.id}
                                            renderItem={Pastrenderprescription}
                                            ListFooterComponent={renderLoader}
                                            onEndReached={loadMoreItem}
                                            onEndReachedThreshold={0.1}
                                        />
                                    </View>
                                }
                            </View>

                    }
                </SafeAreaView>

            </View>


            <View >
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('PrescriptionImageScreen')
                    console.log('Upload new prescription')
                }} style={{
                    position: 'absolute',
                    left: Dimensions.get('window').width * 0.77,
                    bottom: Dimensions.get('window').width * 0.1,
                }} >
                    <Image source={Images.FabIcon} style={styles.addImageIcon} />
                </TouchableOpacity>
            </View>


            {/* Img */}

        </View>
    );
};

const styles = StyleSheet.create({
    screen1: {
        flex: 1,
        paddingBottom: 130
    },
    screen2: {
        backgroundColor: 'white',
        elevation: 2
    },
    line: {
        borderWidth: 1,
        borderColor: 'grey'
    },
    currentPastButton: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: Colors.Gray
    },
    addImageIcon: {
        height: 50,
        width: 50,
    },

    card: {
        flexGrow: 1,
        shadowColor: Colors.White,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 5,
        margin: 10,
        justifyContent: 'center',
    },
    Card_Sty: {
        flexDirection: 'row',

    },

    Image_Sty: {
        height: 90, width: 90,
        borderRadius: 20,
        overflow: 'hidden'
    },
    Text_sty: {
        flexDirection: 'column',
    },

    Pname: {
        padding: 5,
        fontWeight: 'bold',
        color: Colors.Sp_Text
    },
    name: {
        padding: 5,
        color: Colors.Sp_Text
    },
    loaderStyle: {
        marginVertical: 16,
        alignItems: "center",
        color: Colors.PRIMARY
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 20,
    }

});
export default PrescriptionScreen;