import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import "./LeftBar.css";
import "../Root.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useImageHistory } from "../../hooks/ImageHistoryContext";
import SparkMD5 from "spark-md5";
import { storage, db } from "../../firebaseConfig";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default function PanelAsset({selectedProjectId, setVisiblePanel, visiblePanel }) {
  const {
    addImageToHistory,
    removeImageFromHistory,
    imageHistory,
    selectImage,
    selectedImage,
    componentImageUsage,
    activeComponent,
    enterReplacementMode
  } = useImageHistory();
console.log(selectedProjectId);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All Assets");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const walletId = sessionStorage.getItem("userAccount");
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  const options = useMemo(() => ["All Assets", "Photo", "Document", "Video"], []);

  const toggleSidebarCollapse = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
    setVisiblePanel(visiblePanel === null);
  }, [setVisiblePanel, visiblePanel]);

  const filteredHistory = useMemo(() => {
    return selectedOption === "All Assets"
      ? imageHistory || []
      : (imageHistory || []).filter((item) => item.category === selectedOption);
  }, [selectedOption, imageHistory]);

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
  }, [activeComponent, enterReplacementMode, selectImage]);

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

        const storageReference = storageRef(storage, `ImagesUsers/${walletId}/${selectedProjectId}/${file.name}`);
        await uploadBytes(storageReference, file);
        const newImageUrl = await getDownloadURL(storageReference);

        const newImage = { url: newImageUrl, category, hash: fileHash };
        addImageToHistory(newImage);

        await addDoc(collection(db,`projects/${walletId}/projectData/${selectedProjectId}/Content/Images/${file.name}`), newImage);
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

  const handleImageError = useCallback((hash) => {
    removeImageFromHistory(hash);
  }, [removeImageFromHistory]);

  const renderPreview = useCallback((image) => {
    const isUsed = Object.values(componentImageUsage).includes(image.url);
    const previewClass = isUsed ? "image-used" : "image-preview";

    switch (image.category) {
      case "Photo":
        return <img src={image.url} alt="Preview" className={previewClass} onError={() => handleImageError(image.hash)} />;
      case "Background":
        return <img src={image.url} alt="Preview" className={previewClass} onError={() => handleImageError(image.hash)} />;
      case "Video":
        return (
          <video className={previewClass} width="120" height="90" controls>
            <source src={image.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "Document":
        return (
          <i className={`bi bi-file-earmark-text-fill ${previewClass}`} style={{ fontSize: "48px" }}></i>
        );
      default:
        return (
          <i className={`bi bi-file-earmark ${previewClass}`} style={{ fontSize: "48px" }}></i>
        );
    }
  }, [componentImageUsage, handleImageError]);

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
