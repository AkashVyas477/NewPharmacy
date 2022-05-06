import { combineReducers } from 'redux';

import authReducer from './AuthReducer';
import LoginLogoutReducer from './LoginLogoutReducer';

export const rootReducer = combineReducers({

    Auth: authReducer,
    Login_Logout:LoginLogoutReducer,

})