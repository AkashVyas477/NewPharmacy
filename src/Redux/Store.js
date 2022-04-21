import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';

import { rootReducer } from "./Reducer/rootReducer";

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk))