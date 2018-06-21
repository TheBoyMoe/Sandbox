import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  error: null,
  redirectPath: '/explore'
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
      error: state.error
    };
  default:
    return state;
  }
};


export default reducer;