import React, { useState, useEffect, useRef } from 'react';
import LeftBar from './LeftBar';
import TopBar from './TopBar';
import RightBar from './RightBar';
import Canva from './Canva';
import ActualPageParametersBTN from './ActualPageParametersBTN';
import './Display.css';
import { StyleProvider } from '../../hooks/StyleContext';
import Template1OnDo from '../../templates/Template1OnDo';
import Template2ImageOnDo from '../../templates/Template2ImageOnDo';
import axios from 'axios';
import { ImageProvider } from '../../hooks/ImageContext';
export default function Display() {
  const [settings, setSettings] = useState({});
  const [settingsHistory, setSettingsHistory] = useState([{}]); // Initialize with empty settings
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0); const [selectedElement, setSelectedElement] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeEditor, setActiveEditor] = useState('Template2ImageOnDo'); // Set the default editor to TextEditor


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

    // Instead of directly setting the new settings,
    // we now also need to update the history.
    const newHistory = settingsHistory.slice(0, currentHistoryIndex + 1); // Copy up to the current point
    newHistory.push(updatedSettings); // Add new settings snapshot
    setSettingsHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1); // Update current index to the new snapshot

    setSettings(updatedSettings);
    setHasUnsavedChanges(true);
  };

  const undo = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
      setSettings(settingsHistory[currentHistoryIndex - 1]);
    }
  };

  const redo = () => {
    if (currentHistoryIndex < settingsHistory.length - 1) {
      setCurrentHistoryIndex(currentHistoryIndex + 1);
      setSettings(settingsHistory[currentHistoryIndex + 1]);
    }
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


  const [selectedDeviceSize, setSelectedDeviceSize] = useState("100%");

  const handleDeviceChange = (size) => {
    setSelectedDeviceSize(size);
  };


  const [showOnlyTemplate1OnDo, setShowOnlyTemplate1OnDo] = useState(false);

  const toggleTemplate1OnDoVisibility = () => {
    setShowOnlyTemplate1OnDo(prev => !prev);
  };

  
  const [imageHistory, setImageHistory] = useState([]);

  const addImageToHistory = (imageURL) => {
    setImageHistory((prevHistory) => [...prevHistory, imageURL]);
  };
  

  return (
    <StyleProvider>
      {!showOnlyTemplate1OnDo && ( // Only render TopBar when showOnlyTemplate1OnDo is false
        <TopBar
          onSaveClick={saveSettings}
          onUndoClick={undo}
          onRedoClick={redo}
          onDeviceChange={handleDeviceChange}
          onToggleTemplate1OnDo={toggleTemplate1OnDoVisibility}
        />
      )}
      {showOnlyTemplate1OnDo ? (
        <Template1OnDo
          deviceSize={selectedDeviceSize}
          settings={settings}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          onToggleTemplate1OnDo={toggleTemplate1OnDoVisibility}
          showOnlyTemplate1OnDo={showOnlyTemplate1OnDo} // Pass the showOnlyTemplate1OnDo state here
        />
      ) : (
        <div className="displayWrapper">
          <LeftBar handleEditorChange={handleEditorChange}                addImageToHistory={addImageToHistory} />
          <div className="displayColumnWrapper">
            <ActualPageParametersBTN />
            {activeEditor === 'Template1OnDo' ? (
              <Template1OnDo
                deviceSize={selectedDeviceSize}
                settings={settings}
                selectedElement={selectedElement}
                setSelectedElement={setSelectedElement}

              />
            ) : (
              <Template2ImageOnDo
                settings={settings}
                selectedElement={selectedElement}
                setSelectedElement={setSelectedElement}
                addImageToHistory={addImageToHistory}

              />
            )}
          </div>
          <RightBar onSettingsChange={handleSettingsChange} selectedElement={selectedElement} />
        </div>
      )}
    </StyleProvider>
  );

}