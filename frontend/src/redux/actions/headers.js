// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;
  console.log(token);

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    console.log('setToken');
    config.headers['cp-auth-token'] = token;
  }

  return config;
};
