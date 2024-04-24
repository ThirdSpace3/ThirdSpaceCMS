import React, { useRef, useState } from "react";
import { useImageHistory } from "../../../hooks/ImageHistoryContext";
import { useStyle } from "../../../hooks/StyleContext";

const BackgroundSettings = ({
  isOpen,
  toggleSection,
  selectedElement,
}) => {
  const { updateStyle } = useStyle();
  const fileInputRef = useRef(null);
  const { addImageToHistory } = useImageHistory();

  
  const handleBackgroundChange = (e, property) => {
    const value = property === "backgroundColor" ? e.target.value : `url(${URL.createObjectURL(e.target.files[0])})`;

    if (selectedElement === 'navbar') {
      const navbarElement = document.querySelector('.sss-product-navbar-navbar');
      navbarElement.style.setProperty('background-color', value);
    }

    if (selectedElement === 'header') {
      const headerElement = document.querySelector('.sss-product-hero');
      headerElement.style.setProperty('background-color', value);
    
    }

    if (selectedElement === 'partners') {
      const partnersElement = document.querySelector('.sss-product-partners');
      partnersElement.style.setProperty('background-color', value);
    
    }

    if (selectedElement === 'features') {
      const featuresElement = document.querySelector('.sss-product-features');
      featuresElement.style.setProperty('background-color', value);
    
    }

    if (selectedElement === 'about') {
      const aboutElement = document.querySelector('.sss-product-about');
      aboutElement.style.setProperty('background-color', value);
    
    }
    if (selectedElement === 'joinus') {
      const joinusElement = document.querySelector('.sss-product-joinus-main');
      joinusElement.style.setProperty('background-color', value);
    
    }       
    if (selectedElement === 'footer') {
      const footerElement = document.querySelector('.sss-product-footer');
      footerElement.style.setProperty('background-color', value);
    
    }
    updateStyle(selectedElement, { [property]: value });

    if (property === 'backgroundImage') {
      addImageToHistory(value);
    }
  };

  return (
    <div className="parameters-wrapper">
      <div className="parameters-wrapper-title-box" onClick={() => toggleSection('background')}>
        <p className="parameters-wrapper-title">Background</p>
        <i className={`bi bi-caret-down-fill ${isOpen.background ? "rotate" : ""}`}></i>
      </div>
      <div className={`parameters-wrapper-content ${isOpen.background ? "open" : ""}`}>
        <div className="parameters-content-line-row">
          <p className="parameters-content-line-title">Color</p>
          <input type="color" onChange={(e) => handleBackgroundChange(e, "backgroundColor")} />
        </div>
        <div className="parameters-content-line-row">
          <p className="parameters-content-line-title">Image</p>
          <label className="custom-file-upload">
            <input
              ref={fileInputRef}
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
      <hr className="parameters-wrapper-separation" />
    </div>
  );
};

export default BackgroundSettings;
