import { history } from '../../../history';

export const register = (email, password, name) => {
  return (dispatch) => {
    // axios
    //   .post("/api/authenticate/register/user", {
    //     email: email,
    //     password: password,
    //     name: name
    //   })
    //   .then(response => {
    //     var loggedInUser

    //     if(response.data){

    //       loggedInUser = response.data.user

    //       localStorage.setItem("token", response.data.token)

    //       dispatch({
    //         type: "LOGIN",
    //         payload: { loggedInUser }
    //       })

    //       history.push("/")
    //     }

    //   })
    //   .catch(err => console.log(err))
    history.push('/');
  };
};
