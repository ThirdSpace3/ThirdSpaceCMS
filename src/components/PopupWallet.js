import React, { useState } from 'react';
import './PopupWallet.css';

function PopupWallet() {
  // State to manage the visibility of the popup
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  // State to manage the visibility of additional wallet options
  const [showMore, setShowMore] = useState(false);

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Function to toggle the visibility of more wallet options
  const toggleShowMore = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setShowMore(!showMore);
  };

  // Only render the popup if isPopupOpen is true
  if (!isPopupOpen) return null;

  return (
    <div className="popup" id="popup">
      <div className="popup-content">
        <img src="img/navbar-close.png" alt="" className="close-button" onClick={closePopup} />
        <h2>Connect a wallet</h2>
        <div className="wallet-list">
          <button id="metamask" className="wallet-btn"><img src="img/metamask-logo.png" alt="" />Continue with Metamask</button>
          <button id="phantom" className="wallet-btn"><img src="img/phantom-logo.png" alt="" />Continue with Phantom</button>
          <button id="ledger" className="wallet-btn"><img src="img/ledger-logo.png" alt="" />Continue with Ledger</button>
          <button id="operatouch" className="wallet-btn"><img src="img/operatouch-logo.png" alt="" />Continue with Opera Touch</button>
          <button id="coinbase" className={`wallet-btn wallet-more ${showMore ? '' : 'wallet-hide'}`}><img src="img/coinbase-logo.png" alt="" />Continue with Coinbase</button>
          {/* Conditionally render additional wallets based on showMore state */}
          {showMore && (
            <button id="walletconnect" className="wallet-btn wallet-more"><img src="img/walletconnect-logo.png" alt="" />Continue with Walletconnect</button>
          )}
        </div>
        <a href="#" className="popup-more-btn" id="toggleButton" onClick={toggleShowMore}>{showMore ? 'Show Less' : 'Show More'}</a>
      </div>
    </div>
  );
}

export default PopupWallet;
