import React, { useState, useEffect } from 'react';
import LeftBar from './LeftBar';
import TopBar from './TopBar';
import RightBar from './RightBar';
import ActualPageParametersBTN from './ActualPageParametersBTN';
import './Display.css';
import { StyleProvider } from '../../hooks/StyleContext';
import TemplateFullText from '../../templates/TemplateFullText';
import TemplateImg_txt from '../../templates/TemplateImg_txt';
import { Template2 } from '../../templates';
import { TemplateTest1 } from '../../templates';
import axios from 'axios';
import { ImageHistoryProvider } from '../../hooks/ImageHistoryContext';
import { useParams } from 'react-router-dom'; // Import useParams

export default function Display() {
  const [settings, setSettings] = useState({});
  const [settingsHistory, setSettingsHistory] = useState([settings]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [selectedElement, setSelectedElement] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeEditor, setActiveEditor] = useState(""); // Initialize activeEditor as an empty string
  const { templateName } = useParams(); // Get templateName from the URL
  useEffect(() => {
    console.log(templateName); // Log the templateName value
    setActiveEditor(templateName); // Set activeEditor to templateName when the component mounts
  }, [templateName]);

  const handleSettingsChange = (elementId, newSettings) => {
    // Example function body - adjust based on actual state structure
    setSettings((prevSettings) => {
      // Here, you would find the relevant element in your state by its ID
      // and update its settings with `newSettings`
      // This is a placeholder implementation
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

  // This function is to be called when the "Propulse" button is clicked
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
  const templateComponents = {
    TemplateFullText: TemplateFullText,
    TemplateImg_txt: TemplateImg_txt,
    TemplateTest1 : TemplateTest1,
    Template2:Template2,
    // Add more templates here as needed
  };
  const FallbackTemplate = () => <div>Template not found.</div>;
  const SelectedTemplate = templateComponents[templateName] || FallbackTemplate;
  console.log(SelectedTemplate); // This should log a function or class if correctly imported

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
              <LeftBar
                handleEditorChange={handleEditorChange}
                addImageToHistory={addImageToHistory}
              />
            </>
          )}
          <div className="displayColumnWrapper">
            {/* {!isPreviewMode && ( // Hide LeftBar and RightBar in preview mode
              <>
                <ActualPageParametersBTN />
              </>
            )}            */}
            <SelectedTemplate
              deviceSize={selectedDeviceSize}
              settings={settings}
              handleSettingsChange={handleSettingsChange}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              isPreviewMode={isPreviewMode}
            />
          </div>
          {!isPreviewMode && ( // Hide LeftBar and RightBar in preview mode
            <>
              <RightBar
                onSettingsChange={handleSettingsChange}
                selectedElement={selectedElement}
                addImageToHistory={addImageToHistory}
              />
            </>
          )}
        </div>
      </StyleProvider>
    </ImageHistoryProvider>
  );
}
