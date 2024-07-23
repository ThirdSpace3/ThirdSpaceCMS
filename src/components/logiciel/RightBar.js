import React, { useState } from "react";
import "./RightBar.css";
import "../Root.css";
import BorderSettings from "./RightBarComponents/BorderSettings";
import BackgroundSettings from "./RightBarComponents/BackgroundSettings";
import TypographySettings from "./RightBarComponents/TypographySettings";
import { useImageHistory } from '../../hooks/ImageHistoryContext';

export default function RightBar({ walletId, handleSettingsChange, selectedElement, logChange, selectedColor, setSelectedColor }) {
  const { addImageToHistory } = useImageHistory();
  console.log(walletId);
  const [isOpen, setIsOpen] = useState({
    size: true,
    background: true,
    typographie: true,
    border: true,
    logs: true,
  });

  const toggleSection = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <>
      <div className="rightbar-wrapper">
        <div className="style-wrapper">
          {/* Section Size */}
          {/* <SizeSection
            isOpen={isOpen}
            toggleSection={toggleSection}
            onSettingsChange={handleSettingsChange}
            selectedElement={selectedElement}
          /> */}

          {/* Section Spacing */}
          {/* <SpacingSettings
            isOpen={isOpen}
            toggleSection={toggleSection}
            onSettingsChange={handleSettingsChange}
            selectedElement={selectedElement}
          /> */}
 
          {/* Section Border */}
          <BorderSettings
            isOpen={isOpen}
            toggleSection={toggleSection}
            onSettingsChange={handleSettingsChange}
            selectedElement={selectedElement}
          />

          {/* Section Background */}
          <BackgroundSettings
            isOpen={isOpen}
            toggleSection={toggleSection}
            selectedElement={selectedElement}
            logChange={logChange}
            onSettingsChange={handleSettingsChange}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />

          {/* Section Typographie */}
          <TypographySettings
            selectedElement={selectedElement}
            toggleSection={toggleSection}
            isOpen={isOpen}
            onSettingsChange={handleSettingsChange}
          />
        </div>
      </div>
    </>
  );
}
