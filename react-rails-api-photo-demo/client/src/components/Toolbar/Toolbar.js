import React from 'react';
import NavItems from './NavItems/NavItems';
import Logo from './Logo/Logo';

import './Toolbar.css';

const toolbar = () => {
  return(
    <header className="Toolbar">
      <Logo />
      <NavItems />     
    </header>
  );
};
export default toolbar;