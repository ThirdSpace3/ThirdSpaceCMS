import React, { useState } from "react";
import { db, doc, getDoc, setDoc } from '../../../firebaseConfig';
import "../PopupWallet.css";
import VerificationCodeInput from "./VerificationCodeInput"; // Import the VerificationCodeInput component

function EmailLogin({ onUserLogin, checkWalletData, saveLoginEvent, onClose, handleSignUpState, isExistingUser, setIsExistingUser, onForgotPassword, onHeaderChange }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showVerificationField, setShowVerificationField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);

  const handleEmailSubmit = async () => {
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
      } else {
        setErrorMessage('Failed to send verification code.');
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      setErrorMessage('Failed to send verification code.');
    }
    setIsLoading(false);
  };

  const handlePasswordSubmit = async () => {
    if (!password) {
      setErrorMessage("Password cannot be empty.");
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
        setErrorMessage("Incorrect password.");
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
        const emailRef = doc(db, 'users', email);
        await setDoc(emailRef, { email, password });
        processLogin(email, 'Email');
      } else {
        setErrorMessage("Invalid verification code.");
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setErrorMessage("Failed to verify code.");
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

  return (
    <div className="mail-login-method">
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
      />
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
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <div className="forgot-password">
            <a href="#" onClick={onForgotPassword}>Forgot Password?</a>
          </div>
        </div>
      )}
      {showVerificationField && (
        <VerificationCodeInput 
          onVerify={verifyCode} 
          errorMessage={errorMessage} 
          setErrorMessage={setErrorMessage} 
          setCustomMessage={onHeaderChange} 
          CustomMessage={"Please enter the verification code sent to your email"}
        />
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {!showVerificationField && (
        <button
          className="wallet-btn"
          onClick={showPasswordField ? handlePasswordSubmit : handleEmailSubmit}
          disabled={!email || (showPasswordField && !password)}
          style={{
            cursor: !email || (showPasswordField && !password) ? "not-allowed" : "pointer",
            background: !email || (showPasswordField && !password) ? "grey" : "linear-gradient(180deg, rgba(60, 8, 126, 0.00) 0%, rgba(60, 8, 126, 0.32) 100%), rgba(113, 47, 255, 0.12)",
          }}
        >
          {isLoading ? (
            <span className="loading-dots">...</span>
          ) : showPasswordField ? (
            isExistingUser ? "Login" : "Sign Up"
          ) : (
            "Continue with this email"
          )}
        </button>
      )}
    </div>
  );
}

export default EmailLogin;
