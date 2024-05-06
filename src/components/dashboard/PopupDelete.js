import React, { useState } from "react";
import "./PopupDelete.css";
import "../Root.css";

export default function PopupDelete() {
  const [showPopup, setShowPopup] = useState(true); // Initialisé à true pour afficher la popup par défaut

  const handleClosePopup = () => {
    setShowPopup(false);
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
            <span className="bold">Project Name</span> project!
          </p>
        </div>
        <p className="popup-delete-text">
          This action <span className="bold">CANNOT</span> be undone. This
          will permanently delete the <span className="bold">Project Name</span>{" "}
          projetct's files and assets.
        </p>
        <div className="popup-delete-box">
          <p className="popup-delete-box-text">
            Please type in the project's name to confirm.
          </p>
          <input className="popup-delete-box-input" />
          <button className="popup-delete-box-button">
            I understand, delete the project
          </button>
        </div>
      </div>
    </div>
  );
}
 