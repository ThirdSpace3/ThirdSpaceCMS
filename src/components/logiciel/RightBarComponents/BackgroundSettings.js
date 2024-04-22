import React, { useRef } from "react";
import { useImageHistory } from "../../../hooks/ImageHistoryContext";
import { useStyle } from "../../../hooks/StyleContext";

const BackgroundSettings = ({
  isOpen,
  toggleSection,
}) => {
  const { updateStyle } = useStyle();
  const fileInputRef = useRef(null);
  const { addImageToHistory } = useImageHistory();

  const handleBackgroundChange = (e, property) => {
    const value = property === "backgroundColor" ? e.target.value : `url(${URL.createObjectURL(e.target.files[0])})`;
    updateStyle({ [property]: value });
  };

  return (
    <div className="parameters-wrapper">
      <div className="parameters-wrapper-title-box" onClick={() => toggleSection("background")}>
        <p className="parameters-wrapper-title">Background</p>
      </div>
      <div className={`parameters-wrapper-content ${isOpen ? "open" : ""}`}>
        <div className="parameters-content-line-row">
          <p className="parameters-content-line-title">Color</p>
          <input type="color" onChange={(e) => handleBackgroundChange(e, "backgroundColor")} />
        </div>
        <div className="parameters-content-line-row">
          <p className="parameters-content-line-title">Image</p>
          <label className="custom-file-upload">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleBackgroundChange(e, "backgroundImage")}
            />
            <i className="bi bi-plus"></i>
            <p>Add an Image</p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSettings;
