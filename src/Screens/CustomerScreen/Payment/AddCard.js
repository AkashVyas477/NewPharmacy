import React ,{useState , useCallback} from "react";
import {Text, View,TextInput,StyleSheet,Image,Alert,Modal, TouchableOpacity,ActivityIndicator}from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { useDispatch } from "react-redux";
import moment from "moment";
import MonthPicker from 'react-native-month-picker';
import Ionicon from 'react-native-vector-icons/Ionicons';


import * as CardAction from '../../../Store/Actions/CardAction'
import OtherPaymentTypeValidationSchema from '../../../ForValidationSchema/OtherPaymentTypeValidation';
import CreditCardValidationSchema from '../../../ForValidationSchema/CreditCardValidationSchema';
import { Colors,Images} from '../../../CommonConfig';
import Header from '../../../Components/Common/Header'
import { postPostLogin } from '../../../Components/Helpers/ApiHelper';
import Toast from "react-native-simple-toast"


const AddCard = props =>{
    const[type,setType]= useState('card');
    const [isLoading, setIsLoading]= useState(false)


    const placeholder = "Select expiry date"
    const [isOpen, toggleOpen] = useState(false);
    const [value, onChange] = useState(null);


    const onPressCard = async(details) => {
        setIsLoading(true)
        // console.log(details);
        const arr= details.expiryDate.split('/')
        console.log(arr)
        const year= arr[1].substring()
        const data = {
            number : details.cardNumber,
            exp_month: arr[0],
            exp_year:year,
            cvc: details.cvv,
            name: details.name
        }
        console.log(data)
        const response = await postPostLogin('customer/addCard', data)
        console.log(response);
        if(!response.success) {
            console.log("Error in adding card!");
        } else {
            Toast.show('Card added successfully!')
            props.navigation.goBack();
        }
        setIsLoading(false)
    }

    return(
        <KeyboardAwareScrollView>
            <View style={styles.screen}>
                {/* Header */}
            <View style={styles.header_sty}>
                <Header
                    Title="Add New Creditcard "
                    onPress={() => props.navigation.goBack()}
                />
            </View>
            </View>
            <View style={styles.screen}>
        {/* Card logo */}
            <TouchableOpacity onPress={() => { setType('card')}} style={{borderWidth:1, borderRadius:10, marginTop:10, paddingHorizontal:10, paddingTop:5, paddingBottom:15}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
                        <Text style={styles.title}>CARDS</Text>
                        {type === 'card' ?
                          // Green Tick
                          <Image source={Images.ActiveRoundCheck} style={{height:21.9,width:21.5}}/>
                          :
                          //Grey Tick
                          <Image source={Images.InactiveRoundCheck} style={{height:21.8,width:21.9,tintColor:Colors.Gray}} /> 
                      
                          }
                    </View>

                    <View style={{flexDirection:"row", justifyContent:'space-evenly', marginTop:5}} >
                        <Image source={Images.Visa} style={{height:75, width:75}} />
                        <Image source={Images.Maestro} style={{height:75, width:75}} />
                        <Image source={Images.AmericanExpress} style={{height:75, width:75}} />
                    </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setType('other')}} style={{borderWidth:1, borderRadius:10, marginTop:10, paddingHorizontal:10, paddingTop:5, paddingBottom:15}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
                            <Text style={styles.title}>OTHER</Text>
                            {type === 'other' ? 
                            
                            <Image source={Images.ActiveRoundCheck} style={{height:21.9,width:21.5}}/>
                            :
                            //Grey Tick
                            <Image source={Images.InactiveRoundCheck} style={{height:21.8,width:21.9,tintColor:Colors.Gray}} /> 
                            }
                        </View>
                    <View style={{flexDirection:"row", justifyContent:'space-evenly', marginTop:5}} >
                        <Image source={Images.GooglePay} style={{height:75, width:75}} />
                        <Image source={Images.ApplePay} style={{height:75, width:75}} />
                        <Image source={Images.PayPal} style={{height:75, width:75}} />
                    </View>
                </TouchableOpacity>

                {type==='card'?
                        <Formik 
                        initialValues={{
                            cardNumber:'',
                            expiryDate:'',
                            cvv:'',
                            name:'',
                        }} 
                        onSubmit={values =>{onPressCard(values) }}
                        validationSchema={ CreditCardValidationSchema}
                        >
                                {({values,errors,setFieldTouched,touched,handleChange,setFieldValue,isValid,handleSubmit})=>(
                            <View style={{ marginTop: 30 }}>
                                {/* Card Details  */}
                                <Text style={styles.title}>
                                    Card Number
                                </Text>
                                <View style={styles.container}>
                                    <TextInput
                                        value={values.cardNumber}
                                        onBlur={() => setFieldTouched('cardNumber')}
                                        onChangeText={handleChange('cardNumber')}
                                        placeholder="Enter card number"
                                        keyboardType='number-pad'
                                        maxLength={16}
                                    />
                                    {touched.cardNumber ? (!errors.cardNumber ? <Image source={Images.ActiveRoundCheck} style={{ height: 21.9, width: 21.5 }} />
                                        :
                                        <Image source={Images.InactiveRoundCheck} style={{ height: 21.8, width: 21.9, tintColor: Colors.Gray }} />) : null}
                                </View>
                                {touched.cardNumber && errors.cardNumber &&
                                    <Text style={{ fontSize: 11, color: Colors.Error_Textcolor, margin: 10 }} >{errors.cardNumber}</Text>
                                }

                                      {/* EXPIRY & CVV */}
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:0.6,marginHorizontal:5}}>

                                    {/* Expiry Date */}
                                    <Text style={styles.title}>EXPIRY DATE</Text>
                                    <View style={styles.containerexp}>
                                        <TouchableOpacity onPress={() => toggleOpen(true)} style={{padding:5}}>
                                            <Text>{value ? moment(value).format('MM-YYYY') : placeholder}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Modal
                                        transparent
                                        animationType="fade"
                                        visible={isOpen}
                                        onRequestClose={() => {
                                            toggleOpen(false)
                                        }}>
                                        <View style={styles.contentContainer}>
                                        <View style={styles.contentexp}>
                                            <MonthPicker
                                                selectedDate={value || new Date()}
                                                onMonthChange={onChange}
                                                minDate = {moment('04-2022', 'MM-YYYY')}
                                                maxDate = {moment('04-2030', 'MM-YYYY')}
                                                nextIcon = {<Image source={Images.ChevronRight} style={{height:30,width:30,}}/>}
                                                prevIcon = {<Image source={Images.ChevronLeft} style={{height:30,width:30,}}/>}
                                            />
                                            <TouchableOpacity style={styles.confirmButton} onPress={() => {
                                                toggleOpen(false);
                                                setFieldTouched('expiryDate');
                                                setFieldValue('expiryDate',moment(value).format('MM/YYYY'));
                                               
                                            }}>
                                                <Text>Confirm</Text>
                                            </TouchableOpacity>
                                        </View>
                                        </View>
                                    </Modal>
                                    {touched.expiryDate && errors.expiryDate && 
                                        <Text style={{ fontSize: 11, color: Colors.Error_Textcolor, margin:10 }} >{errors.expiryDate}</Text>
                                    }
                                </View>

                                <View style={{flex:0.4,marginHorizontal:5}}>
                                    {/* CVV */}
                                    <Text style={styles.title}>CVV</Text>
                                    <View style={styles.container}>
                                        <TextInput 
                                            value={values.cvv}
                                            onBlur={ () => setFieldTouched('cvv')}
                                            onChangeText={handleChange('cvv')}
                                            placeholder="Enter CVV"
                                            secureTextEntry={true}
                                            maxLength={3}
                                            keyboardType="number-pad"
                                        />
                                        {touched.cvv ? (!errors.cvv ? <Image source={Images.ActiveRoundCheck} style={{ height: 21.9, width: 21.5 }} />
                                        :
                                        <Image source={Images.InactiveRoundCheck} style={{ height: 21.8, width: 21.9, tintColor: Colors.Gray }} /> ) : null}
                                    </View>
                                    {touched.cvv && errors.cvv && 
                                        <Text style={{ fontSize: 11, color: Colors.Error_Textcolor, margin:10 }} >{errors.cvv}</Text>
                                    }
                                </View>
                            </View>
                                        {/* Cardholder Name */}
                            <Text style={styles.title}>CARDHOLDER'S NAME</Text>
                            <View style={styles.container}>
                                <TextInput 
                                    value={values.name}
                                    onBlur={ () => setFieldTouched('name')}
                                    onChangeText={handleChange('name')}
                                    placeholder="Enter your name"
                                />
                                {touched.name ? (!errors.name ? <Image source={Images.ActiveRoundCheck} style={{ height: 21.9, width: 21.5 }} />
                                        :
                                        <Image source={Images.InactiveRoundCheck} style={{ height: 21.8, width: 21.9, tintColor: Colors.Gray }} /> ): null}
                            </View>
                            {touched.name && errors.name && 
                                <Text style={{ fontSize: 11, color: Colors.Error_Textcolor, margin:10 }} >{errors.name}</Text>
                            }

                            {/* CONFIRM BUTTON */}
                            <TouchableOpacity onPress={ handleSubmit} disabled={!isValid || isLoading}>
                                <View style={styles.button}>
                                    {isLoading ? <ActivityIndicator size={'small'} color={Colors.White} /> : <Text style={styles.buttonText}>Confirm</Text>}
                                </View>
                            </TouchableOpacity>
                            </View>
                                )}
                        </Formik>
                    :
                    <Formik
                    initialValues={{
                        id:'',
                        type:''
                    }}

                    onSubmit={ () => {}}
                        // const otherValues = {...values}
                        // dispatch(paymentActions.addOther(otherValues))
                        // props.navigation.goBack();

                    validationSchema={OtherPaymentTypeValidationSchema}
                >
                    { ({values, errors, setFieldTouched, touched, handleChange, setFieldValue, isValid, handleSubmit}) => (
                        <View style={{marginTop:30}}>

                            {/* ID*/}
                            <Text style={styles.title}>ID</Text>
                            <View style={styles.container}>
                                <TextInput 
                                    onBlur={ () => setFieldTouched('id')}
                                    onChangeText={handleChange('id')}
                                    placeholder="Enter ID"
                                    keyboardType='default'
                                />
                                {touched.id ? (!errors.id ? <Image source={Images.ActiveRoundCheck} style={{ height: 21.9, width: 21.5 }} />
                                        :
                                        <Image source={Images.InactiveRoundCheck} style={{ height: 21.8, width: 21.9, tintColor: Colors.Gray }} /> ) : null}
                            </View>
                            {touched.id && errors.id && 
                                <Text style={{ fontSize: 11, color: Colors.Error_Textcolor , margin:10 }} >{errors.id}</Text>
                            }

                            {/* TYPE ( GPAY / APPLEPAY) */}
                            <Text style={styles.title}>TYPE</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                                {/* GPAY */}
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity style={{alignItems:'center',justifyContent:'center', padding:10,borderRadius:50, borderWidth:1, borderColor: values.type === 'gpay' ? Colors.Sp_Text : 'transparent'}} onPress={ () => setFieldValue('type', 'gpay') }>
                                        <Image source={Images.GooglePay} style={{height:75, width:75}} />
                                    </TouchableOpacity>
                                </View>

                                {/* GPAY */}
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity style={{alignItems:'center',justifyContent:'center', padding:10,borderRadius:50, borderWidth:1, borderColor: values.type === 'applepay' ? Colors.Sp_Text : 'transparent'}} onPress={ () => setFieldValue('type', 'applepay') }>
                                        <Image source={Images.ApplePay} style={{height:75, width:75}} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            
                            {/* CONFIRM BUTTON */}
                            <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Confirm</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) } 
                    
                </Formik>
            }

            </View>
        </KeyboardAwareScrollView>
    )

}

