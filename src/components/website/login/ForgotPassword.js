import React, { useState, useEffect } from "react";
import { db, doc, getDoc } from '../../../firebaseConfig';
import "../PopupWallet.css";
import VerificationCodeInput from "./VerificationCodeInput";
import ResetPassword from "./ResetPassword";

function ForgotPassword({ onClose, onHeaderChange }) {
  const [email, setEmail] = useState("");
  const [CustomMessage, setCustomMessage] = useState("");

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResendCode, setCanResendCode] = useState(false);

  useEffect(() => {
    if (isCodeSent ) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResendCode(true);
    }
  }, [isCodeSent, timer]);

  const handleSendResetCode = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://us-central1-third--space.cloudfunctions.net/sendResetCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (data.success) {
        setCustomMessage('We’ve sent a code to ' + email);
        setIsCodeSent(true);
        setCanResendCode(false);
        setTimer(30);
      } else {
        setErrorMessage('Failed to send reset code. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error sending reset code. Please try again.');
    }
    setLoading(false);
  };

  const handleVerifyCode = async (code) => {
    setLoading(true);
    const emailRef = doc(db, 'passwordResets', email);
    const emailSnap = await getDoc(emailRef);

    if (emailSnap.exists() && emailSnap.data().resetCode === code) {
      setIsCodeVerified(true);
      onHeaderChange("Reset Password", "Please don't forget it this time.");
    } else {
      setErrorMessage("Invalid reset code. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="forgot-password-method">


      {!isCodeSent ? (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button className="wallet-btn" onClick={handleSendResetCode} disabled={loading || !email}>
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}

        </>
      ) : !isCodeVerified ? (
        <>
          <VerificationCodeInput onVerify={handleVerifyCode} errorMessage={errorMessage} setErrorMessage={setErrorMessage} CustomMessage={CustomMessage} setCustomMessage={setCustomMessage} />
          <div className="resend-code">
            {canResendCode ? (
              <span  onClick={handleSendResetCode}>
                Resend Code
              </span>
            ) : (
              <span>Send code again in {timer} seconds</span>
            )}
          </div>
        </>
      ) : (
        <ResetPassword email={email} onResetComplete={onClose} setErrorMessage={setErrorMessage} setCustomMessage={setCustomMessage} />
      )}
    </div>
  );
}

export default ForgotPassword;
