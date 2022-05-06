import { LOGIN, LOGOUT } from "../Actions/LoginLogoutActions";


const initialState = {
    token: null,
}

export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return {
                token: action.token,
                id: action.id,
                refreshToken: action.refreshToken
            }
        case LOGOUT:
            return {
                ...initialState
            }
        default:
            return state;
    }
};