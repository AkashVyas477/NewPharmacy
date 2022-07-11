// import React, { useEffect,useState } from 'react';
// import { View, Text, StyleSheet, Image,FlatList, ImageBackground, TouchableOpacity,Alert, TextInput,ActivityIndicator,ScrollView ,} from 'react-native';
// // import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// // import { Header, RadioButton, CheckButton,Button } from '../../../../Components/Common';
// import Header from '../../../../Components/Common/Header';
// import RadioButton from '../../../../Components/Common/RadioButton';
// import CheckButton from '../../../../Components/Common/CheckButton';
// import Button from '../../../../Components/Common/Button';
// import { Colors, Images } from '../../../../CommonConfig';
// import { postPostLogin,getPreLogin } from '../../../../Components/Helpers/ApiHelper';
// import Cards from '../../../../Components/Common/Cards';
// import CreditCardDisplay from '../../../../Components/Common/CardComp';
// import Toast from 'react-native-simple-toast'
// import { CommonActions } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StripeProvider,useStripe } from '@stripe/stripe-react-native';

// const CheckoutScreen = props => {

//     const { initPaymentSheet, presentPaymentSheet } = useStripe();
//     const [loading, setLoading] = useState(false);
  
//     const fetchPaymentSheetParams = async () => {
//       const response = await fetch('https://mobile-pharmacy.herokuapp.com/customer/checkout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const { paymentIntent, ephemeralKey, customer} = await response.json();
  
//       return {
//         paymentIntent,
//         ephemeralKey,
//         customer,
//       };
//     };

//     const initializePaymentSheet = async () => {
//         const {
//           paymentIntent,
//           ephemeralKey,
//           customer,
//           publishableKey,
//         } = await fetchPaymentSheetParams();
    
//         const { error } = await initPaymentSheet({
//           customerId: customer,
//           customerEphemeralKeySecret: ephemeralKey,
//           paymentIntentClientSecret: paymentIntent,
//           // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
//           //methods that complete payment after a delay, like SEPA Debit and Sofort.
//           allowsDelayedPaymentMethods: true,
//         });
//         if (!error) {
//           setLoading(true);
//         }
//       };

    
//       const openPaymentSheet = async () => {
//      const { error } = await presentPaymentSheet();

//     if (error) {
//       Alert.alert(`Error code: ${error.code}`, error.message);
//     } else {
//       Alert.alert('Success', 'Your order is confirmed!');
//     }
//       };

    
//       useEffect(() => {
//         initializePaymentSheet();
//       }, []);
    

//       return(
//         <View>
//                 <Button
//                 label="PAYMENT"
//                 onPress={openPaymentSheet}
//                 />
//         </View>
//       )
    
// };


// const styles = StyleSheet.create({


// })

// export default CheckoutScreen;