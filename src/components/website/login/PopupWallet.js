import React, { useState, useEffect, useRef } from "react";
import "../PopupWallet.css";
import "../../Root.css";
import { db, doc, getDoc, setDoc, updateDoc } from '../../../firebaseConfig';
import ReactGA from 'react-ga';
import { useNavigate } from 'react-router-dom';
import EmailLogin from "./EmailLogin";
import WalletConnection from "./WalletConnection";
import ForgotPassword from "./ForgotPassword";

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

  const navigate = useNavigate();
  const images = [
    './images/carrouseltest.png',
    './images/carrouseltest.png',
    './images/carrouseltest.png',
    './images/carrouseltest.png',
    './images/carrouseltest.png',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef(null);

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

  const handleTransitionEnd = () => {
    if (currentIndex >= images.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    } else if (currentIndex > 5) {
      setIsTransitioning(false);
      setCurrentIndex(images.length - 1);
    } else {
      setIsTransitioning(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 5000);

    timeoutRef.current = interval;

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isTransitioning) {
      const id = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(id);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (currentIndex >= images.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 1000); // Delay to let the transition finish
    }
  }, [currentIndex, images.length]);

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

  const handleSignInClick = (event) => {
    event.preventDefault();
    setIsSignUp(false);
    setIsExistingUser(true);
    setHeaderTitle("Welcome");
    setHeaderDescription("If this is your first time, we will create an account for you!");
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
          <button className="wallet-btn" onClick={handleConnectWalletClick}>
            {showWalletOptions ? "Connect via Email" : "Connect Wallet"}
          </button>
        )}

        {isSignUp && !showForgotPassword && (
          <p className="sign-in-redirect">
            Already have an account?{" "}
            <a href="#" onClick={handleSignInClick}>Sign In</a>
          </p>
        )}
        
        <p className="terms-links">By signing in, you're agreeing to the <a onClick={handlTermsClick}><u><b>Terms</b></u></a> and <a onClick={handlPolicyClick}><u><b>Privacy Policy</b></u></a></p>
      </div>
      <div className="wallet-carousel-container">
        <div
          className="wallet-carousel"
          style={{
            transform: `translateY(-${(currentIndex % images.length) * 9.5}%)`,
            transition: isTransitioning ? 'transform 1s ease' : 'none'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {[...images, ...images].map((src, index) => (
            <img
              key={index}
              src={src}
              className={`wallet-carousel-image ${index === currentIndex ? 'active' : 'inactive'}`}
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentIndex % images.length ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopupWallet;
