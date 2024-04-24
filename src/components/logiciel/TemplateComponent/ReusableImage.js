import React, { useState, useRef, useEffect } from 'react';
import './ReusableImage.css';

const ReusableImage = ({ src, alt, onClick, openImagePanel, imageHeight }) => {
  const [showReplaceButton, setShowReplaceButton] = useState(false);
  const imageContainerRef = useRef(null);

  const handleImageClick = () => {
    setShowReplaceButton(true);
  };

  const handleButtonClick = () => {
    openImagePanel();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imageContainerRef.current && !imageContainerRef.current.contains(event.target)) {
        setShowReplaceButton(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
<div className="image-container" ref={imageContainerRef}>
  <img
    src={src}
    className="image-component"
    alt={alt}
    onClick={handleImageClick}
    tabIndex="0"
    onFocus={() => setShowReplaceButton(true)}
    style={{ height: imageHeight }} // Apply the height here
  />

  {showReplaceButton && (
    <button className="popup-button" onClick={handleButtonClick}>
      Replace Image <i className="bi bi-arrow-repeat"></i>
    </button>
  )}
</div>

  );
};

export default ReusableImage;
