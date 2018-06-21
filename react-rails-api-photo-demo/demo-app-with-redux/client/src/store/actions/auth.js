import * as actionTypes from './actionTypes';
import { removeToken } from '../../utilities/auth-helpers';
import { signin, register } from '../../utilities/api-helpers';

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

const signupUser = () => {
  return {
    type: actionTypes.SIGNUP_USER
  };
};

const signupSuccess = () => {
  return {
    type: actionTypes.SIGNUP_SUCCESS
  };
};

const signupFailure = (err) => {
  return {
    type: actionTypes.SIGNUP_FAILURE,
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
  const user = {
    'email': email,
    'password': password
  };

  return (dispatch) => {
    dispatch(loginUser());
    signin({'auth': user})
      .then(data => {
        if(data.ok && data.status === 201){
          return data.json();
        } else {
          dispatch(loginFailure('User was not found or password is invalid'));
        }
      })
      .then(token => {
        console.log('token: ', token);
        if(token) dispatch(loginSuccess(token));
      })
      .catch(err => {
        console.log('Login Error', err);
        dispatch(loginFailure('Unknown error, try again'));
      });
  };
};

export const signup = (name, email, password, password_confirmation) => {
  const user = {
    'name': name,
    'email': email,
    'password': password,
    'password_confirmation': password_confirmation 
  };

  return (dispatch) => {
    dispatch(signupUser());
    register({'user': user})
      .then(data => {
        if(data && data.ok && data.status === 200){
          dispatch(signupSuccess());
          // account successfully created, log the user in and fetch the token
          return signin({ 
            'auth': { 'email': email, 'password': password }
          });
        }
      })
      .then(res => {
        if(res.ok && res.status === 201){
          return res.json();
        } else {
          dispatch(loginFailure('User was not found or password is invalid'));
        }
      })
      .then(token => {
        console.log('token: ', token);
        if(token) dispatch(loginSuccess(token));
      })
      .catch(err => {
        console.log('Signup failure: ', err);
        dispatch(signupFailure('User is already registered'));
      });
  };

};

export const reset = () => {
  return {
    type: actionTypes.RESET_STATE
  };
};