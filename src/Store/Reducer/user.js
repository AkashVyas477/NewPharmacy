import { USER_DETAILS } from "../Actions/user";
const initialState ={
    countryCode: '',
    email:'',
    image:'',
    name:'',
    phoneNumber:'',
}
export default (state = initialState,action)=>{
    switch(action.type){
        case USER_DETAILS:
            const data =action.data
            return{
                ...state,
                countryCode:data.countryCode,
                email: data.email,
                image:data.image,
                name:data.name,
                phoneNumber:data.phoneNumber
            }
            default :
            return state
    }
}