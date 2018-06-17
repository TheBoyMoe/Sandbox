import React from 'react';
import Input from '../../../components/UI/input/input';

const login = () => {
  return (
    <div className="Login">
      <h1 className="center">Login</h1>
      <form onSubmit={this.onSubmitHandler}>
        <Input type="text" label="Email address" name="email" placeholder="Your email" />
        <Input type="password" label="Password (minimum of 8 characters)" name="password" placeholder="Your password" />
        <Input type="submit" name="submit" value="Submit" />
      </form>
      {/* TODO link to signup page */}
      <p className="center">Not registered? <strong>Signup</strong></p>
    </div>
  );
};
export default login;