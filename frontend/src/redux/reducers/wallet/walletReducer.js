/* eslint-disable no-case-declarations */
import { GET_WALLET_DATA, SEND_TRANSACTION } from '../../actions/types';
const initialState = {
  address: '0x00',
  balance: '10',
  transactions: [],
  contacts: [],
  txHash: ''
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
        txHash: action.txHash
      };
    default:
      return state;
  }
};

export default WalletReducer;
