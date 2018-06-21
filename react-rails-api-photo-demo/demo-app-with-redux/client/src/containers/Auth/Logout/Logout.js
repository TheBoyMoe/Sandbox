import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';

class Logout extends React.Component {
  render(){
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: dispatch(actions.logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout); 