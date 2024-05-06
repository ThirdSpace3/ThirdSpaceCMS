import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import PopupWallet from "./PopupWallet.js";
import { db, collection, getDocs } from '../../firebaseConfig'; // Assuming Firestore is correctly imported and configured
import ReactGA from 'react-ga';

function Navbar({checkWalletData,hasWalletData, accounts, setAccounts}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const togglePopup = () => {
    // Log the event in Google Analytics
    ReactGA.event({
      category: 'User',
      action: 'Click on Wallet Button'
    });
  
    if (accounts.length > 0 && !hasWalletData) {
      navigate("/templatestep");
    } else {
      setShowPopup(true);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
    useEffect(() => {
      ReactGA.pageview(window.location.pathname + window.location.search);

      const userAccount = sessionStorage.getItem("userAccount");
      if (userAccount) {
        setAccounts([userAccount]);
        checkWalletData(userAccount);
      }
    }, []);
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

          {accounts.length === 0 ? (
            <a href="#" className="nav__cta nav-bg" onClick={togglePopup}>
              Connect Wallet
            </a>
          ) : (
            <a
              href={!hasWalletData ? "#/templatestep" : "#/dashboard"}
              className="nav__cta nav-bg"
            >
              {!hasWalletData ? "Get Started" : "Dashboard"}
            </a>
          )}

          {accounts.length > 0 && (
            <a
              href={hasWalletData ? "#/templatestep" : "#/dashboard"}
              className="nav__cta nav-bg"
            >
              <span className="material-symbols-outlined">account_circle</span>
            </a>
          )}
        </div>
      </div>

      <div className="navbar__mobile">
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
          </ul>
        </div>
      </div>

      {showPopup && <PopupWallet onClose={() => setShowPopup(false)} onUserLogin={(account) => setAccounts([account])} checkWalletData={() => checkWalletData(accounts[0])}/>}
    </nav>
  );
}

export default Navbar;
