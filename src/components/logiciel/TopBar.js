import React, { useState } from 'react';
import './TopBar.css';
import '../Root.css';

const deviceSizes = {
    tv: "100%",
    tablet: "768px",
    smartphone: "375px",
};

export default function TopBar({ onSaveClick, onUndoClick, onRedoClick, onDeviceChange, onPreview }) {
    const [eyeIcon, setEyeIcon] = useState("bi bi-eye"); // Initial state is 'bi bi-eye'

    const handleEyeIconClick = () => {
        if (eyeIcon === "bi bi-eye") {
            setEyeIcon("bi bi-eye-slash"); // Change to 'bi bi-eye-slash' when clicked
        } else {
            setEyeIcon("bi bi-eye"); // Change back to 'bi bi-eye' when clicked again
        }
        onPreview(); // Call onPreview function
    };

    return (
        <>
            <div className='topbar-wrapper'>
                <div className='topbar-left'>
                    <a className='topbar-undo-btn' onClick={onUndoClick}><i className="bi bi-arrow-return-left"></i></a>
                    <a className='topbar-redo-btn' onClick={onRedoClick}><i className="bi bi-arrow-return-right"></i></a>

                    <hr />
                    {/* Update this line to call handleEyeIconClick when the eye icon is clicked */}
                    <a onClick={handleEyeIconClick}><i className={eyeIcon}></i></a>
                </div>
                <div className='topbar-mid'>
                    <a onClick={() => onDeviceChange(deviceSizes.tv)} className='topbar-device-btn'><i className="bi bi-tv"></i></a>
                    <a onClick={() => onDeviceChange(deviceSizes.tablet)} className='topbar-device-btn'><i className="bi bi-tablet-landscape"></i></a>
                    <a onClick={() => onDeviceChange(deviceSizes.smartphone)} className='topbar-device-btn'><i className="bi bi-phone"></i></a>
                </div>
                <button className='topbar-propulse-btn' onClick={onSaveClick}>
                    Propulse
                    <i class="bi bi-rocket-takeoff"></i>
                </button>
            </div>
        </>
    );
}
