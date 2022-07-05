import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { Header, RadioButton, CheckButton,Button } from '../../../../Components/Common';
import Header from '../../../../Components/Common/Header';
import RadioButton from '../../../../Components/Common/RadioButton';
import CheckButton from '../../../../Components/Common/CheckButton';
import Button from '../../../../Components/Common/Button';
import { Colors, Images } from '../../../../CommonConfig';
import { useState } from 'react';
import { postPostLogin } from '../../../../Components/Helpers/ApiHelper';

const OrderScreen = props => {

    const selectedQuotes= props.route.params.activeQuotes
    const currentprescription=props.route.params.currentprescription
    // console.log("selected prescription  ",currentprescription)
    // console.log("Quotes id     ",selectedQuotes)
    const Deliverycharge = 5.00
    const [PaymentType, setPaymentType] = useState();
    const [checkOutType, setcheckOutType] = useState();

  const OnpressPayment =async()=>{
    const response = await postPostLogin('https://mobile-pharmacy.herokuapp.com/customer/checkout')
    if(response.success){

    }else{
        console.log(response)
    }
  }
    
    return (
        <View style={styles.screen}>
            <View style={styles.screen1} >
                <View style={styles.header_sty}>
                    <Header
                        Title="PAYMENT DETAILS"
                        onPress={() => (props.navigation.goBack())}
                    />
                </View>
            </View>

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
                            onPress={() => {setPaymentType(1)}}
                            state={PaymentType===1}
                        />
                    </View>
                    <View style={{ width: "50%" }}>
                        <RadioButton
                            label="Online"
                            onPress={() => {setPaymentType(0)}}
                            state={PaymentType===0}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.screen_divide}>
                <></>
            </View>

            <View style={styles.screen1}>
                <Text style={{padding:10, }}>
                    Select option for Checkout
                </Text>
                    <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{ color:Colors.Sp_Text}}>
                            Pay and Collect from store
                        </Text>
                        <CheckButton
                        onPress={()=>{setcheckOutType(2)}}
                        state={checkOutType===2}
                        />
                    </View>
                    <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:Colors.Sp_Text}}>
                            Book and collect from store
                        </Text>
                        <CheckButton onPress={()=>{setcheckOutType(3)}}
                        state={checkOutType===3}/>
                    </View>
                    <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:Colors.Sp_Text}}>
                            Pay and get Delivery
                        </Text>
                        <CheckButton onPress={()=>{setcheckOutType(4)}}
                        state={checkOutType===4}/>
                        </View>
                    <View style={{padding:10,flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:Colors.Sp_Text}}>
                            Get delivery and do cash on delivery 
                        </Text>
                        <CheckButton onPress={()=>{setcheckOutType(5)}}
                        state={checkOutType===5}/>
                    </View>
            </View>

            <View style={styles.screen_divide}>
                <></>
            </View>
           
            <View style={styles.screen1}>
            <Text style={styles.Text1}>
                {selectedQuotes.store_name.toUpperCase()}
                </Text>
                <Text style={{color:Colors.Sp_Text, padding:10}}>
                    Bill Details
                </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between', margin:10}}>
                    <Text style={styles.Text}>
                      {currentprescription.name.toUpperCase()}
                    </Text>
                    <Text>$ {parseFloat(selectedQuotes.price).toFixed(2)}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between', margin:10 }}>
                    <Text style={styles.Text2} >
                       Delivery Charge 
                    </Text>
                    <Text style={styles.Text2}>$ {Deliverycharge.toFixed(2)}</Text>
                </View>
                <View style={{borderBottomWidth:0.5, margin:10,borderColor:Colors.borderBottomColor}}>
                    <></>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between', }}>
                    <Text style={styles.Text1} >
                       Total
                    </Text>
                    <Text style={styles.Text1}>$ {(parseFloat(selectedQuotes.price) + parseFloat(Deliverycharge)).toFixed(2)}</Text>
                </View>
               
                <View>
               

            <Image source={Images.PaymentBorder} style={{height:30,width:"100%"}}/>
            </View>

            <View style={{ marginBottom:20}}>
                <Button 
                label="PAYMENT"
                />
            </View>
            </View>
            {/* <View style={styles.screen2}>
                <Button 
                label="PAYMENT"
                />
            </View> */}
        </View>
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
    checkIcon:{ height: 29.5, width: 28.5, },
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
    Text:{
        color: Colors.Sp_Text,
        // fontWeight:'bold'
    },
    Text1:{
        color: Colors.PRIMARY,
        fontWeight:'bold',
        padding:10
    },
    Text2:{
        color: Colors.Error_Textcolor,
        fontWeight:'bold',
    },
});
export default OrderScreen;