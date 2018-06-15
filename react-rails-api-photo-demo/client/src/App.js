import React, { Component } from 'react';
import './App.css';

import Gallery from './containers/Gallery/Gallery';
import Layout from './components/Layout/Layout';

class App extends Component {
  render(){
    return(
      <div>
        <Layout>
          <Gallery />
        </Layout>
      </div>
    );
  }

}
 
export default App;
