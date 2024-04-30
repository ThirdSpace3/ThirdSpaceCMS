import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import PopupWallet from "./PopupWallet.js";
import { db, doc, getDoc } from '../../firebaseConfig.js'; // Assuming Firestore is correctly imported and configured

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [hasWalletData, setHasWalletData] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkWalletData = async () => {
      const userAccount = sessionStorage.getItem("userAccount");
      if (userAccount) {
        const docRef = doc(db, "wallets", userAccount);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHasWalletData(true);  // Set to true if wallet data exists in the database
        } else {
          setHasWalletData(false); // Set to false if no wallet data found
        }
        setAccounts([userAccount]); // Set the account state either way
      }
    };

    checkWalletData();
  }, []);

  const togglePopup = () => {
    if (accounts.length > 0 && !hasWalletData) {
      navigate("/templatestep"); // Navigate to the step if no wallet data found
    } else {
      setShowPopup(true); // Show popup to connect wallet
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
              href={hasWalletData ? ".#/dashboard" : ".#/templatestep"}
              className="nav__cta nav-bg"
            >
              {hasWalletData ? "Dashboard" : "Get Started"}
            </a>
          )}

          {accounts.length > 0 && (
            <a href=".#/dashboard" className="nav__cta nav-bg" id="account-btn">
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

      {showPopup && <PopupWallet onClose={() => setShowPopup(false)} onUserLogin={(account) => setAccounts([account])} />}
    </nav>
  );
}

export default Navbar;
