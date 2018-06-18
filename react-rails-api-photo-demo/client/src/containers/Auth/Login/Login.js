import React from 'react';
import Input from '../../../components/UI/input/input';

class Login extends React.Component {
  state = {
    email : {
      elementConfig: {
        type: 'email',
        placeholder: 'Your email address',
        label: "Email address" 
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false
    },
    password : {
      elementConfig: {
        type: 'password',
        placeholder: 'Your password',
        label: "Password (minimum 8 characters)"
      },
      value: '',
      validation: {
        required: true,
        minLength: 8,
        maxLength: 72
      },
      valid: false
    }
  };

  onChangeHandler = (e, name) => {
    const value = e.target.value;
    const clone = {
      ...this.state
    }
    clone[name].value = value;
    this.setState({
      state: clone
    })    
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('message from login')
  };

  render(){
    return (
      <div className="Login">
        <h1 className="center">Login</h1>

        <form onSubmit={ this.onSubmitHandler }>
          <Input
            name="email"
            value={ this.state.email.value }
            invalid={ !this.state.email.valid }
            changed={(e) => this.onChangeHandler(e, "email") }
            type={ this.state.email.elementConfig.type }
            label={ this.state.email.elementConfig.label }
            placeholder={ this.state.email.elementConfig.placeholder } />

          <Input
            name="password"
            value={ this.state.password.value }
            invalid={ !this.state.password.valid }
            changed={(e) => this.onChangeHandler(e, "password") }
            type={ this.state.password.elementConfig.type} 
            label={ this.state.password.elementConfig.label } 
            placeholder={ this.state.password.elementConfig.placeholder } />

          <Input type="submit" value="Submit" />
        </form>
        <p className="center">Not registered?&nbsp;
          <strong 
            className="pointer"
            onClick={ this.props.clicked }>Signup</strong>
        </p>
      </div>
    );
  }
} 
export default Login;