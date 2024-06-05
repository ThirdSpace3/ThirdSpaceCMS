import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LeftBar from './LeftBar';
import TopBar from './TopBar';
import RightBar from './RightBar';
import './Display.css';
import { StyleProvider } from '../../hooks/StyleContext';
import { ImageHistoryProvider, useImageHistory } from '../../hooks/ImageHistoryContext';
import Canva from './Canva';
import ReportBugBTN from '../website/ReportBugBTN';
import { db, doc, setDoc } from '../../firebaseConfig';

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
  const { clearFocus } = useImageHistory();
  const [selectedColor, setSelectedColor] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [TemplateContent, setTemplateContent] = useState({});

  const walletId = sessionStorage.getItem('userAccount');
  console.log(walletId);

  const checkAndSetLogin = () => {
    const isLoggedIn = true;
    const walletId = sessionStorage.getItem("userAccount");
    console.log(walletId);
    if (walletId) {
      localStorage.setItem('userAccount', walletId);
    }
  };

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
      localStorage.setItem('settings', JSON.stringify(updatedSettings));
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

   const saveSettings = async (elementId, newSettings) => {
    const walletId = sessionStorage.getItem("userAccount");
    console.log(walletId);
    if (!walletId) {
      alert("No wallet ID found. Please log in.");
      return;
    }
  
    try {
      console.log("Sending settings to Firestore:", newSettings);
      const settingsDoc = doc(db, "settings", walletId);
      await setDoc(settingsDoc, { [elementId]: newSettings }, { merge: true });
      alert("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. See console for more details.");
    }
  };

  
  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const openImagePanel = () => {
    setActivePanel("images");
  };

  useEffect(() => {
    checkAndSetLogin();
    setActiveEditor(templateName);
    console.log('Active template:', templateName);
  }, [templateName]);

  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (event.target.closest('.image-container')) {
        return;
      }
      clearFocus();
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [clearFocus]);

  const logChange = (elementId, newStyles) => {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, elementId, newStyles };
    console.log(logEntry);

    const logs = JSON.parse(sessionStorage.getItem('editLogs')) || [];
    logs.push(logEntry);
    sessionStorage.setItem('editLogs', JSON.stringify(logs));
    sessionStorage.clear('editLogs');
    console.log(sessionStorage.getItem('editLogs'));
  };

  const applyStylesFromLogs = useCallback(() => {
    const logs = JSON.parse(sessionStorage.getItem('editLogs')) || [];
    const newSettings = {};

    logs.forEach(log => {
      const { elementId, newStyles } = log;
      newSettings[elementId] = {
        ...(newSettings[elementId] || {}),
        ...newStyles
      };
    });

    setSettings(newSettings);
  }, []);

  useEffect(() => {
    applyStylesFromLogs();
  }, [applyStylesFromLogs]);

  const handleSelectedElementChange = useCallback((elementId) => {
    setSelectedElement(elementId);
  }, []);

  return (
    <>
      <div className="displayWrapper">
        {!isPreviewMode && (
          <LeftBar
            handleEditorChange={(editor) => setActiveEditor(editor)}
            visiblePanel={activePanel}
            setVisiblePanel={setActivePanel}
          />
        )}
        <div className="displayColumnWrapper">
          <TopBar
            onSaveClick={saveSettings}
            onUndoClick={undo}
            onRedoClick={redo}
            onDeviceChange={(size) => setSelectedDeviceSize(size)}
            onPreview={handlePreview}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
          <Canva
            TemplateContent={TemplateContent}
            setTemplateContent={setTemplateContent}
            templateName={templateName}
            deviceSize={selectedDeviceSize}
            settings={settings}
            handleSettingsChange={handleSettingsChange}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            selectElement={handleSelectedElementChange}
            isPreviewMode={isPreviewMode}
            openImagePanel={openImagePanel}
            setSelectedImage={setSelectedImage}
            logChange={logChange}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            saveSettings={saveSettings}
          />
        </div>
        {!isPreviewMode && (
          <RightBar
            handleSettingsChange={handleSettingsChange}
            selectedElement={selectedElement}
            handleSelectedElementChange={handleSelectedElementChange}
            logChange={logChange}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        )}
        <ReportBugBTN />
      </div>
    </>
  );
}
