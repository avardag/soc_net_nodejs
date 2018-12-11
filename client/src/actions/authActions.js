import { GET_ERRORS } from './types';

import axios from "axios";

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