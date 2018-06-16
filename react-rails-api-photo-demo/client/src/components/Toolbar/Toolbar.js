import React from 'react';
// import NavItems from './NavItems/NavItems';
import Logo from './Logo/Logo';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import './Toolbar.css';

const toolbar = () => {
  return(
    // <header className="Toolbar">
    //   <Logo />
    //   <NavItems />     
    // </header>
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          {/* <a href="#brand">React-Bootstrap</a> */}
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            Link Right
          </NavItem>
          <NavItem eventKey={2} href="#">
            Link Right
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default toolbar;