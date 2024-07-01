import React, { useState } from "react";
import "./TopBar.css";
import PropulsePopup from "./PropulsePopup";
import { Link } from "react-router-dom";

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
  showPopup,
  setShowPopup,
  projectName,
}) => {
  const [eyeIcon, setEyeIcon] = useState("bi bi-eye");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [focusedDevice, setFocusedDevice] = useState(deviceSizes.tv);

  const handleEyeIconClick = () => {
    setEyeIcon(eyeIcon === "bi bi-eye" ? "bi bi-eye-slash" : "bi bi-eye");
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

  const topBarStyle = isCollapsed
    ? { top: "-14px", transition: "top 0.3s ease-in-out" }
    : { top: "35px", transition: "top 0.3s ease-in-out" };

  const generateShareableURL = () => {
    // Modify the base URL as needed
    const baseURL = "https://3rd-space.io/share/";
    return `${baseURL}${encodeURIComponent(projectName)}`;
  };

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
            <a
              onClick={() => handleDeviceClick(deviceSizes.tv)}
              className={`topbar-device-btn ${
                focusedDevice === deviceSizes.tv ? "selected" : ""
              }`}
            >
              <i className="bi bi-tv"></i>
            </a>
            <a
              onClick={() => handleDeviceClick(deviceSizes.tablet)}
              className={`topbar-device-btn ${
                focusedDevice === deviceSizes.tablet ? "selected" : ""
              }`}
            >
              <i className="bi bi-tablet-landscape"></i>
            </a>
            <a
              onClick={() => handleDeviceClick(deviceSizes.smartphone)}
              className={`topbar-device-btn ${
                focusedDevice === deviceSizes.smartphone ? "selected" : ""
              }`}
            >
              <i className="bi bi-phone"></i>
            </a>
          </div>
          <button className="topbar-propulse-btn" onClick={handlePropulseClick}>
            Save
            <i className="bi bi-rocket-takeoff"></i>
          </button>
          {/* <Link
            to={`/share/${encodeURIComponent(projectName)}`}
            className="topbar-share-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Share Project
            <i className="bi bi-share"></i>
          </Link> */}
        </div>
        <div className="topbar-wrapper-bottom">
          <i
            className={isCollapsed ? "bi bi-chevron-down" : "bi bi-chevron-up"}
            onClick={toggleCollapse}
          ></i>
        </div>
      </div>
      {showPopup && (
        <PropulsePopup
          generateShareableURL={generateShareableURL}
          projectName={projectName}
          setShowPopup={setShowPopup}
          onSaveClick={onSaveClick}
        />
      )}
    </>
  );
};

export default TopBar;
