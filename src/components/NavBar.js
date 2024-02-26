import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './NavBar.css';


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <a href="#" className="nav__cta nav-bg" onClick={toggleMenu}>Get started</a>
          <a href="#" className="nav__cta nav-bg" onClick={toggleMenu} id="wallet-btn">
            <span className="material-symbols-outlined">wallet</span>
            Connexion
          </a>
          <a href="templates.html" className="nav__cta nav-bg" style={{display: 'none'}} id="account-btn">
            <span className="material-symbols-outlined">account_circle</span>
          </a>
        </div>
      </div>

<div className={`navbar__mobile ${isMenuOpen ? 'animate__fadeInLeft' : ''}`} style={{ display: isMenuOpen ? 'block' : 'none' }} id="mobileMenu">
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
            <a href="#" className="nav__cta nav-bg mobile-get-started" onClick={toggleMenu}>Get started</a>
            <a href="#" className="nav__cta nav-bg" onClick={toggleMenu}>
              <span className="material-symbols-outlined">wallet</span>
              Connexion
            </a>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;