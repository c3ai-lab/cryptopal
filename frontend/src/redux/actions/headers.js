// ================================================================================================
// 	File Name: headers.js
// 	Description:
//  This class handles sets the headers for all server requests. The headers includes the current
//  authentification token of the user and the content typ.
// ================================================================================================
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['cp-auth-token'] = token;
  }

  return config;
};
