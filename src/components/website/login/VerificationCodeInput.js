import React, { useState, useEffect } from "react";
import LoadingAnimation from './loadingAnimation';
import "../PopupWallet.css";
import "../../Root.css";

function VerificationCodeInput({ email, onVerify, onResendCode, errorMessage, setErrorMessage, setCustomMessage, CustomMessage }) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    if (e.target.value.length === 1 && index < 5) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }

    if (newCode.every((digit) => digit !== "")) {
      setIsCodeComplete(true);
    } else {
      setIsCodeComplete(false);
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text');
    if (pasteData.length === 6 && /^[0-9]*$/.test(pasteData)) {
      const newCode = pasteData.split('');
      setCode(newCode);
      setIsCodeComplete(true);
    }
  };

  const handleVerify = async () => {
    if (isCodeComplete) {
      setIsLoading(true);
      await onVerify(code.join(""));
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    await onResendCode(email);
    setIsLoading(false);
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
  };

  useEffect(() => {
    setErrorMessage('');
  }, []);

  return (
    <div className="verification-code-input">
      <div className="code-input-container" onPaste={handlePaste}>
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            className="code-input"
            style={{ borderColor: errorMessage ? 'red' : 'D8DADC' }}

          />
        ))}
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="resend-code-container">
        <a 
          className={`resend-code-btn`} 
          onClick={!isResendDisabled && !isLoading ? handleResendCode : null} 
          style={{ cursor: isResendDisabled ? 'not-allowed' : 'pointer' }}
        >
          {isResendDisabled ? `Resend the code' (${resendTimer})` : 'Resend the code'}
        </a>
      </div>
      <button className="wallet-btn" onClick={handleVerify} disabled={!isCodeComplete || isLoading}>
        {isLoading ? <LoadingAnimation /> : 'Verify'}
      </button>
     
    </div>
  );
}

export default VerificationCodeInput;
