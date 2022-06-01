import { ADD_DETAILS, ADD_IMAGE, ADD_PHONE, SET_ROLE } from "../Actions/register";
const initialState = {
    role:'',
    name: '',
    email: '',
    password: '',
    gender:'',
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
            // console.log(action.data);
            const image = 'some url';
            const username = action.data.username;
            const email = action.data.email;
            const password = action.data.password;
            const gender = action.data.gender;
            const storeName=action.data.storeName;
            const licenseId= action.data.licenseId;
            const store_logo= 'some logo';
            return {
                ...state,
                image:image,
                name: username,
                email:email,
                password: password,
                gender:gender,
                storeName:storeName,
                licenseId:licenseId,
                store_logo:store_logo,
            }
        case ADD_PHONE:
            const country_code = action.data.country_code;
            const phone_number = action.data.phone_number;
            return {
                ...state,
                country_code: country_code,
                phone_number: phone_number,
                channel:"sms"
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