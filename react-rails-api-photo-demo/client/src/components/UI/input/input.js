import React from 'react';
import './input.css';

const input = (props) => {
  return (
    <div className="Input">
      <label>{ props.label }</label>
      <input { ...props }/>
    </div>
  );
};
export default input;