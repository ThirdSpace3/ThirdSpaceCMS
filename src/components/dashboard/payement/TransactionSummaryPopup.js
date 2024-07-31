import React, { useRef } from 'react';
import './TransactionSummaryPopup.css';

const TransactionSummaryPopup = ({
  selectedPlan,
  walletId,
  corporateWallet,
  getPlanCost,
  confirmPurchase,
  isProcessing,
  closePopup,
  transactionError,
  resetTransactionState,
  successMessage // Receive the success message prop
}) => {
  const popupRef = useRef();

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closePopup();
      resetTransactionState();
    }
  };

  return (
    <div className="transaction-summary-popup" onClick={handleClickOutside}>
      <div className="transaction-summary-content" ref={popupRef}>
        {isProcessing ? (
          <div className="loader-overlay">
            <div className="loader">Processing transaction...</div>
          </div>
        ) : transactionError ? (
          <div>
            <h2>Transaction Failed</h2>
            <p>{transactionError}</p>
            <button onClick={resetTransactionState}>Try Again</button>
          </div>
        ) : successMessage ? (
          <div>
            <h2>Transaction Successful</h2>
            <p>{successMessage}</p>
          </div>
        ) : (
          <div>
            <h2>Transaction Summary</h2>
            <p>Plan: {selectedPlan}</p>
            <p>Cost: {getPlanCost(selectedPlan)} USDC</p>
            <p>From: {walletId}</p>
            <p>To: {corporateWallet.toString()}</p>
            <button onClick={confirmPurchase} disabled={isProcessing}>
              Confirm Purchase
            </button>
            <button onClick={closePopup} disabled={isProcessing}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionSummaryPopup;
