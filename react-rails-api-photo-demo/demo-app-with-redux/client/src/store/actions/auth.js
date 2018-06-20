import * as actionTypes from './actionTypes';
import { removeToken } from '../../containers/Auth/utilities/auth-helpers';

const loginUser = () => {
  return {
    type: actionTypes.LOGIN_USER
  };
};

const loginSuccess = (token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token
  };
};

const loginFailure = (err) => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    error: err
  };
};

export const logout = () => {
  removeToken();
  return {
    type: actionTypes.LOGOUT_USER
  };
};

// async function which logs the user in
export const login = (email, password) => {
  return (dispatch) => {
    // TODO
    dispatch(loginUser());
  };
};