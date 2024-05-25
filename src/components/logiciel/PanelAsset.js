import React, { useState, useRef, useEffect } from "react";
import "./LeftBar.css";
import "../Root.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useImageHistory } from "../../hooks/ImageHistoryContext";

export default function PanelAsset({ setVisiblePanel, visiblePanel }) {
  const {
    addImageToHistory,
    imageHistory,
    selectImage,
    selectedImage,
    setSelectedImage,
    componentImageUsage,
    clearSelectedImage,
    activeComponent,
    enterReplacementMode
  } = useImageHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All Assets");
  const [filteredHistory, setFilteredHistory] = useState(imageHistory);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // New state variable
  const options = ["All Assets", "Photo", "Document", "Video"];

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    setVisiblePanel(visiblePanel === null);
  };

  useEffect(() => {
    if (selectedOption === "All Assets") {
      setFilteredHistory(imageHistory);
    } else {
      setFilteredHistory(
        imageHistory.filter((item) => item.category === selectedOption)
      );
    }
  }, [selectedOption, imageHistory]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const mimeType = file.type;
      let category = "Unknown";

      if (file.size >= 1e6) {
        alert(`File "${file.name}" is too large. Please select an image smaller than 1 MB.`);
        return;
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

      const newImageUrl = URL.createObjectURL(file);
      addImageToHistory({ url: newImageUrl, category });
    });

    // Hide .asset-dragdrop and show .ImagePreview after file upload
    setIsDragging(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageSelect = (image) => {
    enterReplacementMode(activeComponent); // Engage replacement mode.
    selectImage(image.url); // Set the image as selected for editing.
  };

  useEffect(() => {
    console.log(`Active Component: ${activeComponent}, Selected Image: ${selectedImage}`);
  }, [activeComponent, selectedImage]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

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

  const handleDragStart = (e, image) => {
    setDraggedImage(image);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true); // Show .asset-dragdrop while dragging
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedImage) {
      handleImageSelect(draggedImage);
    }
    setDraggedImage(null);
    setIsDragging(false); // Hide .asset-dragdrop after drop
  };

  const handleEmptySlotDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true); // Show .asset-dragdrop while dragging
  };

  const handleEmptySlotDrop = (e) => {
    e.preventDefault();
  
    const files = Array.from(e.dataTransfer.files);
    handleFileChange({ target: { files } });
    setIsDragging(false); // Hide .asset-dragdrop after drop
  };

  const handleDragLeave = () => {
    setIsDragging(false); // Hide .asset-dragdrop when dragging leaves
  };

  useEffect(() => {
    const handleWindowDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleWindowDrop = (e) => {
      e.preventDefault();
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
  }, []);

  const renderPreview = (image) => {
    const isUsed = Object.values(componentImageUsage).includes(image.url);
    const previewClass = isUsed ? "image-used" : "image-preview";
    switch (image.category) {
      case "Photo":
        return <img src={image.url} alt="Preview" className={previewClass} />;
      case "Background": // Handle background images
        return <img src={image.url} alt="Preview" className={previewClass} />;
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
  };

  return (
    <div className={`navbar-panel sidebar ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`} onDragOver={handleEmptySlotDragOver} onDrop={handleEmptySlotDrop} onDragLeave={handleDragLeave}>
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
            onClick={toggleDropdown}
          >
            {selectedOption} <i className={`bi bi-caret-down-fill ${isOpen ? "rotate" : ""}`}></i>
          </button>
          {isOpen && (
            <ul className="dropdown-options open">
              {options.filter(option => option !== selectedOption).map(option => (
                <li key={option} className="dropdown-option" onClick={() => handleOptionClick(option)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Conditionally render .ImagePreview and .assets-dragdrop */}
      {!isDragging ? (
        <div className="ImagePreview" onDragOver={handleDragOver} onDrop={handleDrop}>
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
