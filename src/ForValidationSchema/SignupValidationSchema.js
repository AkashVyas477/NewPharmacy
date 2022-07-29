
import * as yup from 'yup';

const SignUpValidationSchema =yup.object().shape({
                            username: yup
                            .string()
                            .required('Username is required.'),
                        email: yup
                            .string()
                            .email()
                            .required('Email is a required field'),
                        password: yup
                            .string()
                            .min(6, 'Password can not be less than 6 characters.')
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
                            .string()
                            .required('License ID is required.'), 
                        gender: yup
                        .string(),
                            
                            
                            

});
export default SignUpValidationSchema ;