import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './PopupWallet.css';

function PopupWallet() {
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
          <button id="coinbase" className="wallet-btn wallet-more wallet-hide"><img src="img/coinbase-logo.png" alt="" />Continue with Coinbase</button>
          {/* Hidden for now
          <button id="Walletconnect" className="wallet-btn wallet-more wallet-hide"><img src="img/walletconnect-logo.png" alt="" />Continue with Walletconnect</button>
          */}
        </div>
        <a href="#" className="popup-more-btn" id="toggleButton" onClick={toggleShowMore}>Show More</a>
      </div>
    </div>
  );
}
export default PopupWallet;