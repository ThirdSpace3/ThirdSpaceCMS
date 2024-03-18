import React, { useState, useEffect } from 'react';
import LeftBar from './LeftBar';
import TopBar from './TopBar';
import RightBar from './RightBar';
import ActualPageParametersBTN from './ActualPageParametersBTN';
import './Display.css';
import { StyleProvider } from '../../hooks/StyleContext';
import Template1OnDo from '../../templates/TemplateFullText';
import Template2ImageOnDo from '../../templates/TemplateImg_txt';
import axios from 'axios';
import { ImageHistoryProvider } from '../../hooks/ImageHistoryContext';

export default function Display() {
  const [settings, setSettings] = useState({  });
  const [settingsHistory, setSettingsHistory] = useState([settings]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [selectedElement, setSelectedElement] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeEditor, setActiveEditor] = useState('Template2ImageOnDo'); // Set the default editor to TextEditor

  const handleSettingsChange = (section, newSettings) => {
    setSettings((prevSettings) => {
      const nextSettings = {
        ...prevSettings,
        [section]: {
          ...prevSettings[section],
          ...newSettings,
        },
      };

      setSettingsHistory((prevHistory) => [...prevHistory, nextSettings]);

      return nextSettings;
    });
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

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const [imageHistory, setImageHistory] = useState([]);

  const addImageToHistory = (imageURL) => {
    setImageHistory((prevHistory) => [...prevHistory, imageURL]);
  };


  return (
    <ImageHistoryProvider>
      <StyleProvider>
        <TopBar
          onSaveClick={saveSettings}
          onUndoClick={undo}
          onRedoClick={redo}
          onDeviceChange={handleDeviceChange}
          onPreview={handlePreview}
        />
        <div className="displayWrapper">
          {!isPreviewMode && ( // Hide LeftBar and RightBar in preview mode
            <>
              <LeftBar handleEditorChange={handleEditorChange} addImageToHistory={addImageToHistory} />
            </>
          )}
          <div className="displayColumnWrapper">
            {!isPreviewMode && ( // Hide LeftBar and RightBar in preview mode
              <>
                <ActualPageParametersBTN />
              </>
            )}
            {activeEditor === 'Template1OnDo' ? (
              <Template1OnDo
                deviceSize={selectedDeviceSize}
                settings={settings}
                selectedElement={selectedElement}
                setSelectedElement={setSelectedElement}
                isPreviewMode={isPreviewMode} // Pass isPreviewMode as a prop

              />
            ) : (
              <Template2ImageOnDo
                deviceSize={selectedDeviceSize}
                settings={settings}
                handleSettingsChange={handleSettingsChange}
                selectedElement={selectedElement}
                setSelectedElement={setSelectedElement}
                isPreviewMode={isPreviewMode}
              />

            )}
          </div>
          {!isPreviewMode && ( // Hide LeftBar and RightBar in preview mode
            <>
              <RightBar onSettingsChange={handleSettingsChange} selectedElement={selectedElement} addImageToHistory={addImageToHistory}/>
            </>
          )}
        </div>
      </StyleProvider>
    </ImageHistoryProvider>
  );

}