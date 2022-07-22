import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ImageBackground, TouchableOpacity, Alert, TextInput, ActivityIndicator, ScrollView, } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { Header, RadioButton, CheckButton,Button } from '../../../../Components/Common';
import Header from '../../../../Components/Common/Header';
import RadioButton from '../../../../Components/Common/RadioButton';
import CheckButton from '../../../../Components/Common/CheckButton';
import Button from '../../../../Components/Common/Button';
import { Colors, Images } from '../../../../CommonConfig';
import { postPostLogin, getPreLogin } from '../../../../Components/Helpers/ApiHelper';
import Cards from '../../../../Components/Common/Cards';
import Toast from 'react-native-simple-toast'
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retrievePaymentIntent, StripeProvider, useStripe } from '@stripe/stripe-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
// import * as CardAction from '../../../../Store/Actions/CardAction'


const OrderScreen = props => {


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }, [])

    const dispatch = useDispatch()


    const selectedQuotes = props.route.params.activeQuotes
    const currentprescription = props.route.params.currentprescription
    // console.log("PrescriptionId",currentprescription.id)
    const quoteId = selectedQuotes.id
    const Deliverycharge = 5.00

    const [PaymentType, setPaymentType] = useState(1);
    const [state, setState] = useState('cash')
    const [checkOutType, setcheckOutType] = useState();
    const [isLoading, setIsLoading] = useState({});

    const [selectedCard, setSelectedCard] = useState({})


    useEffect(() => {
        const refresh = props.navigation.addListener('focus', () => {
            getcard()
        //   getPaymentMethod()
        });
        return refresh
    }, [props.navigation])


useEffect(()=>{
    getPaymentMethod()
},[])

    const getPaymentMethod = async () => {
        setSelectedCard (JSON.parse(await AsyncStorage.getItem('activateCard')))
        console.log("getting cards\n", selectedCard)
    }

    const [card, setCard] = useState([])


    const getcard = async () => {
        setIsLoading(true)
        const response = await getPreLogin('customer/getCard')
        //    console.log("\n\n\n\ncard details   ",response.data.message.data)
        let errorMsg = 'No Credit Cards to Show!';
        if (response.success) {
            setCard(response.data.message.data)
            setIsLoading(false)
            // await AsyncStorage.setItem('activeCard', JSON.stringify(props.item))
        } else {
            Alert.alert("Error", errorMsg, [{ text: "Okay" }])
            console.log(response)
            setIsLoading(false)
        }
    }


    const [user, setUser] = useState({})
    const getProfile = async () => {
        setUser(JSON.parse(await AsyncStorage.getItem("userInfo")))
    }


