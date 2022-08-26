// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, FlatList, ImageBackground, TouchableOpacity, Alert, TextInput, ActivityIndicator, ScrollView, } from 'react-native';
// import Header from '../../../../Components/Common/Header';
// import RadioButton from '../../../../Components/Common/RadioButton';
// import CheckButton from '../../../../Components/Common/CheckButton';
// import Button from '../../../../Components/Common/Button';
// import { Colors, Images } from '../../../../CommonConfig';
// import { postPostLogin, getPreLogin } from '../../../../Components/Helpers/ApiHelper';
// import Cards from '../../../../Components/Common/Cards';
// import Toast from 'react-native-simple-toast'
// import { CommonActions } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { retrievePaymentIntent, StripeProvider, useStripe } from '@stripe/stripe-react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';


// const OrderScreen = props => {
//     const { t } = useTranslation()
//     const dispatch = useDispatch()


//     const selectedQuotes = props.route.params.activeQuotes
//     const currentprescription = props.route.params.currentprescription
//     // console.log("PrescriptionId",currentprescription.id)
//     const quoteId = selectedQuotes.id
//     const Deliverycharge = 5.00
//     const [PaymentType, setPaymentType] = useState(0);
//     const [state, setState] = useState('cash')
//     const [checkOutType, setcheckOutType] = useState();
//     const [isLoading, setIsLoading] = useState({});

//     const [selectedCard, setSelectedCard] = useState({})



//     return (
//         <StripeProvider publishableKey='pk_test_51KYm9ASJ7crToGEYDadpzSGseBGOmjOfGKCFvTbGWSXJAGvwOGrQTXu3ZnJBKTKNXjYfgsgQTHX6q0WTdxaKrQfj003pXSAxAh' >

//             <View style={styles.screen}>
//                 <View style={styles.screen1} >
//                     <View style={styles.header_sty}>
//                         <Header
//                             Title={t('common:PAYMENTDETAILS')}
//                             onPress={() => (props.navigation.goBack())}
//                         />
//                     </View>
//                 </View>

//                 <ScrollView>
//                     <View style={styles.screen2}>
//                     <View style={{ padding: 10, paddingLeft: 10 }}>
//                             <Text>
//                                 {t('common:SelectPaymentMode')}
//                             </Text>
//                         </View>
//                         <View style={{ flexDirection: 'row', padding: 20 }}>
//                             <View style={{ width: "50%" }}>
//                                 <RadioButton
//                                     label={t("common:Online")}
//                                     onPress={() => {
//                                         setPaymentType(0)
//                                         setState('card')
//                                     }}
//                                     state={PaymentType === 0}
//                                 />
//                             </View>
//                             <View style={{ width: "50%", }}>
//                                 <RadioButton
//                                     label={t("common:CashonDelivery")}
//                                     onPress={() => {
//                                         setPaymentType(1)
//                                         setState('cash')

//                                     }}
//                                     state={PaymentType === 1}
//                                 />
//                             </View>
//                         </View>
//                     </View>


//                     {
//                         state === 'cash' ?
//                         <View>
//                             <View style={styles.cod}>

//                                 <Text style={styles.codText}>
//                                     {t('common:CashonDelivery')}
//                                 </Text>
//                             </View>
//                         </View>
//                         :
//                         <View>
                            
//                         </View>
//                     }
//                 </ScrollView>
//             </View>
//         </StripeProvider>
//     )

// }

// const styles = StyleSheet.create({
//     screen: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     screen_divide: {
//         flex: 0.02
//     },
//     screen1: {
//         elevation:5,
//         padding: 10,
//         backgroundColor: 'white',

//     },
//     screen2: {
//      padding: 10,    
//     },
//     checkIcon: { 
//         height: 29.5,
//         width: 28.5, 
//         },
//     header_sty: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 10,
      
//     },
//     Text: {
//         color: Colors.Sp_Text,
//         // fontWeight:'bold'
//     },
//     Text1: {
//         color: Colors.PRIMARY,
//         fontWeight: 'bold',
//         padding: 10
//     },
//     Text2: {
//         color: Colors.Error_Textcolor,
//         fontWeight: 'bold',
//     },
//     cod: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         // justifyContent: 'flex-start',
//         padding: 10,
//         elevation: 10,
//         backgroundColor: Colors.White,
//         overflow: 'hidden',
//         marginLeft: 20,
//         marginRight: 20,
//         borderRadius: 10,
//         marginTop: 10
//     },
//     codText: {
//         fontSize: 19,
//         color: Colors.Gray
//     },

//     cardItemContainer: {
//         // flex:1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 15,
//         padding: 10,
//         marginLeft: 15,
//         elevation: 10,
//         overflow: 'hidden',
//         borderRadius: 10,
//         backgroundColor: Colors.White,
//         // marginVertical:5,
//     },
//     detailContainer: {
//         flex: 3,
//         marginLeft: 20,
//         justifyContent: 'space-evenly',
//         height: '100%'
//     },
//     imageStyle: {
//         height: 80,
//         width: 80
//     },
//     // cardnum:{
//     //     fontSize: 18,
//     //     color: Colors.Gray
//     // },
//     cardNumber: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginRight: 10
//     },
//     expiry: {
//         fontWeight: '600',
//         fontSize: 16,
//         color: Colors.GREY
//     }

// })

// export default OrderScreen;