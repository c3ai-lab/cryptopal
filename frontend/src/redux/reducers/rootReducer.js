import { combineReducers } from 'redux';
import customizer from './customizer/';
import productListReducer from './product-list/productList';
import authReducer from './auth/authReducer';
import errorReducer from './errors/errorReducer';
import walletReducer from './wallet/walletReducer';

const rootReducer = combineReducers({
  customizer: customizer,
  auth: authReducer,
  error: errorReducer,
  productList: productListReducer,
  wallet: walletReducer
});

export default rootReducer;
