import React, { useState, useEffect, useRef } from "react";
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
  const images = [
    './images/carrouseltest.png',
    './images/carrouseltest.png',
    './images/carrouseltest.png',
    './images/carrouseltest.png',
    './images/carrouseltest.png',
    // Add more image paths as needed
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef(null);

  const handleTransitionEnd = () => {
    if (currentIndex >= images.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    } else if (currentIndex < 0) {
      setIsTransitioning(false);
      setCurrentIndex(images.length - 1);
    } else {
      setIsTransitioning(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsTransitioning(true);
    }, 5000);

    timeoutRef.current = interval;

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isTransitioning) {
      const id = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(id);
    }
  }, [isTransitioning]);

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
    else {
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
  }, [onClose, navigate]);

  if (isMobile) {
    return null; // Do not render the popup on mobile devices
  }

  return (
    <div className="popup" id="popup" style={{ display: "flex" }}>
      <div className="popup-content">

        <img
          src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2F3s-logo.png?alt=media&token=8a69bcce-2e9f-463e-8cba-f4c2fec1a904"
          className="popup-wallet-main-img"
        />
        <div className="Sign-in-header">
          <h3>Welcome</h3>
          <p>If this is you first time, we will create a account for you! </p>
        </div>
        <div className="mail-login-method">
          <input type="email"></input>
          <button className="wallet-btn">Continue with this email</button>
        </div>
        <div className="seperation-connection-way">
          <hr></hr>
          <p>or</p>
          <hr></hr>
        </div>

        <button className="wallet-btn">
          Connect Wallet
        </button>
        <p>By sigining in, you're agreeing to the <a href=""><u><b>Terms</b></u></a> and <a><u><b>Privacy Policy</b></u> </a></p>
      
      </div>
      <div className="wallet-carousel-container">
        <div
          className="wallet-carousel"
          style={{
            transform: `translateY(-${(currentIndex % images.length) * 20}%)`,
            transition: isTransitioning ? 'transform 1s ease' : 'none'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {[...images, ...images].map((src, index) => (
            <img
              key={index}
              src={src}
              className={`wallet-carousel-image ${index === currentIndex ? 'active' : 'inactive'}`}
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentIndex % images.length ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopupWallet;