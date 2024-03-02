import React, { useState } from 'react';
import NavBar from './NavBar';
import TopBar from './TopBar';
import RightBar from './RightBar';
import Canva from './Canva';
import ActualPageParametersBTN from './ActualPageParametersBTN';
import './Display.css';

export default function Display() {
  const [settings, setSettings] = useState({});

  const handleSettingsChange = (section, newSettings) => {
    setSettings(prevSettings => ({ ...prevSettings, [section]: { ...prevSettings[section], ...newSettings } }));
  };

  return (
    <>
      <TopBar />
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
