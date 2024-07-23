import React from 'react';
import './LoadingAnimation.css'; // Ensure this CSS file is imported

const LoadingAnimation = () => {
  return (
    <div className="loading-animation">
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
    </div>
  );
};

export default LoadingAnimation;
