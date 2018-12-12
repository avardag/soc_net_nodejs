import { GET_ERRORS, SET_CURRENT_USER } from './types';

import axios from "axios";
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

//regster user
// export const registerUser = (userData) =>{
//   return {
//     type: TEST_DISPATCH,
//     payload: userData
//   }
// }

//with Thunk
export const registerUser = (userData, thisPropsHistory) => dispatch =>{
  axios
    .post("/api/users/register", userData)
    .then(res => thisPropsHistory.push('/login'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
     )
}

//Login user - Get user token
export const loginUser = (userData) => dispatch =>{
  axios.post("/api/users/login", userData)
    .then(res =>{
      //save token to localStorage
      localStorage.setItem('jwtToken', res.data.token)
      //set token to Authorization Header
      setAuthToken(res.data.token);
      // set user to redux state
      //Decode token to get userr data
      const decoded = jwtDecode(res.data.token)
      // set curent user
      dispatch(setCurrentUser(decoded))
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: {}
      // })
    })
    .catch(err=> dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

//set logged in user, action
export const setCurrentUser = (decoded) =>{
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}