import React from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup';

class Auth extends React.Component {
  state = {
    alreadyRegistered: true
  }

  onClickHandler = () => {
    this.setState({
      alreadyRegistered: !this.state.alreadyRegistered
    })
  }

  onSubmitHandler = (data) => {
    console.log(data)
  }
  
  render(){
    let output = null;
    output = (this.state.alreadyRegistered)?
      <Login clicked={ this.onClickHandler } submitted={ this.onSubmitHandler } /> :
      <Signup clicked={ this.onClickHandler } submitted={ this.onSubmitHandler } />;
    
    return(
      <div>
        { output }
      </div> 
    );
  }
}
export default Auth;