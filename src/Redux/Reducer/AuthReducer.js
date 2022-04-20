import { ADD_DETAILS, ADD_IMAGE, ADD_PHONE, SET_ROLE } from "../Actions/AuthActions";
const initialState = {
    role:'',
    name: '',
    email: '',
    password: '',
    gennder:'',
    image: {},
    country_code:'',
    phone_number:'',
    store_name:'',
    store_logo:{},
    license_id:'',

   
}
export default (state = initialState, action ) => {
    switch(action.type) {
        case ADD_DETAILS:
            const username = action.data.username;
            const email = action.data.email;
            const password = action.data.password;
            return {
                ...state,
                name: username,
                email:email,
                password: password
            }
        case ADD_PHONE:
            const country_code = action.data.country_code;
            const phone_number = action.data.phone_number;
            return {
                ...state,
                country_code: country_code,
                phone_number: phone_number
            }
        case SET_ROLE:
            const role = action.role;
            return {
                ...state,
                role: role
            }
        case ADD_IMAGE:
            const imageObj = action.dataObj
            return {
                ...state,
                image: imageObj
            }
        default:
            return state;
    }
}