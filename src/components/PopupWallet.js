import React, { useState } from 'react';
import './PopupWallet.css';

function PopupWallet({ onClose, onUserLogin }) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };

  const handleLoginWithMetamask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log('Connected account:', account);
  
        // Create a message to sign
        const message = "Please sign this message to confirm your identity.";
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, account],
        });
        console.log('Signature:', signature);
        // This is where you use the onUserLogin function passed as a prop
        if (typeof onUserLogin === 'function') {
          onUserLogin(account);
          localStorage.setItem('isLoggedIn', 'true'); // Set login flag
          localStorage.setItem('userAccount', account); // Save user account
        } else {
          console.error('onUserLogin is not a function');
        }
                onClose(); // Optionally close the popup after login
                console.log('onUserLogin prop type:', typeof onUserLogin);

      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.log('MetaMask is not installed');
    }
  };
  
  const handleLoginWithPhantom = async () => {
    if ('solana' in window) {
      try{
        const provider = window.solana;
        if (provider.isPhantom) {
          const response = await provider.connect();
          const publicKey = response.publicKey.toString();
          console.log('Connected with public key:', publicKey);
    
          // Create a message to sign
          const message = new TextEncoder().encode("Please sign this message to confirm your identity.");
          const signed = await provider.signMessage(message, "utf8");
          console.log('Signature:', signed.signature);
          // Use onUserLogin function here as well
          if (typeof onUserLogin === 'function') {
            onUserLogin(publicKey);
            localStorage.setItem('isLoggedIn', 'true'); // Set login flag
            localStorage.setItem('userAccount', publicKey); // Save user account
          } else {
            console.error('onUserLogin is not a function');
          }
                    onClose(); // Optionally close the popup after login
                    console.log('onUserLogin prop type:', typeof onUserLogin);

        }
      } catch (error) {
        console.error('Error connecting to Phantom:', error);
      }
    } else {
      console.log('Solana object not found! Make sure Phantom wallet is installed.');
    }
  };
  
  return (
    <div className="popup" id="popup" style={{ display: 'flex' }}>
      <div className="popup-content">
        <img src="/images/navbar-close.png" alt="Close" className="close-button" onClick={onClose} />
        <h2>Connect a wallet</h2>
        <div className="wallet-list">
          <button id="metamask" className="wallet-btn" onClick={handleLoginWithMetamask}>
            <img src="/images/metamask-logo.png" alt="" />Continue with Metamask
          </button>
          <button id="phantom" className="wallet-btn" onClick={handleLoginWithPhantom}>
            <img src="/images/phantom-logo.png" alt="" />Continue with Phantom
          </button>
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