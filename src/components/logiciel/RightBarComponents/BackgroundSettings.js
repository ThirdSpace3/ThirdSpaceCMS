import React, { useRef, useState, useEffect } from "react";

const BackgroundSettings = ({
  isOpen,
  toggleSection,
  selectedElement,
  logChange,
  setSelectedColor,
}) => {
  const fileInputRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("");
  const cssVarName = `--${selectedElement}-background-color`;
  const storedColor = localStorage.getItem(cssVarName);

  const handleColorInput = (e) => {
    setCurrentColor(e.target.value);
  };

  const handleColorCommit = () => {
    const value = currentColor;
    const cssVarName = `--${selectedElement}-background-color`;
  
    document.documentElement.style.setProperty(cssVarName, value);
    logChange(selectedElement, { backgroundColor: value });
    setSelectedColor(currentColor);
  
    // Store the selected color in local storage
    localStorage.setItem(cssVarName, value);
  };
  

  useEffect(() => {
    if (storedColor) {
      setSelectedColor(storedColor);
      document.documentElement.style.setProperty(cssVarName, storedColor);
    }
  }, [selectedElement]);

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
            value={storedColor || cssVarName}
            onInput={handleColorInput}
            onChange={handleColorCommit}
          />
          {/* <button className="custom-file-upload" onClick={handleColorCommit}>Apply Color</button> */}
        </div>
        <div className="parameters-content-line-row">
          <p className="parameters-content-line-title">Image</p>
          <label className="custom-file-upload">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleColorCommit(e, "backgroundImage", selectedElement)}
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
