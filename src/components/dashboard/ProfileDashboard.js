import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardMain.css";
import "../Root.css";

export default function ProfileDashboard({ updateUserDetails }) {
  const [userAccount, setUserAccount] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [isEdited, setIsEdited] = useState(false); // Tracks if any edits have been made
  const [isSaved, setIsSaved] = useState(false); // Tracks if changes have been successfully saved
  const [imageError, setImageError] = useState(null);
  const [copied, setCopied] = useState("");

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      const account = sessionStorage.getItem("userAccount");
      const storedUsername = sessionStorage.getItem("username");
      const storedDescription = sessionStorage.getItem("description");
      const storedProfilePicture = sessionStorage.getItem("profilePicture");

      setUserAccount(account);
      setUsername(storedUsername || "My Username");
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

  const handleUploadButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  // Update handlers to set isEdited to true and isSaved to false upon any edit
  const handleUsernameChange = (event) => {
    const inputUsername = event.target.value;
    if (inputUsername.length <= 15) {
      setUsername(inputUsername);
      setIsEdited(true);
      setIsSaved(false);
      setUsernameError(""); // Clear any error message
    } else {
      // Optionally set an error message if the username exceeds 15 characters
      setUsernameError("Username must be 15 characters or less.");
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setIsEdited(true);
    setIsSaved(false);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        if (image.width > 300 || image.height > 300) {
          setImageError("The image must be smaller than 300x300 px");
          setIsEdited(false); // Revert isEdited if the image is not valid
        } else {
          setProfilePicture(image.src);
          setImageError(null);
          setIsEdited(true);
          setIsSaved(false);
        }
      };
      image.onerror = () => {
        setImageError("Failed to load image");
      };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Create Behaviour to check DB and save the datas here
    if (username.length > 15) {
      setUsernameError("Username must be 15 characters or less.");
      return; // Stop the form submission
    }
    // try {
    //   const response = await fetch("/api/profile", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       walletId: userAccount,
    //       username: username,
    //       description: description,
    //       imageUrl: profilePicture,
    //     }),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    // console.log("Profile saved:", data);
    // Save data to sessionStorage
    setIsEdited(false);
    setIsSaved(true);
    updateUserDetails(username, description, profilePicture); // Update user details at the parent level or wherever necessary

    sessionStorage.setItem("username", username);
    sessionStorage.setItem("description", description);
    sessionStorage.setItem("profilePicture", profilePicture);
    // Redirect the user to the profile page or show a success message
    updateUserDetails(username, description, profilePicture);

    //   } else {
    //     console.error("Error saving profile:", response.statusText);
    //   }

    // } catch (err) {
    //   console.error("Error saving profile:", err);
    // }
  };

  return (
    <>
      <div className="dashboard-page-container">
        <div className="projects-header-sticky">
          <div className="dashboard-header">
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                className={`dashboard-page-content-save-btn${
                  isEdited ? " edited" : ""
                }`}
              >
                {isSaved ? <i className="bi bi-check"></i> : "Save"}
              </button>
            </form>
          </div>
        </div>
        <div className="dashboard-page-content">
          <div className="dashboard-page-content-left">
            <div className="dashboard-settings-item">
              <div className="dashboard-settings-title">
                <h2>Username</h2>
                <div className="dashboard-settings-title-icon">
                  <p>i</p>
                </div>
              </div>
              <input
                placeholder={username}
                value={username}
                onChange={handleUsernameChange}
              />
              {usernameError && (
                <div className="dashboard-error">
                  <div className="dashboard-icon-error">
                    <p>!</p>
                  </div>
                  <p className="dashboard-msg-error">{usernameError}</p>
                </div>
              )}
            </div>

            <div className="dashboard-settings-item">
              <div className="dashboard-settings-title">
                <h2>Wallet Adresse</h2>
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
                  <p>{userAccount}</p>
                  <i class="bi bi-copy"></i>
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
                  <img
                    src={profilePicture || "./images/favicon-placeholder.png"}
                    alt="Profile"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <div className="dashboard-settings-upload-box">
                  <a
                    href="#"
                    className="dashboard-settings-upload-btn"
                    onClick={handleUploadButtonClick}
                  >
                    <i className="bi bi-cloud-upload"></i>Upload
                  </a>
                  {imageError && (
                    <div className="dashboard-error">
                      <div className="dashboard-icon-error">
                        <p>!</p>
                      </div>
                      <p className="dashboard-msg-error">{imageError}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
