import React, { useState, useEffect } from "react";
import "../RightBar.css";
export default function BorderSettings({
  setSelectedSide,
  toggleSection,
  isOpen,
  handleInputChange,
  borderStyle,
  selectedSide,
}) {
  const [selectedBorderStyle, setSelectedBorderStyle] = useState(
    borderStyle.borderStyle || "none"
  );

  // useEffect hook to synchronize component state with changes in selectedSide or borderStyle
  useEffect(() => {
    if (selectedSide && borderStyle[selectedSide]) {
      setSelectedBorderStyle(borderStyle[selectedSide].borderStyle || "none");
    }
  }, [borderStyle, selectedSide]);

  const selectAllBorders = () => {
    setSelectedSide("all"); // Adjusted to 'all' based on your comment in the code
  };

  const handleBorderStyleChange = (newStyle) => {
    setSelectedBorderStyle(newStyle); // Update local state for visual feedback
    handleInputChange({ target: { value: newStyle } }, "borderStyle", "select"); // Mimicking an event structure
  };
  return (
    <div>
      <div className="parameters-wrapper">
        <div
          className="parameters-wrapper-title-box"
          onClick={() => toggleSection("border")}
        >
          <p className="parameters-wrapper-title">Borders</p>
          <i
            className={`bi bi-caret-down-fill ${isOpen.border ? "rotate" : ""}`}
          ></i>
        </div>
        <div
          className={`parameters-wrapper-content ${
            isOpen.border ? "open" : ""
          }`}
        >
          {/* Icons for selecting the side */}
          <div className="borders-container">
            <div className="borders-selection-icon-box">
              <div className="borders-selection-icon">
                <img
                  src="./images/borders-top-icon.png"
                  onClick={() => setSelectedSide("top")}
                  style={{ color: "white" }}
                />
              </div>

              <div className="borders-selection-icon-side">
                <div className="borders-selection-icon">
                  <img
                    src="./images/borders-left-icon.png"
                    onClick={() => setSelectedSide("left")}
                    style={{ color: "white" }}
                  />
                </div>
                <div className="borders-selection-icon">
                  <img
                    src="./images/borders-all-icon.png"
                    onClick={selectAllBorders}
                    style={{ color: "white" }}
                  />
                </div>
                <div className="borders-selection-icon">
                  <img
                    src="./images/borders-right-icon.png"
                    onClick={() => setSelectedSide("right")}
                    style={{ color: "white" }}
                  />
                </div>
              </div>

              <div className="borders-selection-icon">
                <img
                  src="./images/borders-bottom-icon.png"
                  onClick={() => setSelectedSide("bottom")}
                  style={{ color: "white" }}
                />
              </div>
            </div>
            <div className="borders-selection-icon-parameters">
              <div className="parameters-content-line-row">
                <p className="parameters-content-line-title">Style</p>
                <div className="parameters-content-line-container">
                  {/* Icon-based selection for Border Style */}
                  <i
                    className={`bi bi-slash-circle ${
                      selectedBorderStyle === "none" ? "selected-icon" : ""
                    }`}
                    onClick={() => handleBorderStyleChange("none")}
                  ></i>
                  <i
                    className={`bi bi-dash-lg ${
                      selectedBorderStyle === "solid" ? "selected-icon" : ""
                    }`}
                    onClick={() => handleBorderStyleChange("solid")}
                  ></i>
                  <i
                    className={`bi bi-dash ${
                      selectedBorderStyle === "dashed" ? "selected-icon" : ""
                    }`}
                    onClick={() => handleBorderStyleChange("dashed")}
                  ></i>
                  {/* Optional: Add an icon for 'dotted' if needed */}
                </div>
              </div>
              <div className="parameters-content-line-row">
                <p className="parameters-content-line-title">Size</p>
                <div className="parameters-content-line-container">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="1"
                    defaultValue="0"
                    onChange={(e) => handleInputChange(e, "borderWidth")}
                  />
                  <span className="px-label">px</span>
                </div>
              </div>
              <div className="parameters-content-line-row">
                <p className="parameters-content-line-title">Color</p>

                <input
                  className="parameters-color-picker"
                  type="color"
                  onChange={(e) => handleInputChange(e, "borderColor", "color")}
                ></input>
              </div>
            </div>
          </div>

          <div className="parameters-content-line-row">
            <p className="parameters-content-line-title">Border Radius</p>
            <div className="parameters-content-line-container">
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                defaultValue="0"
                onChange={(e) => handleInputChange(e, "borderRadius", "number")}
              />
              <span className="px-label">px</span>
            </div>
          </div>
        </div>
        <hr className="parameters-wrapper-separation" />
      </div>
    </div>
  );
}
