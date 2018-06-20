import React from 'react';

const image = ({ title, path, user }) => {
  return (
    <li>
      <h3>{ title }</h3>
      <p>{ path }</p>
      <p>{ user.name }</p>
    </li>
  );
};

export default image;