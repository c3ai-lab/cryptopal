import axios from 'axios';
import { history } from '../../../history';
import { returnErrors } from '../errors/errorActions';
import { tokenConfig } from '../headers';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_UPDATED,
  USER_UPGRADED
} from '../types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get(
      process.env.REACT_APP_SERVER_API + '/identity/userinfo',
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = (user) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify(user);

  axios
    .post(process.env.REACT_APP_SERVER_API + '/auth/register', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      history.push('/registered');
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login User
export const login = (user) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify(user);
  axios
    .post(process.env.REACT_APP_SERVER_API + '/auth/login', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      history.push('/');
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Change User data
export const updateUser = (user) => (dispatch, getState) => {
  // Request body
  const body = JSON.stringify(user);

  axios
    .patch(
      process.env.REACT_APP_SERVER_API + '/identity/userinfo',
      body,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: USER_UPDATED,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'USER_UPDATE_FAIL')
      );
    });
};

// Change User/Merchant role
export const changeRole = (upgrade) => (dispatch, getState) => {
  const path = upgrade ? 'upgrade-merchant' : 'downgrade-user';
  const role = upgrade ? 'merchant' : 'buyer';
  axios
    .post(
      process.env.REACT_APP_SERVER_API + '/identity/' + path,
      {},
      tokenConfig(getState)
    )
    .then(() => dispatch({ type: USER_UPGRADED, payload: { role: role } }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'USER_UPDATE_FAIL')
      );
    });
};
