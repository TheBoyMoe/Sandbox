import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from './Logo/Logo';
import NavItem from './NavItem/NavItem';

import './Toolbar.css';

const toolbar = (props) => {
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
            <NavItem link="/" exact>Home</NavItem>
            <NavItem link="/explore">Explore</NavItem>
            <NavItem link="/collections">Collections</NavItem>
            <NavItem link="/submission">Submit a Photo</NavItem>
            {(!props.isAuth)?
              <NavItem link="/auth">Login</NavItem> :
              <NavItem link="/logout">Logout</NavItem>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
export default toolbar;