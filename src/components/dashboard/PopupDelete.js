import React, { useState } from "react";
import "./PopupDelete.css";
import "../Root.css";

export default function PopupDelete({ projectId, handleDeleteProject, projectName }) {
  const [showPopup, setShowPopup] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDelete = (projectId) => {
    if (inputValue.trim() === projectName) { // assuming projectName is passed as prop
      handleClosePopup();
      handleDeleteProject(projectId);
    } else {
      alert("The project name does not match. Please check and try again.");
    }
  };

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
          <input className="popup-delete-box-input" value={inputValue} onChange={e => setInputValue(e.target.value)} />
          <button className="popup-delete-box-button" onClick={() => handleDelete(projectId)}>
            I understand, delete the project
          </button>

        </div>
      </div>
    </div>
  );
}

