import React, { useEffect, useState } from "react";
import "./DashboardMain.css";
import "../Root.css";
import PopupWallet from "../website/PopupWallet";

export default function LeftMenuDashboard({ onUserLogin }) {
  const [userAccount, setUserAccount] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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
    return address.slice(0, 5) + "..." + address.slice(-5);
  };

  return (
    <>
      {showPopup && (
        <PopupWallet onClose={() => setShowPopup(false)} onUserLogin={handleLogin} />
      )}
      <div className="left-menu-container">
        <div className="left-menu-top">
          <div className="profile-container">
            <img src="./images/avatar-placeholder.png" />
            <p className="profile-name">{shortenAddress(userAccount)}</p>
          </div>
          <div className="left-menu-links">
            <a href="" className="left-menu-item">
              <i className="bi bi-folder"></i>
              <p>Projects</p>
            </a>
            <a href="" className="left-menu-item">
              <i className="bi bi-wallet2"></i>
              <p>Billing</p>
            </a>
          </div>
        </div>
        <div className="left-menu-bottom">
          <div className="left-menu-links">
            <a href="" className="left-menu-item">
              <i className="bi bi-person"></i>
              <p>Profile</p>
            </a>
            <a href="" className="left-menu-item">
              <i className="bi bi-gear"></i>
              <p>Settings</p>
            </a>
          </div>
          <a href="" className="left-menu-bug">
            <i className="bi bi-bug"></i>
            <p>Report Bug</p>
          </a>
        </div>
      </div>
    </>
  );
}
