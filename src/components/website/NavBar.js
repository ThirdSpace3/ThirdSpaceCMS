import React, { useState, useEffect } from "react";
import "./NavBar.css";
import PopupWallet from "./PopupWallet.js";
import "../Root.css";
import TemplateStep1 from "./TemplateSteps/TemplateStep1.js";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showTemplateStep1, setShowTemplateStep1] = useState(false);
  const navigate = useNavigate();

  const userIsLoggedIn = () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    return isLoggedIn;
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
      const userAccount = sessionStorage.getItem("userAccount");
      if (isLoggedIn && userAccount) {
        setAccounts([userAccount]);
      } else {
        setAccounts([]);
      }
    };

    checkLoginStatus();
  }, []);
  const is3rdSpaceIO = window.location.hostname.includes("3rd-space");

  const togglePopup = () => {
    if (!userIsLoggedIn()) {
      setShowPopup(!showPopup);
    } else {
      if (is3rdSpaceIO === true) {
        window.location.href = "https://thirdspace.x";
      } else {
        navigate("./templatestep");
      }
    }
  };

  const redirectWeb3 = () => {
    window.location.href = "https://thirdspace.x";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Additional logic to adjust button display based on URL
  const displayLaunchAppInstead = is3rdSpaceIO; // Add your logic for detecting plugins here if needed
  
  return (
    <nav className="navbar__padding">
      <div className="navbar__pc">
        <a href="/#/home" className="nav__logo">
          <img src="./images/3s-logo.png" alt="thirdspace logo" />
        </a>
        <div className="navbar__right">
          <ul className="nav__links nav-bg">
            <li>
              <a href="/#/home" className="nav__links-btn">
                Home
              </a>
            </li>
            <li className="coming-soon">
              <a href="/#/products" className="nav__links-btn">
                Products
              </a>
            </li>
            <li className="coming-soon">
              <a href="/#/ressources" className="nav__links-btn">
                Ressources
              </a>
            </li>
            <li className="coming-soon">
              <a href="/#/pricing" className="nav__links-btn">
                Pricing
              </a>
            </li>
          </ul>

          {/* If .X display tout 
          If .io Get started => Launch App */}
          {displayLaunchAppInstead ? (
            <a
              href="ipfs://thirdspace.x"
              target="_blank"
              rel="noopener noreferrer"
              className="nav__cta nav-bg"
              onClick={() => {
                window.open("ipfs://thirdspace.x",
                  "_blank"
                );
                window.location.href = "https://chrome.google.com/webstore/detail/unstoppable-extension/beelkklmblgdljamcmoffgfbdddfpnnl";
              }}                  

            >
              Launch App
            </a>
          ) : (
            <>
              <a
                href={accounts.length > 0 ? ".#/templatestep" : "#"}
                className="nav__cta nav-bg"
                onClick={accounts.length === 0 ? togglePopup : undefined}
              >
                Get Started
              </a>
              {accounts.length === 0 && (
                <a href="#" className="nav__cta nav-bg" onClick={togglePopup}>
                  <span className="material-symbols-outlined">wallet</span>
                  Connect Wallet
                </a>
              )}
            </>
          )}
          {accounts.length > 0 && (
            <a href=".#/dashboard" className="nav__cta nav-bg" id="account-btn">
              <span className="material-symbols-outlined">account_circle</span>
            </a>
          )}

          {/*  */}
        </div>
      </div>

      <div className="navbar__mobile"
        
      >
        <div className="navbar__mobile-head">
          <a href="index.html" className="nav__logo">
            <img src="/images/3s-logo.png" alt="thirdspace logo" />
          </a>
          <img
            className="navbar__mobile-menuIcon"
            id="menuIcon"
            src={
              isMenuOpen
                ? "/images/navbar-close.png"
                : "/images/navbar-burger.png"
            }
            alt=""
            onClick={toggleMenu}
          />
        </div>
        <div 
        className={`navbar__mobile-content ${isMenuOpen ? "animate__fadeInLeft" : ""}`}
        style={{ display: isMenuOpen ? "block" : "none", left: isMenuOpen ? '-11%' : '-150%' }}
        >
          <ul className="nav__links">
            <li>
              <a href="/#/home" className="nav__links-btn">
                Home
              </a>
            </li>
            <li className="coming-soon">
              <a href="/#/products" className="nav__links-btn">
              Products
              </a>
            </li>
            <li className="coming-soon">
              <a href="/#/ressources" className="nav__links-btn">
                Ressources
              </a>
            </li>
            <li className="coming-soon">
              <a href="/#/pricing" className="nav__links-btn">
                Pricing
              </a>
            </li>
            <a href="/#/get-started-mobile" className="nav__cta nav-bg">
              Get started
            </a>
          </ul>
        </div>
      </div>
      {showPopup && (
        <PopupWallet
          onClose={() => setShowPopup(false)}
          onUserLogin={(account) => setAccounts([account])}
        />
      )}
      {showTemplateStep1 && <TemplateStep1 />}
    </nav>
  );
}

export default Navbar;
