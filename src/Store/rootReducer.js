import { combineReducers } from 'redux';

import authReducer from './Reducer/auth';
import registerReducer from './Reducer/register';
import cardReducer from './Reducer/CardReducer'

export const rootReducer = combineReducers({

    Auth: authReducer,
    Register:registerReducer,
    Card:cardReducer

})