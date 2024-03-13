import React from 'react';
import ReactDOM from 'react-dom';

const ImageSelectionPopup = ({ images, onSelect, onClose }) => {
    console.log('Popup rendering'); // For debugging

    // Ensure `images` is an array before proceeding
    if (!Array.isArray(images) || images.length === 0) {
        // Optionally, return some fallback UI here if needed
        return null;
    }

    return ReactDOM.createPortal(
<div className="popup-background" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', zIndex: 1050, display: 'block' }}> 
    <div className="popup-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
        <p>Popup is active</p>
        <button onClick={onClose}>Close</button>
    </div>
</div>

    );
};

export default ImageSelectionPopup;
