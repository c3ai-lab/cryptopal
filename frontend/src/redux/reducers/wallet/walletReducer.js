/* eslint-disable no-case-declarations */
import { GET_WALLET_DATA } from '../../actions/types';
const initialState = {
  address: '0x00',
  balance: '10',
  transactions: [],
  contacts: []
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
    default:
      return state;
  }
};

export default WalletReducer;
