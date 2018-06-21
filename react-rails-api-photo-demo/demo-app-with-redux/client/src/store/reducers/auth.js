import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch(action.type){
  case actionTypes.LOGIN_USER:
    return {
      ...state,
      error: null
    };
  case actionTypes.LOGIN_SUCCESS:
    return {
      ...state,
      token: action.token,
      error: null
    };
  case actionTypes.LOGIN_FAILURE:
    return {
      ...state,
      token: null,
      error: action.error
    };
  case actionTypes.SIGNUP_USER:
  case actionTypes.SIGNUP_SUCCESS:
    return {
      ...state,
      error: null
    };
  case actionTypes.SIGNUP_FAILURE:
    return {
      ...state,
      token: null,
      error: action.error  
    };
  case actionTypes.RESET_STATE:
    return {
      ...state,
      token: null,
      error: null
    };
  default:
    return state;
  }
};

export default reducer;