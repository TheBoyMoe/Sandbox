import React from 'react';
import Input from '../../../components/UI/input/input';

const login = (props) => {
  return (
    <div className="Login">
      <h1 className="center">Login</h1>
      <form onSubmit={this.onSubmitHandler}>
        <Input type="text" label="Email address" name="email" placeholder="Your email" />
        <Input type="password" label="Password (minimum of 8 characters)" name="password" placeholder="Your password" />
        <Input type="submit" name="submit" value="Submit" />
      </form>
      <p className="center">Not registered?&nbsp;
        <strong 
          className="pointer"
          onClick={ props.clicked }>Signup</strong>
      </p>
    </div>
  );
};
export default login;