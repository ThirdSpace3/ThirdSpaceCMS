import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useImageHistory } from "../../hooks/ImageHistoryContext";
import SparkMD5 from "spark-md5";
import { storage, getStorage, ref, uploadBytes, getDownloadURL  } from "../../firebaseConfig";  // import the Firebase storage configuration
import "./LeftBar.css";
import "../Root.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function PanelAsset({setTemplateContent, selectedElement, selectedProjectId, walletId, setVisiblePanel, visiblePanel }) {
  const {
    addImageToHistory,
    imageHistory,
    selectImage,
    selectedImage,
    componentImageUsage,
    activeComponent,
    enterReplacementMode
  } = useImageHistory();
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All Assets");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  const options = useMemo(() => ["All Assets", "Photo", "Document", "Video"], []);

  const toggleSidebarCollapse = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
    setVisiblePanel(visiblePanel === null);
  }, [setVisiblePanel, visiblePanel]);

  const filteredHistory = useMemo(() => {
    return (imageHistory || []).filter((item) => item.category === "Photo" || item.category === "Background");
  }, [imageHistory]);

  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const getFileHash = async (file) => {
    try {
      const arrayBuffer = await readFileAsArrayBuffer(file);
      return SparkMD5.ArrayBuffer.hash(arrayBuffer);
    } catch (error) {
      console.error("Error reading file:", error);
      throw new Error("Failed to read the file.");
    }
  };
  
  const handleImageSelect = useCallback((image) => {
    enterReplacementMode(activeComponent);
    selectImage(image.url);
    // Update the TemplateContent state with the selected image URL
    setTemplateContent(prevContent => {
      const newContent = { ...prevContent };
      if (selectedElement) {
        newContent[selectedElement] = {
          ...newContent[selectedElement],
          image: image.url
        };
      }
      return newContent;
    });
  }, [activeComponent, enterReplacementMode, selectImage, selectedElement, setTemplateContent]);
  
  

  const handleFileChange = useCallback(async (event) => {
    const files = Array.from(event.target.files);
    for (const file of files) {
      const mimeType = file.type;
      let category = "Unknown";

      if (file.size >= 1e6) {
        alert(`File "${file.name}" is too large. Please select an image smaller than 1 MB.`);
        continue;
      }

      if (mimeType.startsWith("image/")) {
        category = "Photo";
      } else if (mimeType.startsWith("video/")) {
        category = "Video";
      } else if (
        mimeType === "application/pdf" ||
        mimeType.startsWith("application/vnd.ms") ||
        mimeType.startsWith("application/msword")
      ) {
        category = "Document";
      }

      try {
        const fileHash = await getFileHash(file);
        const isDuplicate = imageHistory.some(image => image.hash === fileHash);

        if (isDuplicate) {
          const existingImage = imageHistory.find(image => image.hash === fileHash);
          alert(`This file has already been uploaded. Redirecting to the existing image.`);
          handleImageSelect(existingImage);
          continue;
        }

        const storageRef = ref(storage, `ImageProjects/${walletId}/${selectedProjectId}/images/${file.name}`);
        await uploadBytes(storageRef, file);
        const newImageUrl = await getDownloadURL(storageRef);

        addImageToHistory({ url: newImageUrl, category, hash: fileHash });
      } catch (error) {
        console.error("Error processing file:", error);
        alert(`Failed to process the file "${file.name}". Please try again.`);
      }
    }

    setIsDragging(false);
  }, [addImageToHistory, imageHistory, handleImageSelect]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current.click();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDragStart = useCallback((e, image) => {
    setDraggedImage(image);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFileChange({ target: { files } });
    setDraggedImage(null);
    setIsDragging(false);
  }, [handleFileChange]);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleWindowDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleWindowDrop = (e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileChange({ target: { files } });
      }
      setIsDragging(false);
    };

    const handleWindowDragLeave = () => {
      setIsDragging(false);
    };

    window.addEventListener("dragover", handleWindowDragOver);
    window.addEventListener("drop", handleWindowDrop);
    window.addEventListener("dragleave", handleWindowDragLeave);

    return () => {
      window.removeEventListener("dragover", handleWindowDragOver);
      window.removeEventListener("drop", handleWindowDrop);
      window.removeEventListener("dragleave", handleWindowDragLeave);
    };
  }, [handleFileChange]);

  const renderPreview = useCallback((image) => {
    const isUsed = Object.values(componentImageUsage).includes(image.url);
    const previewClass = isUsed ? "image-used" : "image-preview";
    return <img src={image.url} alt="Preview" className={previewClass} />;
  }, [componentImageUsage]);

  return (
    <div className={`navbar-panel sidebar ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*,video/*,application/pdf,application/msword,application/vnd.ms-excel,application/vnd.ms-powerpoint"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div className="btn-box">
        <button className="upload-btn" onClick={handleUploadClick}>
          Upload
        </button>
        <div className="dropdown" ref={dropdownRef}>
          <button
            className={`dropdown-button ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption} <i className={`bi bi-caret-down-fill ${isOpen ? "rotate" : ""}`}></i>
          </button>
          {isOpen && (
            <ul className="dropdown-options open">
              {options.filter(option => option !== selectedOption).map(option => (
                <li key={option} className="dropdown-option" onClick={() => setSelectedOption(option)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {!isDragging ? (
        <div className="ImagePreview">
          {filteredHistory.map((image, index) => (
            <div key={index} className={`image-preview ${image.url === selectedImage ? "selected" : ""}`} onClick={() => handleImageSelect(image)} onDragStart={(e) => handleDragStart(e, image)} draggable>
              {renderPreview(image)}
            </div>
          ))}
        </div>
      ) : (
        <div className="assets-dragdrop">
          <i className="bi bi-box-arrow-in-down"></i>
          <p>Add to my assets</p>
        </div>
      )}

      <div className="panel-toggle-wrapper">
        <i className={`bi ${isSidebarCollapsed ? "bi-chevron-right" : "bi-chevron-left"} panel-toggle-btn`} onClick={toggleSidebarCollapse}></i>
      </div>
    </div>
  );
}
