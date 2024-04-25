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
    // This ensures that the image updates only if this component is active
    if (activeComponent === identifier && selectedImage && currentSrc !== selectedImage) {
      setCurrentSrc(selectedImage);
    }
  }, [selectedImage, activeComponent, identifier]);

  const handleImageClick = () => {
    enterReplacementMode(identifier);
    setShowReplaceButton(true);
  };

  const handleClickOutside = (event) => {
    if (!imageContainerRef.current.contains(event.target)) {
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
