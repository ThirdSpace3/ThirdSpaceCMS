import React, { useRef, useEffect } from "react";

const BackgroundSettings = ({
  isOpen,
  toggleSection,
  selectedElement,
  logChange, // Pass the logging function as a prop
}) => {
  const fileInputRef = useRef(null);
  
  const handleBackgroundChange = (e, property, componentName) => {
    const value = e.target.value;
    console.log("Selected Element in BackgroundSettings:", selectedElement);
    console.log("Attempting to update style for", selectedElement, "with value", value);
    
    if (selectedElement) {
      let cssVarName = '';
      switch (componentName) {
        case 'navbar':
          cssVarName = '--navbar-background-color';
          break;
        case 'header':
          cssVarName = '--header-background-color';
          break;
        case 'partners':
          cssVarName = '--partners-background-color';
          break;
        case 'about':
          cssVarName = '--about-background-color';
          break;
        case 'features':
          cssVarName = '--features-background-color';
          break;
        case 'joinUs':
          cssVarName = '--joinus-background-color';
          break;
        case 'footer':
          cssVarName = '--footer-background-color';
          break;
        default:
          cssVarName = '--default-background-color'; // Default case to handle unknown components
          break;
      }
      
      document.documentElement.style.setProperty(cssVarName, value);
      logChange(selectedElement, { [property]: value }); // Log the change
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
              onChange={(e) => handleBackgroundChange(e, "backgroundImage", selectedElement)}
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
