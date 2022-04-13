import * as yup from 'yup';
const ForgotPasswordValidation =  yup.object().shape({
email: yup
.string()
.email()
.required('Email is required.'),

});
export default ForgotPasswordValidation