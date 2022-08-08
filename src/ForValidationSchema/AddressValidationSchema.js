import * as yup from 'yup';

const AddressValidationSchema = yup.object().shape({
    address_type: yup.number().required('Address Tag is required.'),
    primary_address: yup.string().required('Primary Address is required'),
    addition_address_info: yup.string().required('Address is required.'),
    is_select:yup.number()
    // icon: yup.string().required('Icon is required.'),
})

export default AddressValidationSchema;