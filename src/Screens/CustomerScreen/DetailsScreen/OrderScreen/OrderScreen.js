import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, Image,FlatList, ImageBackground, TouchableOpacity,Alert, TextInput,ActivityIndicator,ScrollView } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { Header, RadioButton, CheckButton,Button } from '../../../../Components/Common';
import Header from '../../../../Components/Common/Header';
import RadioButton from '../../../../Components/Common/RadioButton';
import CheckButton from '../../../../Components/Common/CheckButton';
import Button from '../../../../Components/Common/Button';
import { Colors, Images } from '../../../../CommonConfig';
import { postPostLogin,getPreLogin } from '../../../../Components/Helpers/ApiHelper';
import Cards from '../../../../Components/Common/Cards';
import CreditCardDisplay from '../../../../Components/Common/CardComp';
import Toast from 'react-native-simple-toast'
import { CommonActions } from '@react-navigation/native';


const OrderScreen = props => {

    const selectedQuotes= props.route.params.activeQuotes
    const currentprescription=props.route.params.currentprescription
    const quoteId = selectedQuotes.id
    // console.log(abc)
    // console.log("selected prescription  ",currentprescription)
    // console.log("Quotes id     ",selectedQuotes)
    const Deliverycharge = 5.00
    const [PaymentType, setPaymentType] = useState(1);
    const [state,setState]=useState('cash')
    const [checkOutType, setcheckOutType] = useState();
    const [card, setCard]=useState([])
    const [newCard,setNewCard]=useState([])
    const [isLoading, setIsLoading] = useState({});

   
    useEffect(() => {
        const update = props.navigation.addListener('focus', () => {
            getCards()
        });
        return update;
    }, [props.navigation])


  const getcard =async()=>{
    const response = await getPreLogin('customer/getCard')
    // setIsLoading(true)
    //    console.log(response.data.message.data)
    let errorMsg='No Credit Cards to Show!';
    if(response.success){
        setCard(response.data.message.data)
        // setIsLoading(false)
    }else{
        console.log(response)
    }
  }

const onPressPayment= async()=>{
const data = {
    quoteId: quoteId ,
    delivery_charge:Deliverycharge ,
    payment_method :PaymentType ,
    checkout_type : checkOutType,
}
console.log("data",data)

const response=await postPostLogin ('customer/checkout',data)
console.log(" Data",response)
const resData = response.data
if(!response.success){
if(resData.ErrorMessage==="Order already exisity!"){
    Toast.show("Order already exisity")
}if(resData.ErrorMessage==="Quote not found!"){
    Toast.show("Quote not found")
}if(resData.ErrorMessage==="Data truncated for column 'delivery_charge' at row 1"){
    Toast.show("Delivery charge issue")
}
}else{
    Toast.show("Order palced successfully..")
    props.navigation.dispatch(
        CommonActions.reset({
            index:0,
            routes: [{name: 'Prescription'}]
        })
    )

}


// if(response.success){
//     Toast.show("order success")
//     props.navigation.dispatch(
//         CommonActions.reset({
//             index:0,
//             routes: [{name: 'Prescription'}]
//         })
//     )
// }else{
//     console.log(response)
//     Toast.show("order failed")
// }


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
                            onPress={() => {setPaymentType(1)
                                setState('cash')
                            
                            }}
                            state={PaymentType===1}
                        />
             
                    </View>
                    <View style={{ width: "50%" }}>
                        <RadioButton
                            label="Online"
                            onPress={() => {
                                setPaymentType(0)
                                setState('card')
                            }}
                            state={PaymentType===0}
                        />
                    </View>
                </View>
            </View>

            {state ==='cash'?

            <View> 
                <View style={styles.cod}>
                
                    <Text style={styles.codText}>
                            Cash on Delivery
                    </Text>
                </View>  
            </View>

            :  <View>
             <View style={{flexDirection:'row',paddingLeft:30,marginBottom:10,alignContent:'center',alignItems:'center'}}>
                <Text>
                    Add New card
                </Text>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('AddCard')}}>
                    <Image source={Images.AddIcon} style={{height:30,width:30}}/>
                </TouchableOpacity>
             </View>
           
            <FlatList
            horizontal
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            data={card}
            renderItem={({item,index})=>{
            console.log("details       ",item )
            return(
                <View>
                    <Cards
                        item={item}
                        id={item.id}
                        number={item.last4}
                        image={item.image}
                        brand={item.brand}
                    />
                </View>
            )
        }}
            />
 </View>
            
            // <View>
            //     <Text>
            //         Hi
            //     </Text>
            // </View>
           
            }


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
                        onPress={()=>{setcheckOutType(0)}}
                        state={checkOutType===0}
                        />
                    </View>
                    <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:Colors.Sp_Text}}>
                            Book and collect from store
                        </Text>
                        <CheckButton onPress={()=>{setcheckOutType(1)}}
                        state={checkOutType===1}/>
                    </View>
                    <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:Colors.Sp_Text}}>
                            Pay and get Delivery
                        </Text>
                        <CheckButton onPress={()=>{setcheckOutType(2)}}
                        state={checkOutType===2}/>
                        </View>
                    <View style={{padding:10,flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:Colors.Sp_Text}}>
                            Get delivery and do cash on delivery 
                        </Text>
                        <CheckButton onPress={()=>{setcheckOutType(3)}}
                        state={checkOutType===3}/>
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
                onPress={onPressPayment}
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
});
export default OrderScreen;