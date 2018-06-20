import React from 'react';
import Input from '../../../components/UI/input/input';
import { login } from '../utilities/api-helpers';
import { saveToken, isAuthenticated, removeToken } from '../utilities/auth-helpers';
import { checkValidityOfInput } from '../utilities/validity';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

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
      valid: false,
      touched: false
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
      valid: false,
      touched: false
    },
    formIsValid: false,
    error: ''
  };

  onChangeHandler = (e, name) => {
    const value = e.target.value;
    const clone = {
      ...this.state
    }
    clone[name].touched = true;
    clone[name].valid = checkValidityOfInput(value, clone[name].validation);
    clone[name].value = value;

    let formIsValid = true;
    for(let prop in clone){
      if(prop === 'email' || prop === 'password'){
        formIsValid = clone[prop].valid && formIsValid;
      }
    }
    clone.formIsValid = formIsValid;
    
    this.setState({ ...clone })
  }

  // onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   const user = {
  //     "email": this.state.email.value,
  //     "password": this.state.password.value
  //   }

  //   // clear any saved token
  //   removeToken();

  //   // login the user and save the jwt to local storage
  //   login({ "auth": user })
  //     .then(data => {
  //       // console.log(data);
  //       if(data.ok && data.status === 201){          
  //         this.setState({ error: '' });
  //         return data.json();
  //       } else {
  //         this.setState({ error: 'User not found or password is invalid' });
  //       }
  //     })
  //     .then(jwt => {
  //       if(jwt) saveToken(jwt);
  //       console.log('isAuthenticated:', !!isAuthenticated());
  //     })
  //     .catch(err => console.log(err));
  // };

  // login using async actions
  
  onSubmitHandler = (e) => {
    e.preventDefault();
    // const user = {
    //   "email": this.state.email.value,
    //   "password": this.state.password.value
    // };
    this.props.login(this.state.email.value, this.state.password.value);
  };

  onClickHandler = () => {
    const emailUpdate = {
      ...this.state.email,
      value: ''
    }
    const passwordUpdate = {
      ...this.state.password,
      value: ''
    }
    this.setState({
      email: emailUpdate,
      password: passwordUpdate,
      error: ''
    })
  }

  render(){
    let errorMessage = null;
    if(this.state.error) {
      errorMessage = (
        <div className="alert alert-danger" role="alert">
          <button onClick={ this.onClickHandler } type="button" className="close" data-dismiss="alert">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>{ this.state.error }</strong>
        </div>
      );
    }

    return (
      <div className="Login">
        { errorMessage }
        <h1 className="center">Login</h1>

        <form onSubmit={ this.onSubmitHandler }>
          <Input
            name="email"
            value={ this.state.email.value }
            invalid={ !this.state.email.valid }
            touched={ this.state.email.touched }
            changed={ (e) => this.onChangeHandler(e, "email") }
            type={ this.state.email.elementConfig.type }
            label={ this.state.email.elementConfig.label }
            placeholder={ this.state.email.elementConfig.placeholder } />

          <Input
            name="password"
            value={ this.state.password.value }
            invalid={ !this.state.password.valid }
            touched={ this.state.password.touched }
            changed={ (e) => this.onChangeHandler(e, "password") }
            type={ this.state.password.elementConfig.type } 
            label={ this.state.password.elementConfig.label } 
            placeholder={ this.state.password.elementConfig.placeholder } />

          <Input 
            type="submit" 
            disabled={ !this.state.formIsValid }
            value="Submit" />
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

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(actions.login(email, password))
  }
};

export default connect(null, mapDispatchToProps)(Login);