import { combineReducers } from 'redux';

import authReducer from './AuthReducer';

export const rootReducer = combineReducers({

    Auth: authReducer,

})