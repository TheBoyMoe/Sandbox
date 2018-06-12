import React from 'react';

const Idea = ({ title, body }) => {
  return (
    <div className="tile">
      <h3>{ title }</h3>
      <p>{ body }</p>
    </div>
  );
}

export default Idea;
