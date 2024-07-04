import "../Root.css";
import "./PropulsePopup.css";
import React, { useEffect, useState } from 'react';

export default function PropulsePopup({ generateShareableURL, projectName, setShowPopup, onSaveClick }) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const popupContainer = document.querySelector('.propulse-popup-container');
      if (popupContainer && !popupContainer.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowPopup]);

  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      await onSaveClick();
      setSaveStatus('success');
      generateShareableURL();
    } catch (error) {
      setSaveStatus('failure');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="propulse-popup-container">
        <h2 className="propulse-popup-title">
          Where will you propulse your project?
        </h2>
        <hr className="propulse-popup-hr" />
        {/*===Test deploy===*/}
        <div className="propulse-popup-container-box">
          <div className="propulse-popup-container-box-top">
            <p className="propulse-popup-main-txt">Test</p>
            <a href="">
              <i className="bi bi-box-arrow-up-right"></i>
            </a>
          </div>
          <div className="propulse-popup-container-box-bottom">
            <p className="propulse-popup-txt">netbook.thirdspace.x</p>
            <label className="switch">
              <input disabled type="checkbox" />
              <span disabled  className="slider-propulse" ></span>
            </label>
          </div>
        </div>
        <hr className="propulse-popup-hr" />
        {/*===Live deploy===*/}
        {/* <div className="propulse-popup-container-box">
          <div className="propulse-popup-container-box-top">
            <p className="propulse-popup-main-txt">Live</p>
            <a href="">
              <i className="bi bi-box-arrow-up-right"></i>
            </a>
          </div>
          <div className="propulse-popup-container-box-bottom">
            <a className="propulse-popup-txt" href="">
              Add Custom Domain
            </a>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        <hr className="propulse-popup-hr" /> */}
        <button className="propule-popup-btn" onClick={handleSaveClick} disabled={isSaving} id="done-btn-deploy-popup">
          Propulse to selected domains
        </button>
        {isSaving && (
          <div className="propulse-popup-ongoing">
            <i className="bi bi-rocket-takeoff"></i>
            <p>Propulsing in progress...</p>
          </div>
        )}
        {saveStatus === 'success' && (
          <div className="propulse-popup-success">
            <i className="bi bi-check2-circle"></i>
            <p>Saving Successful!</p>
          </div>
        )}
        {saveStatus === 'failure' && (
          <div className="propulse-popup-failure">
            <i className="bi bi-x-circle"></i>
            <p>Saving Failed!</p>
          </div>
        )}
      </div>
    </>
  );
}
