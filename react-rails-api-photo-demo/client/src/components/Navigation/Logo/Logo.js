import React from 'react';
import cameraLogo from '../../../assets/images/camera-logo.svg';
import './Logo.css';

const logo = () => {
  return (
    <div className="Logo">
      <img src={cameraLogo} alt="camera logo"/>
    </div>
  );
};

export default logo;