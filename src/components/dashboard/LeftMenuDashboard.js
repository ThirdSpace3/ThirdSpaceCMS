import React, { useEffect, useState, useRef } from "react";
import "./DashboardMain.css";
import "../Root.css";
import PopupWallet from "../website/login/PopupWallet";
import { db, doc, getDoc } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import ReportBugBTN from "../website/ReportBugBTN";

export default function LeftMenuDashboard({
  userRole,
  setActiveMenuItem,
  username,
  profilePicture,
  walletId,
  isCollapsed,
  toggleMenu
}) {
  const navigate = useNavigate();
  const [userAccount, setUserAccount] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [localUsername, setLocalUsername] = useState("");
  const [localProfilePicture, setLocalProfilePicture] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState("projects");
  const [headerImage, setHeaderImage] = useState(""); // State for the header image
  const reportBugBtnRef = useRef(null);

  useEffect(() => {
    const account = sessionStorage.getItem("userAccount");
    if (account) {
      fetchUserProfile(account);
      setUserAccount(account);
    } else {
      fetchUserProfile(walletId);
      setShowPopup(true);
    }
  }, [userAccount]);

  useEffect(() => {
    // Update the header image based on the collapsed state
    if (isCollapsed) {
      setHeaderImage("https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2F3s-logo-picto.png?alt=media&token=eccaecaa-e624-4bb4-a1ad-54f181d09510");
    } else {
      setHeaderImage("https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2F3s-logo.png?alt=media&token=8a69bcce-2e9f-463e-8cba-f4c2fec1a904");
    }
  }, [isCollapsed]);

  const fetchUserProfile = async (walletId) => {
    try {
      const userRef = doc(db, "users", walletId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setLocalUsername(userData.profile.username || "");
        setLocalProfilePicture(userData.profile.profilePicture || "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageDashboard%2FAdmin%2Fplaceholderprofilepicture.png?alt=media&token=c4eb30d5-47c9-44c3-9232-95d254c7c2ea");
      } else {
        console.error("User document does not exist.");
      }
    } catch (err) {
      console.error("Error fetching profile data from Firestore:", err);
    }
  };

  const handleLogin = (account) => {
    setUserAccount(account);
    setShowPopup(false);
  };

  const shortenAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  const handleMenuItemClick = (menuItem, event, walletId) => {
    event.preventDefault();
    setSelectedMenuItem(menuItem);

    if (menuItem === "admin") {
      if (walletId) {
        window.location.href = `https://admin.3rd-space.io/?walletId=${walletId}`;
      } else {
        console.error("No wallet ID found in localStorage.");
      }
    } else if (menuItem === "bug") {
      if (reportBugBtnRef.current) {
        reportBugBtnRef.current.openModal();
      }
    } else {
      setActiveMenuItem(menuItem);
    }
  };



  return (
    <>
      {showPopup && (
        <PopupWallet
          onClose={() => setShowPopup(false)}
          onUserLogin={handleLogin}
        />
      )}
      <div className={`left-menu-container ${isCollapsed ? 'collapsed' : ''}`}>
        <button className="toggle-button" onClick={toggleMenu}>
          {isCollapsed ? <i className="bi bi-chevron-compact-right"></i> : <i className="bi bi-chevron-compact-left"></i>}
        </button>

        <div className="left-menu-top">
          <div className="left-menu-header">
          <img className="left-menu-header-image" src={headerImage} alt="thirdspace logo" />
          </div>
          <div className="left-menu-links">
            <a
              className={`left-menu-item ${selectedMenuItem === "projects" ? "selected" : ""}`}
              onClick={(event) => handleMenuItemClick("projects", event)}
            >
              <i className="bi bi-folder"></i>
              <p>Projects</p>
            </a>
            <a
              className={`left-menu-item ${selectedMenuItem === "billing" ? "selected" : ""}`}
              onClick={(event) => handleMenuItemClick("billing", event)}
              id="billing-page"
            >
              <i className="bi bi-currency-dollar"></i>
              <p>Billing</p>
            </a>
            <a
              className={`left-menu-item ${selectedMenuItem === "features" ? "selected" : ""}`}
              onClick={(event) => handleMenuItemClick("features", event)}
              id="features-page"
            >
              <i className="bi bi-boxes"></i>
              <p>Features</p>
            </a>
            <a
              className={`left-menu-item ${selectedMenuItem === "help-center" ? "selected" : ""}`}
              onClick={(event) => handleMenuItemClick("help-center", event)}
              id="help-center-page"
            >
              <i className="bi bi-question-circle"></i>
              <p>Help Center</p>
            </a>
            {userRole === "admin" && (
              <a
                className={`left-menu-item ${selectedMenuItem === "admin" ? "selected" : ""}`}
                onClick={(event) => handleMenuItemClick("admin", event, walletId)}
                id="admin-page"
              >
                <i className="bi bi-person"></i>
                <p>Panel Admin</p>
              </a>
            )}
          </div>
        </div>
        <div className="left-menu-bottom">
          <div className={`left-menu-links left-menu-item ${selectedMenuItem === "bug" ? "selected" : ""}`} onClick={(event) => handleMenuItemClick("bug", event)} >
            <i className="bi bi-bug"></i>
            <p>Report Bug</p>
          </div>

          <div className={`profile-container ${selectedMenuItem === "profile" ? "selected" : ""}`} onClick={(event) => handleMenuItemClick("profile", event)} >
            <img
              src={localProfilePicture || "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageDashboard%2FAdmin%2Fplaceholderprofilepicture.png?alt=media&token=c4eb30d5-47c9-44c3-9232-95d254c7c2ea"}
              alt="Profile avatar"
              className="profile-picture"
            />
            <div className="profile-name">
            <p className="profile-name-content" style={{ fontWeight: 600 }}>
              {localUsername || shortenAddress(userAccount)} 
              
              <br /> 
              <span style={{ fontWeight: 400 }}>
              View profile
              </span>

            </p>
            <i className="bi bi-three-dots"></i>

            </div>

          </div>
        </div>
      </div>
      <ReportBugBTN ref={reportBugBtnRef} />
    </>
  );
}
