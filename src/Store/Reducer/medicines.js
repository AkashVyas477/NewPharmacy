
import { mediciensName, MEDICINE_NAME } from "../Actions/medicines"

const initialState = {
    // All Order Lists
        //all orders
        image:''
        mediciensName:[],
        text_note:[],
}


export default (state = initialState, action)=>{
    switch(action.type){
        case MEDICINE_NAME:
        const data = action.data
        return{
            ...state,
            image:data.image,
            mediciensName:data.name,
            text_note:data.text_note,


        }
        default:
            return state
    }
}
