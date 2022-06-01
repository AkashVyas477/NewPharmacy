import * as yup from 'yup';
const PharmacyUserValidation = yup.object().shape({
                            idNo:yup.number()
                            .max(7, 'Id NO can not be less than 7 Number.')
                            .required()

});
export default PharmacyUserValidation  ; 