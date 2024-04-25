import React, { useState, useRef, useEffect } from 'react';
import './ReusableImage.css';

const ReusableImage = ({ src, alt, onClick, openImagePanel, imageHeight, selectedImage, selectElement }) => {
  const [showReplaceButton, setShowReplaceButton] = useState(false);
  const imageContainerRef = useRef(null);

  const handleImageClick = () => {
    onClick();
    console.log("src used: " + (selectedImage || src));
    if (typeof selectElement === 'function') { // Make sure selectElement is a function before calling it
      selectElement("image-container");
    }
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imageContainerRef.current && !imageContainerRef.current.contains(event.target)) {
        setShowReplaceButton(false);
        if (typeof selectElement === 'function') { // Make sure selectElement is a function before calling it
          selectElement(null); // Call selectElement with null to deselect the image
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectElement]); // Add selectElement to the dependency array

  return (
    <div className="image-container" ref={imageContainerRef}>
      <img
        src={selectedImage || src} // Use the selectedImage prop if it's not null
        className="image-component"
        alt={alt}
        onClick={handleImageClick}
        tabIndex="0"
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
