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
    const newStyle = {
      ...typographyStyle,
      textAlign: alignType,
    };
    setTypographyStyle(newStyle);
    onSettingsChange(selectedElement, { typography: newStyle });

    // Store the new settings in localStorage
    localStorage.setItem(`typographySettings-${selectedElement}`, JSON.stringify(newStyle));
  };

  function rgbToHex(rgb) {
    // This will convert an RGB color format to HEX
    if (!rgb) return '#000000'; // default to black if undefined
    let [r, g, b] = rgb.match(/\d+/g).map(Number);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }


  const handleInputChange = (e, styleProperty, type) => {
    const value = type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
    console.log(`Updating style of ${selectedElement} with ${styleProperty}: ${value}`);
    const newStyle = { [styleProperty]: value, styleProperty, type };
    updateStyle(selectedElement, newStyle); // Update using the context method
    onSettingsChange(selectedElement, newStyle); // Also propagate this change via callback

    // Store the new settings in localStorage
    const newTypographyStyle = { ...typographyStyle, [styleProperty]: value };
    localStorage.setItem(`typographySettings-${selectedElement}`, JSON.stringify(newTypographyStyle));
  };


  const handleTextDecoration = (decorationType) => {
    const newStyle = { ...typographyStyle };
    switch (decorationType) {
      case "italic":
        newStyle.fontStyle = typographyStyle.fontStyle === "italic" ? "normal" : "italic";
        break;
      case "underline":
        newStyle.textDecoration = typographyStyle.textDecoration === "underline" ? "none" : "underline";
        break;
      case "line-through":
        newStyle.textDecoration = typographyStyle.textDecoration === "line-through" ? "none" : "line-through";
        break;
    }
    setTypographyStyle(newStyle);
    updateStyle(selectedElement, newStyle); // Assuming updateStyle accepts an object
    onSettingsChange(selectedElement, { typography: newStyle });
    localStorage.setItem(`typographySettings-${selectedElement}`, JSON.stringify(newStyle));
  };
  

  useEffect(() => {
    const element = document.getElementById(selectedElement);
    if (element) {
      const computedStyle = window.getComputedStyle(element);
      const initialSettings = {
        fontFamily: computedStyle.fontFamily.replace(/['"]/g, ""), // Normalize font family
        fontWeight: computedStyle.fontWeight,
        fontSize: computedStyle.fontSize.replace("px", ""), // Strip 'px' to make it a pure number
        color: computedStyle.color,
        textAlign: computedStyle.textAlign,
        fontStyle: computedStyle.fontStyle.includes("italic") ? "italic" : "normal",
        textDecoration: computedStyle.textDecoration.includes("underline") ? "underline" : (computedStyle.textDecoration.includes("line-through") ? "line-through" : "none"),
      };

      setTypographyStyle(initialSettings);
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
              <select value={typographyStyle.fontFamily || 'DefaultFontFamily'} onChange={(e) => handleInputChange(e, "fontFamily", "select")}>
                <option value="Outfit" default >Outfit</option>
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
                value={typographyStyle.fontWeight || '400'} // Default to 'normal' weight
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
            <p className="parameters-content-line-title">Font Size</p>
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
              value={typographyStyle.color ? rgbToHex(typographyStyle.color) : '#000000'} // default to black if no color is set
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
    {['left', 'center', 'right', 'justify'].map((align) => (
      <a
        key={align}
        href="#"
        className={`parameters-content-line-item ${typographyStyle.textAlign === align ? "selected" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          handleTextAlign(align);
        }}
      >
        <i className={`bi bi-text-${align}`}></i>
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