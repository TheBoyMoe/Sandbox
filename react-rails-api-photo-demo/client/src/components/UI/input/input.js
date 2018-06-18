import React from 'react';
import './input.css';

const input = (props) => {
  let label = null;
  if(props.label)
    label = <label>{ props.label }</label> ;

  return (
    <div className="Input">
      { label } 
      <input 
        onChange={ props.changed }
        type={ props.type }
        placeholder={ props.placeholder }
        value={ props.value }/>
    </div>
  );
};
export default input;