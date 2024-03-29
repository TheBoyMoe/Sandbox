import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout/Layout';
import Explore from './containers/Explore/Explore';
import Collections from './containers/Collections/Collections';
import Submission from './containers/Submission/Submission';
import Auth from './containers/Auth/Auth';
import Home from './containers/Home/Home';

class App extends Component {
  render(){
    return(
      <div>
        <Layout>
          <Switch>
            <Route path="/explore" component={ Explore } />
            <Route path="/collections" component={ Collections } />
            <Route path="/submission" component={ Submission } />
            <Route path="/auth" component={ Auth } />
            <Route path="/" component={ Home } />
          </Switch>
        </Layout>
      </div>
    );
  }

}
 
export default App;
