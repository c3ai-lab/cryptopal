// ================================================================================================
// 	File Name: walletActions.js
// 	Description:
//  This class handles all actions related to the users wallet. This includes functions for getting
//  users balance, address, sending and checking a transaction or requesting transaction data. All
//  requests are send with axios and the responses are stored globally in redux.
// ================================================================================================
import axios from 'axios';
import { tokenConfig } from '../headers';
import {
  GET_WALLET_DATA,
  SEND_TRANSACTION,
  CHECK_PAYMENT,
  SEND_PAYMENT,
  CLEAR_TRANSACTION_DATA,
  GET_TRANSACTION,
  GET_TRANSACTIONS
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
        process.env.REACT_APP_SERVER_API + '/transaction/check-payment',
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

export const sendPayment = (to, value, description) => {
  return async (dispatch, getState) => {
    const config = tokenConfig(getState);
    await axios
      .post(
        process.env.REACT_APP_SERVER_API + '/transaction/send-payment',
        { to, value, description },
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

export const getTransaction = (txId) => {
  return async (dispatch, getState) => {
    const config = tokenConfig(getState);
    axios
      .get(process.env.REACT_APP_SERVER_API + '/transaction/' + txId, config)
      .then((response) => {
        dispatch({
          type: GET_TRANSACTION,
          transaction: response.data
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};

export const getTransactions = (params) => {
  return async (dispatch, getState) => {
    const config = tokenConfig(getState);
    config.params = params;
    axios
      .get(process.env.REACT_APP_SERVER_API + '/transaction', config)
      .then((response) => {
        dispatch({
          type: GET_TRANSACTIONS,
          transactions: response.data.transactions,
          totalItems: response.data.total_items,
          totalPages: response.data.total_pages
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
