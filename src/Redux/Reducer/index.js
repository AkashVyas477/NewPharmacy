import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';


let appReducer = combineReducers({
    Auth: AuthReducer,
});
const rootReducer =(state, action) =>{
    return appReducer(state, action);
};
export default rootReducer;

