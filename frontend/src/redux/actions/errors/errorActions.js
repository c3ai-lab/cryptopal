// ================================================================================================
// 	File Name: errorActions.js
// 	Description:
//  This class handles all actions related to errors. It sets and clear error responses from sever
//  globally in redux state.
// ================================================================================================
import { GET_ERRORS, CLEAR_ERRORS } from '../types';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
