// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // If you're using react-router for SPA navigation

const Navbar = ({ isMenuOpen, toggleMenu, menuToggleImg, onClick, style }) => {

  const handleToggleClick = (event) => {
    event.stopPropagation(); // This stops the click from bubbling up to the parent div
    toggleMenu();
  };
  return (
    <div className="sss-product-navbar-container" style={style} onClick={onClick}>
      <nav className="sss-product-navbar-navbar">
        <img
          src="./images/templates-img/3sproduct/3sproduct-logo.png"
          className="sss-product-navbar-logo"
          alt="Logo"
        />
        <ul className="sss-product-navbar-links-box">
          <li>
            <Link to="/" className="sss-product-navbar-links">Home</Link>
          </li>
          <li>
            <Link to="/about" className="sss-product-navbar-links">About</Link>
          </li>
          <li>
            <Link to="/features" className="sss-product-navbar-links">Features</Link>
          </li>
        </ul>
        <Link to="/join-us" className="sss-product-navbar-cta">Join Us</Link>
        <img
          src={menuToggleImg}
          className="sss-product-navbar-mobile-toggle"
          onClick={handleToggleClick}
          alt="Menu Toggle"
        />
      </nav>
      <ul className={`sss-product-navbar-mobile-links-box ${isMenuOpen ? "show" : "hide"}`}>
        <li>
          <Link to="/" className="sss-product-navbar-links">Home</Link>
        </li>
        <li>
          <Link to="/about" className="sss-product-navbar-links">About</Link>
        </li>
        <li>
          <Link to="/features" className="sss-product-navbar-links">Features</Link>
        </li>
        <li>
          <Link to="/join-us" className="sss-product-navbar-mobile-cta">Join Us</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
