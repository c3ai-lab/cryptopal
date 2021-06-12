// ================================================================================================
// 	File Name: errorReducer.js
// 	Description:
//  This class handles holds and sets all variables related to the error responses globally in
//  redux state. The variables are the error message, the error id and error status.
// ================================================================================================
import { GET_ERRORS, CLEAR_ERRORS } from '../../actions/types';

const initialState = {
  msg: null,
  status: null,
  id: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_ERRORS:
      return {
        msg: null,
        status: null,
        id: null
      };
    default:
      return state;
  }
}
