import { combineReducers } from 'redux';

import authReducer from './Reducer/auth';
import registerReducer from './Reducer/register';

export const rootReducer = combineReducers({

    Auth: authReducer,
    Register:registerReducer,

})