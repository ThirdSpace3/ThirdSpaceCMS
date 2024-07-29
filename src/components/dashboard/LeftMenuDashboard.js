import React, { useEffect, useState } from "react";
import "./DashboardMain.css";
import "../Root.css";
import PopupWallet from "../website/login/PopupWallet";
import { db, doc, getDoc } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function LeftMenuDashboard({
  userRole,
  setActiveMenuItem,
  username,
  profilePicture,
}) {
  const navigate = useNavigate();
  const [userAccount, setUserAccount] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [localUsername, setLocalUsername] = useState("");
  const [localProfilePicture, setLocalProfilePicture] = useState("");

  useEffect(() => {
    const account = sessionStorage.getItem("userAccount");
    if (account) {
      fetchUserProfile(account);
      setUserAccount(account);
    } else {
      setShowPopup(true);
    }
  }, [userAccount]);

  const fetchUserProfile = async (walletId) => {
    try {
      const userRef = doc(db, "users", walletId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setLocalUsername(userData.username || "");
        setLocalProfilePicture(userData.profilePicture || "");
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

  const handleMenuItemClick = (menuItem, event) => {
    event.preventDefault();
    if (menuItem === "admin") {
      // Redirect to the admin subdomain with walletId as a query parameter
      window.location.href = `https://admin.3rd-space.io?walletId=${userAccount}`;
    } else {
      setActiveMenuItem(menuItem);
    }
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
            <img
              src={localProfilePicture || "../images/avatar-placeholder.png"} // Fallback to default avatar if profilePicture is not available
              alt="Profile avatar"
              className="profile-picture" // Apply a CSS class for styling
            />
            <p className="profile-name" onClick={handleCopyAddress}>
              {localUsername || shortenAddress(userAccount)}
            </p>
            {showCopiedMessage && (
              <div className="dashboard-settings-wallet-copied">
                Address Copied!
              </div>
            )}
          </div>
          <div className="left-menu-links">
            <a
              className="left-menu-item"
              onClick={(event) => handleMenuItemClick("projects", event)}
            >
              <i className="bi bi-folder"></i>
              <p>Projects</p>
            </a>
            <a
              className="left-menu-item"
              onClick={(event) => handleMenuItemClick("billing", event)}
              id="billing-page"
            >
              <i className="bi bi-wallet2"></i>
              <p>Billing</p>
            </a>
            <a
              className="left-menu-item"
              onClick={(event) => handleMenuItemClick("profile", event)}
              id="profile-page"
            >
              <i className="bi bi-person"></i>
              <p>Profile</p>
            </a>
            {userRole === "admin" && (
              <a
                className="left-menu-item"
                onClick={(event) => handleMenuItemClick("admin", event)}
                id="admin-page"
              >
                <i className="bi bi-person"></i>
                <p>Admin Button</p>
              </a>
            )}
          </div>
        </div>
        <div className="left-menu-bottom">
          <div className="left-menu-links">
            {/* Add any additional bottom menu links here */}
          </div>
        </div>
      </div>
    </>
  );
}
