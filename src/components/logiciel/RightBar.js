import React, { useState, useEffect } from "react";
import "./RightBar.css";
import "../Root.css";
import { useStyle } from "../../hooks/StyleContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import SizeSection from "./RightBarComponents/SizeSettings";
import SpacingSettings from "./RightBarComponents/SpacingSettings";
import BorderSettings from "./RightBarComponents/BorderSettings";
import BackgroundSettings from "./RightBarComponents/BackgroundSettings";
import TypographySettings from "./RightBarComponents/TypographySettings";
import { useImageHistory } from '../../hooks/ImageHistoryContext';
export default function RightBar({ selectedElement, logChange }) {
  
  const { addImageToHistory } = useImageHistory();

  const [isOpen, setIsOpen] = useState({
    size: true,
    background: true,
    typographie: true,
    border: true,
    logs: true,  // Added a toggle for the Log Viewer

  });  
  const toggleSection = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const onSettingsChange = (elementId, newStyles) => {
    const element = document.getElementById(elementId);
    if (element) {
      // Apply the new styles to the element
      Object.keys(newStyles).forEach(styleKey => {
        const styleValue = newStyles[styleKey];
        if (typeof styleValue === 'object') {
          Object.keys(styleValue).forEach(subKey => {
            element.style[subKey] = styleValue[subKey];
          });
        } else {
          element.style[styleKey] = styleValue;
        }
      });
      logChange(elementId, newStyles);  // Log this change
      console.log(`Styles applied to ${elementId}:`, newStyles);
    } else {
      console.error(`No element found with ID ${elementId}`);
    }
  };
  return (
    <>
      <div className="rightbar-wrapper">
        <div className="style-wrapper">
          {/* Section Size */}

          {/* <SizeSection
            isOpen={isOpen}
            toggleSection={toggleSection}
            onSettingsChange={onSettingsChange}
            selectedElement={selectedElement}
          /> */}

          {/* Section Spacing */}

          {/* <SpacingSettings
            isOpen={isOpen}
            toggleSection={toggleSection}
            onSettingsChange={onSettingsChange}
            selectedElement={selectedElement}

          /> */}

          {/* Section Border */}

          <BorderSettings
            isOpen={isOpen}
            toggleSection={toggleSection}
            onSettingsChange={onSettingsChange}
            selectedElement={selectedElement} // Pass selectedElement as a prop

          />

          {/* Section Background */}

          <BackgroundSettings
            isOpen={isOpen}
            toggleSection={toggleSection}
            selectedElement={selectedElement} // Pass selectedElement as a prop
            logChange={logChange}
            onSettingsChange={logChange}

          />


          {/* Section Typographie */}

          <TypographySettings
            selectedElement={selectedElement}
            toggleSection={toggleSection}
            isOpen={isOpen}
            onSettingsChange={onSettingsChange} // Passing it here
          />

        </div>
      </div>
    </>
  );
}
