import React from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';
import { connect } from 'react-redux';

import './Layout.css';

class Layout extends React.Component {
  render(){
    return (
      <div>
        <Toolbar isAuth={ this.props.isAuthenticated }/>
        <main className="Content container">
          { this.props.children }
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);