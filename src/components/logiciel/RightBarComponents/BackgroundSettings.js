import React, { useRef, useEffect } from "react";
import { useImageHistory } from "../../../hooks/ImageHistoryContext";
import { useStyle } from "../../../hooks/StyleContext";

const BackgroundSettings = ({
  isOpen,
  toggleSection,
  selectedElement,
}) => {
  const { updateStyle, selectedComponent } = useStyle();
  const fileInputRef = useRef(null);
  const { addImageToHistory } = useImageHistory();
  
  const handleBackgroundChange = (e, property) => {
    const value = e.target.value;
    console.log("Selected Element in BackgroundSettings:", selectedElement);
  
    console.log("Attempting to update style for", selectedElement, "with value", value);
      document.documentElement.style.setProperty('--background-color', value);
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
          <input type="color" onChange={(e) => handleBackgroundChange(e, "backgroundColor")} />
        </div>
        <div className="parameters-content-line-row">
          <p className="parameters-content-line-title">Image</p>
          <label className="custom-file-upload">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleBackgroundChange(e, "backgroundImage")}
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
