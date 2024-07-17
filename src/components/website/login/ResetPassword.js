import React, { useState } from "react";
import { db, doc, getDoc, updateDoc } from '../../../firebaseConfig';
import "../PopupWallet.css";

function ResetPassword({ email, onResetComplete, setErrorMessage }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isResetComplete, setIsResetComplete] = useState(false);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const emailRef = doc(db, 'users', email);
      const emailSnap = await getDoc(emailRef);

      if (emailSnap.exists()) {
        await updateDoc(emailRef, { password: newPassword });
        setLoading(false);
        setIsResetComplete(true);
      } else {
        setErrorMessage("Email not found.");
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage("Error resetting password. Please try again.");
      setLoading(false);
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="reset-password-method">
      {isResetComplete ? (
        <div>
          <button className="wallet-btn" onClick={onResetComplete}>
            Back to Login
          </button>
        </div>
      ) : (
        <>
          <div className="password-input-container">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <span className="password-toggle-icon" onClick={toggleNewPasswordVisibility}>
              {showNewPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
            <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {setErrorMessage && <div className="error-message">{setErrorMessage}</div>}
          <button className="wallet-btn" onClick={handleResetPassword} disabled={loading || !newPassword || !confirmPassword}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </>
      )}
    </div>
  );
}

export default ResetPassword;
