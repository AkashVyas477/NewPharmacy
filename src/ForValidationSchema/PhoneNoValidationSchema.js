import * as yup from 'yup';
const  PhoneNumberVAlidationSchema= yup.object().shape({
    mobile: yup
    .number()
    .max(10)
    .required(),
});
export default PhoneNumberVAlidationSchema;