import * as Yup from 'yup';
import CustomerSignupScreen from '../Screens/AuthScreen/Customer/CustomerSignUpScreen';
import PharmacistSignUpScreen from '../Screens/AuthScreen/Pharamacist/PharmacistSignUpScreen';

const SignUpValidationSchema =yup.object().shape({
                            username: yup
                            .string()
                            .required('Username is required.'),
                        email: yup
                            .string()
                            .email()
                            .required(),
                        password: yup
                            .string()
                            .min(8, 'Password can not be less than 3 characters.')
                            .max(11, 'Password can not be more than 12 characters long.')
                            .required(),
                        passwordConfirm: yup
                            .string()
                            .label('Password Confirm')
                            .required()
                            .oneOf([yup.ref('password')], 'Passwords does not match'),
                        storeName: yup
                            .string()
                            .required('Store Name is required.'), 
                        licenseId: yup
                            .number()
                            .required('License ID is required.'), 

});
export default SignUpValidationSchema ;