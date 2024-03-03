import React, { useState, useEffect } from 'react';
import './NavBar.css';
import Web3 from 'web3';
import PopupWallet from '../components/PopupWallet.js'; // Adjust this path as necessary

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Function to check login status
    const checkLoginStatus = () => {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
      const userAccount = sessionStorage.getItem('userAccount');
      if (isLoggedIn && userAccount) {
        setAccounts([userAccount]);
      } else {
        setAccounts([]);
      }
    };

    checkLoginStatus();

    // Optionally, you can listen for changes in localStorage across tabs

  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar__padding">
      <div className="navbar__pc">
        <a href="index.html" className="nav__logo">
          <img src="/images/3s-logo.png" alt="thirdspace logo" />
        </a>
        <div className="navbar__right">
          <ul className="nav__links nav-bg">
            <li><a href="/home" className="nav__links-btn">Home</a></li>
            <li className="coming-soon">
              <a href="/about" className="nav__links-btn">About</a>
              <span className="tooltip">Coming Soon</span>
            </li>
            <li className="coming-soon">
              <a href="#" className="nav__links-btn">Ressources</a>
              <span className="tooltip">Coming Soon</span>
            </li>
            <li className="coming-soon">
              <a href="#" className="nav__links-btn">Pricing</a>
              <span className="tooltip">Coming Soon</span>
            </li>
          </ul>
          <a href={accounts.length > 0 ? "./logiciel" : "#"} className="nav__cta nav-bg" onClick={accounts.length === 0 ? togglePopup : undefined}>Get started</a>
          {accounts.length === 0 && (
          <a href="#" className="nav__cta nav-bg" onClick={togglePopup}>
            <span className="material-symbols-outlined">wallet</span>
            Connect Wallet
          </a>
        )}
        {accounts.length > 0 && (
          <a href="templates.html" className="nav__cta nav-bg" id="account-btn">
            <span className="material-symbols-outlined">account_circle</span>
          </a>
        )}
         <a href="templates.html" className="nav__cta nav-bg" style={{display: 'none'}} id="account-btn">
            <span className="material-symbols-outlined">account_circle</span>
          </a>
        </div>
      </div>

      <div className={`navbar__mobile ${isMenuOpen ? 'animate__fadeInLeft' : ''}`} style={{ display: isMenuOpen ? 'block' : 'none' }}>
        <div className="navbar__mobile-head">
          <a href="index.html" className="nav__logo">
            <img src="/images/3s-logo.png" alt="thirdspace logo" />
          </a>
          <img className="navbar__mobile-menuIcon" id="menuIcon" src={isMenuOpen ? "/images/navbar-close.png" : "/images/navbar-burger.png"} alt="" onClick={toggleMenu} />
        </div>
        <div className="navbar__mobile-content">
          <ul className="nav__links">
            <li><a href="#" className="nav__links-btn">Home</a></li>
            <li className="coming-soon">
              <a href="#" className="nav__links-btn">About</a>
              <span className="tooltip">Coming Soon</span>
            </li>
            <li className="coming-soon">
              <a href="#" className="nav__links-btn">Ressources</a>
              <span className="tooltip">Coming Soon</span>
            </li>
            <li className="coming-soon">
              <a href="#" className="nav__links-btn">Pricing</a>
              <span className="tooltip">Coming Soon</span>
            </li>
            <a href="#" className="nav__cta nav-bg" onClick={togglePopup}>Get started</a>
            <a href="#" className="nav__cta nav-bg" onClick={togglePopup}>
          <span className="material-symbols-outlined">wallet</span>
          {accounts.length > 0 ? `Wallet: ${accounts[0].substring(0, 6)}...` : 'Connect Wallet'}
        </a>
          </ul>
        </div>
      </div>
      {showPopup && <PopupWallet onClose={() => setShowPopup(false)} onUserLogin={(account) => setAccounts([account])} />}
    </nav>
  );
}

export default Navbar;