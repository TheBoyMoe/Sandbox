import React from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup';

class Auth extends React.Component {
  state = {
    alreadyRegistered: true
  };

  onClickHandler = () => {
    this.setState({
      alreadyRegistered: !this.state.alreadyRegistered
    })
  };
  
  render(){
    let output = null;
    output = (this.state.alreadyRegistered)?
      <Login clicked={ this.onClickHandler } /> :
      <Signup clicked={ this.onClickHandler } />;
    
    return(
      <div>
        { output }
      </div> 
    );
  }
}
export default Auth;