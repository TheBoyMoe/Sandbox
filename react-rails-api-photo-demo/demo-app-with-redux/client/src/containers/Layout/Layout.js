import React from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';

import './Layout.css';

class Layout extends React.Component {
  render(){
    return (
      <div>
        <Toolbar toggle={ this.toggleMenu }/>
        <main className="Content container">
          { this.props.children }
        </main>
      </div>
    );
  }
}

export default Layout;