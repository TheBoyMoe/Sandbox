import React from 'react';
import NavItem from './NavItem/NavItem';
import './NavItems.css';

const navItems = () => {
  return (
    <nav>
      <ul className="NavItems">
        <NavItem link="/" active >Home</NavItem>
        <NavItem link="#">Explore</NavItem>
        <NavItem link="#">Collections</NavItem>
        <NavItem link="#">Submit a Photo</NavItem>
        <NavItem link="#">Login</NavItem>
      </ul>
    </nav>
  );
};
export default navItems;