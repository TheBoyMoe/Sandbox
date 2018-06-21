import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import Layout from './containers/Layout/Layout';
import Explore from './containers/Explore/Explore';
import Collections from './containers/Collections/Collections';
import Submission from './containers/Submission/Submission';
import Auth from './containers/Auth/Auth';
import Home from './containers/Home/Home';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.autoLogin();
  }

  render(){
    let routes = (
      <Switch>
        <Route path="/explore" component={ Explore } />
        <Route path="/auth" component={ Auth } />
        <Route path="/" exact component={ Home } />
        <Redirect to="/" />
      </Switch>
    );
 
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/explore" component={ Explore } />
          <Route path="/collections" component={ Collections } />
          <Route path="/submission" component={ Submission } />
          <Route path="/logout" component={ Logout } />
          <Route path="/auth" component={ Auth } />
          <Route path="/" exact component={ Home } />
          <Redirect to="/" />
        </Switch>
      );
    }

    return(
      <div>
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }

}
 
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: () => dispatch(actions.checkAuthState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
