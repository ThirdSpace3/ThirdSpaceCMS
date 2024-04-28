import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LeftBar from './LeftBar';
import TopBar from './TopBar';
import RightBar from './RightBar';
import './Display.css';
import { StyleProvider } from '../../hooks/StyleContext';
import { ImageHistoryProvider, useImageHistory } from '../../hooks/ImageHistoryContext';
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
  const [activePanel, setActivePanel] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { clearFocus } = useImageHistory(); // Use the clearFocus method from context



  const handleSettingsChange = (elementId, newSettings) => {
    console.log("Updating settings for:", elementId, "new settings received:", newSettings);
    setSettings(prevSettings => {
      const updatedSettings = {
        ...prevSettings,
        [elementId]: {
          ...prevSettings[elementId],
          ...newSettings
        }
      };
      console.log("Updated settings:", updatedSettings);
      return updatedSettings;
    });
  };
  const selectElement = (elementId) => {
    console.log('selectElement elementId:', elementId);

    setSelectedElement(elementId);
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
        { userId: walletId, settings: settings },
        { headers: { "Content-Type": "application/json" } }
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

  const addImageToHistory = (imageURL) => {
    setImageHistory((prevHistory) => [...prevHistory, imageURL]);
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };
  const openImagePanel = () => {
    setActivePanel("images");
  };
  useEffect(() => {
    setActiveEditor(templateName);
    console.log('Active template:', templateName);

  }, [templateName]);


  // In Display.js
  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (event.target.closest('.image-container')) {
        // Don't clear focus if the click is inside an image container
        return;
      }
      clearFocus();  // This will now work properly
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [clearFocus]);  // Including clearFocus to handle changes correctly
  const logChange = (elementId, newStyles) => {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, elementId, newStyles };
    console.log(logEntry);  // Log to console for debugging

    // Store in sessionStorage for persistence
    const logs = JSON.parse(sessionStorage.getItem('editLogs')) || [];
    logs.push(logEntry);
    sessionStorage.setItem('editLogs', JSON.stringify(logs));
    console.log(sessionStorage.getItem('editLogs'));
  };
  
useEffect(() => {
    const applyLoggedStyles = () => {
        const logs = JSON.parse(sessionStorage.getItem('editLogs')) || [];
        const latestSettings = {};
        logs.forEach(log => {
            const { elementId, newStyles } = log;
            if (!latestSettings[elementId]) {
                latestSettings[elementId] = {};
            }
            Object.assign(latestSettings[elementId], newStyles);
        });
        setSettings(latestSettings);
        
    };

    applyLoggedStyles();
}, []);

  return (
    <>
      <TopBar onSaveClick={saveSettings} onUndoClick={undo} onRedoClick={redo} onDeviceChange={(size) => setSelectedDeviceSize(size)} onPreview={handlePreview} />
      <div className="displayWrapper">
        {!isPreviewMode && (
          <LeftBar
            handleEditorChange={(editor) => setActiveEditor(editor)}
            visiblePanel={activePanel}
            setVisiblePanel={setActivePanel}

          />

        )}
        <div className="displayColumnWrapper">
          <Canva
            templateName={templateName}
            deviceSize={selectedDeviceSize}
            settings={settings}
            handleSettingsChange={handleSettingsChange}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            selectElement={selectElement}
            isPreviewMode={isPreviewMode}
            openImagePanel={openImagePanel}
            setSelectedImage={setSelectedImage}
          />


        </div>
        {!isPreviewMode && (
          <RightBar handleSettingsChange={handleSettingsChange} selectedElement={selectedElement} logChange={logChange} />
        )}
      </div>
    </>
  );
}
