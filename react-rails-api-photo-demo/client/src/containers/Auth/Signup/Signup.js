import React from 'react';
import Input from '../../../components/UI/input/input';
import { checkValidityOfInput } from '../utilities/validity';

class Signup extends React.Component {
  state = {
    name : {
      elementConfig: {
        type: 'text',
        placeholder: 'Your full name',
        label: "Name" 
      },
      value: '',
      validation: {
        required: true,
        minLength: 3
      },
      valid: false,
      touched: false
    },
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
    password_confirmation : {
      elementConfig: {
        type: 'password',
        placeholder: 'Confirm password',
        label: "Confirm password"
      },
      value: '',
      validation: {
        required: true,
        minLength: 8,
        maxLength: 72,
        match: true
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
      if(prop === 'name' || prop === 'email' || prop === 'password'){
        formIsValid = clone[prop].valid && formIsValid;
      }
    }
    clone.formIsValid = formIsValid;
    
    this.setState({ ...clone })
  };

  onSubmitHandler = (e) => {

  };

  render(){
    return (
      <div className="Signup">
        <h1 className="center">Sign Up</h1>
        
        <form onSubmit={ this.onSubmitHandler }>
          <Input
            name="name"
            value={ this.state.name.value }
            invalid={ !this.state.name.valid }
            touched={ this.state.name.touched }
            changed={ (e) => this.onChangeHandler(e, "name") }
            type={ this.state.name.elementConfig.type }
            label={ this.state.name.elementConfig.label }
            placeholder={ this.state.name.elementConfig.placeholder } />

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

        <p className="center">Already registered?&nbsp;
          <strong 
            className="pointer"
            onClick={ this.props.clicked }>Login</strong>
        </p>
      </div>
    );
  }
}
export default Signup;