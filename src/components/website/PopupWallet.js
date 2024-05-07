import React, { useState, useEffect } from "react";
import "./PopupWallet.css";
import axios from "axios";
import "../Root.css";
import {db, doc, setDoc } from '../../firebaseConfig'
import { wait } from "@testing-library/user-event/dist/utils";

function PopupWallet({ onClose, onUserLogin, checkWalletData }) {
  const [showMore, setShowMore] = useState(false);
  const [wallets, setWallets] = useState({ hasEthereum: false, hasSolana: false });
  const [walletAvailable, setWalletAvailable] = useState(true);
  const [phantomInitiated, setPhantomInitiated] = useState(false);

  const toggleShowMore = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };


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

        if (typeof onUserLogin === "function") {
          onUserLogin(account);
          sessionStorage.setItem("isLoggedIn", true); // Set login flag in session storage
          sessionStorage.setItem("userAccount", account); // Save user account in session storage
          checkWalletData(account);

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
            sessionStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem("userAccount", publicKey); // Save user account

            console.log(sessionStorage.getItem("isLoggedIn"));
          } catch (error) {
            console.error("Error saving wallet ID to Firestore:", error);
          }

          // Create a message to sign
          const message = new TextEncoder().encode(
            "Please sign this message to confirm your identity."
          );
          const signed = await provider.signMessage(message, "utf8");
          // Use onUserLogin function here as well
          if (typeof onUserLogin === "function") {
            onUserLogin(publicKey);
            sessionStorage.setItem("isLoggedIn", "true"); // Set login flag
            sessionStorage.setItem("userAccount", publicKey); // Save user account
            checkWalletData(publicKey);

          } else {
            console.error("onUserLogin is not a function");
          }
          onClose(); // Optionally close the popup after login
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
  useEffect(() => {
    const checkForWallet = () => {
      // Check if either Metamask or Phantom is available
      const hasWallet = !!window.ethereum || "solana" in window;
      setWalletAvailable(hasWallet);
      console.log(hasWallet);
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
  const handleCreatePhantomWallet = () => {
    setPhantomInitiated(true);
    window.open("https://phantom.app/download", "_blank");
  };
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
        {!walletAvailable && (
          <div className="popup-wallet-warning">
            <p>
              To use Third Space, you need to connect via a wallet. We haven't
              found one on your browser. 
              Finish the entiere profile creation in order to be able to login !
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
