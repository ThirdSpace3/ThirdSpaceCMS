import React, { useState, useEffect } from "react";
import { useStyle } from "../../../hooks/StyleContext";

export default function TypographySettings({
  selectedElement,
  toggleSection,
  isOpen,
  selectedDecoration,
  handleTextDecoration,
  selectedAlign,
  handleTextAlign,
  updateStyle, // Use the updateStyle function from the prop
}) {
  const [style, setStyle] = useState({});
  const [fontFamily, setFontFamily] = useState(style.fontFamily);
  const [fontSize, setFontSize] = useState(style.fontSize);
  const [color, setColor] = useState(style.color);

  const handleInputChange = (e, styleProperty, type) => {
    let value = e.target.value;
    if (type === 'select' || type === 'number') {
      setStyle({ ...style, [styleProperty]: value });
      updateStyle(selectedElement, { [styleProperty]: value });
    } else {
      setStyle({ ...style, [styleProperty]: e.target.value });
      updateStyle(selectedElement, { [styleProperty]: e.target.value });
    }
    console.log(`Updating style of ${selectedElement} with ${styleProperty}: ${value}`);
    console.log(`Current font size: ${style.fontSize}`);
  };
  

  useEffect(() => {
    if (selectedElement && selectedElement.id) {
      const element = document.getElementById(selectedElement.id);
      if (element) {
        const elementStyle = window.getComputedStyle(element);

        setStyle({
          fontFamily: elementStyle.fontFamily,
          fontSize: parseInt(elementStyle.fontSize, 10),
          color: elementStyle.color,
        });
      }
    }
  }, [selectedElement]);

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
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Helvetica">Helvetica</option>
                {/* Add more options here */}
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier">Courier</option>
                {/* You can also change the default value like this */}
                <option value="Outfit" selected>Outfit</option>
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
                onClick={() => handleTextDecoration("italic")}
              >
                <i className="bi bi-type-italic"></i>
              </a>
              <hr className="parameters-content-line-separation" />
              <a
                href="#"
                className={`parameters-content-line-item ${selectedDecoration === "underline" ? "selected" : ""
                  }`}
                onClick={() => handleTextDecoration("underline")}
              >
                <i className="bi bi-type-underline"></i>
              </a>
              <hr className="parameters-content-line-separation" />
              <a
                href="#"
                className={`parameters-content-line-item ${selectedDecoration === "line-through" ? "selected" : ""
                  }`}
                onClick={() => handleTextDecoration("line-through")}
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
                className={`parameters-content-line-item ${selectedAlign === "left" ? "selected" : ""
                  }`}
                onClick={() => handleTextAlign("left")}
              >
                <i className="bi bi-text-left"></i>
              </a>

              <hr className="parameters-content-line-separation" />

              <a
                href="#"
                className={`parameters-content-line-item ${selectedAlign === "center" ? "selected" : ""
                  }`}
                onClick={() => handleTextAlign("center")}
              >
                <i className="bi bi-text-center"></i>
              </a>

              <hr className="parameters-content-line-separation" />

              <a
                href="#"
                className={`parameters-content-line-item ${selectedAlign === "right" ? "selected" : ""
                  }`}
                onClick={() => handleTextAlign("right")}
              >
                <i className="bi bi-text-right"></i>
              </a>

              <hr className="parameters-content-line-separation" />

              <a
                href="#"
                className={`parameters-content-line-item ${selectedAlign === "justify" ? "selected" : ""
                  }`}
                onClick={() => handleTextAlign("justify")}
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