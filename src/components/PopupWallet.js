import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './PopupWallet.css';

function Popup() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
  
    // Cette fonction change l'état, ce qui entraîne le rendu conditionnel de la popup
    const togglePopup = () => {
      setIsPopupVisible(!isPopupVisible);
    };
  
    return (
      <>
        <button onClick={togglePopup}>Toggle Popup</button>
        {isPopupVisible && (
          <div className="popup" style={{display: 'block'}}>
            {/* Contenu de la popup */}
          </div>
        )}
      </>
    );
  }
export default Popup;