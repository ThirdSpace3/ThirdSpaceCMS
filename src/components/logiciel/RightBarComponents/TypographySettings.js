import React, { useState } from "react";
import { useStyle } from "../../../hooks/StyleContext";

function TypographySettings({
  selectedElement,
  toggleSection,
  isOpen,
  handleInputChange,
  selectedDecoration,
  handleTextDecoration,
  selectedAlign,
  handleTextAlign,
}) {
  const [typographyStyle, setTypographyStyle] = useState({});
  const { updateStyle, selectedComponent } = useStyle();

  // Handles typography style changes and updates the context
  const handleTypographyChange = (e, styleProperty) => {
    const value = e.target.value;
    console.log(`Updating typographyStyle with ${styleProperty}: ${value}`);

    setTypographyStyle((prevState) => {
        const updatedTypographyStyle = { ...prevState, [styleProperty]: value };
        updateStyle(selectedComponent, { typography: updatedTypographyStyle }); // Ensure selectedComponent is defined
        console.log(`Updated style for ${selectedComponent || 'no component selected'}:`, { typography: updatedTypographyStyle });
        return updatedTypographyStyle;
    });
};

  return (
    <div className="typography-settings-container">
      <div className="parameters-wrapper">
        <div
          className="parameters-wrapper-title-box"
          onClick={() => toggleSection("typographie")}
        >
          <p className="parameters-wrapper-title">Typographie</p>
          <i className={`bi bi-caret-down-fill ${isOpen.typographie ? "rotate" : ""}`}></i>
        </div>

        <div className={`parameters-wrapper-content ${isOpen.typographie ? "open" : ""}`}>
          <div className="parameters-content-line-row">
            <p className="parameters-content-line-title">Font Family</p>
            <select onChange={(e) => handleTypographyChange(e, "fontFamily")}>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Helvetica">Helvetica</option>
            </select>
          </div>

          <div className="parameters-content-line-row">
            <p className="parameters-content-line-title">Font Weight</p>
            <select onChange={(e) => handleTypographyChange(e, "fontWeight")}>
              <option value="100">Light</option>
              <option value="400">Normal</option>
              <option value="700">Bold</option>
              <option value="900">Extra Bold</option>
            </select>
          </div>

          
          <div className="parameters-content-line-row">
                <p className="parameters-content-line-title">Font Size</p>
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
              type="color"
              defaultValue="#000000"
              onChange={(e) => handleTypographyChange(e, "color")}
            />
          </div>

          <div className="parameters-content-line">
            <p className="parameters-content-line-title">Text Decoration</p>
            <div className="parameters-content-line-container">
              {["italic", "underline", "line-through"].map((decoration) => (
                <a
                  key={decoration}
                  href="#"
                  className={`parameters-content-line-item ${selectedDecoration === decoration ? "selected" : ""}`}
                  onClick={() => handleTextDecoration(decoration)}
                >
                  <i className={`bi bi-type-${decoration}`}></i>
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
                  className={`parameters-content-line-item ${selectedAlign === align ? "selected" : ""}`}
                  onClick={() => handleTextAlign(align)}
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

export default TypographySettings;
