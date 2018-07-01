import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut, startLogout } from '../actions/auth';

export const Header = (props) => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact >Home</NavLink>
    <NavLink to="/dashboard" activeClassName="is-active" >Dashboard</NavLink>
    <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
    <NavLink to="/help" activeClassName="is-active">Help</NavLink>
    <button onClick={ props.logout }>Logout</button>
  </header>
);

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(startLogout())
  };
};

export default connect(null, mapDispatchToProps)(Header);