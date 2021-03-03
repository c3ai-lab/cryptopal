import { combineReducers } from 'redux';
import { login } from './authReducer';

const authReducers = combineReducers({
  login
});

export default authReducers;
