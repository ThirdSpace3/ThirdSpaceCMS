import React from 'react';
import './LoadingAnimation.css'; // Create this CSS file for the animation styles

const LoadingAnimation = () => {
  return (
    <div className="loading-animation">
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
    </div>
  );
};

export default LoadingAnimation;
