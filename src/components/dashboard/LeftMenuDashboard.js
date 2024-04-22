import React, { useEffect, useState } from "react";
import "./DashboardMain.css";
import "../Root.css";
import PopupWallet from "../website/PopupWallet";

export default function LeftMenuDashboard({
  setActiveMenuItem,
  username,
  profilePicture,
}) {
  const [userAccount, setUserAccount] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false); // New state for the copied message

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      const account = sessionStorage.getItem("userAccount");
      setUserAccount(account);
    } else {
      setShowPopup(true);
    }
  }, []);

  const handleLogin = (account) => {
    setUserAccount(account);
    setShowPopup(false);
  };

  const shortenAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  const handleMenuItemClick = (menuItem, event) => {
    event.preventDefault();
    setActiveMenuItem(menuItem);
  };

  const handleCopyAddress = () => {
    navigator.clipboard
      .writeText(userAccount)
      .then(() => {
        setShowCopiedMessage(true); // Show the copied message
        setTimeout(() => setShowCopiedMessage(false), 3000); // Hide the message after 3 seconds
      })
      .catch((err) => {
        console.error("Failed to copy the address: ", err);
      });
  };
  return (
    <>
      {showPopup && (
        <PopupWallet
          onClose={() => setShowPopup(false)}
          onUserLogin={handleLogin}
        />
      )}
      <div className="left-menu-container">
        <div className="left-menu-top">
            <div className="profile-container">
              <img src={profilePicture} alt="Profile avatar" />
              <p className="profile-name" onClick={handleCopyAddress}>
                {username} {/* Display the username */}
              </p>
              {showCopiedMessage && (
                <div className="dashboard-settings-wallet-copied">
                  Address Copied!
                </div>
              )}
            </div>
         

          <div className="left-menu-links">
            <a
              href=""
              className="left-menu-item"
              onClick={(event) => handleMenuItemClick("projects", event)}
            >
              <i className="bi bi-folder"></i>
              <p>Projects</p>
            </a>
            <a
              href=""
              className="left-menu-item"
              onClick={(event) => handleMenuItemClick("billing", event)}
            >
              <i className="bi bi-wallet2"></i>
              <p>Billing</p>
            </a>
            <a
              href=""
              className="left-menu-item"
              onClick={(event) => handleMenuItemClick("profile", event)}
            >
              <i className="bi bi-person"></i>
              <p>Profile</p>
            </a>
          </div>
        </div>
        <div className="left-menu-bottom">
          <div className="left-menu-links">
          <a href="/#/home" className="left-menu-item">
            <i class="bi bi-house-door"></i>
              <p>Back Home</p>
            </a>
            <a
              href="https://discord.gg/kehHCkUGRU" target="_blank"
              className="left-menu-item"
              
            >
              <i className="bi bi-bug"></i>
              <p>Report Bug</p>
            </a>
            {/* <a href="" className="left-menu-item" onClick={(event) => handleMenuItemClick("settings", event)}> */}
          </div>
          
        </div>
      </div>
    </>
  );
}
