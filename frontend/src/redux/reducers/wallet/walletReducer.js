/* eslint-disable no-case-declarations */
import {
  GET_WALLET_DATA,
  SEND_TRANSACTION,
  CHECK_PAYMENT,
  SEND_PAYMENT,
  CLEAR_TRANSACTION_DATA
} from '../../actions/types';
const initialState = {
  address: '0x00',
  balance: '10',
  transactions: [],
  contacts: [],
  transaction: {}
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
      return {
        ...state,
        transaction: action.transaction
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
