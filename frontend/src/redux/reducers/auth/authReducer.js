import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../../actions/types';

const initialState = {
  token: localStorage.getItem('cp-auth-token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  userRole: 'guest'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('cp-auth-token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        userRole: action.payload.merchantId ? 'merchant' : 'buyer',
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('cp-ath-token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: 'guest'
      };
    default:
      return state;
  }
}
