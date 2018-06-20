import * as actionTypes from './actionTypes';
import { removeToken } from '../../utilities/auth-helpers';
import { signin } from '../../utilities/api-helpers';

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
          dispatch(loginFailure({error: 'User is not found or password is invalid'}))
        }
      })
      .then(token => {
        console.log('token: ', token);
        if(token) dispatch(loginSuccess(token));
      })
      .catch(err => {
        dispatch(loginFailure(err));
      });
  };
};