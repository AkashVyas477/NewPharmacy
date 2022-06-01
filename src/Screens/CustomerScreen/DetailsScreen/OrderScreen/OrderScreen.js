import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { Header, RadioButton, CheckButton,Button } from '../../../../Components/Common';
import Header from '../../../../Components/Common/Header';
import RadioButton from '../../../../Components/Common/RadioButton';
import CheckButton from '../../../../Components/Common/CheckButton';
import Button from '../../../../Components/Common/Button';
import { Colors, Images } from '../../../../CommonConfig';

const OrderScreen = props => {
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
                        />
                    </View>
                    <View style={{ width: "50%" }}>
                        <RadioButton
                            label="Online"
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
                        <CheckButton/>
                    </View>
                    <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:Colors.Sp_Text}}>
                            Book and collect from store
                        </Text>
                        <CheckButton/>
                    </View>
                    <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:Colors.Sp_Text}}>
                            Pay and get Delivery
                        </Text>
                        <CheckButton/>
                    </View>
                    <View style={{padding:10,flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:Colors.Sp_Text}}>
                            Get delivery and do cash on delivery 
                        </Text>
                        <CheckButton/>
                    </View>
            </View>

            <View style={styles.screen_divide}>
                <></>
            </View>

            <View style={styles.screen1}>
                <Text style={{color:Colors.Sp_Text, padding:10}}>
                    Bill Details
                </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between', margin:10}}>
                    <Text >
                        Medicines Name
                    </Text>
                    <Text>$ 45.00</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between', margin:5 }}>
                    <Text >
                       Delivery Charge 
                    </Text>
                    <Text>$ 5.00</Text>
                </View>
                <View style={{borderBottomWidth:0.5, margin:10,borderColor:Colors.borderBottomColor}}>
                    <></>
                </View>

                <View>
            <Image source={Images.PaymentBorder} style={{height:30,width:"100%"}}/>
            </View>

            <View style={{marginTop:80, marginBottom:20}}>
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
    },
    screen_divide: {
        flex: 0.02
    },
    screen1: {
        backgroundColor: 'white',
        padding: 10,
    },
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
});
export default OrderScreen;