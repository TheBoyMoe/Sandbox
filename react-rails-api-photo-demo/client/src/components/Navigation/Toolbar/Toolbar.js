import React from 'react';
import './Toolbar.css';

const toolbar = (props) => {
  return(
    <header className="Toolbar">
      <div>Logo</div>
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