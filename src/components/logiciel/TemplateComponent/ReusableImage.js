// ReusableImage.js
import React, { useState, useRef, useEffect } from "react";
import "./ReusableImage.css";
import { useImageHistory } from "../../../hooks/ImageHistoryContext";

const ReusableImage = ({
  src,
  alt,
  identifier,
  openImagePanel,
  imageHeight,
}) => {
  const [showReplaceButton, setShowReplaceButton] = useState(false);
  const [isEdited, setIsEdited] = useState(false); // Add this state variable
  const { selectedImage, enterReplacementMode, activeComponent } = useImageHistory();
  const [currentSrc, setCurrentSrc] = useState(src);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    if (activeComponent === identifier && selectedImage && currentSrc !== selectedImage) {
      setCurrentSrc(selectedImage);
      setIsEdited(true); // Set isEdited to true after editing
    }
    if (activeComponent !== identifier) {
      setShowReplaceButton(false);
    }
  }, [selectedImage, activeComponent, identifier, currentSrc]);

  const handleImageClick = () => {
    if (!isEdited) { // Only allow editing if the image has not been edited before
      enterReplacementMode(identifier);
      setShowReplaceButton(true);
    }
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
        className={`image-component ${showReplaceButton ? 'selected' : ''}`}
        style={{ height: imageHeight }}
      />
      {showReplaceButton && !isEdited && ( // Only show replace button if the image has not been edited
        <button className="popup-button" onClick={openImagePanel}>
          Replace Image <i className="bi bi-arrow-repeat"></i>
        </button>
      )}
    </div>
  );
};

export default ReusableImage;
