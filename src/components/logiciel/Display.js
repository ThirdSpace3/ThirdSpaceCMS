import React, { useState, useEffect, useRef  } from 'react';
import NavBar from './NavBar';
import TopBar from './TopBar';
import RightBar from './RightBar';
import Canva from './Canva';
import ActualPageParametersBTN from './ActualPageParametersBTN';
import './Display.css';
import { StyleProvider } from './StyleContext'; // Adjust the path as necessary
import TextEditor from '../../test2/TextEditor'
import TemplateTestComponents from '../../templates/TemplateTestComponents';
export default function Display() {
  const [settings, setSettings] = useState({});
  const [selectedElement, setSelectedElement] = useState(null); // Added state for selected element
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  
  const handleSettingsChange = (section, newSettings) => {

    if (!selectedElement) return; // Do nothing if no element is selected
  
    // Ensure settings for the selected element and section exist before attempting to update
    const updatedSettings = {
      ...settings,
      [selectedElement]: {
        ...settings[selectedElement] || {}, // Ensure the selected element's settings exist
        [section]: {
          ...(settings[selectedElement] || {})[section] || {}, // Ensure the section exists
          ...newSettings,
        },
      },
    };
    
    console.log("Updating settings for:", section, "with:", newSettings);
    setSettings(updatedSettings);
    setHasUnsavedChanges(true);
  

  };
  
  
 
  

  return (
    <StyleProvider>
      <TopBar hasUnsavedChanges={hasUnsavedChanges} />
      <div className="displayWrapper">
        <NavBar />
        <div className="displayColumnWrapper">
          <ActualPageParametersBTN />
          <TextEditor settings={settings} selectedElement={selectedElement} setSelectedElement={setSelectedElement} />
          {/* Continue with the rest of your layout */}
        </div>
        <RightBar onSettingsChange={handleSettingsChange} selectedElement={selectedElement} />
      </div>
    </StyleProvider>
  );
}