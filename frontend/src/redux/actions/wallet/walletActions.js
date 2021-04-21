import axios from 'axios';
import { tokenConfig } from '../headers';
import {
  GET_WALLET_DATA,
  SEND_TRANSACTION,
  CHECK_PAYMENT,
  SEND_PAYMENT,
  CLEAR_TRANSACTION_DATA
} from '../types';
import { returnErrors } from '../errors/errorActions';

export const getWalletData = () => {
  return async (dispatch, getState) => {
    const config = tokenConfig(getState);
    await axios
      .get(process.env.REACT_APP_SERVER_API + '/wallet/dashboard', config)
      .then((response) => {
        dispatch({
          type: GET_WALLET_DATA,
          address: response.data.address,
          balance: response.data.balance,
          transactions: response.data.transactions,
          contacts: response.data.contacts
        });
      });
  };
};

export const getBalanceTokens = (value) => {
  return async (dispatch, getState) => {
    const config = tokenConfig(getState);
    await axios
      .post(
        process.env.REACT_APP_SERVER_API + '/wallet/faucet',
        { value },
        config
      )
      .then((response) => {
        dispatch({
          type: SEND_TRANSACTION,
          hash: response.data.dai
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const checkPaymentTransaction = (receiver) => {
  return async (dispatch, getState) => {
    const config = tokenConfig(getState);
    await axios
      .post(
        process.env.REACT_APP_SERVER_API + '/wallet/check-payment',
        { receiver },
        config
      )
      .then((response) => {
        dispatch({
          type: CHECK_PAYMENT,
          transaction: response.data
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const sendPayment = (to, value) => {
  return async (dispatch, getState) => {
    const config = tokenConfig(getState);
    await axios
      .post(
        process.env.REACT_APP_SERVER_API + '/wallet/send-payment',
        { to, value },
        config
      )
      .then((response) => {
        dispatch({
          type: SEND_PAYMENT,
          transaction: { hash: response.data }
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const clearTransaction = () => {
  return {
    type: CLEAR_TRANSACTION_DATA
  };
};
