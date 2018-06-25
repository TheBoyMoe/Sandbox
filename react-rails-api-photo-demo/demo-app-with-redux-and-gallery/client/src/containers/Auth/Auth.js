import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
    // TODO redirect to '/gallery'
    let authRedirect = null;
    if(this.props.isAuthenticated){
      authRedirect = <Redirect to="/gallery/new" />;
    }

    let output = (this.state.alreadyRegistered)?
    <Login clicked={ this.onClickHandler } /> :
    <Signup clicked={ this.onClickHandler } />;

    return(
      <div>
        { authRedirect }
        { output }
      </div> 
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Auth);