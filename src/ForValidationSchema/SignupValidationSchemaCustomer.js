import * as yup from 'yup';
const SignUpValidationSchemaCustomer =yup.object().shape({
                            username: yup
                            .string()
                            .required('Username is required.'),
                        email: yup
                            .string()
                            .email()
                            .required(),
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
                        gender: yup
                        .string()
                        
                        
                        
                       
                        

});
export default SignUpValidationSchemaCustomer ;