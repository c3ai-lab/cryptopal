import axios from 'axios';
import { tokenConfig } from '../headers';
import { GET_WALLET_DATA, SEND_TRANSACTION } from '../types';
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
          txHash: response.data.dai
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
};
