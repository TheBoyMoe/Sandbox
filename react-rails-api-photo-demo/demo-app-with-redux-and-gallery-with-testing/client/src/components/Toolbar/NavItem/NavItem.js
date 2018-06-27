import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavItem.css';

const navItem = (props) => {
  return (
    <li className="NavItem">
      <NavLink
        exact={ props.exact }
        to={ props.link }>{ props.children }</NavLink>
    </li>
  );
};
export default navItem;