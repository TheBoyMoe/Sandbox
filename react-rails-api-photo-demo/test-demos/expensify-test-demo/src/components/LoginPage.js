import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = (props) => {
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1>Expensify</h1>
        <button onClick={ props.login }>Login</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(startLogin())
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);