import React, { useState, useEffect } from "react";
import { useStyle } from "../../../hooks/StyleContext";

export default function TypographySettings({
  selectedElement,
  toggleSection,
  isOpen,
  onSettingsChange,
}) {
  const [typographyStyle, setTypographyStyle] = useState({});
  const [selectedDecorations, setSelectedDecorations] = useState({
    italic: false,
    underline: false,
    lineThrough: false,
  });

  const { updateStyle } = useStyle();

  const handleTextAlign = (alignType) => {
    const newStyle = {
      ...typographyStyle,
      textAlign: alignType,
    };
    setTypographyStyle(newStyle);
    onSettingsChange(selectedElement, { typography: newStyle });
    localStorage.setItem(`typographySettings-${selectedElement}`, JSON.stringify(newStyle));
  };

  function rgbToHex(rgb) {
    if (!rgb || !/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/.test(rgb)) {
      return "#000000";
    }
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    return (
      "#" +
      ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
    );
  }
  
  const handleInputChange = (e, styleProperty, type) => {
    const value = type === "number" ? parseInt(e.target.value, 10) : e.target.value;
    const newStyle = { ...typographyStyle, [styleProperty]: value };
    setTypographyStyle(newStyle);
    updateStyle(selectedElement, newStyle);
  };

  const handleTextDecoration = (decorationType) => {
    const newDecorations = { ...selectedDecorations };
    newDecorations[decorationType] = !newDecorations[decorationType];
    
    const newStyle = {
      ...typographyStyle,
      fontStyle: newDecorations.italic ? "italic" : "normal",
      textDecoration: `${newDecorations.underline ? "underline " : ""}${newDecorations.lineThrough ? "line-through" : ""}`.trim(),
    };

    setSelectedDecorations(newDecorations);
    setTypographyStyle(newStyle);
    updateStyle(selectedElement, newStyle);
    onSettingsChange(selectedElement, { typography: newStyle });
    localStorage.setItem(`typographySettings-${selectedElement}`, JSON.stringify(newStyle));
  };

  useEffect(() => {
    const element = document.getElementById(selectedElement);
    if (element) {
      const computedStyle = window.getComputedStyle(element);
      const initialSettings = {
        fontFamily: computedStyle.fontFamily.replace(/['"]/g, ""),
        fontWeight: computedStyle.fontWeight,
        fontSize: computedStyle.fontSize.replace("px", ""),
        color: computedStyle.color,
        textAlign: computedStyle.textAlign,
        fontStyle: computedStyle.fontStyle.includes("italic") ? "italic" : "normal",
        textDecoration: computedStyle.textDecoration.includes("underline")
          ? "underline"
          : computedStyle.textDecoration.includes("line-through")
          ? "line-through"
          : "none",
      };

      setTypographyStyle(initialSettings);
      setSelectedDecorations({
        italic: initialSettings.fontStyle === "italic",
        underline: initialSettings.textDecoration.includes("underline"),
        lineThrough: initialSettings.textDecoration.includes("line-through"),
      });
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
            className={`bi bi-caret-down-fill ${
              isOpen.typographie ? "rotate" : ""
            }`}
          ></i>
        </div>
        <div
          className={`parameters-wrapper-content ${
            isOpen.typographie ? "open" : ""
          }`}
        >
          <div className="parameters-content-line-row">
            <p className="parameters-content-line-title">Font Family</p>
            <div className="font-family-dropdown">
              <select
                value={typographyStyle.fontFamily || "DefaultFontFamily"}
                onChange={(e) => handleInputChange(e, "fontFamily", "select")}
              >
                <option value="Outfit">Outfit</option>
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier">Courier</option>
              </select>
            </div>
          </div>

          <div className="parameters-content-line-row">
            <p className="parameters-content-line-title">Font Weight</p>
            <div className="font-family-dropdown">
              <select
                value={typographyStyle.fontWeight || "400"}
                onChange={(e) => handleInputChange(e, "fontWeight", "select")}
              >
                <option value="100">Thin</option>
                <option value="200">Extra Light</option>
                <option value="300">Light</option>
                <option value="400">Normal</option>
                <option value="500">Medium</option>
                <option value="600">Semi Bold</option>
                <option value="700">Bold</option>
                <option value="800">Extra Bold</option>
                <option value="900">Black</option>
              </select>
            </div>
          </div>

          <div className="parameters-content-line-row">
            <p class="parameters-content-line-title">Font Size</p>
            <div className="parameters-content-line-container">
              <input
                type="number"
                min="8"
                max="72"
                step="1"
                value={typographyStyle.fontSize}
                onChange={(e) => handleInputChange(e, "fontSize", "number")}
              />
              <span className="px-label">px</span>
            </div>
          </div>

          <div className="parameters-content-line-row">
            <p className="parameters-content-line-title">Color</p>
            <input
              type="color"
              value={typographyStyle.color ? rgbToHex(typographyStyle.color) : "#000000"}
              onChange={(e) => {
                handleInputChange(e, "color");
                document.documentElement.style.setProperty('--header-text-color', e.target.value);
              }}
            />
          </div>

          <div className="parameters-content-line">
            <p className="parameters-content-line-title">Text Decoration</p>
            <div className="parameters-content-line-container">
              {["italic", "underline", "lineThrough"].map((type) => (
                <a
                  href="#"
                  key={type}
                  className={`parameters-content-line-item ${
                    selectedDecorations[type] ? "rightbar-selected" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTextDecoration(type);
                  }}
                >
                  <i
                    className={`bi bi-type-${type === "lineThrough" ? "strikethrough" : type} ${
                      selectedDecorations[type] ? "rightbar-selected" : ""
                    }`}
                  ></i>
                </a>
              ))}
            </div>
          </div>

          <div className="parameters-content-line">
            <p className="parameters-content-line-title">Text Align</p>
            <div className="parameters-content-line-container">
              {["left", "center", "right", "justify"].map((align) => (
                <a
                  key={align}
                  href="#"
                  className={`parameters-content-line-item ${
                    typographyStyle.textAlign === align ? "rightbar-selected" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTextAlign(align);
                  }}
                >
                  <i
                    className={`bi bi-text-${align} ${
                      typographyStyle.textAlign === align ? "rightbar-selected" : ""
                    }`}
                  ></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        <hr className="parameters-wrapper-separation" />
      </div>
    </div>
  );
}
