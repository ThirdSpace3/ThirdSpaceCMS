// src/components/PopupWallet.js
import React, { useState, useEffect, useRef } from "react";
import "../PopupWallet.css";
import "../../Root.css";
import { db, doc, getDoc, setDoc, updateDoc } from '../../../firebaseConfig';
import ReactGA from 'react-ga';
import { useNavigate } from 'react-router-dom';
import EmailLogin from "./EmailLogin";
import WalletConnection from "./WalletConnection";
import ForgotPassword from "./ForgotPassword";
import WalletCarousel from "./WalletCarousel"; // Import the new component

// Initialize Google Analytics
ReactGA.initialize('G-83NKPT3B9E');

function PopupWallet({ onClose, setShowPopup }) {
  const [hasStepData, setHasStepData] = useState(false); // State to track if stepData is available
  const [hasWalletData, setHasWalletData] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const onUserLogin = (userAccount) => {
    // Handle user login here
    console.log("User logged in:", userAccount);
    navigate('../dashboard');
  };

  const [walletAvailable, setWalletAvailable] = useState(true);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [customErrorMessage, setCustomErrorMessage] = useState("");
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Welcome");
  const [headerDescription, setHeaderDescription] = useState("If this is your first time, we will create an account for you!");
  const [showVerificationField, setShowVerificationField] = useState(false); // New state

  const navigate = useNavigate();

  const checkWalletData = async () => {
    const userAccount = sessionStorage.getItem("userAccount");
    if (userAccount) {
      try {
        const docRef = doc(db, 'users', userAccount); // Correctly reference the document
        const docSnap = await getDoc(docRef); // Use getDoc to fetch the document snapshot

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.selectedButtons && Object.keys(data.selectedButtons).length > 0) {
            setHasWalletData(true);
            setHasStepData(true); // Assume step data availability correlates with wallet data
          } else {
            setHasWalletData(false);
            setHasStepData(false);
          }
        } else {
          setHasWalletData(false);
          setHasStepData(false);
        }
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        setHasWalletData(false);
        setHasStepData(false);
      }
      setAccounts([userAccount]); // Ensure user account is set
    }
  };
  useEffect(() => {
    checkWalletData(); // Fetch wallet data on component mount
  }, []);

  useEffect(() => {
    console.log("Accounts:", accounts);
    console.log("Has Wallet Data:", hasWalletData);
  }, [accounts, hasWalletData]);

  const handleForgotPasswordClick = (event) => {
    event.preventDefault();
    setShowForgotPassword(true);
    setHeaderTitle("Password Forgotten");
    setHeaderDescription("You will receive an email with a link to create a new password");
  };

  const handleBackToLogin = (event) => {
    event.preventDefault();
    setShowForgotPassword(false);
    setHeaderTitle(isSignUp ? "Sign Up" : "Welcome");
    setHeaderDescription(isSignUp ? "Create your account with the method of your choice." : "If this is your first time, we will create an account for you!");
  };

  const logEvent = (eventName, eventData) => {
    ReactGA.event({
      category: 'User',
      action: eventName,
      label: eventData
    });
  };

  const saveLoginEvent = async (userId, loginType) => {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      await updateDoc(userRef, {
        lastLogin: new Date().toISOString(),
        loginType,
        clicks: userDoc.data().clicks ? userDoc.data().clicks + 1 : 1
      });
    } else {
      await setDoc(userRef, {
        userId,
        loginType,
        firstLogin: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        clicks: 1
      });
    }

    console.log("Login event saved to Firestore:", userId);
    navigate("../dashboard")

  };

  const checkForWallet = () => {
    const hasWallet = !!window.ethereum || ("solana" in window && window.solana.isPhantom);
    setWalletAvailable(hasWallet);
    if (!hasWallet) {
      setCustomErrorMessage('To use Third Space, you need to connect a wallet. Please create one with Phantom and then reload your page.');
    }
  };

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  useEffect(() => {
    setIsMobile(isMobileDevice());
    if (isMobileDevice()) {
      navigate('../get-started-mobile');
    }
    checkForWallet();
  }, [onClose, navigate]);

  const handleConnectWalletClick = () => {
    setShowWalletOptions(!showWalletOptions);
  };

  const handleSignUpState = (isSignUp) => {
    setIsSignUp(isSignUp);
    if (isSignUp) {
      setHeaderTitle("Sign Up");
      setHeaderDescription("Create your account with the method of your choice.");
    } else {
      setHeaderTitle("Welcome");
      setHeaderDescription("If this is your first time, we will create an account for you!");
    }
  };

  const resetState = () => {
    setIsSignUp(false);
    setIsExistingUser(false);
    setShowForgotPassword(false);
    setShowWalletOptions(false);
    setHeaderTitle("Welcome");
    setHeaderDescription("If this is your first time, we will create an account for you!");
    setShowVerificationField(false); // Reset verification field
  };

  const handleSignInClick = (event) => {
    event.preventDefault();
    resetState();
  };

  const handleSignUpClick = (event) => {
    event.preventDefault();
    resetState();
    setIsSignUp(true);
    setHeaderTitle("Sign Up");
    setHeaderDescription("Create your account with the method of your choice.");
  };

  const handlTermsClick = () => {
    navigate('../terms');
  };
  const handlPolicyClick = () => {
    navigate('../privacy-policy');
  };
  const handleLogoClick = () => {
    navigate('/');
  };

  const renderHeaderText = () => {
    if (showForgotPassword) {
      return {
        title: "Password Forgotten",
        description: "You will receive an email with a link to create a new password",
      };
    }
    return {
      title: isSignUp ? "Sign Up" : "Welcome",
      description: isSignUp
        ? "Create your account with the method of your choice."
        : "If this is your first time, we will create an account for you!",
    };
  };

  const headerText = renderHeaderText();

  if (isMobile) {
    return null; // Do not render the popup on mobile devices
  }

  const handleHeaderChange = (title, description) => {
    setHeaderTitle(title);
    setHeaderDescription(description);
  };

  return (
    <div className="popup" id="popup" style={{ display: "flex" }}>
      <div className="popup-content">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2F3s-logo.png?alt=media&token=8a69bcce-2e9f-463e-8cba-f4c2fec1a904"
          className="popup-wallet-main-img"
          onClick={handleLogoClick} // Added onClick handler
          style={{ cursor: 'pointer' }} // Change cursor to pointer to indicate clickable
        />
        <div className="Sign-in-header">
          <h1>{headerTitle}</h1>
          <p>{headerDescription}</p>
        </div>

        {showForgotPassword ? (
          <ForgotPassword onClose={handleBackToLogin} onHeaderChange={handleHeaderChange} />
        ) : showWalletOptions ? (
          <WalletConnection
            saveLoginEvent={saveLoginEvent}
            logEvent={logEvent}
            checkForWallet={checkForWallet}
            onClose={onClose}
            checkWalletData={checkWalletData}
            setCustomErrorMessage={setCustomErrorMessage}
            walletAvailable={walletAvailable}
            onUserLogin={onUserLogin}
            customErrorMessage={customErrorMessage}
          />
        ) : (
          <EmailLogin
            onUserLogin={onUserLogin}
            checkWalletData={checkWalletData}
            saveLoginEvent={saveLoginEvent}
            onClose={onClose}
            handleSignUpState={handleSignUpState}
            setIsExistingUser={setIsExistingUser}
            isExistingUser={isExistingUser}
            onForgotPassword={handleForgotPasswordClick} // Pass the forgot password handler
            onHeaderChange={handleHeaderChange}
            setShowVerificationField={setShowVerificationField} // Pass state setter
            showVerificationField={showVerificationField}
          />
        )}

        {!showForgotPassword && (
          <div className="seperation-connection-way">
            <hr></hr>
            <p>or</p>
            <hr></hr>
          </div>
        )}

        {!showForgotPassword && (
          <>
            <button className="wallet-btn" onClick={handleConnectWalletClick}>

              {showWalletOptions ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 21 18" fill="none">
                  <path d="M10 15C10 11.13 13.13 8 17 8C18.08 8 19.09 8.25 20 8.68V2C20 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H10.08C10.03 15.67 10 15.34 10 15ZM2 2L10 7L18 2V4L10 9L2 4V2ZM15.34 18L11.8 14.46L13.21 13.05L15.33 15.17L19.57 10.93L21 12.34L15.34 18Z" fill="#D0D3D7" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 13 10" fill="none">
                  <path d="M2.45 9.89961C1.77625 9.89961 1.19948 9.65971 0.719688 9.17992C0.239896 8.70013 0 8.12336 0 7.44961V2.54961C0 1.87586 0.239896 1.29909 0.719688 0.819297C1.19948 0.339505 1.77625 0.0996094 2.45 0.0996094H9.8C10.4738 0.0996094 11.0505 0.339505 11.5303 0.819297C12.0101 1.29909 12.25 1.87586 12.25 2.54961V7.44961C12.25 8.12336 12.0101 8.70013 11.5303 9.17992C11.0505 9.65971 10.4738 9.89961 9.8 9.89961H2.45ZM2.45 2.54961H9.8C10.0246 2.54961 10.239 2.57513 10.4431 2.62617C10.6473 2.67721 10.8413 2.75888 11.025 2.87117V2.54961C11.025 2.21273 10.9051 1.92435 10.6652 1.68445C10.4253 1.44456 10.1369 1.32461 9.8 1.32461H2.45C2.11313 1.32461 1.82474 1.44456 1.58484 1.68445C1.34495 1.92435 1.225 2.21273 1.225 2.54961V2.87117C1.40875 2.75888 1.60271 2.67721 1.80687 2.62617C2.01104 2.57513 2.22542 2.54961 2.45 2.54961ZM1.31687 4.54023L8.13094 6.19398C8.22281 6.2144 8.31469 6.2144 8.40656 6.19398C8.49844 6.17357 8.58521 6.13273 8.66687 6.07148L10.7953 4.29523C10.683 4.14211 10.5401 4.01706 10.3666 3.92008C10.193 3.8231 10.0042 3.77461 9.8 3.77461H2.45C2.18458 3.77461 1.95234 3.84352 1.75328 3.98133C1.55422 4.11914 1.40875 4.30544 1.31687 4.54023Z" fill="#D0D3D7" />
                </svg>}

              {showWalletOptions ? "Connect via Email" : "Connect Wallet"}
            </button>
          </>
        )}

        {isSignUp && !showForgotPassword ? (
          <p className="sign-in-redirect">
            Already have an account?{" "}
            <a href="#" onClick={handleSignInClick}>Sign In</a>
          </p>
        ):(
          <p className="sign-in-redirect">
            Don't have an account yet ?{" "}
            <a href="#" onClick={handleSignUpClick}>Sign Up</a>
          </p>
        )}

        <p className="terms-links">By signing in, you're agreeing to the <a onClick={handlTermsClick}><u><b>Terms</b></u></a> and <a onClick={handlPolicyClick}><u><b>Privacy Policy</b></u></a></p>
      </div>
      <WalletCarousel /> {/* Use the new component */}
    </div>
  );
}

export default PopupWallet;
