import axios from 'axios';
import { tokenConfig } from '../headers';
import { GET_WALLET_DATA } from '../types';

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

// export const deleteData = (obj) => {
//   return async (dispatch, getState) => {
//     const config = tokenConfig(getState);
//     const params = getState().productList.params;
//     axios
//       .delete(process.env.REACT_APP_SERVER_API + '/products/' + obj._id, config)
//       .then(() => {
//         dispatch({ type: 'DELETE_DATA', obj });
//         dispatch(getData(params));
//       });
//   };
// };
