import React, { useState, useEffect } from "react";
import "./PopupWallet.css";
import axios from "axios";
import "../Root.css";
import { db, doc, getDoc, setDoc } from '../../firebaseConfig';
import { wait } from "@testing-library/user-event/dist/utils";

function PopupWallet({ onClose, onUserLogin, checkWalletData, setShowPopup }) {
  const [showMore, setShowMore] = useState(false);
  const [wallets, setWallets] = useState({ hasEthereum: false, hasSolana: false });
  const [walletAvailable, setWalletAvailable] = useState(true);
  const [phantomInitiated, setPhantomInitiated] = useState(false);
  const [customErrorMessage, setCustomErrorMessage] = useState("");

  const toggleShowMore = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };


// Separate authentication functions for Ethereum and Solana
const authenticateWithEthereum = async (walletId) => {
  try {
    const message = "Please sign this message to confirm your identity.";
    // Ensure the parameters are correctly formatted
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [message, walletId], // Ensure that walletId is the currently connected Ethereum address
    });
    processLogin(walletId);
  } catch (error) {
    console.error("Error during Ethereum authentication:", error);
  }
};

const authenticateWithSolana = async (publicKey) => {
  try {
    const message = new TextEncoder().encode("Please sign this message to confirm your identity.");
    const signedMessage = await window.solana.signMessage(message, "utf8");
    processLogin(publicKey);
  } catch (error) {
    console.error("Error during Solana authentication:", error);
  }
};

const processLogin = (walletId) => {
  if (typeof onUserLogin === "function") {
    onUserLogin(walletId);
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userAccount", walletId);
    checkWalletData(walletId);
  } else {
    console.error("onUserLogin is not a function");
  }
  onClose();
};


// Usage in handleLoginWithMetamask
const handleLoginWithMetamask = async () => {
  // Recheck for Ethereum wallet each time the function is invoked
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      const walletRef = doc(db, 'wallets', account);
      const walletSnap = await getDoc(walletRef);

      if (!walletSnap.exists()) {
        await setDoc(walletRef, { walletId: account });
        console.log("Wallet ID saved to Firestore:", account);
      } else {
        console.log("Wallet data retrieved:", walletSnap.data());
      }

      authenticateWithEthereum(account);
    } catch (error) {
      console.error("Error with MetaMask login:", error);
    }
  } else {
    console.log("MetaMask is not installed");
  }
};


// Usage in handleLoginWithPhantom
const handleLoginWithPhantom = async () => {
  // Check for Phantom wallet each time the function is invoked
  if ("solana" in window && window.solana.isPhantom) {
    try {
      const response = await window.solana.connect();
      const publicKey = response.publicKey.toString();
      const walletRef = doc(db, 'wallets', publicKey);
      const walletSnap = await getDoc(walletRef);

      if (!walletSnap.exists()) {
        await setDoc(walletRef, { walletId: publicKey });
        console.log("Wallet ID saved to Firestore:", publicKey);
      } else {
        console.log("Wallet data retrieved:", walletSnap.data());
      }

      authenticateWithSolana(publicKey);
    } catch (error) {
      console.error("Error connecting to Phantom:", error);
      setCustomErrorMessage('Something went wrong, check if your wallet is correctly installed. If its the case try refreshing the page');
    }
  } else {
    if (phantomInitiated) {
      // If the user has previously tried to create a wallet and it's still not detected
      console.log("Phantom wallet still not installed. Refreshing the page.");
      localStorage.setItem('openWalletPopup', 'true'); // Set flag in localStorage
      window.location.reload();
    } else {
      console.log("Phantom wallet is not installed. Please install and retry.");
      setPhantomInitiated(true);
    }
  }
};




  // https://docs.unstoppabledomains.com/identity/overview/login-with-unstoppable/

  useEffect(() => {
    const checkForWallet = () => {
      const hasWallet = !!window.ethereum || ("solana" in window && window.solana.isPhantom);
      setWalletAvailable(hasWallet);
      console.log(hasWallet);
      if (!hasWallet) {
        setCustomErrorMessage('To use Third Space, you need to connect via a wallet. We haven’t found one on your browser. Finish the entire profile creation in order to be able to log in!');
      }
    };

    checkForWallet();
    const handleOutsideClick = (e) => {
      if (e.target.id === "popup") {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]); // Dependencies array includes only `onClose` as it's a prop that could potentially update



  return (
    <div className="popup" id="popup" style={{ display: "flex" }}>
      <div className="popup-content">
        <img
          src="/images/navbar-close.png"
          alt="Close"
          className="close-button"
          onClick={onClose}
        />
        <div className="popup-wallet-header">
          <img
            src="./images/3s-logo-picto.png"
            className="popup-wallet-main-img"
          />
          <h2>Connect to Third Space</h2>
        </div>
        {customErrorMessage && (
          <div className="popup-wallet-warning">
            <p>
             {customErrorMessage}
            </p>
            <a href="https://phantom.app/" target="_blank">
              Create a wallet with Phantom{" "}
              <i className="bi bi-arrow-right-short"></i>
            </a>
          </div>
        )}

        <div className="wallet-list">
          {/* Phantom */}
          <button
            id="phantom"
            className="wallet-btn"
            onClick={handleLoginWithPhantom}
          >
            <img src="/images/phantom-logo.png" alt="" />
            Continue with Phantom
          </button>
          {/* Metamask */}
          <button
            id="metamask"
            className="wallet-btn"
            onClick={handleLoginWithMetamask}
          >
            <img src="/images/metamask-logo.png" alt="" />
            Continue with Metamask
          </button>
          {/* Coming Soon */}
          <button className="wallet-btn wallet-btn-comingsoon">
            <i class="bi bi-lock-fill"></i>
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupWallet;
