import * as yup from 'yup';
import PhoneNumberScreen from '../Screens/AuthScreen/PhoneNumberScreen';

const  PhoneNumberVAlidationSchema= yup.object().shape({
    mobile: yup
    .number()
    .max(10)
    .required(),
});
export default PhoneNumberVAlidationSchema;