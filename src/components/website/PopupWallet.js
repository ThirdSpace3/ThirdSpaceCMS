import React, { useState, useEffect } from "react";
import "./PopupWallet.css";
import axios from "axios";
import "../Root.css";
import {db, doc, setDoc } from '../../firebaseConfig'

function PopupWallet({ onClose, onUserLogin }) {
  const [showMore, setShowMore] = useState(false);
  const [hasWallet, setHasWallet] = useState(false);
  console.log(db);

  useEffect(() => {
    const checkForWallet = () => {
      if (window.ethereum || "solana" in window) {
        setHasWallet(true);
      }
    };

    checkForWallet();
  }, []);

  const toggleShowMore = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };

  useEffect(() => {
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

  const handleLoginWithMetamask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        try {
          await setDoc(doc(db, 'wallets', account), { walletId: account });
          sessionStorage.setItem("isLoggedIn", true);

          console.log("Wallet ID saved to Firestore:", account);
        } catch (error) {
          console.error("Error saving wallet ID to Firestore:", error);
        }

        const message = "Please sign this message to confirm your identity.";
        const signature = await window.ethereum.request({
          method: "personal_sign",
          params: [message, account],
        });
        console.log("Signature:", signature);

        if (typeof onUserLogin === "function") {
          onUserLogin(account);
          sessionStorage.setItem("isLoggedIn", "true"); // Set login flag in session storage
          sessionStorage.setItem("userAccount", account); // Save user account in session storage
        } else {
          console.error("onUserLogin is not a function");
        }
        onClose();
        console.log("onUserLogin prop type:", typeof onUserLogin);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.log("MetaMask is not installed");
    }
  };

  const handleLoginWithPhantom = async () => {
    if ("solana" in window) {
      try {
        const provider = window.solana;
        if (provider.isPhantom) {
          const response = await provider.connect();
          const publicKey = response.publicKey.toString();
          try {
            await setDoc(doc(db, 'wallets', publicKey), { walletId: publicKey });
            console.log("Wallet ID saved to Firestore:", publicKey);
          } catch (error) {
            console.error("Error saving wallet ID to Firestore:", error);
          }

          // Create a message to sign
          const message = new TextEncoder().encode(
            "Please sign this message to confirm your identity."
          );
          const signed = await provider.signMessage(message, "utf8");
          console.log("Signature:", signed.signature);
          // Use onUserLogin function here as well
          if (typeof onUserLogin === "function") {
            onUserLogin(publicKey);
            sessionStorage.setItem("isLoggedIn", "true"); // Set login flag
            sessionStorage.setItem("userAccount", publicKey); // Save user account
            console.log(sessionStorage);
          } else {
            console.error("onUserLogin is not a function");
          }
          onClose(); // Optionally close the popup after login
          console.log("onUserLogin prop type:", typeof onUserLogin);
        }
      } catch (error) {
        console.error("Error connecting to Phantom:", error);
        //window.open("https://phantom.app/download", "_blank");
      }
    } else {
      console.log(
        "Solana object not found! Make sure Phantom wallet is installed."
      );
    }
  };

  // https://docs.unstoppabledomains.com/identity/overview/login-with-unstoppable/

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
        {!hasWallet && (
          <div className="popup-wallet-warning">
            <p>
              To use Third Space, you need to connect via a wallet.We haven't
              found one on your browser.
            </p>
            <a href="https://phantom.app/" target="__blank">
              Create a wallet with Phantom{" "}
              <i class="bi bi-arrow-right-short"></i>
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
