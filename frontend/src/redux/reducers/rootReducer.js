import { combineReducers } from 'redux';
import customizer from './customizer/';
import productListReducer from './product-list/productList';
import authReducer from './auth/authReducer';
import errorReducer from './errors/errorReducer';

const rootReducer = combineReducers({
  customizer: customizer,
  auth: authReducer,
  error: errorReducer,
  productList: productListReducer
});

export default rootReducer;
