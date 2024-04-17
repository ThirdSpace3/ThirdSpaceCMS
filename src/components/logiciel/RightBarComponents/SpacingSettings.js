import React, { useState } from "react";
import "../RightBar.css";

export default function SpacingSettings({
  toggleSection,
  isOpen,
  selectedElement,
  updateStyle,
  onSettingsChange,
}) {
  const [marginStyle, setMarginStyle] = useState({
    top: "",
    right: "",
    bottom: "",
    left: "",
  });

  const [paddingStyle, setPaddingStyle] = useState({
    top: "",
    right: "",
    bottom: "",
    left: "",
  });
  const [marginTopInput, setMarginTopInput] = useState("");
  const [marginRightInput, setMarginRightInput] = useState("");
  const [marginBottomInput, setMarginBottomInput] = useState("");
  const [marginLeftInput, setMarginLeftInput] = useState("");
  const [paddingTopInput, setPaddingTopInput] = useState("");
  const [paddingRightInput, setPaddingRightInput] = useState("");
  const [paddingBottomInput, setPaddingBottomInput] = useState("");
  const [paddingLeftInput, setPaddingLeftInput] = useState("");

  const handleSpacingChange = (e, styleProperty, styleType) => {
    if (styleType === "margin") {
      setMarginStyle((prevState) => ({
        ...prevState,
        [styleProperty]: e.target.value,
      }));
    } else if (styleType === "padding") {
      setPaddingStyle((prevState) => ({
        ...prevState,
        [styleProperty]: e.target.value,
      }));
    }
    updateStyle({ [styleProperty]: e.target.value });
  };

  return (
    <div>
      <div className="parameters-wrapper">
        <div
          className="parameters-wrapper-title-box"
          onClick={() => toggleSection("spacing")}
        >
          <p className="parameters-wrapper-title">Spacing</p>
          <i
            className={`bi bi-caret-down-fill ${
              isOpen.spacing ? "rotate" : ""
            }`}
          ></i>
        </div>

        <div
          className={`parameters-wrapper-content ${
            isOpen.spacing ? "open" : ""
          }`}
        >
          <div className="spacing-margin-box">
            <div className="spacing-margin-top-box">
              <div className="spacing-separator-1"></div>
              <div className="spacing-margin-top">
                <input className="spacing-input" placeholder="0" />
              </div>
              <div className="spacing-separator-2"></div>
              <p className="spacing-label">Exterior</p>
            </div>
            <div className="spacing-margin-sides">
              <div className="spacing-margin-sides-left">
                <input className="spacing-input" placeholder="0" />
              </div>

              {/* ===PADDING=== */}

              <div className="spacing-padding-box">
                <div className="spacing-padding-top-box">
                  <div className="spacing-separator-1"></div>
                  <div className="spacing-padding-top">
                    <input className="spacing-input" placeholder="0" />
                  </div>
                  <div className="spacing-separator-2"></div>
                  <p className="spacing-label">Interior</p>
                </div>
                <div className="spacing-padding-sides">
                  <div className="spacing-padding-sides-left">
                    <input className="spacing-input" placeholder="0" />
                  </div>

                  {/* ===BLANK=== */}

                  <div className="spacing-padding-sides-right">
                    <input className="spacing-input" placeholder="0" />
                  </div>
                </div>
                <div className="spacing-padding-bottom-box">
                  <div className="spacing-separator-3"></div>
                  <div className="spacing-padding-bottom">
                    <input className="spacing-input" placeholder="0" />
                  </div>
                  <div className="spacing-separator-4"></div>
                </div>
              </div>

              {/* ===FIN PADDING=== */}

              <div className="spacing-margin-sides-right">
                <input className="spacing-input" placeholder="0" />
              </div>
            </div>
            <div className="spacing-margin-top-box">
              <div className="spacing-separator-3"></div>
              <div className="spacing-margin-bottom">
                <input className="spacing-input" placeholder="0" />
              </div>
              <div className="spacing-separator-4"></div>
            </div>
          </div>

          <div className="parameters-content-line">
            <p className="parameters-content-line-title">Margin Top</p>
            <div className="parameters-content-line-container">
              <input
                type="text"
                value={marginTopInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setMarginTopInput(value);
                  const numericValue = value.match(/\d+/);
                  setMarginStyle({
                    ...marginStyle,
                    top: numericValue ? numericValue[0] + "px" : "",
                  });
                  onSettingsChange(selectedElement, { margin: marginStyle });
                }}
              />
              <span className="px-label">px</span>
            </div>
          </div>

          <div className="parameters-content-line">
            <p className="parameters-content-line-title">Margin Right</p>
            <div className="parameters-content-line-container">
              <input
                type="text"
                value={marginRightInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setMarginRightInput(value);
                  const numericValue = value.match(/\d+/);
                  setMarginStyle({
                    ...marginStyle,
                    right: numericValue ? numericValue[0] + "px" : "",
                  });
                  onSettingsChange(selectedElement, { margin: marginStyle });
                }}
              />
              <span className="px-label">px</span>
            </div>
          </div>

          <div className="parameters-content-line">
            <p className="parameters-content-line-title">Margin Bottom</p>
            <div className="parameters-content-line-container">
              <input
                type="text"
                value={marginBottomInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setMarginBottomInput(value);
                  const numericValue = value.match(/\d+/);
                  setMarginStyle({
                    ...marginStyle,
                    bottom: numericValue ? numericValue[0] + "px" : "",
                  });
                  onSettingsChange(selectedElement, { margin: marginStyle });
                }}
              />
              <span className="px-label">px</span>
            </div>
          </div>

          <div className="parameters-content-line">
            <p className="parameters-content-line-title">Margin Left</p>
            <div className="parameters-content-line-container">
              <input
                type="text"
                value={marginLeftInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setMarginLeftInput(value);
                  const numericValue = value.match(/\d+/);
                  setMarginStyle({
                    ...marginStyle,
                    left: numericValue ? numericValue[0] + "px" : "",
                  });
                  onSettingsChange(selectedElement, { margin: marginStyle });
                }}
              />
              <span className="px-label">px</span>
            </div>
          </div>

          <div className="parameters-content-line">
            <p className="parameters-content-line-title">Padding Top</p>
            <div className="parameters-content-line-container">
              <input
                type="text"
                value={paddingTopInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setPaddingTopInput(value);
                  const numericValue = value.match(/\d+/);
                  setPaddingStyle({
                    ...paddingStyle,
                    top: numericValue ? numericValue[0] + "px" : "",
                  });
                  onSettingsChange(selectedElement, { padding: paddingStyle });
                }}
              />
              <span className="px-label">px</span>
            </div>
          </div>

          <div className="parameters-content-line">
            <p className="parameters-content-line-title">Padding Right</p>
            <div className="parameters-content-line-container">
              <input
                type="text"
                value={paddingRightInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setPaddingRightInput(value);
                  const numericValue = value.match(/\d+/);
                  setPaddingStyle({
                    ...paddingStyle,
                    right: numericValue ? numericValue[0] + "px" : "",
                  });
                  onSettingsChange(selectedElement, { padding: paddingStyle });
                }}
              />
              <span className="px-label">px</span>
            </div>
          </div>

          <div className="parameters-content-line">
            <p className="parameters-content-line-title">Padding Bottom</p>
            <div className="parameters-content-line-container">
              <input
                type="text"
                value={paddingBottomInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setPaddingBottomInput(value);
                  const numericValue = value.match(/\d+/);
                  setPaddingStyle({
                    ...paddingStyle,
                    bottom: numericValue ? numericValue[0] + "px" : "",
                  });
                  onSettingsChange(selectedElement, { padding: paddingStyle });
                }}
              />
              <span className="px-label">px</span>
            </div>
          </div>

          <div className="parameters-content-line">
            <p className="parameters-content-line-title">Padding Left</p>
            <div className="parameters-content-line-container">
              <input
                type="text"
                value={paddingLeftInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setPaddingLeftInput(value);
                  const numericValue = value.match(/\d+/);
                  setPaddingStyle({
                    ...paddingStyle,
                    left: numericValue ? numericValue[0] + "px" : "",
                  });
                  onSettingsChange(selectedElement, { padding: paddingStyle });
                }}
              />
              <span className="px-label">px</span>
            </div>
          </div>

          {/* Repeat for margin-right, margin-bottom, margin-left, padding-top, padding-right, padding-bottom, padding-left */}
        </div>

        <hr className="parameters-wrapper-separation" />
      </div>
    </div>
  );
}
