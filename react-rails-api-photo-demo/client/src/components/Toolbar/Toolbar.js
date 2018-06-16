import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from './Logo/Logo';
import NavItem from './NavItems/NavItem/NavItem';

import './Toolbar.css';

const toolbar = () => {
  return(
    <header className="Toolbar">
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem link="/" active >Home</NavItem>
            <NavItem link="#">Explore</NavItem>
            <NavItem link="#">Collections</NavItem>
            <NavItem link="#">Submit a Photo</NavItem>
            <NavItem link="#">Login</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
export default toolbar;