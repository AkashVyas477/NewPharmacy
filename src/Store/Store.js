import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';

import { rootReducer } from "./rootReducer";

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk))