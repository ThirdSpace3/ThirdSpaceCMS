import React, { useState, useContext, useEffect } from "react";
import "../RightBar.css";
import { useStyle } from "../../../hooks/StyleContext";

export default function BorderSettings({
  toggleSection,
  isOpen,
  selectedElement,
}) {
  const [selectedBorderStyle, setSelectedBorderStyle] = useState("none");
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderRadius, setBorderRadius] = useState(0);

  // Add state variables for tracking the active border side and whether all sides are selected
  const [activeBorderSide, setActiveBorderSide] = useState("all");
  const isAllSidesSelected = activeBorderSide === "all";

  // Updated the border size state variables to a single object that stores the size for each side
  const [borderSizes, setBorderSizes] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const { updateStyle } = useStyle(); // Get the function to update the style

  // Function to update the border size for a specific side
  const handleBorderSizeChange = (side, value) => {
    setBorderSizes({
      ...borderSizes,
      [side]: value,
    });
  };

  // Function to handle the "all" border side selection
  const handleAllBorderSizeChange = (value) => {
    setBorderSizes({
      top: value,
      right: value,
      bottom: value,
      left: value,
    });
  };

  // Refactored the updateBorderSettings function to handle the new border size object
  const updateBorderSettings = () => {
    const borderStyleObject = {};

    if (isAllSidesSelected) {
      borderStyleObject.borderWidth = `${borderSizes.top}px`;
    } else {
      borderStyleObject.borderTopWidth = `${borderSizes.top}px`;
      borderStyleObject.borderRightWidth = `${borderSizes.right}px`;
      borderStyleObject.borderBottomWidth = `${borderSizes.bottom}px`;
      borderStyleObject.borderLeftWidth = `${borderSizes.left}px`;
    }

    updateStyle(selectedElement, {
      borderStyle: selectedBorderStyle,
      ...borderStyleObject,
      borderColor: borderColor,
      borderRadius: `${borderRadius}px`,
    });
  };

  useEffect(() => {
    updateBorderSettings();
  }, [selectedBorderStyle, borderSizes, borderColor, borderRadius]); // Include borderSizes in dependency array

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
              <div
                className={`borders-selection-icon ${
                  isAllSidesSelected || activeBorderSide === "top"
                    ? "active-border-icon"
                    : ""
                }`}
                onClick={() => setActiveBorderSide("top")}
              >
                <img
                  src="./images/borders-top-icon.png"
                  style={{ color: "white" }}
                />
              </div>

              <div className="borders-selection-icon-side">
                <div
                  className={`borders-selection-icon ${
                    activeBorderSide === "left" ? "active-border-icon" : ""
                  }`}
                  onClick={() => setActiveBorderSide("left")}
                >
                  <img
                    src="./images/borders-left-icon.png"
                    style={{ color: "white" }}
                  />
                </div>
                <div
                  className={`borders-selection-icon ${
                    isAllSidesSelected ? "active-border-icon" : ""
                  }`}
                  onClick={() => setActiveBorderSide("all")}
                >
                  <img
                    src="./images/borders-all-icon.png"
                    style={{ color: "white" }}
                  />
                </div>
                <div
                  className={`borders-selection-icon ${
                    activeBorderSide === "right" ? "active-border-icon" : ""
                  }`}
                  onClick={() => setActiveBorderSide("right")}
                >
                  <img
                    src="./images/borders-right-icon.png"
                    style={{ color: "white" }}
                  />
                </div>
              </div>

              <div
                className={`borders-selection-icon ${
                  isAllSidesSelected || activeBorderSide === "bottom"
                    ? "active-border-icon"
                    : ""
                }`}
                onClick={() => setActiveBorderSide("bottom")}
              >
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
                    value={
                      isAllSidesSelected
                        ? borderSizes.top
                        : borderSizes[activeBorderSide]
                    }
                    onChange={(e) => {
                      if (isAllSidesSelected) {
                        handleAllBorderSizeChange(e.target.value);
                      } else {
                        handleBorderSizeChange(activeBorderSide, e.target.value);
                      }
                    }}
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
