import React from 'react';
import Logo from '../Logo/Logo';
import './Toolbar.css';

const toolbar = (props) => {
  return(
    <header className="Toolbar">
      <Logo />
      <nav>
        <ul>
          <li>Collections</li>
          <li>About</li>
          <li>Login</li>
        </ul>
      </nav>
    </header>
  );
};
export default toolbar;