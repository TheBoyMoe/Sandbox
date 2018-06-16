import React from 'react';
import './NavItem.css';

const navItem = (props) => {
  return (
    <li className="NavItem">
      <a 
        className={ props.active ? 'active' : null }
        href={ props.link }>{ props.children }</a>
    </li>
  );
};
export default navItem;