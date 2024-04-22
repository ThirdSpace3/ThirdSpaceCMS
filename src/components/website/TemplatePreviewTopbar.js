import React, { useState, useEffect } from "react";
import "./TemplatePreviewTopbar.css";
import "../Root.css";

const deviceSizes = {
  tv: "100%",
  tablet: "768px",
  smartphone: "375px",
};

export default function TemplatePreviewTopbar({
  onSaveClick,
  onUndoClick,
  onRedoClick,
  onDeviceChange,
  onPreview,
}) {
  const [eyeIcon, setEyeIcon] = useState("bi bi-eye");
  const [showPopup, setShowPopup] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);









  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);  // Toggle l'état de repli
  };
  // Ajoutez ce style conditionnellement dans votre JSX
// Modifier le style ici pour inclure une transition
const topBarStyle = isCollapsed ? { top: "-14px", transition: "top 0.3s ease-in-out" } : { top: "35px", transition: "top 0.3s ease-in-out" };

  return (
    <>
      <div className="topbar-wrapper" style={topBarStyle}>
        <div className="topbar-wrapper-top">
          <div className="topbar-left">
            <a className="topbar-go-back" >
            <i class="bi bi-arrow-left"></i>
            <p>Back to selection</p>
            </a>
            
          </div>
          
          <button className="topbar-propulse-btn" >
            Start editing
            <i class="bi bi-arrow-right"></i>
            </button>
        </div>
        <div className="topbar-wrapper-bottom">
          <i className={isCollapsed ? "bi bi-chevron-down" : "bi bi-chevron-up"} onClick={toggleCollapse}></i>
        </div>
      </div>
    </>
  );
}
