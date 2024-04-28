import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardMain.css";
import "../Root.css";

export default function ProfileDashboard({ updateUserDetails }) {
  const [userAccount, setUserAccount] = useState(sessionStorage.getItem("userAccount"));
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState(() => {
    // Attempt to load profile picture from local storage, fallback to default
    return localStorage.getItem("profilePicture");
  });
  const [isEdited, setIsEdited] = useState(false); // Tracks if any edits have been made
  const [isSaved, setIsSaved] = useState(false); // Tracks if changes have been successfully saved
  const [imageError, setImageError] = useState(null);
  const [copied, setCopied] = useState("");

  const navigate = useNavigate();
  const fileInputRef = useRef(null);


  

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
        // Check dimensions before setting
        if (image.width > 300 || image.height > 300) {
          setImageError("The image must be smaller than 300x300 px");
        } else {
          setProfilePicture(image.src); // Set the image URL for preview
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


// ProfileDashboard component
const handleSubmit = async (event) => {
  event.preventDefault();
  if (username.length > 15) {
    setUsernameError("Username must be 15 characters or less.");
    return; // Stop form submission if validation fails
  }

  try {
    const formData = new FormData();
    formData.append('walletId', userAccount);
    formData.append('username', username);
    formData.append('description', description);
    formData.append('profilePicture', fileInputRef.current.files[0]); // Append profile picture file

    const response = await fetch("/api/save-profile", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Profile saved:", data);
      setIsEdited(false);
      setIsSaved(true);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("description", description);
      updateUserDetails(username, description, data.profilePictureUrl); // Update with profile picture URL
    } else {
      console.error("Error saving profile:", response.statusText);
    }
  } catch (err) {
    console.error("Error saving profile:", err);
  }
};

  
// ProfileDashboard component
useEffect(() => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    const account = sessionStorage.getItem("userAccount");
    fetchProfile(account);
  }
}, []);

const fetchProfile = async (walletId) => {
  try {
    const response = await fetch(`/api/get-profile-by-wallet?walletId=${walletId}`);
    if (response.ok) {
      const data = await response.json();
      setUsername(data.username || "My Username");
      setDescription(data.description || "");
      setProfilePicture(data.profilePicture || ''); // Set default value to empty string if profile picture doesn't exist
      console.log(data);
    } else {
      setUsername(shortenAddress(userAccount));
      setDescription("");
      setProfilePicture("./images/avatar-placeholder.png"); // Set default value to empty string if profile picture doesn't exist

      console.error("Failed to fetch profile data.");
    }
  } catch (err) {
    console.error("Error fetching profile:", err);
  }
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
                className={`dashboard-page-content-save-btn${isEdited ? " dashboard-page-content-save-btn-activated" : ""
                  }`}
              >
                {isSaved ? (
                  <i className="bi bi-check2 dashboard-page-content-save-btn-i"></i>
                ) : (
                  "Save"
                )}
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
                    <p>Copied</p>
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
                    src={profilePicture}
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
