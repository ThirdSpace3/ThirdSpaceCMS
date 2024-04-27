import React, { useState, useContext, useEffect } from "react";
import "../RightBar.css";
import { useStyle } from "../../../hooks/StyleContext";

export default function BorderSettings({
  toggleSection,
  isOpen,
  selectedElement,
}) {
  const [selectedBorderStyle, setSelectedBorderStyle] = useState("none");
  const [borderSize, setBorderSize] = useState(0);
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderRadius, setBorderRadius] = useState(0);

  const { updateStyle } = useStyle(); // Get the function to update the style

  const updateBorderSettings = () => {
    updateStyle(selectedElement, {
      borderStyle: selectedBorderStyle,
      borderWidth: `${borderSize}px`,
      borderColor: borderColor,
      borderRadius: `${borderRadius}px`, // Add this line
    });
  };
  
  useEffect(() => {
    updateBorderSettings();
  }, [selectedBorderStyle, borderSize, borderColor, borderRadius]); // Include borderRadius in dependency array

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
          className={`parameters-wrapper-content ${isOpen.border ? "open" : ""
            }`}
        >
          {/* Icons for selecting the side */}
          <div className="borders-container">
            <div className="borders-selection-icon-box">
              <div className="borders-selection-icon">
                <img
                  src="./images/borders-top-icon.png"
                  style={{ color: "white" }}
                />
              </div>

              <div className="borders-selection-icon-side">
                <div className="borders-selection-icon">
                  <img
                    src="./images/borders-left-icon.png"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="borders-selection-icon">
                  <img
                    src="./images/borders-all-icon.png"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="borders-selection-icon">
                  <img
                    src="./images/borders-right-icon.png"
                    style={{ color: "white" }}
                  />
                </div>
              </div>

              <div className="borders-selection-icon">
                <img
                  src="./images/borders-bottom-icon.png"
                  style={{ color: "white" }}
                />
              </div>
            </div>
            <div className="borders-selection-icon-parameters">
              <div className="parameters-content-line-row">
                <p className="parameters-content-line-title">Style</p>
                <div className="parameters-content-line-container">
                  <i className={`bi bi-x ${selectedBorderStyle === "none" ? "selected-icon" : ""}`}
                    onClick={() => setSelectedBorderStyle("none")}></i>
                  <i className={`bi bi-dash-lg ${selectedBorderStyle === "solid" ? "selected-icon" : ""}`}
                    onClick={() => setSelectedBorderStyle("solid")}></i>
                  <i className={`bi bi-dash ${selectedBorderStyle === "dashed" ? "selected-icon" : ""}`}
                    onClick={() => setSelectedBorderStyle("dashed")}></i>
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
                    value={borderSize}
                    onChange={e => setBorderSize(e.target.value)}
                  />
                  <span className="px-label">px</span>
                </div>
              </div>
              <div className="parameters-content-line-row">
                <p className="parameters-content-line-title">Color</p>

                <input
                  className="parameters-color-picker"
                  type="color"
                  value={borderColor}
                  onChange={e => setBorderColor(e.target.value)}
                />
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
                onChange={e => setBorderRadius(e.target.value)}

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
