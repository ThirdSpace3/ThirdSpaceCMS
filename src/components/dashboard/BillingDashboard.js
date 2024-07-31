import React, { useState, useEffect } from "react";
import { PublicKey } from '@solana/web3.js';
import { sendUsdcTransaction } from './payement/solanaUtils';
import TransactionSummaryPopup from './payement/TransactionSummaryPopup';
import { setDoc, doc, db, getDoc } from "../../firebaseConfig";
import "./BillingDashboard.css";
import "./DashboardMain.css";
import "../Root.css";

const CORPORATE_WALLET_ADDRESS = new PublicKey('96Rtfsv5dca3SU8TVNNktjiz4hzEKGBxGTFFZkMTjnmW');

export default function BillingDashboard({ walletId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedExtension, setSelectedExtension] = useState(false);
  const [transactionError, setTransactionError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [currentExtension, setCurrentExtension] = useState(false);

  useEffect(() => {
    try {
      new PublicKey(walletId);
      console.log("Wallet ID is valid:", walletId);
    } catch (error) {
      console.error("Invalid wallet ID:", walletId, error);
    }

    fetchUserPlan();
  }, [walletId]);


  const fetchUserPlan = async () => {
    const userDocRef = doc(db, "users", walletId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.billing && userData.billing.mainPlan) {
        setCurrentPlan(userData.billing.mainPlan.plan);
      } else {
        // If no plan is found, set Freemium as the default plan
        setCurrentPlan('freemium');
        await setDoc(userDocRef, {
          billing: {
            mainPlan: {
              plan: 'freemium',
              cost: 0,
              quotas: getPlanQuotas('freemium').map(feature => feature.text)
            }
          }
        }, { merge: true });
        console.log("Default Freemium plan set for user.");
      }
    } else {
      // If the document does not exist, create it with the Freemium plan
      setCurrentPlan('freemium');
      await setDoc(userDocRef, {
        billing: {
          mainPlan: {
            plan: 'freemium',
            cost: 0,
            quotas: getPlanQuotas('freemium').map(feature => feature.text)
          }
        }
      });
      console.log("Default Freemium plan set for new user.");
    }
  };


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

  const handlePurchase = (plan, isExtension = false) => {
    if (isExtension) {
      setSelectedExtension(true);
    } else {
      setSelectedPlan(plan);
      setSelectedExtension(false);
    }
    setShowSummary(true);
  };

  const confirmPurchase = async () => {
    setIsProcessing(true);
    setTransactionError(null);
    setSuccessMessage(null);
    try {
      const planCost = getPlanCost(selectedPlan);
      const extensionCost = selectedExtension ? getPlanCost('extension') : 0;
      const totalCost = planCost + extensionCost;

      const fromWallet = window.solana;
      if (!fromWallet || !fromWallet.publicKey) {
        await connectWallet();
        if (!fromWallet || !fromWallet.publicKey) {
          throw new Error("Wallet not connected or invalid");
        }
      }

      const signature = await sendUsdcTransaction(fromWallet, CORPORATE_WALLET_ADDRESS, totalCost);
      setTransactionStatus(`Transaction successful! Signature: ${signature}`);
      console.log("Transaction successful! Signature:", signature);

      // Update user's profile with the selected plan and its quotas
      await updateUserPlan(selectedPlan, planCost, selectedExtension, extensionCost);
      setCurrentPlan(selectedPlan); // Update the currentPlan state

      if (selectedExtension) {
        setCurrentExtension(true); // Update the currentExtension state
      } else {
        setCurrentExtension(false); // Reset the currentExtension state if no extension
      }

      setSuccessMessage("Process successful, initiating refresh of the browser");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      setTransactionError("Process Unsuccessful");
      console.error("Transaction failed:", error);
      setCurrentPlan(selectedPlan); // Update the currentPlan state

      const planCost = getPlanCost(selectedPlan);
      const extensionCost = selectedExtension ? getPlanCost('extension') : 0;
      await updateUserPlan(selectedPlan, planCost, selectedExtension, extensionCost);

      if (selectedExtension) {
        setCurrentExtension(true); // Ensure the currentExtension state is updated in case of error
      }
    } finally {
      setIsProcessing(false);
    }
  };



  const updateUserPlan = async (plan, planCost, hasExtension, extensionCost) => {
    const quotas = getPlanQuotas(plan).map(feature => feature.text);
    const extensionQuotas = hasExtension ? getPlanQuotas('extension').map(feature => feature.text) : [];
    const userDocRef = doc(db, "users", walletId);

    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedBilling = {
        ...userData.billing,
        mainPlan: {
          plan: plan,
          cost: planCost,
          quotas: quotas
        }
      };

      if (hasExtension) {
        updatedBilling.extension = {
          cost: extensionCost,
          quotas: extensionQuotas
        };
      } else {
        delete updatedBilling.extension;
      }

      await setDoc(userDocRef, { billing: updatedBilling }, { merge: true });
      console.log("User plan updated to:", plan, hasExtension ? "with Extension Pack" : "");
    } else {
      await setDoc(userDocRef, {
        billing: {
          mainPlan: {
            plan: plan,
            cost: planCost,
            quotas: quotas
          },
          extension: hasExtension ? {
            cost: extensionCost,
            quotas: extensionQuotas
          } : null
        }
      });
      console.log("User plan created with:", plan, hasExtension ? "and Extension Pack" : "");
    }
  };


  const getPlanQuotas = (plan) => {
    const features = {
      freemium: [
        { icon: "bi bi-check", text: "Limited CMS access (Templates)" },
        { icon: "bi bi-check", text: "Developer Mode" },
        { icon: "bi bi-x", text: "Custom Domain" },
        { icon: "bi bi-check", text: "Test environments" },
        { icon: "bi bi-check", text: "1GB cloud storage" },
        { icon: "bi bi-check", text: "Basic uses of Smart Contract Solana" },
        { icon: "bi bi-x", text: "Support (internal messaging, e-mail)" },
        { icon: "bi bi-x", text: "Accès complet à Third Space" },
        { icon: "bi bi-x", text: "Collaborative solution" },
        { icon: "bi bi-x", text: "Access to Beta Features" },
        { icon: "bi bi-x", text: "Custom Features" },
      ],
      basic: [
        { icon: "bi bi-check", text: "Full access to Third Space" },
        { icon: "bi bi-check", text: "Developer Mode" },
        { icon: "bi bi-check", text: "1 personalized domain" },
        { icon: "bi bi-check", text: "Test environments" },
        { icon: "bi bi-check", text: "5GB cloud storage" },
        { icon: "bi bi-check", text: "Advanced use of Solana Smart Contracts (30 interactions/month)" },
        { icon: "bi bi-check", text: "Support (internal messaging system, e-mail, 24-hour platform)" },
        { icon: "bi bi-x", text: "Collaborative solution" },
        { icon: "bi bi-x", text: "Access to Beta features" },
        { icon: "bi bi-x", text: "Custom Features" },
      ],
      pro: [
        { icon: "bi bi-check", text: "Full access to Third Space" },
        { icon: "bi bi-check", text: "Developer Mode" },
        { icon: "bi bi-check", text: "3 customized domains" },
        { icon: "bi bi-check", text: "Test environments" },
        { icon: "bi bi-check", text: "10GB cloud storage" },
        { icon: "bi bi-check", text: "Advanced use of Solana Smart Contracts (60 interactions/month)" },
        { icon: "bi bi-check", text: "24-hour priority support via email or direct chat" },
        { icon: "bi bi-check", text: "Collaborative solution" },
        { icon: "bi bi-check", text: "Access to Beta features" },
        { icon: "bi bi-x", text: "Custom Features" },
      ],
      extension: [
        { icon: "bi bi-check", text: "Additional 10 GB Cloud storage" },
        { icon: "bi bi-check", text: "1 customized domain name" },
        { icon: "bi bi-check", text: "15 additional Smart Contract interactions" },
        { icon: "bi bi-check", text: "1 additional collaborator" }
      ]
    };

    return features[plan].filter(feature => feature.icon === "bi bi-check");
  };

  const getPlanCost = (plan) => {
    switch (plan) {
      case 'basic':
        return 12.49;
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
    setIsProcessing(false);
  };

  const featuresFreemium = [
    { icon: "bi bi-check", text: "Limited CMS access (Templates)" },
    { icon: "bi bi-check", text: "Developer Mode" },
    { icon: "bi bi-x", text: "Custom Domain" },
    { icon: "bi bi-check", text: "Test environments" },
    { icon: "bi bi-check", text: "1GB cloud storage" },
    { icon: "bi bi-check", text: "Basic uses of Smart Contract Solana" },
    { icon: "bi bi-x", text: "Support (internal messaging, e-mail)" },
    { icon: "bi bi-x", text: "Accès complet à Third Space" },
    { icon: "bi bi-x", text: "Collaborative solution" },
    { icon: "bi bi-x", text: "Access to Beta Features" },
    { icon: "bi bi-x", text: "Custom Features" },
  ];

  const featuresBasic = [
    { icon: "bi bi-check", text: "Full access to Third Space" },
    { icon: "bi bi-check", text: "Developer Mode" },
    { icon: "bi bi-check", text: "1 personalized domain" },
    { icon: "bi bi-check", text: "Test environments" },
    { icon: "bi bi-check", text: "5GB cloud storage" },
    { icon: "bi bi-check", text: "Advanced use of Solana Smart Contracts (30 interactions/month)" },
    { icon: "bi bi-check", text: "Support (internal messaging system, e-mail, 24-hour platform)" },
    { icon: "bi bi-x", text: "Collaborative solution" },
    { icon: "bi bi-x", text: "Access to Beta features" },
    { icon: "bi bi-x", text: "Custom Features" },
  ];

  const featuresPro = [
    { icon: "bi bi-check", text: "Full access to Third Space" },
    { icon: "bi bi-check", text: "Developer Mode" },
    { icon: "bi bi-check", text: "3 customized domains" },
    { icon: "bi bi-check", text: "Test environments" },
    { icon: "bi bi-check", text: "10GB cloud storage" },
    { icon: "bi bi-check", text: "Advanced use of Solana Smart Contracts (60 interactions/month)" },
    { icon: "bi bi-check", text: "24-hour priority support via email or direct chat" },
    { icon: "bi bi-check", text: "Collaborative solution" },
    { icon: "bi bi-check", text: "Access to Beta features" },
    { icon: "bi bi-x", text: "Custom Features" },
  ];

  const getCardClass = (plan) => {
    return currentPlan === plan ? "dashboard-billing-plans-box dashboard-billing-plans-box-purple" : "dashboard-billing-plans-box";
  };

  const getHeaderClass = (plan) => {
    return currentPlan === plan ? "dashboard-billing-plans-box-header-title-white" : "dashboard-billing-plans-box-header-title";
  };

  const getPriceTagClass = (plan) => {
    return currentPlan === plan ? "dashboard-billing-plans-price-tag-white" : "dashboard-billing-plans-price-tag";
  };

  const getPriceLabelClass = (plan) => {
    return currentPlan === plan ? "dashboard-billing-plans-price-label-white" : "dashboard-billing-plans-price-label";
  };

  const getCheckIconClass = (plan) => {
    return currentPlan === plan ? "check-icon-purplecard" : "check-icon";
  };

  const getCheckTextClass = (plan) => {
    return currentPlan === plan ? "check-text-purplecard" : "check-text";
  };

  const getCrossIconClass = (plan) => {
    return currentPlan === plan ? "cross-icon-purplecard" : "cross-icon";
  };

  const getCrossTextClass = (plan) => {
    return currentPlan === plan ? "cross-text-purplecard" : "cross-text";
  };

  const getExtensionCardClass = () => {
    return currentExtension ? "dashboard-billing-plans-box dashboard-billing-plans-box-purple" : "dashboard-billing-plans-box";
  };

  const getExtensionHeaderClass = () => {
    return currentExtension ? "dashboard-billing-plans-box-header-title-white" : "dashboard-billing-plans-box-header-title";
  };

  const getExtensionPriceTagClass = () => {
    return currentExtension ? "dashboard-billing-plans-price-tag-white" : "dashboard-billing-plans-price-tag";
  };

  const getExtensionPriceLabelClass = () => {
    return currentExtension ? "dashboard-billing-plans-price-label-white" : "dashboard-billing-plans-price-label";
  };

  const getExtensionCheckIconClass = () => {
    return currentExtension ? "check-icon-purplecard" : "check-icon";
  };

  const getExtensionCheckTextClass = () => {
    return currentExtension ? "check-text-purplecard" : "check-text";
  };

  const getExtensionCrossIconClass = () => {
    return currentExtension ? "cross-icon-purplecard" : "cross-icon";
  };

  const getExtensionCrossTextClass = () => {
    return currentExtension ? "cross-text-purplecard" : "cross-text";
  };


  const getButtonText = (plan, isExtension = false) => {
    if (isExtension) {
      return currentExtension ? "Extension Pack Activated" : "Choose your Extension";
    } else {
      return currentPlan === plan ? `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan Activated` : `Purchase ${plan.charAt(0).toUpperCase() + plan.slice(1)}`;
    }
  };

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
              <div className={getCardClass('freemium')}>
                <div className="dashboard-billing-plans-box-header">
                  <h3 className={getHeaderClass('freemium')}>Freemium</h3>
                  <div className="dashboard-billing-plans-price">
                    <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Fmain%2Ficon-usdc.png?alt=media&token=61dea3a4-ca19-411a-bd5e-b93bafae1717" />
                    <p className={getPriceTagClass('freemium')}>0</p>
                    <p className={getPriceLabelClass('freemium')}>/ Month (HT)</p>
                  </div>
                  <button
                    className="dashboard-billing-plans-cta"
                    onClick={() => handlePurchase('freemium')}
                    disabled={isProcessing}
                  >
                    {getButtonText('freemium')}
                  </button>
                </div>
                <div className="dashboard-billing-plans-box-features">
                  {featuresFreemium.map((feature, index) => (
                    <div key={index} className="dashboard-billing-plans-feature">
                      <i className={`${feature.icon} ${feature.icon === "bi bi-check" ? getCheckIconClass('freemium') : getCrossIconClass('freemium')}`}></i>
                      <p className={`feature-text ${feature.icon === "bi bi-check" ? getCheckTextClass('freemium') : getCrossTextClass('freemium')}`}>{feature.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* BASIC */}
              <div className={getCardClass('basic')}>
                <div className="dashboard-billing-plans-box-header">
                  <h3 className={getHeaderClass('basic')}>Basic</h3>
                  <div className="dashboard-billing-plans-price">
                    <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Fmain%2Ficon-usdc.png?alt=media&token=61dea3a4-ca19-411a-bd5e-b93bafae1717" />
                    <p className={getPriceTagClass('basic')}>12.49</p>
                    <p className={getPriceLabelClass('basic')}>/ Month (HT)</p>
                  </div>
                  <button
                    className="dashboard-billing-plans-cta"
                    onClick={() => handlePurchase('basic')}
                    disabled={isProcessing}
                  >
                    {getButtonText('basic')}
                  </button>
                </div>
                <div className="dashboard-billing-plans-box-features">
                  {featuresBasic.map((feature, index) => (
                    <div key={index} className="dashboard-billing-plans-feature">
                      <i className={`${feature.icon} ${feature.icon === "bi bi-check" ? getCheckIconClass('basic') : getCrossIconClass('basic')}`}></i>
                      <p className={`feature-text ${feature.icon === "bi bi-check" ? getCheckTextClass('basic') : getCrossTextClass('basic')}`}>{feature.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRO */}
              <div className={getCardClass('pro')}>
                <div className="dashboard-billing-plans-box-header">
                  <h3 className={getHeaderClass('pro')}>Professional</h3>
                  <div className="dashboard-billing-plans-price">
                    <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Fmain%2Ficon-usdc.png?alt=media&token=61dea3a4-ca19-411a-bd5e-b93bafae1717" />
                    <p className={getPriceTagClass('pro')}>29.99</p>
                    <p className={getPriceLabelClass('pro')}>/ Month (HT)</p>
                  </div>
                  <button
                    className="dashboard-billing-plans-cta"
                    onClick={() => handlePurchase('pro')}
                    disabled={isProcessing}
                  >
                    {getButtonText('pro')}
                  </button>
                </div>
                <div className="dashboard-billing-plans-box-features">
                  {featuresPro.map((feature, index) => (
                    <div key={index} className="dashboard-billing-plans-feature">
                      <i className={`${feature.icon} ${feature.icon === "bi bi-check" ? getCheckIconClass('pro') : getCrossIconClass('pro')}`}></i>
                      <p className={`feature-text ${feature.icon === "bi bi-check" ? getCheckTextClass('pro') : getCrossTextClass('pro')}`}>{feature.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* EXTENSION */}
              <div className={getExtensionCardClass()}>
                <div className="dashboard-billing-plans-box-left">
                  <div className="dashboard-billing-plans-box-header">
                    <h3 className={getExtensionHeaderClass()}>Extension Pack</h3>
                    <div className="dashboard-billing-plans-price">
                      <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Fmain%2Ficon-usdc.png?alt=media&token=61dea3a4-ca19-411a-bd5e-b93bafae1717" />
                      <p className={getExtensionPriceTagClass()}>9.99</p>
                      <p className={getExtensionPriceLabelClass()}>/ Month (HT)</p>
                    </div>
                    <button
                      className="dashboard-billing-plans-cta"
                      onClick={() => handlePurchase('extension', true)}
                      disabled={isProcessing}
                    >
                      {getButtonText('extension', true)}
                    </button>
                  </div>
                  <div className="dashboard-billing-plans-box-features dashboard-billing-plans-box-features-column">
                    {getPlanQuotas('extension').map((feature, index) => (
                      <div key={index} className="dashboard-billing-plans-feature">
                        <i className={`${feature.icon} ${feature.icon === "bi bi-check" ? getExtensionCheckIconClass() : getExtensionCrossIconClass()}`}></i>
                        <p className={`feature-text ${feature.icon === "bi bi-check" ? getExtensionCheckTextClass() : getExtensionCrossTextClass()}`}>{feature.text}</p>
                      </div>
                    ))}
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
              transactionStatus={transactionStatus}
              successMessage={successMessage}
            />
          )}
        </div>
      </div>
    </>
  );
}
