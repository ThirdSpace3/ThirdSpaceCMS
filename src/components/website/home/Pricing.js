import React, { useState, useEffect } from "react";
import "./Pricing.css";
import "../../Root.css";
import PopupWallet from "../PopupWallet";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga";

function Pricing({ checkWalletData }) {
  const [activeTab, setActiveTab] = useState("TabA");
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab("TabA");
  }, []);

  const openTab = (tabName) => {
    setActiveTab(tabName);
    setShowWalletPopup(false); // Reset showWalletPopup state
  };

  const userIsLoggedIn = () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    return isLoggedIn;
  };

  const toggleWalletPopup = () => {
    // Log the "Get Started" button click event to Google Analytics
    ReactGA.event({
      category: "Button",
      action: "Click",
      label: "Get Started from How It Work",
    });

    console.log(userIsLoggedIn);
    if (!userIsLoggedIn()) {
      // If user is not logged in
      setShowWalletPopup(!showWalletPopup); // Toggle wallet popup
    } else {
      // If user is logged in
      navigate("./templatestep"); // Navigate to './templatestep' route
    }
  };

  const handleUserLogin = (userAccount) => {
    // Handle user login here
    console.log("User logged in:", userAccount);
  };

  return (
    <section className="pricing-section section">
      <div className="pricing-header">
        <p className="section-label">Pricing</p>
        <h2 className="section-title">The Perfect Plan For You</h2>
        <p className="section-text">
          Discover affordable plans that empower you to create and innovate
          effortlessly with no-code Web 3 tools.
        </p>
      </div>
      <div className="pricing-content">
        {/* Freemium Card */}

        <div className="pricing-card">
          <h3 className="pricing-card-title">Freemium</h3>
          <div className="pricing-card-price">
            <img
              className="pricing-card-price-img"
              src="./images/logo-usdc.png"
            ></img>
            <p className="pricing-card-price-number">0</p>
            <p className="pricing-card-price-text">/month</p>
          </div>
          <button
            className="purple-btn plan-getstarted"
            onClick={toggleWalletPopup}
          >
            Get Started
          </button>
          <div className="pricing-card-content">
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                src="./images/check-purple.png"
              ></img>
              <p className="pricing-card-row-text">Limited CMS access</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                src="./images/check-purple.png"
              ></img>
              <p className="pricing-card-row-text">Test environments</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                src="./images/check-purple.png"
              ></img>
              <p className="pricing-card-row-text">1GB cloud storage</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                src="./images/check-purple.png"
              ></img>
              <p className="pricing-card-row-text">
                Basic uses of Smart Contract Solana
              </p>
            </div>
          </div>
        </div>
        {/* Basic Card */}
        <div className="pricing-card">
          <h3 className="pricing-card-title">Basic</h3>
          <div className="pricing-card-price">
            <img
              className="pricing-card-price-img"
              src="./images/logo-usdc.png"
            ></img>
            <p className="pricing-card-price-number">12.49</p>
            <p className="pricing-card-price-text">/month</p>
          </div>
          <button
            className="purple-btn plan-getstarted"
            onClick={toggleWalletPopup}
          >
            Get Started
          </button>
          <div className="pricing-card-content">
          <p className="pricing-card-text">Everything in freemium + </p>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                src="./images/check-purple.png"
              ></img>
              <p className="pricing-card-row-text">1 customized domain
</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                src="./images/check-purple.png"
              ></img>
              <p className="pricing-card-row-text">Full access to Third Space
</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                src="./images/check-purple.png"
              ></img>
              <p className="pricing-card-row-text">5GB cloud storage
</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                src="./images/check-purple.png"
              ></img>
              <p className="pricing-card-row-text">
              Smart Contracts (30 interactions/month)
              </p>
            </div>
          </div>
        </div>
        {/* Business Card */}

        <div className="pricing-card">
          <h3 className="pricing-card-title">Business</h3>
          <div className="pricing-card-price">
            <img
              className="pricing-card-price-img"
              src="./images/logo-usdc.png"
            ></img>
            <p className="pricing-card-price-number">29.99</p>
            <p className="pricing-card-price-text">/month</p>
          </div>
          <button
            className="purple-btn plan-getstarted"
            onClick={toggleWalletPopup}
          >
            Get Started
          </button>
          <div className="pricing-card-content">
          <p className="pricing-card-text">Everything in basic + </p>

            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                src="./images/check-purple.png"
              ></img>
              <p className="pricing-card-row-text">3 customized domains
</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                src="./images/check-purple.png"
              ></img>
              <p className="pricing-card-row-text">Unlimited file uploads</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                src="./images/check-purple.png"
              ></img>
              <p className="pricing-card-row-text">10GB cloud storage
</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                src="./images/check-purple.png"
              ></img>
              <p className="pricing-card-row-text">
              Smart Contracts (60 interactions/month)
              </p>
            </div>
          </div>
        </div>
      </div>

      {showWalletPopup && (
        <PopupWallet
          onClose={toggleWalletPopup}
          onUserLogin={handleUserLogin}
          checkWalletData={checkWalletData}
        />
      )}
    </section>
  );
}

export default Pricing;
