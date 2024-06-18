import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import LeftBar from './LeftBar';
import TopBar from './TopBar';
import RightBar from './RightBar';
import './Display.css';
import { useImageHistory } from '../../hooks/ImageHistoryContext';
import Canva from './Canva';
import ReportBugBTN from '../website/ReportBugBTN';
import { db, doc, setDoc, getDownloadURL, uploadBytes, ref, storage } from '../../firebaseConfig';
import { fetchProjects } from '../../hooks/Fetchprojects';

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
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
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
    const walletId = sessionStorage.getItem("userAccount");
    if (walletId) {
      localStorage.setItem('userAccount', walletId);
    }
  };

  const handleSettingsChange = (elementId, newSettings) => {
    setSettings(prevSettings => {
      const updatedSettings = {
        ...prevSettings,
        [elementId]: {
          ...prevSettings[elementId],
          ...newSettings
        }
      };
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

  const saveSettings = async (content) => {
    console.log("Saving settings with content:", content);  // Log the content being saved
    const walletId = sessionStorage.getItem("userAccount");
    if (!walletId) {
      alert("No wallet ID found. Please log in.");
      return;
    }
    if (!selectedProjectId) {
      alert("No project selected. Please select a project.");
      return;
    }

    try {
      const sections = Object.keys(content);
      for (const section of sections) {
        const sectionContent = content[section];
        const settingsDocPath = `projects/${walletId}/projectData/${selectedProjectId}/Content/Text/content/${section}`;
        const settingsDoc = doc(db, settingsDocPath);

        // Handle image uploads
        if (sectionContent.imageFile) {
          const file = sectionContent.imageFile;
          console.log("Uploading file:", file);
          const storageRef = ref(storage, `images/${file.name}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          console.log("Uploaded file URL:", downloadURL);
          sectionContent.image = downloadURL;
          delete sectionContent.imageFile;
        }

        await setDoc(settingsDoc, sectionContent, { merge: true });
        console.log("Saved", settingsDocPath);
      }

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
    const logs = JSON.parse(sessionStorage.getItem('editLogs')) || [];
    logs.push(logEntry);
    sessionStorage.setItem('editLogs', JSON.stringify(logs));
    sessionStorage.clear('editLogs');
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

  useEffect(() => {
    const fetchAndSetProjects = async () => {
      if (walletId) {
        try {
          const projectsList = await fetchProjects(walletId);
          setProjects(projectsList);
          if (projectsList.length > 0) {
            setSelectedProjectId(projectsList[0].id); 
            console.log('Selected project ID:', projectsList[0].id);
          }
        } catch (error) {
          console.error('Failed to fetch projects:', error);
        }
      }
    };

    fetchAndSetProjects();
  }, [walletId]);

  useEffect(() => {
    const handleDragEnter = (event) => {
      event.preventDefault();
      setActivePanel('images');
    };

    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDragLeave = (event) => {
      event.preventDefault();
    };

    const handleDrop = (event) => {
      event.preventDefault();
    };

    const displayWrapper = document.querySelector('.displayWrapper');
    displayWrapper.addEventListener('dragenter', handleDragEnter);
    displayWrapper.addEventListener('dragover', handleDragOver);
    displayWrapper.addEventListener('dragleave', handleDragLeave);
    displayWrapper.addEventListener('drop', handleDrop);

    return () => {
      displayWrapper.removeEventListener('dragenter', handleDragEnter);
      displayWrapper.removeEventListener('dragover', handleDragOver);
      displayWrapper.removeEventListener('dragleave', handleDragLeave);
      displayWrapper.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
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
          onSaveClick={() => saveSettings(TemplateContent)} 
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
          selectedProjectId={selectedProjectId}
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
  );
}
