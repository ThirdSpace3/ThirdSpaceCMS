import React, { useState, useEffect } from "react";
import "./PopupWallet.css";
import axios from "axios";
import "../Root.css";
import { db, doc, getDoc, setDoc, updateDoc } from '../../firebaseConfig';
import { wait } from "@testing-library/user-event/dist/utils";
import ReactGA from 'react-ga';

// Initialize Google Analytics
ReactGA.initialize('G-83NKPT3B9E');

function PopupWallet({ onClose, onUserLogin, checkWalletData, setShowPopup }) {
  const [showMore, setShowMore] = useState(false);
  const [wallets, setWallets] = useState({ hasEthereum: false, hasSolana: false });
  const [walletAvailable, setWalletAvailable] = useState(true);
  const [phantomInitiated, setPhantomInitiated] = useState(false);
  const [customErrorMessage, setCustomErrorMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const toggleShowMore = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };

  const logEvent = (eventName, eventData) => {
    ReactGA.event({
      category: 'User',
      action: eventName,
      label: eventData
    });
  };

  const saveLoginEvent = async (walletId, walletType) => {
    const userRef = doc(db, 'wallets', walletId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      await updateDoc(userRef, {
        lastLogin: new Date().toISOString(),
        walletType,
        clicks: userDoc.data().clicks ? userDoc.data().clicks + 1 : 1
      });
    } else {
      await setDoc(userRef, {
        walletId,
        walletType,
        firstLogin: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        clicks: 1
      });
    }

    console.log("Login event saved to Firestore:", walletId);
  };

  const authenticateWithEthereum = async (walletId) => {
    try {
      const message = "Please sign this message to confirm your identity.";
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, walletId],
      });
      processLogin(walletId, 'Ethereum');
    } catch (error) {
      console.error("Error during Ethereum authentication:", error);
    }
  };

  const authenticateWithSolana = async (publicKey) => {
    try {
      const message = new TextEncoder().encode("Please sign this message to confirm your identity.");
      const signedMessage = await window.solana.signMessage(message, "utf8");
      processLogin(publicKey, 'Solana');
    } catch (error) {
      console.error("Error during Solana authentication:", error);
    }
  };

  const processLogin = (walletId, walletType) => {
    if (typeof onUserLogin === "function") {
      onUserLogin(walletId);
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userAccount", walletId);
      checkWalletData(walletId);
      saveLoginEvent(walletId, walletType);
    } else {
      console.error("onUserLogin is not a function");
    }
    onClose();
  };

  const handleLoginWithMetamask = async () => {
    logEvent('Click', 'Metamask Login Attempt');
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

  const handleLoginWithPhantom = async () => {
    logEvent('Click', 'Phantom Login Attempt');
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
        console.log("Phantom wallet still not installed. Refreshing the page.");
        localStorage.setItem('openWalletPopup', 'true');
        window.location.reload();
      } else {
        console.log("Phantom wallet is not installed. Please install and retry.");
        setPhantomInitiated(true);
      }
    }
  };

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  useEffect(() => {
    setIsMobile(isMobileDevice());
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
  }, [onClose]);

  if (isMobile) {
    return null; // Do not render the popup on mobile devices
  }

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
            <i className="bi bi-lock-fill"></i>
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupWallet;
