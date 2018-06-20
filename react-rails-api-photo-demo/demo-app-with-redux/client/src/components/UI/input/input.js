import React from 'react';
import './input.css';

const input = (props) => {
  let label = null;
  if(props.label)
    label = <label>{ props.label }</label> ;

  // update the input field to show the user whe n input is invalid  
  const inputClasses = [];
  if(props.invalid && props.touched) inputClasses.push('Invalid');

  let disabled = false;
  if(props.disabled) 
    disabled = true;

  return (
    <div className="Input">
      { label } 
      <input
        disabled={ disabled }
        className={ inputClasses.join(' ') }
        name={ props.name }
        onChange={ props.changed }
        type={ props.type }
        placeholder={ props.placeholder }
        value={ props.value }/>
    </div>
  );
};
export default input;