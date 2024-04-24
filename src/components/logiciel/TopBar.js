import React, { useState, useEffect } from "react";
import "./TopBar.css";
import "../Root.css";
import PropulsePopup from "./PropulsePopup";

const deviceSizes = {
  tv: "100%",
  tablet: "60%",
  smartphone: "30%",
};

const TopBar = ({
  onSaveClick,
  onUndoClick,
  onRedoClick,
  onDeviceChange,
  onPreview,
}) => {
  const [eyeIcon, setEyeIcon] = useState("bi bi-eye");
  const [showPopup, setShowPopup] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [focusedDevice, setFocusedDevice] = useState(null); // New state for focused device

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

  const handleDeviceClick = (size) => {
    onDeviceChange(size);
    setFocusedDevice(size); // Set the focused device
  };

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
            {/* Change onClick handlers to call handleDeviceClick with the device size */}
            <a onClick={() => handleDeviceClick(deviceSizes.tv)} className={`topbar-device-btn ${focusedDevice === deviceSizes.tv ? 'selected' : ''}`}>
              <i className="bi bi-tv"></i>
            </a>
            <a onClick={() => handleDeviceClick(deviceSizes.tablet)} className={`topbar-device-btn ${focusedDevice === deviceSizes.tablet ? 'selected' : ''}`}>
              <i className="bi bi-tablet-landscape"></i>
            </a>
            <a onClick={() => handleDeviceClick(deviceSizes.smartphone)} className={`topbar-device-btn ${focusedDevice === deviceSizes.smartphone ? 'selected' : ''}`}>
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
};

export default TopBar;
