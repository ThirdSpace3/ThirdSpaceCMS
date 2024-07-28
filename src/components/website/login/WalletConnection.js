import React, { useState } from "react";
import "../PopupWallet.css";
import { db, doc, getDoc, setDoc } from '../../../firebaseConfig';
import UAuth from '@uauth/js';

function WalletConnection({ saveLoginEvent, logEvent, checkWalletData, checkForWallet, onClose, walletAvailable, onUserLogin }) {
  const [phantomInitiated, setPhantomInitiated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage("Ethereum authentication failed. Please try again");
    }
  };

  const authenticateWithSolana = async (publicKey) => {
    try {
      const message = new TextEncoder().encode("Please sign this message to confirm your identity.");
      const signedMessage = await window.solana.signMessage(message, "utf8");
      processLogin(publicKey, 'Solana');
    } catch (error) {
      console.error("Error during Solana authentication:", error);
      setErrorMessage("Solana authentication failed. Please try again");
    }
  };

  const authenticateWithUnstoppable = async (authorization) => {
    try {
      const userId = authorization.idToken.sub;
      if (!userId) throw new Error("Username is undefined in the authorization object");
      processLogin(userId, 'Unstoppable');
    } catch (error) {
      console.error("Error during Unstoppable authentication:", error);
      setErrorMessage('Unstoppable authentication failed. Please try again');
    }
  };

  const processLogin = (userId, walletType) => {
    if (typeof onUserLogin === "function") {
      onUserLogin(userId);
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userAccount", userId);
      checkWalletData(userId);
      saveLoginEvent(userId, walletType); // Save the login event here
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
        const timestamp = new Date().toISOString();

        if (!walletSnap.exists()) {
          await setDoc(walletRef, { walletId: account, lastLogin: timestamp, walletType:'Ethereum' });
          console.log("Wallet ID saved to Firestore:", account);
        } else {
          console.log("Wallet data retrieved:", walletSnap.data());
        }

        authenticateWithEthereum(account);
      } catch (error) {
        console.error("Error with MetaMask login:", error);
        setErrorMessage('MetaMask authentication failed. Please try again');
      }
    } else {
      setErrorMessage('MetaMask is not installed. Install it and try again');
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
        const timestamp = new Date().toISOString();

        if (!walletSnap.exists()) {
          await setDoc(walletRef, { walletId: publicKey, lastLogin: timestamp, walletType:'Solana' });
          console.log("Wallet ID saved to Firestore:", publicKey);
        } else {
          console.log("Wallet data retrieved:", walletSnap.data());
        }

        authenticateWithSolana(publicKey);
      } catch (error) {
        console.error("Error connecting to Phantom:", error);
        setErrorMessage('Phantom authentication failed. Please try again');
      }
    } else {
      if (phantomInitiated) {
        checkForWallet();
        if (walletAvailable) {
          setErrorMessage("Phantom wallet is now available. Please try connecting again");
        } else {
          setErrorMessage('Phantom wallet is not available. Please refresh the page and try again');
        }
      } else {
        setErrorMessage('Phantom wallet installation isn\'t completed or not initiated. Please finish or install the Phantom wallet to continue');
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
      setErrorMessage('Unstoppable login failed. Please try again');
    }
  };

  return (
    <div className="wallet-list">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button
        id="phantom"
        className="wallet-btn ga-wallet-btn-phantom"
        onClick={handleLoginWithPhantom}
      >
        <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2Fphantom-logo.png?alt=media&token=5ffe611b-3ccd-4663-81e4-59feeb1dbba7" alt="" />
        Continue with Phantom
      </button>
      <button
        id="metamask"
        className="wallet-btn ga-wallet-btn-metamask"
        onClick={handleLoginWithMetamask}
      >
        <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2Fmetamask-logo.png?alt=media&token=507097be-0cc4-4d93-a87b-99c67d82cfe5" alt="" />
        Continue with Metamask
      </button>
      <button
        id="unstoppable"
        className="wallet-btn ga-wallet-btn-ud"
        onClick={handleLoginWithUnstoppable}
      >
        <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2Funstoppablelogo.png?alt=media&token=60b8c7c0-d644-4954-be2d-7afe3065b876" alt="" />
        Continue with Unstoppable
      </button>
    </div>
  );
}

export default WalletConnection;
