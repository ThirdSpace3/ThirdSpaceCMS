import React, { useState, useEffect } from "react";
import LoadingAnimation from './loadingAnimation';
import "../PopupWallet.css";
import "../../Root.css";

function VerificationCodeInput({ email, onVerify, onResendCode, errorMessage, setErrorMessage, setCustomMessage, CustomMessage }) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(20);

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
    setResendTimer(20);
    const timer = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timer);
          setIsResendDisabled(false);
          return 20;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const startTimer = () => {
    const timer = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timer);
          setIsResendDisabled(false);
          return 20;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    setErrorMessage('');
    startTimer();
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
      
      <button className="wallet-btn" onClick={handleVerify} disabled={!isCodeComplete || isLoading}
       style={{ 
        
        boxShadow:  isCodeComplete ?'' :'0px 0px 16.587px 0px rgba(191, 151, 255, 0.24) inset',
        backgroundColor: isCodeComplete ? 'rgba(113, 47, 255, 0.12)'  : '#1A1D21' ,
      }}>
        {isLoading ? <LoadingAnimation /> : 'Verify'}
      </button>
      <div className="resend-code-container">
        <a 
          className={`resend-code-btn`} 
          onClick={!isResendDisabled && !isLoading ? handleResendCode : null} 
          style={{ cursor: isResendDisabled ? 'not-allowed' : 'pointer' }}
        >
          {isResendDisabled ? `Send code again (${resendTimer})` : 'Send code again'}
        </a>
      </div>
    </div>
  );
}

export default VerificationCodeInput;
