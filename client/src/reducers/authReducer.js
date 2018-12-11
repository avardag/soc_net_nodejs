import { SET_CURRENT_USER } from '../actions/types';
import is_empty from '../validation/is_empty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state=initialState, action){
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !is_empty(action.payload),
        user: action.payload
      } ;
  
    default:
      return state;
  }
}
