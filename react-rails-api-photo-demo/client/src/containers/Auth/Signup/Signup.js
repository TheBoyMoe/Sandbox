import React from 'react';
import Input from '../../../components/UI/input/input';

const signup = (props) => {
  return (
    <div className="Signup">
      <h1 className="center">Sign Up</h1>
      <form onSubmit={this.onSubmitHandler}>
        <Input type="text" label="Name" name="name" placeholder="Your name" />
        <Input type="text" label="Email address" name="email" placeholder="Your email" />
        <Input type="password" label="Password (minimum of 8 characters)" name="password" placeholder="Your password" />
        <Input type="password" label="Confirm password" name="password_confirmation" placeholder="Confirm your password" />
        <Input type="submit" name="submit" value="Submit" />
      </form>
      <p className="center">Already registered?&nbsp;
        <strong 
          className="pointer"
          onClick={ props.clicked }>Login</strong>
      </p>
    </div>
  );
};
export default signup;