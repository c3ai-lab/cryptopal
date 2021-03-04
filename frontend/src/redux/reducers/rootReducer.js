import { combineReducers } from 'redux';
import customizer from './customizer/';
import authReducer from './auth/authReducer';
import errorReducer from './errors/errorReducer';

const rootReducer = combineReducers({
  customizer: customizer,
  auth: authReducer,
  error: errorReducer
});

export default rootReducer;
