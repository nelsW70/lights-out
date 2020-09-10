import React from 'react';
import './NeonButton.css';

function NeonButton(props) {
  const { label, handleClick } = props;
  return (
    <button className="NeonButton" onClick={handleClick}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {label}
    </button>
  );
}

export default NeonButton;
