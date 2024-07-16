import React, { useState, useEffect } from "react";
import "./Pricing.css";
import "../../Root.css";
import PopupWallet from "../login/PopupWallet";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga";

function Pricing({  }) {
  const navigate = useNavigate();
  const userIsLoggedIn = () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    return isLoggedIn;
  };

  const toggleWalletPopup = () => {
    console.log(userIsLoggedIn);
    if (!userIsLoggedIn()) {
      // If user is not logged in
      navigate('/login'); // Navigate to the login page
    } else {
      // If user is logged in
      navigate("/dashboard"); // Navigate to '/dashboard' route
    }
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
              alt='third space builder web 3 no-code tools web3 platform'
              src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Flogo-usdc.png?alt=media&token=d0094e84-48ac-4b7b-952f-72b50499ba4b"
            ></img>
            <p className="pricing-card-price-number">0</p>
            <p className="pricing-card-price-text">/month</p>
          </div>
          <a
            className="purple-btn plan-getstarted ga-getstarted-btn-pricing-hp"
            id="getstarted-btn"
            onClick={toggleWalletPopup}
          >
            Get Started
          </a>
          <div className="pricing-card-content">
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                alt='third space builder web 3 no-code tools web3 platform'
                src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fcheck-purple.png?alt=media&token=a3b1431f-fe36-446c-90bf-7d182cde9929"
              ></img>
              <p className="pricing-card-row-text">Limited CMS access</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                alt='third space builder web 3 no-code tools web3 platform'
                src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fcheck-purple.png?alt=media&token=a3b1431f-fe36-446c-90bf-7d182cde9929"
              ></img>
              <p className="pricing-card-row-text">Test environments</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                alt='third space builder web 3 no-code tools web3 platform'
                src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fcheck-purple.png?alt=media&token=a3b1431f-fe36-446c-90bf-7d182cde9929"
              ></img>
              <p className="pricing-card-row-text">1GB cloud storage</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                alt='third space builder web 3 no-code tools web3 platform'
                src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fcheck-purple.png?alt=media&token=a3b1431f-fe36-446c-90bf-7d182cde9929"
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
              alt='third space builder web 3 no-code tools web3 platform'
              src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Flogo-usdc.png?alt=media&token=d0094e84-48ac-4b7b-952f-72b50499ba4b"
            ></img>
            <p className="pricing-card-price-number">12.49</p>
            <p className="pricing-card-price-text">/month</p>
          </div>
          <a
            className="purple-btn plan-getstarted ga-getstarted-btn-pricing-hp"
            id="getstarted-btn"
            onClick={toggleWalletPopup}
          >
            Get Started
          </a>
          <div className="pricing-card-content">
            <p className="pricing-card-text">Everything in freemium + </p>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                alt='third space builder web 3 no-code tools web3 platform'
                src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fcheck-purple.png?alt=media&token=a3b1431f-fe36-446c-90bf-7d182cde9929"
              ></img>
              <p className="pricing-card-row-text">1 customized domain</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                alt='third space builder web 3 no-code tools web3 platform'
                src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fcheck-purple.png?alt=media&token=a3b1431f-fe36-446c-90bf-7d182cde9929"
              ></img>
              <p className="pricing-card-row-text">Full access to Third Space</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                alt='third space builder web 3 no-code tools web3 platform'
                src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fcheck-purple.png?alt=media&token=a3b1431f-fe36-446c-90bf-7d182cde9929"
              ></img>
              <p className="pricing-card-row-text">5GB cloud storage</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                alt='third space builder web 3 no-code tools web3 platform'
                src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fcheck-purple.png?alt=media&token=a3b1431f-fe36-446c-90bf-7d182cde9929"
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
              alt='third space builder web 3 no-code tools web3 platform'
              src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Flogo-usdc.png?alt=media&token=d0094e84-48ac-4b7b-952f-72b50499ba4b"
            ></img>
            <p className="pricing-card-price-number">29.99</p>
            <p className="pricing-card-price-text">/month</p>
          </div>
          <a
            className="purple-btn plan-getstarted ga-getstarted-btn-pricing-hp"
            id="getstarted-btn"
            onClick={toggleWalletPopup}
          >
            Get Started
          </a>
          <div className="pricing-card-content">
            <p className="pricing-card-text">Everything in basic + </p>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                alt='third space builder web 3 no-code tools web3 platform'
                src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fcheck-purple.png?alt=media&token=a3b1431f-fe36-446c-90bf-7d182cde9929"
              ></img>
              <p className="pricing-card-row-text">3 customized domains</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                alt='third space builder web 3 no-code tools web3 platform'
                src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fcheck-purple.png?alt=media&token=a3b1431f-fe36-446c-90bf-7d182cde9929"
              ></img>
              <p className="pricing-card-row-text">Unlimited file uploads</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                alt='third space builder web 3 no-code tools web3 platform'
                src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fcheck-purple.png?alt=media&token=a3b1431f-fe36-446c-90bf-7d182cde9929"
              ></img>
              <p className="pricing-card-row-text">10GB cloud storage</p>
            </div>
            <div className="pricing-card-row">
              <img
                className="pricing-card-row-img"
                alt='third space builder web 3 no-code tools web3 platform'
                src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fcheck-purple.png?alt=media&token=a3b1431f-fe36-446c-90bf-7d182cde9929"
              ></img>
              <p className="pricing-card-row-text">
                Smart Contracts (60 interactions/month)
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Pricing;
