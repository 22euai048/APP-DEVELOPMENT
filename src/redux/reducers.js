import { combineReducers } from 'redux';
import { SIGN_IN, SIGN_OUT } from './action';

const initialUserState = {
  user: null,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
