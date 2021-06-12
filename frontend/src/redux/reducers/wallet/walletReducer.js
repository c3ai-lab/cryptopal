// ================================================================================================
// 	File Name: walletReducer.js
// 	Description:
//  This class handles holds and sets all variables related to the users wallet globally in
//  redux state. The variables are the users wallet address, balance, latest transactions,
//  recent contacts and the selected transaction.
// ================================================================================================
/* eslint-disable no-case-declarations */
import {
  GET_WALLET_DATA,
  SEND_TRANSACTION,
  CHECK_PAYMENT,
  SEND_PAYMENT,
  CLEAR_TRANSACTION_DATA,
  GET_TRANSACTION,
  GET_TRANSACTIONS
} from '../../actions/types';
const initialState = {
  address: '0x00',
  balance: '0',
  transactions: [],
  contacts: [],
  transaction: {},
  totalPages: 0,
  totalItems: 0
};

const WalletReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WALLET_DATA:
      return {
        ...state,
        address: action.address,
        balance: action.balance,
        transactions: action.transactions,
        contacts: action.contacts
      };
    case SEND_TRANSACTION:
      return {
        ...state,
        transaction: { hash: action.hash }
      };
    case CHECK_PAYMENT:
    case SEND_PAYMENT:
    case GET_TRANSACTION:
      return {
        ...state,
        transaction: action.transaction
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions,
        totalPages: action.totalPages,
        totalItems: action.totalItems
      };
    case CLEAR_TRANSACTION_DATA:
      return {
        ...state,
        transaction: {}
      };
    default:
      return state;
  }
};

export default WalletReducer;
