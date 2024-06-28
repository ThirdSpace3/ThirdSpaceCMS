import React, { useState, useRef, useEffect } from "react";
import { useImageHistory } from "../../../hooks/ImageHistoryContext";
import "./ReusableImage.css";

const ReusableImage = ({
  src,
  alt,
  identifier,
  openImagePanel,
  imageHeight,
  handleImageUpload,
  onImageChange // New prop for notifying parent component of image change
}) => {
  const [showReplaceButton, setShowReplaceButton] = useState(false);
  const { selectedImage, enterReplacementMode, activeComponent } = useImageHistory();
  const [currentSrc, setCurrentSrc] = useState(src);
  const imageContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedSrc = localStorage.getItem(`imageSrc-${identifier}`);
    if (savedSrc) {
      setCurrentSrc(savedSrc);
    }
  }, [identifier]);

  useEffect(() => {
    localStorage.setItem(`imageSrc-${identifier}`, currentSrc);
  }, [currentSrc, identifier]);

  useEffect(() => {
    if (activeComponent === identifier && selectedImage && currentSrc !== selectedImage) {
      setCurrentSrc(selectedImage);
      setShowReplaceButton(false);
      onImageChange(selectedImage, identifier); // Notify parent of image change
    }
  }, [selectedImage, activeComponent, identifier, currentSrc, onImageChange]);

  const handleImageClick = () => {
    enterReplacementMode(identifier);
    setShowReplaceButton(true);
  };

  const handleClickOutside = (event) => {
    if (imageContainerRef.current && !imageContainerRef.current.contains(event.target)) {
      setShowReplaceButton(false);
    }
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const newSrc = await handleImageUpload(file, identifier);
    setCurrentSrc(newSrc);
    onImageChange(newSrc, identifier); // Notify parent of image change
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
      {showReplaceButton && (
        <button className="popup-button" onClick={() => fileInputRef.current.click()}>
          Replace Image <i className="bi bi-arrow-repeat"></i>
        </button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
    </div>
  );
};

export default ReusableImage;
