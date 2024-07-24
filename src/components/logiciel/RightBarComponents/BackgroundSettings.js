import React, { useRef, useState, useEffect } from "react";
import { useImageHistory } from "../../../hooks/ImageHistoryContext";


const BackgroundSettings = ({
  isOpen,
  toggleSection,
  selectedElement,
  logChange,
  setSelectedColor,
  saveSettings, // Add saveSettings as a prop
}) => {
  const fileInputRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("");
  const cssVarName = `--${selectedElement}-background-color`;
  const backgroundImageCssVarName = `--${selectedElement}-background-image`;
  const storedColor = localStorage.getItem(cssVarName);
  const storedImageUrl = localStorage.getItem(backgroundImageCssVarName);
  const { addImageToHistory } = useImageHistory();

  useEffect(() => {
    if (storedColor) {
      setCurrentColor(storedColor);
      document.documentElement.style.setProperty(cssVarName, storedColor);
    }
    if (storedImageUrl && storedImageUrl !== 'none') {
      document.documentElement.style.setProperty(backgroundImageCssVarName, storedImageUrl);
    }
  }, [selectedElement]);

  const handleColorInput = (e) => {
    setCurrentColor(e.target.value);
  };

  const handleColorCommit = () => {
    const value = currentColor;
    document.documentElement.style.setProperty(cssVarName, value);
    document.documentElement.style.setProperty(backgroundImageCssVarName, 'none');
    logChange(selectedElement, { backgroundColor: value });
    setSelectedColor(value);
    localStorage.setItem(cssVarName, value);
    localStorage.setItem(backgroundImageCssVarName, 'none');
    // saveSettings(); // Save settings after color commit
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageUrl = reader.result;
      const image = { url: imageUrl, category: "Background" };
      addImageToHistory(image);
      document.documentElement.style.setProperty(backgroundImageCssVarName, `url(${imageUrl})`);
      logChange(selectedElement, {
        backgroundImage: `url(${imageUrl})`,
        backgroundColor: 'transparent',
      });
      localStorage.setItem(backgroundImageCssVarName, `url(${imageUrl})`);
      // saveSettings(); // Save settings after image upload
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="parameters-wrapper">
      <div className="parameters-wrapper-title-box" onClick={() => toggleSection('background')}>
        <p className="parameters-wrapper-title">Background</p>
        <i className={`bi bi-caret-down-fill ${isOpen.background ? "rotate" : ""}`}></i>
      </div>
      <div className={`parameters-wrapper-content ${isOpen.background ? "open" : ""}`}>
        <div className="parameters-content-line-row">
          <p className="parameters-content-line-title">Color</p>
          <input
            type="color"
            value={currentColor}
            onInput={handleColorInput}
            onChange={handleColorCommit}
          />
        </div>
        <div className="parameters-content-line-row">
          <p className="parameters-content-line-title">Image</p>
          <label className="custom-file-upload">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
            <i className="bi bi-plus"></i>
            <p>Add an Image</p>
          </label>
        </div>
      </div>
      <hr className="parameters-wrapper-separation" />
    </div>
  );
};

export default BackgroundSettings;
