import React, { useState, useEffect } from "react";
import { useStyle } from "../../../hooks/StyleContext";

export default function TypographySettings({
  selectedElement,
  toggleSection,
  isOpen,
  onSettingsChange,

}) {
  const [style, setStyle] = useState({});
  const [typographyStyle, setTypographyStyle] = useState({});
  const [selectedAlign, setSelectedAlign] = useState(null);
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const { updateStyle } = useStyle(); // Get the function to update the style

  const handleTextAlign = (alignType) => {
    if (selectedElement) {
      const newStyle = {
        fontFamily: typographyStyle.fontFamily,
        fontSize: typographyStyle.fontSize,
        color: typographyStyle.color,
        fontStyle: typographyStyle.fontStyle,
        textDecoration: typographyStyle.textDecoration,
        textAlign: alignType,
      };
      setTypographyStyle(newStyle);
      onSettingsChange(selectedElement, { typography: newStyle });
    }
  };

  const handleInputChange = (e, styleProperty, type) => {
    const value = type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
    console.log(`Updating style of ${selectedElement} with ${styleProperty}: ${value}`);
    updateStyle(selectedElement, { [styleProperty]: value });
  };

  const handleTextDecoration = (decorationType) => {
    console.log(`handleTextDecoration called with type: ${decorationType} for ${selectedElement}`);
    const element = document.getElementById(selectedElement);
    if (element) {
      const currentStyle = window.getComputedStyle(element);
      let newStyle = { textDecoration: currentStyle.textDecoration };
      switch (decorationType) {
        case "italic":
          newStyle.fontStyle = currentStyle.fontStyle === "italic" ? "normal" : "italic";
          break;
        case "underline":
          newStyle.textDecoration = currentStyle.textDecoration.includes("underline") ? "none" : "underline";
          break;
        case "line-through":
          newStyle.textDecoration = currentStyle.textDecoration.includes("line-through") ? "none" : "line-through";
          break;
        default:
          break;
      }
      console.log(`Applying new typography style for ${selectedElement}:`, newStyle);
      setStyle({...style, [selectedElement]: {...style[selectedElement], ...newStyle}});
      console.log(`About to update styles for ${selectedElement} with:`, newStyle);
      onSettingsChange(selectedElement, newStyle);
    } else {
      console.error(`No element found with ID: ${selectedElement}`);
    }
  };

  return (
    <div>
      <div className="parameters-wrapper">
        <div
          className="parameters-wrapper-title-box"
          onClick={() => toggleSection("typographie")}
        >
          <p className="parameters-wrapper-title">Typographie</p>
          <i
            className={`bi bi-caret-down-fill ${isOpen.typographie ? "rotate" : ""
              }`}
          ></i>
        </div>
        <div
          className={`parameters-wrapper-content ${isOpen.typographie ? "open" : ""
            }`}
        >
          <div className="parameters-content-line-row">
            <p className="parameters-content-line-title">Font Family</p>
            <div className="font-family-dropdown">
              <select onChange={(e) => handleInputChange(e, "fontFamily", "select")}>
              <option value="Outfit" selected>Outfit</option>

                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Helvetica">Helvetica</option>
                {/* Add more options here */}
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier">Courier</option>
                {/* You can also change the default value like this */}
              </select>

            </div>
          </div>

          <div className="parameters-content-line-row">
            <p className="parameters-content-line-title">Font Weight</p>
            <div className="font-family-dropdown">
              <select
                onChange={(e) => handleInputChange(e, "fontWeight", "select")}
              >
                <option value="100">Light</option>
                <option value="500">Normal</option>
                <option value="800">Bold</option>
                <option value="1000">Extra Bold</option>
              </select>
            </div>
          </div>

          <div className="parameters-content-line-row">
            <p className="parameters-content-line-title">Font Size</p>
            <div className="parameters-content-line-container">
              <input
                type="number"
                min="8"
                max="72"
                step="1"
                defaultValue="14"
                onChange={(e) => handleInputChange(e, "fontSize", "number")}
              />
              <span className="px-label">px</span>
            </div>
          </div>

          <div className="parameters-content-line-row">
            <p className="parameters-content-line-title">Color</p>
            <input
              type="color"
              onChange={(e) => handleInputChange(e, "color")}
            />
          </div>

          <div className="parameters-content-line">
            <p className="parameters-content-line-title">Text Decoration</p>
            <div className="parameters-content-line-container">
              <a
                href="#"
                className={`parameters-content-line-item ${selectedDecoration === "italic" ? "selected" : ""
                  }`}
                onClick={(e) => {
                  e.preventDefault(); // This will prevent the default link behavior
                  handleTextDecoration("italic");
                }}
              >
                <i className="bi bi-type-italic"></i>
              </a>
              <hr className="parameters-content-line-separation" />
              <a href="#" className={`parameters-content-line-item ${selectedDecoration === "underline" ? "selected" : ""}`}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link behavior
                  handleTextDecoration("underline");
                }}>
                <i className="bi bi-type-underline"></i>
              </a>

              <hr className="parameters-content-line-separation" />
              <a
                href="#"
                className={`parameters-content-line-item ${selectedDecoration === "line-through" ? "selected" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleTextDecoration("line-through");
                }}
              >
                <i className="bi bi-type-strikethrough"></i>
              </a>
            </div>
          </div>
          <div className="parameters-content-line">
            <p className="parameters-content-line-title">Text Align</p>
            <div className="parameters-content-line-container">
              <a
                href="#"
                className={`parameters-content-line-item ${selectedAlign === "left" ? "selected" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleTextAlign("left");
                }}
              >
                <i className="bi bi-text-left"></i>
              </a>

              <hr className="parameters-content-line-separation" />

              <a
                href="#"
                className={`parameters-content-line-item ${selectedAlign === "center" ? "selected" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleTextAlign("center");
                }}
              >
                <i className="bi bi-text-center"></i>
              </a>

              <hr className="parameters-content-line-separation" />

              <a
                href="#"
                className={`parameters-content-line-item ${selectedAlign === "right" ? "selected" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleTextAlign("right");
                }}
              >
                <i className="bi bi-text-right"></i>
              </a>

              <hr className="parameters-content-line-separation" />

              <a
                href="#"
                className={`parameters-content-line-item ${selectedAlign === "justify" ? "selected" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleTextAlign("justify");
                }}
              >
                <i className="bi bi-justify"></i>
              </a>
            </div>
          </div>
        </div>
        <hr className="parameters-wrapper-separation" />
      </div>
    </div>
  );
}