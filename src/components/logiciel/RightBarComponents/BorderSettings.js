import React, { useState, useEffect, useCallback } from "react";
import { useStyle } from "../../../hooks/StyleContext";
import "../RightBar.css";

export default function BorderSettings({ toggleSection, isOpen, selectedElement }) {
  const [selectedBorderStyle, setSelectedBorderStyle] = useState("solid"); // Default to solid
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderRadius, setBorderRadius] = useState(0);
  const [borderSizes, setBorderSizes] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
  const [activeBorderSide, setActiveBorderSide] = useState("all");
  const isAllSidesSelected = activeBorderSide === "all";

  const { getComponentStyle, updateStyle } = useStyle();

  const loadCurrentStyles = () => {
    if (!selectedElement) return;

    const styles = getComponentStyle(selectedElement);
    if (!styles) return;

    setSelectedBorderStyle( "solid"); // Default to solid
    setBorderColor(styles.borderColor || "#000000");
    setBorderRadius(parseInt(styles.borderRadius, 10) || 0);

    setBorderSizes({
      top: parseInt(styles.borderTopWidth || styles.borderWidth, 10) || 0,
      right: parseInt(styles.borderRightWidth || styles.borderWidth, 10) || 0,
      bottom: parseInt(styles.borderBottomWidth || styles.borderWidth, 10) || 0,
      left: parseInt(styles.borderLeftWidth || styles.borderWidth, 10) || 0,
    });
  };
  const updateBorderSettings = useCallback(() => {
    const borderStyleObject = {
      borderStyle: selectedBorderStyle,
      borderColor: borderColor,
      borderRadius: `${borderRadius}px`,
    };
  
    if (isAllSidesSelected) {
      borderStyleObject.borderWidth = `${borderSizes.top}px`;
    } else {
      ['top', 'right', 'bottom', 'left'].forEach(side => {
        const prop = `border${side.charAt(0).toUpperCase() + side.slice(1)}Width`;
        borderStyleObject[prop] = `${borderSizes[side]}px`;
      });
    }
  
    updateStyle(selectedElement, borderStyleObject);
  }, [selectedBorderStyle, borderSizes, borderColor, borderRadius, selectedElement, isAllSidesSelected]);
  
  useEffect(() => {
    if (!selectedElement) return;
  
    // Load current styles
    loadCurrentStyles();
  
    // Defaulting when new element is selected
    const styles = getComponentStyle(selectedElement);
    if (!styles || !styles.borderStyle) {
      updateStyle(selectedElement, { borderStyle: 'solid', borderWidth: '1px' });
    }
  }, [selectedElement]); // Dependency on selectedElement to detect changes
  
  useEffect(() => {
    // Call updateBorderSettings only if there's a selected element
    if (selectedElement) {
      updateBorderSettings();
    }
  }, [updateBorderSettings, selectedElement]);
  
  
  
  return (
    <div>
      <div className="parameters-wrapper">
        <div className="parameters-wrapper-title-box" onClick={() => toggleSection("border")}>
          <p className="parameters-wrapper-title">Borders</p>
          <i className={`bi bi-caret-down-fill ${isOpen.border ? "rotate" : ""}`}></i>
        </div>
        <div className={`parameters-wrapper-content ${isOpen.border ? "open" : ""}`}>
          <div className="borders-container">
            <div className="borders-selection-icon-parameters">
              <div className="parameters-content-line-row">
                <p className="parameters-content-line-title">Style</p>
                <div className="parameters-content-line-container">
                  <i className={`bi bi-x ${selectedBorderStyle === "none" ? "selected-icon" : ""}`} onClick={() => setSelectedBorderStyle("none")}></i>
                  <i className={`bi bi-dash-lg ${selectedBorderStyle === "solid" ? "selected-icon" : ""}`} onClick={() => setSelectedBorderStyle("solid")}></i>
                  <i className={`bi bi-dash ${selectedBorderStyle === "dashed" ? "selected-icon" : ""}`} onClick={() => setSelectedBorderStyle("dashed")}></i>
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
                    value={isAllSidesSelected ? borderSizes.top : borderSizes[activeBorderSide]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (isAllSidesSelected) {
                        setBorderSizes({ top: value, right: value, bottom: value, left: value });
                      } else {
                        setBorderSizes((prev) => ({ ...prev, [activeBorderSide]: value }));
                      }
                    }}
                  />
                  <span className="px-label">px</span>
                </div>
              </div>
              <div className="parameters-content-line-row">
                <p className="parameters-content-line-title">Color</p>
                <input className="parameters-color-picker" type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
              </div>
              <div className="parameters-content-line-row">
                <p className="parameters-content-line-title">Radius</p>
                <div className="parameters-content-line-container">
                  <input type="number" min="0" max="100" step="1" value={borderRadius} onChange={(e) => setBorderRadius(parseInt(e.target.value, 10))} />
                  <span className="px-label">px</span>
                </div>
              </div>
            </div>
            <div className="borders-selection-icon-box">
              <div className={`borders-selection-icon ${activeBorderSide === "top" ? "active-border-icon" : ""}`} onClick={() => setActiveBorderSide("top")}>
                <img src="./images/borders-top-icon.png" />
              </div>
              <div className="borders-selection-icon-side">
                <div className={`borders-selection-icon ${activeBorderSide === "left" ? "active-border-icon" : ""}`} onClick={() => setActiveBorderSide("left")}>
                  <img src="./images/borders-left-icon.png" />
                </div>
                <div className={`borders-selection-icon ${activeBorderSide === "all" ? "active-border-icon" : ""}`} onClick={() => setActiveBorderSide("all")}>
                  <img src="./images/borders-all-icon.png" />
                </div>
                <div class={`borders-selection-icon ${activeBorderSide === "right" ? "active-border-icon" : ""}`} onClick={() => setActiveBorderSide("right")}>
                  <img src="./images/borders-right-icon.png" />
                </div>
              </div>
              <div className={`borders-selection-icon ${activeBorderSide === "bottom" ? "active-border-icon" : ""}`} onClick={() => setActiveBorderSide("bottom")}>
                <img src="./images/borders-bottom-icon.png" />
              </div>
            </div>
          </div>
        </div>
        <hr className="parameters-wrapper-separation" />
      </div>
    </div>
  );
}
