import React, { useState, useEffect } from "react";
import "./PopupWallet.css";
import axios from "axios";
import "../Root.css";
import { db, doc, getDoc, setDoc, updateDoc } from '../../firebaseConfig';
import { wait } from "@testing-library/user-event/dist/utils";
import ReactGA from 'react-ga';
import UAuth from '@uauth/js';
import { useNavigate } from 'react-router-dom';
import Newsletter from "./Newsletter";

// Initialize Google Analytics
ReactGA.initialize('G-83NKPT3B9E');

function PopupWallet({ onClose, onUserLogin, checkWalletData, setShowPopup }) {
  const [showMore, setShowMore] = useState(false);
  const [walletAvailable, setWalletAvailable] = useState(true);
  const [phantomInitiated, setPhantomInitiated] = useState(false);
  const [customErrorMessage, setCustomErrorMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

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

  const saveLoginEvent = async (userId, walletType) => {
    const userRef = doc(db, 'wallets', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      await updateDoc(userRef, {
        lastLogin: new Date().toISOString(),
        walletType,
        clicks: userDoc.data().clicks ? userDoc.data().clicks + 1 : 1
      });
    } else {
      await setDoc(userRef, {
        userId,
        walletType,
        firstLogin: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        clicks: 1
      });
    }

    console.log("Login event saved to Firestore:", userId);
  };

  const authenticateWithEthereum = async (walletId) => {
    try {
      const message = "Please sign this message to confirm your identity.";
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, walletId],
      });
      // Verify the signature on the backend to ensure authenticity
      processLogin(walletId, 'Ethereum');
    } catch (error) {
      console.error("Error during Ethereum authentication:", error);
    }
  };

  const authenticateWithSolana = async (publicKey) => {
    try {
      const message = new TextEncoder().encode("Please sign this message to confirm your identity.");
      const signedMessage = await window.solana.signMessage(message, "utf8");
      // Verify the signature on the backend to ensure authenticity
      processLogin(publicKey, 'Solana');
    } catch (error) {
      console.error("Error during Solana authentication:", error);
    }
  };

  const authenticateWithUnstoppable = async (authorization) => {
    try {
      console.log("Authorization object:", authorization);
      const userId = authorization.idToken.sub;

      if (!userId) {
        throw new Error("Username is undefined in the authorization object");
      }

      console.log("Authenticated username:", userId);
      processLogin(userId, 'Unstoppable');
    } catch (error) {
      console.error("Error during Unstoppable authentication:", error);
      setCustomErrorMessage('Unstoppable authentication failed. Please try again.');
    }
  };

  const processLogin = (userId, walletType) => {
    if (typeof onUserLogin === "function") {
      onUserLogin(userId);
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userAccount", userId);
      checkWalletData(userId);
      saveLoginEvent(userId, walletType);
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
        setCustomErrorMessage('MetaMask authentication failed. Please try again.');
      }
    } else {
      console.log("MetaMask is not installed");
      setCustomErrorMessage('MetaMask is not installed. Install it and try again.');
    }
  };

  const checkForWallet = () => {
    const hasWallet = !!window.ethereum || ("solana" in window && window.solana.isPhantom);
    setWalletAvailable(hasWallet);
    console.log(hasWallet);
    if (!hasWallet) {
      setCustomErrorMessage('To use Third Space, you need to connect a wallet. Please create one with Phantom and then reload your page.');
    }
    else  {
      return;
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
        setCustomErrorMessage('Phantom authentication failed. Please try again.');
      }
    } else {
      if (phantomInitiated) {
        // Re-check wallet availability instead of reloading the page
        checkForWallet();
        if (walletAvailable) {
          setCustomErrorMessage("Phantom wallet is now available. Please try connecting again.");
        } else {
          setCustomErrorMessage('Phantom wallet is not available. Please refresh the page and try again.');
        }
      } else {
        setCustomErrorMessage('Phantom wallet installation isnt completed or not initiated. Please finish or install the Phatom wallet to continue.');
        setPhantomInitiated(true);
      }
    }
  };

  const handleLoginWithUnstoppable = async () => {
    logEvent('Click', 'Unstoppable Login Attempt');
    const uauth = new UAuth({
      clientID: "65f44ad3-b7ad-4e87-b782-9654d7257a4c",
      redirectUri: "http://localhost:3000",
      scope: "openid wallet"
    });

    try {
      const authorization = await uauth.loginWithPopup();
      authenticateWithUnstoppable(authorization);
    } catch (error) {
      console.error("Error with Unstoppable login:", error);
      setCustomErrorMessage('Unstoppable login failed. Please try again.');
    }
  };

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  useEffect(() => {
    setIsMobile(isMobileDevice());
    if (isMobileDevice()) {
      navigate('../get-started-mobile');
    }
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
  }, [onClose, navigate]);

  if (isMobile) {
    return null; // Do not render the popup on mobile devices
  }
  return (
    <div className="popup" id="popup" style={{ display: "flex" }}>
      <div className="popup-content">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2Fnavbar-close.png?alt=media&token=3424048f-f9b6-4779-8229-c671b9d3b7ae"
          alt="Close"
          className="close-button"
          onClick={onClose}
        />
        <div className="popup-wallet-header">
        <h2>Connect to</h2>

          <img
            src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2F3s-logo.png?alt=media&token=8a69bcce-2e9f-463e-8cba-f4c2fec1a904"
            className="popup-wallet-main-img"
          />
        </div>
        {customErrorMessage && (
          <div className="popup-wallet-warning">
            <p>
             {customErrorMessage}
            </p>
            <a className="wallet-btn" id="create-wallet-btn-phantom" href="https://phantom.app/" target="_blank">
            <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2Fphantom-logo.png?alt=media&token=5ffe611b-3ccd-4663-81e4-59feeb1dbba7" alt="" />

              Create a wallet with Phantom{" "}
            </a>
          </div>
        )}

        <div className={`wallet-list ${customErrorMessage ? 'wallet-hide' : ''}`}>
          {/* Phantom */}
          <button
            id="phantom"
            className="wallet-btn ga-wallet-btn-phantom"
            onClick={handleLoginWithPhantom}
          >
            <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2Fphantom-logo.png?alt=media&token=5ffe611b-3ccd-4663-81e4-59feeb1dbba7" alt="" />
            Continue with Phantom
          </button>
          {/* Metamask */}
          <button
            id="metamask"
            className="wallet-btn ga-wallet-btn-metamask"
            onClick={handleLoginWithMetamask}
          >
            <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2Fmetamask-logo.png?alt=media&token=507097be-0cc4-4d93-a87b-99c67d82cfe5" alt="" />
            Continue with Metamask
          </button>
          {/* Unstoppable */}
          <button
            id="unstoppable"
            className="wallet-btn ga-wallet-btn-ud"
            onClick={handleLoginWithUnstoppable}
          >
            <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2Funstoppablelogo.png?alt=media&token=60b8c7c0-d644-4954-be2d-7afe3065b876" alt="" />
            Continue with Unstoppable
          </button>
          
        </div>
        <hr className="newsletter-top-separator"></hr>
        <div className="newsletter-section">
        <h3 className="newsletter-section-title">Stay Updated with Third Space, Join our Newsletter</h3>
        <Newsletter />
        <p className="newsletter-section-text">You can unsuscribe at any time. <span><a href="/#/privacy-policy">Privacy Policy</a></span></p>

        </div>
      </div>
    </div>
  );
}

export default PopupWallet;
