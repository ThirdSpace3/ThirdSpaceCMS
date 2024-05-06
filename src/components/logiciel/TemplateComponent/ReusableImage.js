import React, { useState, useRef, useEffect } from "react";
import "./ReusableImage.css";
import { useImageHistory } from "../../../hooks/ImageHistoryContext";

const ReusableImage = ({ src, alt, identifier, openImagePanel, imageHeight }) => {
  const [showReplaceButton, setShowReplaceButton] = useState(false);
  const { selectedImage, enterReplacementMode, activeComponent } = useImageHistory();
  const [currentSrc, setCurrentSrc] = useState(src);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const isActive = activeComponent === identifier;
    if (isActive && selectedImage && currentSrc !== selectedImage) {
      setCurrentSrc(selectedImage);
    }
    setShowReplaceButton(isActive);
  }, [selectedImage, activeComponent, identifier, currentSrc]);

  const handleImageClick = () => {
    enterReplacementMode(identifier);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imageContainerRef.current && !imageContainerRef.current.contains(event.target)) {
        setShowReplaceButton(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="image-container" ref={imageContainerRef}>
      <img
        src={currentSrc}
        alt={alt}
        onClick={handleImageClick}
        className={`image-component ${showReplaceButton ? 'selected' : ''}`}
        style={{ height: imageHeight }}
      />
      {showReplaceButton && (
        <button className="popup-button" onClick={openImagePanel}>
          Replace Image <i className="bi bi-arrow-repeat"></i>
        </button>
      )}
    </div>
  );
};

export default ReusableImage;
