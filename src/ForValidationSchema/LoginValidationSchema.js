import * as yup from 'yup';
const LoginValidationSchema = yup.object().shape({
                    email:yup.string()
                            .email()
                            .required(),

                        password: yup.string()
                            .min(6, 'Password can not be less than 6 characters.')
                            .max(11, 'Password can not be more than 11 characters long.')
                            .required(),

});
export default LoginValidationSchema;