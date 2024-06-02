import React, { useState } from "react";
import "./TopBar.css";
import "../Root.css";
import PropulsePopup from "./PropulsePopup";

const deviceSizes = {
  tv: "100%",
  tablet: "780px",
  smartphone: "500px",
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
  const [focusedDevice, setFocusedDevice] = useState(deviceSizes.tv); // New state for focused device

  const handleEyeIconClick = () => {
    if (eyeIcon === "bi bi-eye") {
      setEyeIcon("bi bi-eye-slash");
    } else {
      setEyeIcon("bi bi-eye");
    }
    onPreview();
  };

  const handlePropulseClick = () => {
    setShowPopup(true);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleDeviceClick = (size) => {
    onDeviceChange(size);
    setFocusedDevice(size);
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
            Save 
            <i className="bi bi-rocket-takeoff"></i>
          </button>
        </div>
        <div className="topbar-wrapper-bottom">
          <i className={isCollapsed ? "bi bi-chevron-down" : "bi bi-chevron-up"} onClick={toggleCollapse}></i>
        </div>
      </div>
      {showPopup && <PropulsePopup setShowPopup={setShowPopup} onSaveClick={onSaveClick} />}
    </>
  );
};

export default TopBar;
