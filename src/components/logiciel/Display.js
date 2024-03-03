import React, { useState, useEffect, useRef  } from 'react';
import NavBar from './NavBar';
import TopBar from './TopBar';
import RightBar from './RightBar';
import Canva from './Canva';
import ActualPageParametersBTN from './ActualPageParametersBTN';
import './Display.css';

export default function Display() {
  const [settings, setSettings] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const settingsRef = useRef(settings);


  useEffect(() => {
    // Load the settings from local storage when the component mounts
    const storedSettings = sessionStorage.getItem('settings');
  if (storedSettings) {
    setSettings(JSON.parse(storedSettings));
  }
  }, []);
  
  const handleSettingsChange = (section, newSettings) => {
    const newSettingsObj = {
      ...settings,
      [section]: {
        ...settings[section],
        ...newSettings,
      },
    };
  
    setSettings(newSettingsObj);
    setHasUnsavedChanges(true);
  
    if (section === 'typography' && newSettings.color) {
      const newColor = newSettings.color;
      const newHistory = [...history];
      newHistory.splice(currentIndex + 1);
      newHistory.push({ ...newSettingsObj, typography: { ...newSettingsObj.typography, color: newColor } });
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    } else {
      setHistory(prevHistory => {
        const newHistory = [...prevHistory];
        newHistory.splice(currentIndex + 1);
        newHistory.push(newSettingsObj);
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
  

  const handleSaveClick = () => {
    console.log('Retrieving wallet ID from session storage');
    const userWalletID = sessionStorage.getItem('userAccount'); // Use sessionStorage to get the user account
    console.log('Retrieved wallet ID:', userWalletID);
  
    const settingsToSave = {
      walletId: userWalletID, // Include the wallet ID in the settings object
      ...settings
    };
    console.log('Saving settings with wallet ID:', settingsToSave);
  
    // Save the settings in session storage
    sessionStorage.setItem('settings', JSON.stringify(settingsToSave));
    setHasUnsavedChanges(false);
  };
  

  return (
    <>
<TopBar onSaveClick={handleSaveClick} onUndoClick={handleUndo} onRedoClick={handleRedo} hasUnsavedChanges={hasUnsavedChanges} />
      <div className="displayWrapper">
        <NavBar />
        <div className="displayColumnWrapper">
          <ActualPageParametersBTN />
          <Canva settings={settings} /> {/* Pass the settings to the Canva component */}
        </div>
        <RightBar onSettingsChange={handleSettingsChange} /> {/* Pass the handleSettingsChange to the RightBar component */}
      </div>
    </>
  );
}
