import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileDashboard.css";
import "./DashboardMain.css";
import "../Root.css";

export default function ProfileDashboard() {
  const [userAccount, setUserAccount] = useState("");
  const [username, setUsername] = useState(""); // new state for username
  const [description, setDescription] = useState(""); // new state for description
  const [profilePicture, setProfilePicture] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [copied, setCopied] = useState("");
  const image = new Image();

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      const account = sessionStorage.getItem("userAccount");
      const storedUsername = sessionStorage.getItem("username");
      const storedDescription = sessionStorage.getItem("description");
      const storedProfilePicture = sessionStorage.getItem("profilePicture");

      setUserAccount(account);
      setUsername(storedUsername || "");
      setDescription(storedDescription || "");
      setProfilePicture(storedProfilePicture || null);
    } else {
      return;
    }
  }, []);

  const handleLogin = (account) => {
    setUserAccount(account);
  };

  const shortenAddress = (address) => {
    return address.slice(0, 5) + "..." + address.slice(-4);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(userAccount);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // hide the message after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const fileInputRef = useRef(null);

  const handleUploadButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        if (image.width > 300 || image.height > 300) {
          setImageError("The image must be smaller than 300x300 px");
        } else {
          setProfilePicture(image.src);
          setImageError(null);
        }
      };
      image.onerror = () => {
        setImageError("Failed to load image");
      };
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletId: userAccount,
          username: username,
          description: description,
          imageUrl: profilePicture,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Profile saved:", data);
        // Save data to sessionStorage
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("description", description);
        sessionStorage.setItem("profilePicture", profilePicture);
        // Redirect the user to the profile page or show a success message
        navigate("/profile");
      } else {
        console.error("Error saving profile:", response.statusText);
      }
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  return (
    <>
      <div className="dashboard-page-container">
        <div className="projects-header-sticky">
          <div className="dashboard-header">
            <h1>Profile</h1>
          </div>
        </div>
        <div className="dashboard-page-content">
          <div className="dashboard-page-content-left">
            <div className="dashboard-settings-item">
              <div className="dashboard-settings-title">
                <h2>{shortenAddress(userAccount)}</h2>
                <div className="dashboard-settings-title-icon">
                  <p>i</p>
                </div>
              </div>
              <input
                placeholder="Enter a username"
                value={username}
                onChange={handleUsernameChange}
              />
              <div className="dashboard-error">
                <div className="dashboard-icon-error">
                  <p>!</p>
                </div>
                <p className="dashboard-msg-error">Invalid username. Already taken.</p>
              </div>
            </div>
            <div className="dashboard-settings-item">
              <div className="dashboard-settings-title">
                <h2>{shortenAddress(userAccount)}</h2>
              </div>
              <div className="dashboard-settings-wallet-box">
                <a
                  href=""
                  className="dashboard-settings-wallet"
                  onClick={(e) => {
                    e.preventDefault();
                    copyToClipboard();
                  }}
                >
                  <p>{userAccount}</p><i class="bi bi-copy"></i>
                </a>
                {copied && (
                  <div className="dashboard-settings-wallet-copied">
                    <p>Copié</p>
                  </div>
                )}
              </div>
            </div>
            <div className="dashboard-settings-item">
              <div className="dashboard-settings-title">
                <h2>Bio</h2>
                <div className="dashboard-settings-title-icon">
                  <p>i</p>
                </div>
              </div>
              <textarea
                placeholder="Enter a description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>

            <div className="dashboard-settings-item">
              <div className="dashboard-settings-title">
                <h2>Profile picture</h2>
                <div className="dashboard-settings-title-icon">
                  <p>i</p>
                </div>
              </div>

              <div className="dashboard-settings-item-box-profile">
                <div className="dashboard-settings-pp">
                  <img src={profilePicture || "./images/favicon-placeholder.png"} />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <a
                  href=""
                  className="dashboard-settings-upload-btn"
                  onClick={handleUploadButtonClick}
                >
                  <i class="bi bi-cloud-upload"></i>Upload
                </a>
                <div className="dashboard-error">
                  <div className="dashboard-icon-error">
                    <p>!</p>
                  </div>
                  <p className="dashboard-msg-error">{imageError}</p>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <button type="submit" className="dashboard-page-content-save-btn">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
