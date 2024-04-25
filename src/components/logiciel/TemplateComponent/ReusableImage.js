import React, { useState, useRef, useEffect } from 'react';
import './ReusableImage.css';

const ReusableImage = ({ src, alt, onClick, openImagePanel, imageHeight, selectedImage, selectElement, onImageChange }) => {
  const [showReplaceButton, setShowReplaceButton] = useState(false);
  const imageContainerRef = useRef(null);

  const handleImageClick = () => {
    if (typeof onClick === 'function') {
      onClick();  // Call the onClick prop, which should handle entering replacement mode
    }
    console.log("Image src used: " + (selectedImage || src));
    setShowReplaceButton(true);
  };

  const handleButtonClick = () => {
    if (typeof openImagePanel === 'function') {
      openImagePanel();  // Open the panel to select a new image
    }
    setShowReplaceButton(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!imageContainerRef.current.contains(event.target)) {
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
        src={selectedImage || src}
        alt={alt}
        onClick={handleImageClick}
        style={{ height: imageHeight }}
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
