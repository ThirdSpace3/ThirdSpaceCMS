// Import React and necessary hooks
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Import other components and contexts
import LeftBar from './LeftBar';
import TopBar from './TopBar';
import RightBar from './RightBar';
import './Display.css';
import { StyleProvider } from '../../hooks/StyleContext';
import { ImageHistoryProvider } from '../../hooks/ImageHistoryContext';

// Import the Canva component
import Canva from './Canva';

export default function Display() {
  const [settings, setSettings] = useState({});
  const [settingsHistory, setSettingsHistory] = useState([settings]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [selectedElement, setSelectedElement] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeEditor, setActiveEditor] = useState("");
  const [selectedDeviceSize, setSelectedDeviceSize] = useState("100%");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [imageHistory, setImageHistory] = useState([]);
  const { templateName } = useParams();

  useEffect(() => {
    console.log(templateName);
    setActiveEditor(templateName);
  }, [templateName]);

  const handleSettingsChange = (elementId, newSettings) => {
    setSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings, [elementId]: newSettings };
      return updatedSettings;
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

  const saveSettings = async () => {
    const walletId = sessionStorage.getItem("userAccount");
    if (!walletId) {
      alert("No wallet ID found. Please log in.");
      return;
    }

    try {
      console.log("Sending settings to backend:", settings);

      await axios.post(
        "http://localhost:5000/api/settings",
        {
          userId: walletId,
          settings: settings,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Settings saved successfully");
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. See console for more details.");
    }
  };

  const handleEditorChange = (editor) => {
    setActiveEditor(editor);
  };

  const handleDeviceChange = (size) => {
    setSelectedDeviceSize(size);
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const addImageToHistory = (imageURL) => {
    setImageHistory((prevHistory) => [...prevHistory, imageURL]);
  };

  return (
    <ImageHistoryProvider>
      <StyleProvider>
        <TopBar onSaveClick={saveSettings} onUndoClick={undo} onRedoClick={redo} onDeviceChange={handleDeviceChange} onPreview={handlePreview} />
        <div className="displayWrapper">
          {!isPreviewMode && (
            <>
              <LeftBar handleEditorChange={handleEditorChange} addImageToHistory={addImageToHistory} />
            </>
          )}
          <div className="displayColumnWrapper">
            <Canva
              templateName={templateName}
              deviceSize={selectedDeviceSize}
              settings={settings}
              handleSettingsChange={handleSettingsChange}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              isPreviewMode={isPreviewMode}
            />
          </div>
          {!isPreviewMode && (
            <>
              <RightBar onSettingsChange={handleSettingsChange} selectedElement={selectedElement} addImageToHistory={addImageToHistory} />
            </>
          )}
        </div>
      </StyleProvider>
    </ImageHistoryProvider>
  );
}
