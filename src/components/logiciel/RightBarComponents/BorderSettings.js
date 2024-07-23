import React, { useState, useEffect, useCallback } from "react";
import { useStyle } from "../../../hooks/StyleContext";
import "../RightBar.css";

export default function BorderSettings({ onSettingsChange, toggleSection, isOpen, selectedElement }) {
  const [selectedBorderStyle, setSelectedBorderStyle] = useState("solid"); // Default to solid
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderRadius, setBorderRadius] = useState(0);
  const [borderSizes, setBorderSizes] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
  const [activeBorderSide, setActiveBorderSide] = useState("all");
  const isAllSidesSelected = activeBorderSide === "all";

  const { getComponentStyle, updateStyle } = useStyle();

  const loadCurrentStyles = () => {
    if (!selectedElement) return;

    const element = document.querySelector(selectedElement);
    if (!element) return;

    const styles = getComponentStyle(selectedElement);
    if (!styles) return;

    setSelectedBorderStyle(styles.borderStyle || "solid");
    setBorderColor(styles.borderColor || "#ffffff");

    const computedStyle = window.getComputedStyle(element);
    const radius = computedStyle.borderRadius || styles.borderRadius;
    const parsedBorderRadius = parseInt(radius, 10);
    setBorderRadius(!isNaN(parsedBorderRadius) ? parsedBorderRadius : 0);

    setBorderSizes({
      top: parseInt(styles.borderTopWidth, 10) || 0,
      right: parseInt(styles.borderRightWidth, 10) || 0,
      bottom: parseInt(styles.borderBottomWidth, 10) || 0,
      left: parseInt(styles.borderLeftWidth, 10) || 0
    });
  };
  
  const updateBorderSettings = useCallback(() => {
    const borderStyleObject = {
      borderStyle: selectedBorderStyle,
      borderColor: borderColor
    };

    if (borderRadius > 0) {
      borderStyleObject.borderRadius = `${borderRadius}px`;
    }

    if (isAllSidesSelected) {
      borderStyleObject.borderWidth = `${borderSizes.top}px`;
    } else {
      ['top', 'right', 'bottom', 'left'].forEach(side => {
        const prop = `border${side.charAt(0).toUpperCase() + side.slice(1)}Width`;
        borderStyleObject[prop] = `${borderSizes[side]}px`;
      });
    }

    console.log(`Updating border settings for ${selectedElement}`, borderStyleObject);
    updateStyle(selectedElement, borderStyleObject);
    onSettingsChange(selectedElement, borderStyleObject); // Invoke onSettingsChange here
  }, [selectedBorderStyle, borderSizes, borderColor, borderRadius, selectedElement, isAllSidesSelected, onSettingsChange]);

  useEffect(() => {
    if (!selectedElement) return;

    // Load current styles
    loadCurrentStyles();

    // Defaulting when new element is selected
    const styles = getComponentStyle(selectedElement);
    if (!styles || !styles.borderStyle) {
      updateStyle(selectedElement, { borderStyle: 'solid', borderWidth: '1px' });
    }
  }, [selectedElement, getComponentStyle, updateStyle]); // Dependency on selectedElement to detect changes

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
                    value={isAllSidesSelected ? borderSizes.all : borderSizes[activeBorderSide]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (isAllSidesSelected) {
                        setBorderSizes({ top: value, right: value, bottom: value, left: value });
                      } else {
                        setBorderSizes((prev) => ({ ...prev, [activeBorderSide]: value }));
                      }
                      updateBorderSettings(); // Call updateBorderSettings when value changes
                    }}
                  />
                  <span className="px-label">px</span>
                </div>
              </div>
              <div className="parameters-content-line-row">
                <p className="parameters-content-line-title">Color</p>
                <input className="parameters-color-picker" type="color" value={borderColor} onChange={(e) => {
                  setBorderColor(e.target.value);
                  updateBorderSettings(); // Call updateBorderSettings when value changes
                }} />
              </div>
              <div className="parameters-content-line-row">
                <p className="parameters-content-line-title">Radius</p>
                <div className="parameters-content-line-container">
                  <input type="number" min="0" max="100" step="1" value={borderRadius} onChange={(e) => {
                    setBorderRadius(parseInt(e.target.value, 10));
                    updateBorderSettings(); // Call updateBorderSettings when value changes
                  }} />
                  <span className="px-label">px</span>
                </div>
              </div>
            </div>
            <div className="borders-selection-icon-box">
              <div className={`borders-selection-icon ${activeBorderSide === "top" ? "active-border-icon" : ""}`} onClick={() => setActiveBorderSide("top")}>
                <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Frightbar%2Fborders-top-icon.png?alt=media&token=115d5f29-9523-4e71-8cc7-a64aa5aac7bf" />
              </div>
              <div className="borders-selection-icon-side">
                <div className={`borders-selection-icon ${activeBorderSide === "left" ? "active-border-icon" : ""}`} onClick={() => setActiveBorderSide("left")}>
                  <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Frightbar%2Fborders-left-icon.png?alt=media&token=bbee1697-1a24-42a8-91f3-50e499080a49" />
                </div>
                <div className={`borders-selection-icon ${activeBorderSide === "all" ? "active-border-icon" : ""}`} onClick={() => setActiveBorderSide("all")}>
                  <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Frightbar%2Fborders-all-icon.png?alt=media&token=8d7888b1-adf4-4630-b9a6-ce2623f734db" />
                </div>
                <div className={`borders-selection-icon ${activeBorderSide === "right" ? "active-border-icon" : ""}`} onClick={() => setActiveBorderSide("right")}>
                  <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Frightbar%2Fborders-right-icon.png?alt=media&token=d662d919-13b0-4dfa-83ad-9329e618ffec" />
                </div>
              </div>
              <div className={`borders-selection-icon ${activeBorderSide === "bottom" ? "active-border-icon" : ""}`} onClick={() => setActiveBorderSide("bottom")}>
                <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Frightbar%2Fborders-bottom-icon.png?alt=media&token=ab9d150d-5e6d-4224-8b82-e4a29b8239e6" />
              </div>
            </div>
          </div>
        </div>
        <hr className="parameters-wrapper-separation" />
      </div>
    </div>
  );
}
