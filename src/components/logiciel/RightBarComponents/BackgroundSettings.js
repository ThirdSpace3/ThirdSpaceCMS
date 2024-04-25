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
  
  const handleBackgroundChange = (e, property, componentName) => {
    const value = e.target.value;
    console.log("Selected Element in BackgroundSettings:", selectedElement);
  
    console.log("Attempting to update style for", selectedElement, "with value", value);
    if (selectedElement) {
      let cssVarName = '';
      if (componentName === 'navbar') {
        cssVarName = '--navbar-background-color';
      } else if (componentName === 'header') {
        cssVarName = '--header-background-color';
      } else if (componentName === 'partners') {
        cssVarName = '--partners-background-color';
      } else if (componentName === 'about') { // Add this condition
        cssVarName = '--about-background-color';
      } else if (componentName === 'features') { // Add this condition
        cssVarName = '--features-background-color';
      } else if (componentName === 'joinUs') { // Add this condition
        cssVarName = '--joinus-background-color';
      } else if (componentName === 'footer') { // Add this condition
        cssVarName = '--footer-background-color';
      }
      
      
      document.documentElement.style.setProperty(cssVarName, value);
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
          <input type="color" onChange={(e) => handleBackgroundChange(e, "backgroundColor", selectedElement)} />
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
