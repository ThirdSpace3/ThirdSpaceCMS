import React, { useRef, useState } from "react";

const BackgroundSettings = ({
  isOpen,
  toggleSection,
  selectedElement,
  logChange, // Pass the logging function as a prop
}) => {
  const fileInputRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("");  // State to hold the current color temporarily
  const [selectedColor, setSelectedColor] = useState(""); // State to hold the confirmed color

  const handleColorInput = (e) => {
    setCurrentColor(e.target.value); // Update temporary color state
  };

  const handleColorCommit = () => {
    const value = currentColor;
    const cssVarName = `--${selectedElement}-background-color`;

    // Apply the confirmed color change globally
    document.documentElement.style.setProperty(cssVarName, value);
    logChange(selectedElement, { backgroundColor: value });
    console.log("Final color selected:", value);
    setSelectedColor(currentColor); // Update the confirmed color state
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
          />
          <button className="custom-file-upload" onClick={handleColorCommit}>Apply Color</button>  {/* Button to commit color change */}
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