const [paymentLoader, setPaymentLoader] = useState(false)
const stripe=useStripe();
 const  onPressPayment = async()=>{
    setIsLoading(true)
try {
//sending request
const paydata = {
    quoteId: quoteId,
    prescriptionId: currentprescription.id,
    delivery_charge: Deliverycharge,
    payment_method: PaymentType,
    checkout_type: checkOutType,
    card_id: selectedCard.id,

}

const getPayment = await postPostLogin('customer/checkout', paydata)
// const data= await getPayment.json();
console.log("on press \n ",getPayment)
if (state==='cash'){
    Alert.alert('Order complete, thank you!');
    props.navigation.navigate('Prescription') 
}
if(!getPayment.success) return Alert.alert(error.message);
setIsLoading(false)
const clientSecret= getPayment.data.data.payment_intent
const EphemeralKeySecret= getPayment.data.data.ephemeral_key
const Displayname=   'Pradip'
const customersId= getPayment.data.data.customer_id

// const clientSecret= "pi_3LNrJqSJ7crToGEY0lZvOc5Q_secret_Rm50QtBER4DvtVLE0EX6UiGge"
// const EphemeralKeySecret= "ek_test_YWNjdF8xS1ltOUFTSjdjclRvR0VZLHhmdzBYeUdXbDlrd0taNDJIZHpzQVdXRGtMSzVSUXc_00tpK9VQX8"
// const Displayname=   'Pradip'
// const customersId= "cus_M3snPrCRjEoj6o"

const initSheet = await stripe.initPaymentSheet({
    paymentIntentClientSecret:clientSecret,
    customerEphemeralKeySecret:EphemeralKeySecret,
    merchantDisplayName:Displayname,
    customerId:customersId,
    allowsDelayedPaymentMethods:true,
    testEnv:true
});

if(initSheet.error) return Alert.alert(initSheet.error.message);
setIsLoading(false)
const presentSheet = await stripe.presentPaymentSheet({
    clientSecret,
})

if(presentSheet.error) return Alert.alert(presentSheet.error.message);
setIsLoading(false)
Alert.alert('Payment complete, thank you!');
props.navigation.navigate('Prescription')

const {error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)
if(error){
    console.log(error);
    setIsLoading(false)
}else if(paymentIntent.status==='Succeeded'){
    console.log("Payment Success!");
    // onPressPayment()
}
}
catch(error){
    setIsLoading(false)
    console.error(error);
    Alert.alert('SomethingWent Wrong, try Angain later')
}


// if( state === 'cash'){
//     if(getPayment.success){
//         Toast.show('Order Created Successfully')
//         props.navigation.navigate('Prescription')
//     }else{
//         if(!getPayment.success) return Alert.alert(error.message);
// setIsLoading(false)
// const clientSecret= getPayment.data.data.payment_intent
// const EphemeralKeySecret= getPayment.data.data.ephemeral_key
// const Displayname=   'Pradip'
// const customersId= getPayment.data.data.customer_id
// const initSheet = await stripe.initPaymentSheet({
//     paymentIntentClientSecret:clientSecret,
//     customerEphemeralKeySecret:EphemeralKeySecret,
//     merchantDisplayName:Displayname,
//     customerId:customersId,
//     allowsDelayedPaymentMethods:true,
//     testEnv:true
// });
// if (!initSheet){
//     const presentResponse = await stripe.presentPaymentSheet({
//         clientSecret,
//     })
//     const {error , paymentIntent} = await stripe.retrievePaymentIntent(clientSecret)
//     if(error){
//         console.log(error);
//     }else if(paymentIntent.status==='Succeeded'){
//         console.log("payment Success!");
//     }else{
//         console.log("Something Went Wrong During Payment!");
//     }

// }  
//     }
// }
 }



    return (
        <StripeProvider
            publishableKey='pk_test_51KYm9ASJ7crToGEYDadpzSGseBGOmjOfGKCFvTbGWSXJAGvwOGrQTXu3ZnJBKTKNXjYfgsgQTHX6q0WTdxaKrQfj003pXSAxAh'
        >
            <View style={styles.screen}>
                <View style={styles.screen1} >
                    <View style={styles.header_sty}>
                        <Header
                            Title="PAYMENT DETAILS"
                            onPress={() => (props.navigation.goBack())}
                        />
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.screen1}>
                        <View style={{ padding: 10, paddingLeft: 10 }}>
                            <Text>
                                Select Payment Mode
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 20 }}>
                            <View style={{ width: "50%", }}>
                                <RadioButton
                                    label="Cash on Delivery"
                                    onPress={() => {
                                        setPaymentType(1)
                                        setState('cash')

                                    }}
                                    state={PaymentType === 1}
                                />

                            </View>
                            <View style={{ width: "50%" }}>
                                <RadioButton
                                    label="Online"
                                    onPress={() => {
                                        setPaymentType(0)
                                        setState('card')
                                    }}
                                    state={PaymentType === 0}
                                />
                            </View>
                        </View>
                    </View>

                    {state === 'cash' ?

                        <View>
                            <View style={styles.cod}>

                                <Text style={styles.codText}>
                                    Cash on Delivery
                                </Text>
                            </View>
                        </View>

                        : <View>
                            <View style={{ flexDirection: 'row', paddingLeft: 30, marginBottom: 10, alignContent: 'center', alignItems: 'center' }}>
                                <Text>
                                    Add New card
                                </Text>
                                <TouchableOpacity onPress={() => { props.navigation.navigate('AddCard') }}>
                                    <Image source={Images.AddIcon} style={{ height: 30, width: 30 }} />
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                horizontal
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                                data={card}
                                renderItem={({ item, index }) => {
                                    // console.log("details       ",item )
                                    return (
                                        <View>
                                            {isLoading ? <ActivityIndicator color={Colors.PRIMARY}  size={50}/>:
                                            <Cards
                                                item={item}
                                                id={item.id}
                                                number={item.last4}
                                                image={item.image}
                                                brand={item.brand}
                                                exp_month={item.exp_month}
                                                exp_year={item.exp_year}

                                            />}
                                        </View>
                                    )
                                }}
                            />

                        </View>
                    }


                    <View style={styles.screen_divide}>
                        <></>
                    </View>

                    <View style={styles.screen1}>
                        <Text style={{ padding: 10, }}>
                            Select option for Checkout
                        </Text>
                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: Colors.Sp_Text }}>
                                Pay and Collect from store
                            </Text>
                            <CheckButton
                                onPress={() => { setcheckOutType(0) }}
                                state={checkOutType === 0}
                            />
                        </View>
                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: Colors.Sp_Text }}>
                                Book and collect from store
                            </Text>
                            <CheckButton onPress={() => { setcheckOutType(1) }}
                                state={checkOutType === 1} />
                        </View>
                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: Colors.Sp_Text }}>
                                Pay and get Delivery
                            </Text>
                            <CheckButton onPress={() => { setcheckOutType(2) }}
                                state={checkOutType === 2} />
                        </View>
                        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: Colors.Sp_Text }}>
                                Get delivery and do cash on delivery
                            </Text>
                            <CheckButton onPress={() => { setcheckOutType(3) }}
                                state={checkOutType === 3} />
                        </View>
                    </View>

                    <View style={styles.screen_divide}>
                        <></>
                    </View>

                    <View style={styles.screen1}>
                        <Text style={styles.Text1}>
                            {selectedQuotes.store_name.toUpperCase()}
                        </Text>
                        <Text style={{ color: Colors.Sp_Text, padding: 10 }}>
                            Bill Details
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                            <Text style={styles.Text}>
                                {currentprescription.name.toUpperCase()}
                            </Text>
                            <Text>$ {parseFloat(selectedQuotes.price).toFixed(2)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                            <Text style={styles.Text2} >
                                Delivery Charge
                            </Text>
                            <Text style={styles.Text2}>$ {Deliverycharge.toFixed(2)}</Text>
                        </View>
                        <View style={{ borderBottomWidth: 0.5, margin: 10, borderColor: Colors.borderBottomColor }}>
                            <></>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={styles.Text1} >
                                Total
                            </Text>
                            <Text style={styles.Text1}>$ {(parseFloat(selectedQuotes.price) + parseFloat(Deliverycharge)).toFixed(2)}</Text>
                        </View>

                        <View>


                            <Image source={Images.PaymentBorder} style={{ height: 30, width: "100%" }} />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <Button
                                showActivityIndicator={isLoading}
                                label="PAYMENT"
                                onPress={onPressPayment}
                            // onPress={()=>{props.navigation.navigate('CheckoutScreen')}}
                            />
                        </View>
                    </View>
                    {/* <View style={styles.screen2}>
                <Button 
                label="PAYMENT"
                />
            </View> */}
                </ScrollView>
            </View>
        </StripeProvider>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
    },
    screen_divide: {
        flex: 0.02
    },
    screen1: {
        // backgroundColor: 'white',
        padding: 10,
    },
    checkIcon: { height: 29.5, width: 28.5, },
    // screen2: {
    //     width: "100%",
    //     marginTop:50,
    //     backgroundColor: 'white',
    //     padding: 10,

    // },
    header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    Text: {
        color: Colors.Sp_Text,
        // fontWeight:'bold'
    },
    Text1: {
        color: Colors.PRIMARY,
        fontWeight: 'bold',
        padding: 10
    },
    Text2: {
        color: Colors.Error_Textcolor,
        fontWeight: 'bold',
    },
    cod: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'flex-start',
        padding: 10,
        elevation: 10,
        backgroundColor: Colors.White,
        overflow: 'hidden',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        marginTop: 10
    },
    codText: {
        fontSize: 19,
        color: Colors.Gray
    },

    cardItemContainer: {
        // flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        padding: 10,
        marginLeft: 15,
        elevation: 10,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: Colors.White,
        // marginVertical:5,
    },
    detailContainer: {
        flex: 3,
        marginLeft: 20,
        justifyContent: 'space-evenly',
        height: '100%'
    },
    imageStyle: {
        height: 80,
        width: 80
    },
    // cardnum:{
    //     fontSize: 18,
    //     color: Colors.Gray
    // },
    cardNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10
    },
    expiry: {
        fontWeight: '600',
        fontSize: 16,
        color: Colors.GREY
    }
});
export default OrderScreen;