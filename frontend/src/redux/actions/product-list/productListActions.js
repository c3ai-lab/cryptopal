import axios from 'axios';
import { tokenConfig } from '../headers';

// params should be page_size, page and total required
export const getData = (params) => {
  return async (dispatch, getState) => {
    const config = tokenConfig(getState);
    config.params = params;
    await axios
      .get(process.env.REACT_APP_SERVER_API + '/products', config)
      .then((response) => {
        dispatch({
          type: 'GET_DATA',
          data: response.data.products,
          totalPages: response.data.total_pages,
          totalItems: response.data.total_items,
          params
        });
      });
  };
};

export const deleteData = (obj) => {
  return async (dispatch, getState) => {
    const config = tokenConfig(getState);
    const params = getState().productList.params;
    axios
      .delete(process.env.REACT_APP_SERVER_API + '/products/' + obj._id, config)
      .then(() => {
        dispatch({ type: 'DELETE_DATA', obj });
        dispatch(getData(params));
      });
  };
};

export const updateData = (obj) => {
  return (dispatch, getState) => {
    const config = tokenConfig(getState);
    const params = getState().productList.params;
    const { _id, ...sendObject } = obj;
    axios
      .patch(
        process.env.REACT_APP_SERVER_API + '/products/' + _id,
        sendObject,
        config
      )
      .then(() => {
        dispatch({ type: 'UPDATE_DATA', obj });
        dispatch(getData(params));
      })
      .catch((err) => console.log(err.response));
  };
};

export const addData = (obj) => {
  return (dispatch, getState) => {
    const config = tokenConfig(getState);
    const params = getState().productList.params;
    axios
      .post(process.env.REACT_APP_SERVER_API + '/products/', obj, config)
      .then((response) => {
        dispatch({ type: 'ADD_DATA', obj });
        dispatch(getData(params));
      });
  };
};
