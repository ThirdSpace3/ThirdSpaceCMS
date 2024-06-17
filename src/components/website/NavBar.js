import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import PopupWallet from './PopupWallet.js';
import ReactGA from 'react-ga';

function Navbar({ checkWalletData, hasWalletData, accounts, setAccounts }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const togglePopup = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    ReactGA.event({
      category: 'Button',
      action: 'Click',
      label: 'Get Started from Navbar',
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
    const shouldOpenWalletPopup = localStorage.getItem('openWalletPopup');
    if (shouldOpenWalletPopup === 'true') {
      setShowPopup(true);
      localStorage.removeItem('openWalletPopup');
    }

    ReactGA.pageview(window.location.pathname + window.location.search);

    const userAccount = sessionStorage.getItem("userAccount");
    if (userAccount) {
      setAccounts([userAccount]);
      checkWalletData(userAccount);
    }
  }, []);

  useEffect(() => {
    const navbarPadding = document.querySelector('.navbar__padding');
    if (isMenuOpen) {
      navbarPadding.style.backgroundColor = 'var(--menu-bg)';
    } else {
      navbarPadding.style.backgroundColor = '';
    }
  }, [isMenuOpen]);

  return (
    <nav className="navbar__padding">
      <div className="navbar__pc">
        <a href="/#/home" className="nav__logo">
          <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2F3s-logo.png?alt=media&token=8a69bcce-2e9f-463e-8cba-f4c2fec1a904" alt="thirdspace logo" />
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
              <a href="/#/resources" className="nav__links-btn">
                Resources
              </a>
            </li>
            <li className="coming-soon">
              <a href="/#/pricing" className="nav__links-btn">
                Pricing
              </a>
            </li>
          </ul>

          {accounts.length === 0 ? (
            <a href="#" className="purple-btn" onClick={togglePopup}>
              Get Started
            </a>
          ) : (
            <a
              href={hasWalletData ? "#/dashboard" : "#/templatestep"}
              className="nav__cta nav-bg"
            >
              <span className="material-symbols-outlined">account_circle</span>
            </a>
          )}
        </div>
      </div>

      <div className="navbar__mobile">
        <div className="navbar__mobile-head">
          <a href="/#/home" className="nav__logo">
            <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2F3s-logo.png?alt=media&token=8a69bcce-2e9f-463e-8cba-f4c2fec1a904" alt="thirdspace logo" />
          </a>
          <img
            className="navbar__mobile-menuIcon"
            id="menuIcon"
            src={
              isMenuOpen
                ? "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fnavbar-close.png?alt=media&token=3ececfa1-9c7d-450d-8443-53acccc54ffe"
                : "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fnavbar-burger.png?alt=media&token=bf53017c-e2e0-4108-be6f-7a657e38f786"
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
              <a href="/#/resources" className="nav__links-btn">
                Resources
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

      {showPopup && <PopupWallet setShowPopup={setShowPopup} onClose={() => setShowPopup(false)} onUserLogin={(account) => setAccounts([account])} checkWalletData={() => checkWalletData(accounts[0])} />}
    </nav>
  );
}

export default Navbar;
