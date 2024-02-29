import React, { useState } from 'react';
import './PopupWallet.css';

function PopupWallet({ onClose }) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };

  const handleLoginWithMetamask = async () => {
    if (window.ethereum) { // Check if MetaMask is installed
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request accounts
        const account = accounts[0]; // Use the first account
        console.log('Connected account:', account);
        // authentication flow (e.g., sending the account to your backend for verification)
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.log('MetaMask is not installed');
    }
  };
  const handleLoginWithPhantom = async () => {
    try {
      if ('solana' in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
          // Prompt user to connect wallet if not already connected
          const response = await provider.connect();
          const publicKey = response.publicKey.toString();
          console.log('Connected with public key:', publicKey);
          // Proceed with any other action after successful connection
        } else {
          console.log('Phantom wallet not found');
        }
      } else {
        console.log('Solana object not found! Make sure Phantom wallet is installed.');
      }
    } catch (error) {
      console.error('Error connecting to Phantom Wallet:', error);
    }
  };

  const visibleStyle = { display: 'block' }; // Or use 'flex' if that fits your design better

  return (
    <div className="popup" id="popup" style={visibleStyle}>
      <div className="popup-content">
        <img src="/images/navbar-close.png" alt="Close" className="close-button" onClick={onClose} />
        <h2>Connect a wallet</h2>
        <div className="wallet-list">
          <button id="metamask" className="wallet-btn" onClick={handleLoginWithMetamask}><img src="/images/metamask-logo.png" alt="" />Continue with Metamask</button>
          <button id="phantom" className="wallet-btn" onClick={handleLoginWithPhantom}><img src="/images/phantom-logo.png" alt="" />Continue with Phantom</button>
          <button id="ledger" className="wallet-btn"><img src="/images/ledger-logo.png" alt="" />Continue with Ledger</button>
          <button id="operatouch" className="wallet-btn"><img src="/images/operatouch-logo.png" alt="" />Continue with Opera Touch</button>
          <button id="coinbase" className={`wallet-btn wallet-more ${showMore ? '' : 'wallet-hide'}`}><img src="/images/coinbase-logo.png" alt="" />Continue with Coinbase</button>
          {showMore && (
            <button id="walletconnect" className="wallet-btn wallet-more"><img src="/images/walletconnect-logo.png" alt="" />Continue with Walletconnect</button>
          )}
        </div>
        <a href="#" className="popup-more-btn" onClick={toggleShowMore}>{showMore ? 'Show Less' : 'Show More'}</a>
      </div>
    </div>
  );
}

export default PopupWallet;