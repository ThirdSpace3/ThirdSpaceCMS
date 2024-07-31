import React, { useState, useEffect } from "react";
import { PublicKey } from '@solana/web3.js';
import { sendUsdcTransaction } from './payement/solanaUtils'; // Ensure this path is correct
import TransactionSummaryPopup from './payement/TransactionSummaryPopup'; // Import the popup component
import "./BillingDashboard.css";
import "./DashboardMain.css";
import "../Root.css";

// Define the corporate wallet address
const CORPORATE_WALLET_ADDRESS = new PublicKey('96Rtfsv5dca3SU8TVNNktjiz4hzEKGBxGTFFZkMTjnmW');

export default function BillingDashboard({ walletId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [transactionError, setTransactionError] = useState(null);

  useEffect(() => {
    // Validate walletId on component mount
    try {
      new PublicKey(walletId);
      console.log("Wallet ID is valid:", walletId);
    } catch (error) {
      console.error("Invalid wallet ID:", walletId, error);
    }
  }, [walletId]);

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        console.log("Connected with Public Key:", response.publicKey.toString());
      } catch (err) {
        console.error("Failed to connect wallet:", err);
      }
    } else {
      console.error("Phantom wallet not found. Please install it.");
    }
  };

  const handlePurchase = (plan) => {
    console.log("handlePurchase called with plan:", plan);
    setSelectedPlan(plan);
    setShowSummary(true);
  };

  const confirmPurchase = async () => {
    setIsProcessing(true);
    setTransactionError(null);
    try {
      console.log("walletId:", walletId);
      const userPublicKey = new PublicKey(walletId);
      const planCost = getPlanCost(selectedPlan);

      const fromWallet = window.solana;
      console.log(fromWallet, userPublicKey, planCost);

      if (!fromWallet || !fromWallet.publicKey) {
        await connectWallet();
        if (!fromWallet || !fromWallet.publicKey) {
          throw new Error("Wallet not connected or invalid");
        }
      }

      // Use the corporate wallet address as the recipient
      const signature = await sendUsdcTransaction(fromWallet, CORPORATE_WALLET_ADDRESS, planCost);

      setTransactionStatus(`Transaction successful! Signature: ${signature}`);
      console.log("Transaction successful! Signature:", signature);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      setTransactionError(error.message);
      console.error("Transaction failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getPlanCost = (plan) => {
    switch(plan) {
      case 'basic':
        return 12.49; // Cost in USDC
      case 'pro':
        return 29.99;
      case 'extension':
        return 9.99;
      default:
        return 0;
    }
  };

  const resetTransactionState = () => {
    setTransactionError(null);
    setShowSummary(true);
  };

  const featuresFreemium = [
    {
      icon: "bi bi-check",
      text: "Limited CMS access (Templates)",
    },
    { icon: "bi bi-check", text: "Developer Mode " },
    { icon: "bi bi-x", text: "Custom Domain" },
    { icon: "bi bi-check", text: "Test environments" },
    { icon: "bi bi-check", text: "1GB cloud storage" },
    { icon: "bi bi-check", text: "Basic uses of Smart Contract Solana  " },
    { icon: "bi bi-x", text: "Support (internal messaging, e-mail)" },
    { icon: "bi bi-x", text: "Accès complet à Third Space " },
    { icon: "bi bi-x", text: "Collaborative solution" },
    { icon: "bi bi-x", text: "Access to Beta Features" },
    { icon: "bi bi-x", text: "Custom Features" },
  ];

  const featuresBasic = [
    {
      icon: "bi bi-check",
      text: "Full access to Third Space ",
    },
    { icon: "bi bi-check", text: "Developer Mode" },
    { icon: "bi bi-check", text: "1 personalized domain" },
    { icon: "bi bi-check", text: "Test environments" },
    { icon: "bi bi-check", text: "5GB cloud storage" },
    { icon: "bi bi-check", text: "Advanced use of Solana Smart Contracts (30 interactions/month)" },
    { icon: "bi bi-check", text: "Support (internal messaging system, e-mail, 24-hour platform)" },
    { icon: "bi bi-x", text: "Collaborative solution" },
    { icon: "bi bi-x", text: "Access to Beta features " },
    { icon: "bi bi-x", text: "Custom Features" },
  ];

  const featuresPro = [
    {
      icon: "bi bi-check",
      text: "Full access to Third Space ",
    },
    { icon: "bi bi-check", text: "Developer Mode" },
    { icon: "bi bi-check", text: "3 customized domains" },
    { icon: "bi bi-check", text: "Test environments" },
    { icon: "bi bi-check", text: "10GB cloud storage" },
    { icon: "bi bi-check", text: "Advanced use of Solana Smart Contracts (60 interactions/month)" },
    { icon: "bi bi-check", text: "24-hour priority support via email or direct chat " },
    { icon: "bi bi-check", text: "Collaborative solution" },
    { icon: "bi bi-check", text: "Access to Beta features " },
    { icon: "bi bi-x", text: "Custom Features" },
  ];

  return (
    <>
      <div className={`dashboard-page-container ${showSummary ? 'blurred' : ''}`}>
        <div className="projects-header-sticky">
          <div className="dashboard-header">
            <h1>Billing</h1>
          </div>
        </div>

        <div className="dashboard-page-content">
          <div className="dashboard-billing-plans">
            <div className="dashboard-billing-header">
              <div className="dashboard-billing-left">
                <h2>Discover our plans</h2>
                <p>You can change your package at any time.</p>
              </div>
            </div>
            <p className="dashboard-billing-header-warning">
              <i className="bi bi-exclamation-triangle"></i>
              We're still in the testing phase. Quotas are not yet applied.
            </p>

            <div className="dashboard-billing-plans-container">
              {/* FREEMIUM */}
              <div className="dashboard-billing-plans-box">
                <div className="dashboard-billing-plans-box-header">
                  <h3 className="dashboard-billing-plans-box-header-title">
                    Freemium
                  </h3>
                  <div className="dashboard-billing-plans-price">
                    <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Fmain%2Ficon-usdc.png?alt=media&token=61dea3a4-ca19-411a-bd5e-b93bafae1717" />
                    <p className="dashboard-billing-plans-price-tag">0</p>
                    <p className="dashboard-billing-plans-price-label">
                      / Month (HT)
                    </p>
                  </div>
                  <button className="dashboard-billing-plans-cta dashboard-billing-plans-cta-diasbled">
                    <i className="bi bi-lock-fill"></i> Coming Soon
                  </button>
                </div>
                <div className="dashboard-billing-plans-box-features">
                  {featuresFreemium.map((feature, index) => (
                    <div key={index} className="dashboard-billing-plans-feature">
                      <i
                        className={`${feature.icon} ${
                          feature.icon === "bi bi-check" ? "check-icon" : "cross-icon"
                        }`}
                      ></i>
                      <p className={`feature-text ${feature.icon === "bi bi-check" ? "check-text" : "cross-text"}`}>
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* BASIC */}
              <div className="dashboard-billing-plans-box dashboard-billing-plans-box-purple">
                <div className="dashboard-billing-plans-box-header">
                  <h3 className="dashboard-billing-plans-box-header-title-white">
                    Basic
                  </h3>
                  <div className="dashboard-billing-plans-price">
                    <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Fmain%2Ficon-usdc.png?alt=media&token=61dea3a4-ca19-411a-bd5e-b93bafae1717" />
                    <p className="dashboard-billing-plans-price-tag-white">12.49</p>
                    <p className="dashboard-billing-plans-price-label-white">/ Month (HT)</p>
                  </div>
                  <button
                    className="dashboard-billing-plans-cta"
                    onClick={() => handlePurchase('basic')}
                    disabled={isProcessing}
                  >
                    Purchase Basic
                  </button>
                </div>
                <div className="dashboard-billing-plans-box-features">
                  {featuresBasic.map((feature, index) => (
                    <div key={index} className="dashboard-billing-plans-feature">
                      <i
                        className={`${feature.icon} ${
                          feature.icon === "bi bi-check" ? "check-icon-purplecard" : "cross-icon-purplecard"
                        }`}
                      ></i>
                      <p className={`feature-text ${feature.icon === "bi bi-check" ? "check-text-purplecard" : "cross-text-purplecard"}`}>
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRO */}
              <div className="dashboard-billing-plans-box">
                <div className="dashboard-billing-plans-box-header">
                  <h3 className="dashboard-billing-plans-box-header-title">Professional</h3>
                  <div className="dashboard-billing-plans-price">
                    <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Fmain%2Ficon-usdc.png?alt=media&token=61dea3a4-ca19-411a-bd5e-b93bafae1717" />
                    <p className="dashboard-billing-plans-price-tag">29.99</p>
                    <p className="dashboard-billing-plans-price-label">/ Month (HT)</p>
                  </div>
                  <button
                    className="dashboard-billing-plans-cta"
                    onClick={() => handlePurchase('pro')}
                    disabled={isProcessing}
                  >
                    Purchase Professional
                  </button>
                </div>
                <div className="dashboard-billing-plans-box-features">
                  {featuresPro.map((feature, index) => (
                    <div key={index} className="dashboard-billing-plans-feature">
                      <i
                        className={`${feature.icon} ${
                          feature.icon === "bi bi-check" ? "check-icon" : "cross-icon"
                        }`}
                      ></i>
                      <p className={`feature-text ${feature.icon === "bi bi-check" ? "check-text" : "cross-text"}`}>
                        {feature.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* EXTENSION */}
              <div className="dashboard-billing-plans-box">
                <div className="dashboard-billing-plans-box-left">
                  <div className="dashboard-billing-plans-box-header">
                    <h3 className="dashboard-billing-plans-box-header-title">Extension Pack</h3>
                    <div className="dashboard-billing-plans-price">
                      <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Fmain%2Ficon-usdc.png?alt=media&token=61dea3a4-ca19-411a-bd5e-b93bafae1717" />
                      <p className="dashboard-billing-plans-price-tag">9.99</p>
                      <p className="dashboard-billing-plans-price-label">/ Month (HT)</p>
                    </div>
                    <button
                      className="dashboard-billing-plans-cta"
                      onClick={() => handlePurchase('extension')}
                      disabled={isProcessing}
                    >
                      Purchase Extension
                    </button>
                  </div>
                  <div className="dashboard-billing-plans-box-features dashboard-billing-plans-box-features-column">
                    <div className="dashboard-billing-plans-feature">
                      <i className="bi bi-check check-icon"></i>
                      <p className="check-text">Additional 10 GB Cloud storage</p>
                    </div>
                    <p className="dashboard-billing-plans-feature-or">OR</p>
                    <div className="dashboard-billing-plans-feature">
                      <i className="bi bi-check check-icon"></i>
                      <p className="check-text">1 customized domain name</p>
                    </div>
                    <p className="dashboard-billing-plans-feature-or">OR</p>
                    <div className="dashboard-billing-plans-feature">
                      <i className="bi bi-check check-icon"></i>
                      <p className="check-text">15 additional Smart Contract interactions</p>
                    </div>
                    <p className="dashboard-billing-plans-feature-or">OR</p>
                    <div className="dashboard-billing-plans-feature">
                      <i className="bi bi-check check-icon"></i>
                      <p className="check-text">1 additional collaborator</p>
                    </div>
                  </div>
                </div>

                {/* ENTERPRISE */}
                <div className="dashboard-billing-plans-box-more">
                  <div className="dashboard-billing-plans-box-header">
                    <h3 className="dashboard-billing-plans-box-header-title dashboard-billing-plans-box-more-title">Looking for more?</h3>
                  </div>
                  <a href="" className="dashboard-billing-plans-cta-more dashboard-billing-plans-cta-more-soon">
                    <i className="bi bi-lock-fill"></i> Get an Estimate Soon <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="dashboard-billing-plans-student">
              <div className="dashboard-billing-plans-box-header">
                <h3 className="dashboard-billing-plans-box-header-title">For Students</h3>
                <p className="dashboard-billing-plans-student-text">Get all the features included in the “Professional” solution.</p>
                <a href="" className="dashboard-billing-plans-cta-more dashboard-billing-plans-cta-more-soon">
                  <i className="bi bi-lock-fill"></i> Verify Eligibility Soon <i className="bi bi-arrow-right"></i>
                </a>
              </div>
              <div className="dashboard-billing-plans-price">
                <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Fmain%2Ficon-usdc.png?alt=media&token=61dea3a4-ca19-411a-bd5e-b93bafae1717" />
                <p className="dashboard-billing-plans-price-tag">5.99</p>
                <p className="dashboard-billing-plans-price-label">/ Month (HT)</p>
              </div>
            </div>
          </div>
        </div>
        {transactionStatus && <div className="transaction-status">{transactionStatus}</div>}

        {showSummary && (
          <TransactionSummaryPopup
            selectedPlan={selectedPlan}
            walletId={walletId}
            corporateWallet={CORPORATE_WALLET_ADDRESS}
            getPlanCost={getPlanCost}
            confirmPurchase={confirmPurchase}
            isProcessing={isProcessing}
            closePopup={() => setShowSummary(false)}
            transactionError={transactionError}
            resetTransactionState={resetTransactionState}
          />
        )}
      </div>
    </>
  );
}
