import React from 'react';

const Idea = ({ title, body }) => {
  return (
    <li className="tile">
      <h3>{ title }</h3>
      <p>{ body }</p>
    </li>
  );
}

export default Idea;
