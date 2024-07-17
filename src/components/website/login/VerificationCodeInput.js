import React, { useState, useEffect } from "react";
import LoadingAnimation from './loadingAnimation';
import "../PopupWallet.css";
import "../../Root.css";

function VerificationCodeInput({ onVerify, errorMessage, setErrorMessage, setCustomMessage, CustomMessage }) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    setErrorMessage('');
  }, []);

  return (
    <div className="verification-code-input">
      <p>{CustomMessage}</p>

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
          />
        ))}
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button className="wallet-btn" onClick={handleVerify} disabled={!isCodeComplete || isLoading}>
        {isLoading ? <LoadingAnimation /> : 'Verify'}
      </button>
    </div>
  );
}

export default VerificationCodeInput;
