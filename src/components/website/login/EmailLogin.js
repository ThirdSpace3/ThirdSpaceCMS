import React, { useState } from "react";
import { db, doc, getDoc, setDoc } from '../../../firebaseConfig';
import "../PopupWallet.css";
import VerificationCodeInput from "./VerificationCodeInput"; // Import the VerificationCodeInput component
import LoadingAnimation from "./loadingAnimation";

function EmailLogin({ onUserLogin, checkWalletData, saveLoginEvent, onClose, handleSignUpState, isExistingUser, setIsExistingUser, onForgotPassword, onHeaderChange, setShowVerificationField, showVerificationField }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async () => {
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    setIsLoading(true);
    const emailRef = doc(db, 'users', email);
    const emailSnap = await getDoc(emailRef);
    setIsLoading(false);
    if (emailSnap.exists()) {
      setIsExistingUser(true);
      handleSignUpState(false);
      onHeaderChange("Welcome Back", "Please enter your password to continue.");
      setShowPasswordField(true);
    } else {
      setIsExistingUser(false);
      handleSignUpState(true);
      onHeaderChange("Sign Up", "Create your account with the method of your choice.");
      setShowPasswordField(true);
    }
  };

  const sendVerificationCode = async (email) => {
    setIsLoading(true);
    try {
        const response = await fetch('https://us-central1-third--space.cloudfunctions.net/sendVerificationCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        if (data.success) {
            console.log('Verification code sent successfully');
            setVerificationCodeSent(true);
            setShowVerificationField(true); // Show verification field
            setIsResendDisabled(true);
            setResendTimer(30);
            const timer = setInterval(() => {
                setResendTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(timer);
                        setIsResendDisabled(false);
                        return 30;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        } else {
            setErrorMessage('Failed to send verification code');
        }
    } catch (error) {
        console.error('Error sending verification code:', error);
        setErrorMessage('Failed to send verification code');
    }
    setIsLoading(false);
};

  const handlePasswordSubmit = async () => {
    if (!password) {
      setErrorMessage("Password cannot be empty");
      return;
    }

    setIsLoading(true);
    const emailRef = doc(db, 'users', email);

    if (isExistingUser) {
      // Logic for logging in the user
      const emailSnap = await getDoc(emailRef);
      if (emailSnap.exists() && emailSnap.data().password === password) {
        processLogin(email, 'Email');
      } else {
        setErrorMessage("Incorrect password");
      }
    } else {
      await sendVerificationCode(email); // Send verification code
      setShowVerificationField(true);
    }
    setIsLoading(false);
  };

  const verifyCode = async (code) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://us-central1-third--space.cloudfunctions.net/verifyCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, code })
      });
      const data = await response.json();
      if (data.success) {
        // Logic for signing up the user
        const emailRef = doc(db, 'wallets', email);
        const timestamp = new Date().toISOString();

        await setDoc(emailRef, { email, password , LastLogin:timestamp, LoginType:"Email"});
        processLogin(email, 'Email');
      } else {
        setErrorMessage("Invalid verification code");
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setErrorMessage("Failed to verify code");
    }
    setIsLoading(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage(""); // Clear error message on password change
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage(""); // Clear error message on email change if needed
  };

  const processLogin = (userId, loginType) => {
    if (typeof onUserLogin === "function") {
      onUserLogin(userId);
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userAccount", userId);
      checkWalletData(userId);
      saveLoginEvent(userId, loginType);
    } else {
      console.error("onUserLogin is not a function");
    }
  };

  const activeButtonStyle = {
    borderRadius: "11.058px",
    background: "linear-gradient(180deg, rgba(60, 8, 126, 0.00) 0%, rgba(60, 8, 126, 0.32) 100%), rgba(113, 47, 255, 0.12)",
    boxShadow: "0px 0px 16.587px 0px rgba(191, 151, 255, 0.24) inset",
  };

  return (
    <div className="mail-login-method">
      {!showVerificationField && (
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
      )}
      {showPasswordField && !showVerificationField && (
        <div className="password-login-method">
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" fill="#FFF" viewBox="0 0 640 512"><path d="M320 400c-75.9 0-137.3-58.7-142.9-133.1L72.2 185.8c-13.8 17.3-26.5 35.6-36.7 55.6a32.4 32.4 0 0 0 0 29.2C89.7 376.4 197.1 448 320 448c26.9 0 52.9-4 77.9-10.5L346 397.4a144.1 144.1 0 0 1 -26 2.6zm313.8 58.1l-110.6-85.4a331.3 331.3 0 0 0 81.3-102.1 32.4 32.4 0 0 0 0-29.2C550.3 135.6 442.9 64 320 64a308.2 308.2 0 0 0 -147.3 37.7L45.5 3.4A16 16 0 0 0 23 6.2L3.4 31.5A16 16 0 0 0 6.2 53.9l588.4 454.7a16 16 0 0 0 22.5-2.8l19.6-25.3a16 16 0 0 0 -2.8-22.5zm-183.7-142l-39.3-30.4A94.8 94.8 0 0 0 416 256a94.8 94.8 0 0 0 -121.3-92.2A47.7 47.7 0 0 1 304 192a46.6 46.6 0 0 1 -1.5 10l-73.6-56.9A142.3 142.3 0 0 1 320 112a143.9 143.9 0 0 1 144 144c0 21.6-5.3 41.8-13.9 60.1z"/></svg> 
              : 
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" fill="#FFF" viewBox="0 0 576 512"><path d="M572.5 241.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400a144 144 0 1 1 144-144 143.9 143.9 0 0 1 -144 144zm0-240a95.3 95.3 0 0 0 -25.3 3.8 47.9 47.9 0 0 1 -66.9 66.9A95.8 95.8 0 1 0 288 160z"/></svg>}
            </span>
          </div>
          <div className="forgot-password">
            <a href="#" onClick={onForgotPassword}>Forgot Password?</a>
          </div>
        </div>
      )}
      {showVerificationField && (
        <div>
          <VerificationCodeInput 
              onVerify={verifyCode} 
              onResendCode={sendVerificationCode}
              errorMessage={errorMessage} 
              setErrorMessage={setErrorMessage} 
              setCustomMessage={onHeaderChange} 
              CustomMessage={`Please enter the verification code sent to <strong><u>${email}</u></strong>`}
          />

        
        </div>
      )}
      {!showVerificationField && (
        <>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button
          className="wallet-btn"
          onClick={showPasswordField ? handlePasswordSubmit : handleEmailSubmit}
          disabled={!email || (showPasswordField && !password)}
          style={{
            ...((email && (!showPasswordField || password)) ? activeButtonStyle : {}),
            cursor: !email || (showPasswordField && !password) ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? (
            <LoadingAnimation />
          ) : showPasswordField ? (
            isExistingUser ? "Login" : "Sign Up"
          ) : (
            "Continue with this email"
          )}
        </button>
        </>
      )}
    </div>
  );
}

export default EmailLogin;
