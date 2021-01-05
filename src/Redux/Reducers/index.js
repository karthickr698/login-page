import { combineReducers } from 'redux';
import authReducer from './authenticationFunctions/reducer'

const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;