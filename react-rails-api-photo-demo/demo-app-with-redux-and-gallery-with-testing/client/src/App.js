import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import Layout from './containers/Layout/Layout';
import Explore from './containers/Explore/Explore';
// import Collections from './containers/Collections/Collections';
// import Submission from './containers/Submission/Submission';
import Auth from './containers/Auth/Auth';
import Home from './containers/Home/Home';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import GalleryNew from './containers/Gallery/New/New';
import GalleryIndex from './containers/Gallery/Index/Index';
import GalleryEdit from './containers/Gallery/Edit/Edit';
import GalleryShow from './containers/Gallery/Show/Show';

class App extends Component {
  componentDidMount(){
    this.props.autoLogin();
  }

  render(){
    let routes = (
      <Switch>
        <Route path="/gallery" component={ GalleryIndex } />
        <Route path="/auth" component={ Auth } />
        <Route path="/" exact component={ Home } />
        <Redirect to="/" />
      </Switch>
    );
 
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/gallery/:id/edit" component={ GalleryEdit } />
          <Route path="/gallery/new" component={ GalleryNew } />
          <Route path="/gallery/:id" component={ GalleryShow } />
          <Route path="/gallery" component={ GalleryIndex } />
          {/* <Route path="/collections" component={ Collections } /> */}
          {/* <Route path="/submission" component={ Submission } /> */}
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
