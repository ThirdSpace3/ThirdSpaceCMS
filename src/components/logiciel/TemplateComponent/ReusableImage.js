import React, { useState, useRef, useEffect } from "react";
import "./ReusableImage.css";

const ReusableImage = ({
  src,
  alt,
  onClick,
  openImagePanel,
  imageHeight,
  selectedImage,
  onImageChange,
}) => {
  const [showReplaceButton, setShowReplaceButton] = useState(false);
  const imageContainerRef = useRef(null);

  const handleImageClick = () => {
    if (typeof onClick === "function") {
      onClick(); // Call the onClick prop, which should handle entering replacement mode
    }
    setShowReplaceButton(true);
  };

  const handleButtonClick = () => {
    if (typeof openImagePanel === "function") {
      openImagePanel(); // Open the panel to select a new image
    }
    setShowReplaceButton(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!imageContainerRef.current.contains(event.target)) {
        setShowReplaceButton(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNewImageSrc = (newSrc) => {
    if (typeof onImageChange === "function") {
      onImageChange(newSrc);
    }
  };

  const handleImageSelect = () => {
    handleNewImageSrc(selectedImage);
    setShowReplaceButton(false); // Hide the replace button after selecting a new image
  };

  return (
    <div className="image-container" ref={imageContainerRef}>
      <img
        src={src}
        alt={alt}
        onClick={handleImageClick}
        style={{ height: imageHeight }}
      />
      {showReplaceButton && (
        <button className="popup-button" onClick={handleButtonClick}>
          Replace Image <i className="bi bi-arrow-repeat"></i>
        </button>
      )}
      {selectedImage && (
        <div className="selected-image" onClick={handleImageSelect}>
          <img src={selectedImage} alt="Selected Image" />
        </div>
      )}
    </div>
  );
};

export default ReusableImage;
