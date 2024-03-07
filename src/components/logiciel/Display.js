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
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);


  useEffect(() => {
    const fetchSettings = async () => {
      const userWalletID = sessionStorage.getItem('userAccount');
      if (userWalletID) {
        try {
          const response = await fetch(`/api/settings/${userWalletID}`);
          if (response.ok) {
            const data = await response.json();
            if (data && data.settings) {
              console.log("Before update:", settings);
              setSettings(data.settings);
              console.log("After update:", data.settings);

            } else {
              console.log('No settings found for this wallet ID:', userWalletID);
            }
          } else {
            console.error('Failed to fetch settings:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching settings:', error);
        }
      }
    };
  
    fetchSettings();
  }, []);
  
  
  const handleSettingsChange = (section, newSettings) => {
    console.log("Updating settings for:", section, "with:", newSettings);

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
  
    setSettings(updatedSettings);
    setHasUnsavedChanges(true);
  
    // Corrected usage of 'updatedSettings' instead of 'newSettingsObj'
    if (section === 'typography' && newSettings.color) {
      const newColor = newSettings.color;
      const newHistory = [...history];
      newHistory.splice(currentIndex + 1);
      newHistory.push({ ...updatedSettings, typography: { ...updatedSettings[selectedElement].typography, color: newColor } });
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    } else {
      setHistory(prevHistory => {
        const newHistory = [...prevHistory];
        newHistory.splice(currentIndex + 1);
        newHistory.push(updatedSettings);
        setCurrentIndex(newHistory.length - 1);
        return newHistory;
      });
    }
  };
  
  
  
  const handleUndo = () => {
    if (currentIndex > 0) {
      setSettings(history[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setSettings(history[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
  };
  

  const handleSaveClick = async () => {
    console.log('Retrieving wallet ID from session storage');
    const userWalletID = sessionStorage.getItem('userAccount'); // Use sessionStorage to get the user account
    console.log('Retrieved wallet ID:', userWalletID);
  
    const settingsToSave = {
      userId: userWalletID, // Use userId to align with server-side naming
      settings: settings
    };
    console.log('Saving settings with wallet ID:', settingsToSave);
  
    // Send settings to server
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsToSave),
      });
      const responseData = await response.json();
      console.log(responseData.message);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };
  
  

  return (
    <StyleProvider>
      <TopBar onSaveClick={handleSaveClick} onUndoClick={handleUndo} onRedoClick={handleRedo} hasUnsavedChanges={hasUnsavedChanges} />
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