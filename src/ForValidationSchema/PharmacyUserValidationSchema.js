import * as yup from 'yup';
const PharmacyUserValidation = yup.object().shape({
                            idNo:yup.number()
                            .max(7, 'Id NO can not be less than 7 Number.')

});
export default PharmacyUserValidation  ; 