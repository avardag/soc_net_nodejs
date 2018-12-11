import axios from 'axios';

// set default header for axios
const setAuthToken = (token) =>{
  if (token) {
    //Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    //delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthToken;