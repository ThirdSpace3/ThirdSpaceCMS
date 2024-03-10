import React, { useState, useEffect, useRef } from 'react';
import NavBar from './NavBar';
import TopBar from './TopBar';
import RightBar from './RightBar';
import Canva from './Canva';
import ActualPageParametersBTN from './ActualPageParametersBTN';
import './Display.css';
import { StyleProvider } from './StyleContext';
import Template1OnDo from '../../templates/Template1OnDo';
import Template2ImageOnDo from '../../templates/Template2ImageOnDo';
import axios from 'axios';

export default function Display() {
  const [settings, setSettings] = useState({});
  const [selectedElement, setSelectedElement] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeEditor, setActiveEditor] = useState('Template1OnDo'); // Set the default editor to TextEditor

  
  const handleSettingsChange = (section, newSettings) => {
    if (!selectedElement) return; // Guard clause if no element is selected
  
    const updatedSettings = {
      ...settings,
      [selectedElement]: {
        ...settings[selectedElement] || {},
        [section]: {
          ...((settings[selectedElement] || {})[section] || {}),
          ...newSettings,
        },
      },
    };
  
    console.log("Updating settings for:", section, "with:", newSettings);
    setSettings(updatedSettings);
    setHasUnsavedChanges(true);
  };
  

 // This function is to be called when the "Propulse" button is clicked
  const saveSettings = async () => {
    const walletId = sessionStorage.getItem('userAccount');
    if (!walletId) {
      alert('No wallet ID found. Please log in.');
      return;
    }

    try {
      console.log("Sending settings to backend:", settings);

      await axios.post('http://localhost:5000/api/settings', {
        userId: walletId,
        settings: settings,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Settings saved successfully');
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. See console for more details.');
    }
  };
  


useEffect(() => {
  const fetchSettings = async () => {
    const walletId = sessionStorage.getItem('userAccount');
    if (walletId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/settings/${walletId}`);
        if (response.status === 200 && response.data) {
          setSettings(response.data.settings);
          console.log(response.data.settings);
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    }
  };

  fetchSettings();
}, []);
 
  

const handleEditorChange = (editor) => {
  setActiveEditor(editor);
};

return (
  <StyleProvider>
    <TopBar onSaveClick={saveSettings} hasUnsavedChanges={hasUnsavedChanges} />
    <div className="displayWrapper">
    <NavBar handleEditorChange={handleEditorChange} />
      <div className="displayColumnWrapper">
        <ActualPageParametersBTN />
        {activeEditor === 'Template1OnDo' ? (
          <Template1OnDo
            settings={settings}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
          />
        ) : (
          <Template2ImageOnDo settings={settings}             
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
/>
        )}
        {/* Continue with the rest of your layout */}
      </div>
      <RightBar onSettingsChange={handleSettingsChange} selectedElement={selectedElement} />
    </div>
  </StyleProvider>
);
}