const styles = StyleSheet.create({
    // screen1:{
    //     flex: 1,
    //     backgroundColor:Colors.White
    // },
    header_sty: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    screen:{
        flex: 1,
        padding:20, 
    //  backgroundColor:Colors.White,

    },
    title:{
        fontSize:18,
        fontWeight:'700',
        color:'#999',
        marginTop:10
    },
    container:{
        flexDirection:'row', 
        borderColor:Colors.Sp_Text, 
        borderWidth:1, 
        justifyContent:'space-between', 
        padding:15, 
        borderRadius:5, 
        marginTop:10
    },
    containerexp:{
        flexDirection:'row', 
        borderColor:Colors.Sp_Text, 
        borderWidth:1, 
        justifyContent:'space-between', 
        padding:15, 
        borderRadius:5, 
        marginTop:10
    },
    input: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderWidth: 0.5,
        borderRadius: 5,
        width: '100%',
        marginVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputText: {
        fontSize: 16,
        fontWeight: '500',
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    contentContainerexp: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 70,
    },
    contentexp: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 70,
    },
    confirmButton: {
        padding: 15,
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
    button:{
        alignItems:'center',
        justifyContent:'center',
        height: 50,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        marginTop:50
    },
    buttonText:{
        fontSize:18,
        color:Colors.White,
        fontWeight:"bold"
    }
})

export default AddCard
