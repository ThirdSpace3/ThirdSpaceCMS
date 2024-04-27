// ReusableImage.js
import React, { useState, useRef, useEffect } from "react";
import "./ReusableImage.css";
import { useImageHistory } from "../../../hooks/ImageHistoryContext";

const ReusableImage = ({
  src,
  alt,
  identifier, // This prop identifies the component
  openImagePanel,
  imageHeight,
}) => {
  const [showReplaceButton, setShowReplaceButton] = useState(false);
  const { selectedImage, enterReplacementMode, activeComponent } = useImageHistory();
  const [currentSrc, setCurrentSrc] = useState(src);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    // Update image source if this component is active and a new image is selected
    if (activeComponent === identifier && selectedImage && currentSrc !== selectedImage) {
      setCurrentSrc(selectedImage);
    }
    // Hide replace button if this component is no longer the active one
    if (activeComponent !== identifier) {
      setShowReplaceButton(false);
    }
  }, [selectedImage, activeComponent, identifier, currentSrc]);

  const handleImageClick = () => {
    enterReplacementMode(identifier);
    setShowReplaceButton(true);
  };

  const handleClickOutside = (event) => {
    if (imageContainerRef.current && !imageContainerRef.current.contains(event.target)) {
      setShowReplaceButton(false);
    }
  };

  useEffect(() => {
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
