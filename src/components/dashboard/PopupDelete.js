import React, { useState, useEffect } from "react";
import "./PopupDelete.css";
import "../Root.css";

export default function PopupDelete({ projectId, handleDeleteProject, projectName, showPopup, setShowPopup }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Add when mounted
    document.addEventListener("mousedown", handleClickOutside);
    // Remove when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleClickOutside = (event) => {
    // If the clicked element is the backdrop, close the popup
    if (event.target.className.includes("popup-delete-bg")) {
      handleClosePopup();
    }
  };

  const handleDelete = (projectId) => {
    if (inputValue.trim() === projectName) {
      handleClosePopup();
      handleDeleteProject(projectId);
    }
  };

  // Check if the input matches the project name
  const isInputMatching = inputValue.trim() === projectName;

  if (!showPopup) return null;

  return (
    <div className={showPopup ? "popup-delete-bg" : "popup-delete-bg hidden"}>
      <div className="popup-delete-container">
        <div className="popup-delete-header">
          <p className="popup-delete-title">Are you sure?</p>
          <i className="bi bi-x" onClick={handleClosePopup}></i>
        </div>
        <div className="popup-delete-banner">
          <p className="popup-delete-banner-text">
            You are trying to delete the{" "}
            <span className="bold">{projectName}</span> project!
          </p>
        </div>
        <div className="popup-delete-box">
          <p className="popup-delete-box-text">
            Please type in the project's name to confirm.
          </p>
          <input
            className="popup-delete-box-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className={`popup-delete-box-button ${isInputMatching ? 'able' : 'disabled'}`}
            onClick={() => handleDelete(projectId)}
            disabled={!isInputMatching}
          >
            I understand, delete the project
          </button>
          
        </div>
      </div>
    </div>
  );
}
