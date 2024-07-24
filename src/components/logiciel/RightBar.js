import React, { useState } from "react";
import "./RightBar.css";
import "../Root.css";
import BorderSettings from "./RightBarComponents/BorderSettings";
import BackgroundSettings from "./RightBarComponents/BackgroundSettings";
import TypographySettings from "./RightBarComponents/TypographySettings";
import { useImageHistory } from '../../hooks/ImageHistoryContext';

export default function RightBar({ walletId, handleSettingsChange, selectedElement, logChange, selectedColor, setSelectedColor, saveSettings }) { // Add saveSettings
  const { addImageToHistory } = useImageHistory();
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
    <div className="rightbar-wrapper">
      <div className="style-wrapper">
        <BorderSettings
          isOpen={isOpen}
          toggleSection={toggleSection}
          onSettingsChange={handleSettingsChange}
          selectedElement={selectedElement}
        />
        <BackgroundSettings
          isOpen={isOpen}
          toggleSection={toggleSection}
          selectedElement={selectedElement}
          logChange={logChange}
          onSettingsChange={handleSettingsChange}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          saveSettings={saveSettings} // Pass saveSettings
        />
        <TypographySettings
          selectedElement={selectedElement}
          toggleSection={toggleSection}
          isOpen={isOpen}
          onSettingsChange={handleSettingsChange}
        />
      </div>
    </div>
  );
}
