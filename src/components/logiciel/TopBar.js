import React, { useState, useEffect } from "react";
import "./TopBar.css";
import "../Root.css";
import PropulsePopup from "./PropulsePopup";

const deviceSizes = {
  tv: "100%",
  tablet: "768px",
  smartphone: "375px",
};

export default function TopBar({
  onSaveClick,
  onUndoClick,
  onRedoClick,
  onDeviceChange,
  onPreview,
}) {
  const [eyeIcon, setEyeIcon] = useState("bi bi-eye");
  const [showPopup, setShowPopup] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showPopup && e.target.closest(".propulse-popup") === null) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPopup]);

  const handleEyeIconClick = () => {
    if (eyeIcon === "bi bi-eye") {
      setEyeIcon("bi bi-eye-slash");
    } else {
      setEyeIcon("bi bi-eye");
    }
    onPreview();
  };

  const handlePropulseClick = () => {
    setShowPopup(!showPopup);
    onSaveClick();
  };

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
            <a className="topbar-undo-btn" onClick={onUndoClick}>
              <i className="bi bi-arrow-return-left"></i>
            </a>
            <a className="topbar-redo-btn" onClick={onRedoClick}>
              <i className="bi bi-arrow-return-right"></i>
            </a>
            <hr />
            <a onClick={handleEyeIconClick}>
              <i className={eyeIcon}></i>
            </a>
          </div>
          <div className="topbar-mid">
            <a onClick={() => onDeviceChange(deviceSizes.tv)} className="topbar-device-btn">
              <i className="bi bi-tv"></i>
            </a>
            <a onClick={() => onDeviceChange(deviceSizes.tablet)} className="topbar-device-btn">
              <i className="bi bi-tablet-landscape"></i>
            </a>
            <a onClick={() => onDeviceChange(deviceSizes.smartphone)} className="topbar-device-btn">
              <i className="bi bi-phone"></i>
            </a>
          </div>
          <button className="topbar-propulse-btn" onClick={handlePropulseClick}>
            Propulse
            <i className="bi bi-rocket-takeoff"></i>
          </button>
        </div>
        <div className="topbar-wrapper-bottom">
          <i className={isCollapsed ? "bi bi-chevron-down" : "bi bi-chevron-up"} onClick={toggleCollapse}></i>
        </div>
      </div>
      {showPopup && <PropulsePopup />}
    </>
  );
}
