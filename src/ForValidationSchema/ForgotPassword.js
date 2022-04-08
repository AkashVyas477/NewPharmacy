import * as yup from 'yup';
import ForgotPasswordScreen from '../Screens/AuthScreen/ForgotPasswordScreen';

const ForgotPasswordValidation =  yup.object().shape({
email: yup
.string()
.email()
.required('Email is required.'),

});
export default ForgotPasswordValidation