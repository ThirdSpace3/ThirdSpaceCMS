import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // If you're using react-router for SPA navigation
import '../../templates-po/navbar.css'
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';

const Navbar = ({ isMenuOpen, toggleMenu, menuToggleImg, onClick, style, settings }) => {
  const [homeText, setHomeText] = useState('Home');
  const [aboutText, setAboutText] = useState('About');
  const [featuresText, setFeaturesText] = useState('Features');
  const [joinUsText, setJoinUsText] = useState('Join Us');
  const [homeTextStyle, setHomeTextStyle] = useState({});
  const [aboutTextStyle, setAboutTextStyle] = useState({});
  const [featuresTextStyle, setFeaturesTextStyle] = useState({});
  const [joinUsTextStyle, setJoinUsTextStyle] = useState({});

  const updateCSSVariables = (settings) => {
    const root = document.documentElement;
    root.style.setProperty('--background-color', settings.backgroundColor || '#200627');
    root.style.setProperty('--navbar-border-color', settings.navbarBorderColor || '#151934');
    root.style.setProperty('--primary-btn-bg', settings.primaryBtnBg || '#7214ff');
  };
  
  useEffect(() => {
    updateCSSVariables(settings);
  }, [settings]);
  const handleTextChange = (newText, textType) => {
    switch (textType) {
      case 'home':
        setHomeText(newText);
        break;
      case 'about':
        setAboutText(newText);
        break;
      case 'features':
        setFeaturesText(newText);
        break;
      case 'joinUs':
        setJoinUsText(newText);
        break;
      default:
        break;
    }
  };

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
          <li onClick={onClick}>
            <Link to="/" className="sss-product-navbar-links" >
              <EditableText
                text={homeText}
                // style={homeTextStyle}
                onChange={(newText) => handleTextChange(newText, 'home')}
                // onStyleChange={(newStyle) => handleStyleChange(newStyle, 'home')}
              />
            </Link>
          </li>
          <li>
            <Link to="/about" className="sss-product-navbar-links">
              <EditableText text={aboutText} onChange={(newText) => handleTextChange(newText, 'about')} />
            </Link>
          </li>
          <li>
            <Link to="/features" className="sss-product-navbar-links">
              <EditableText text={featuresText} onChange={(newText) => handleTextChange(newText, 'features')} />
            </Link>
          </li>
        </ul>
        <Link to="/join-us" className="sss-product-navbar-cta">
          <EditableText text={joinUsText} onChange={(newText) => handleTextChange(newText, 'joinUs')} />
        </Link>
        <img
          src={menuToggleImg}
          className="sss-product-navbar-mobile-toggle"
          onClick={handleToggleClick}
          alt="Menu Toggle"
        />
      </nav>
      <ul className={`sss-product-navbar-mobile-links-box ${isMenuOpen ? "show" : "hide"}`}>
        <li>
          <Link to="/" className="sss-product-navbar-links">
            <EditableText text={homeText} onChange={(newText) => handleTextChange(newText, 'home')} />
          </Link>
        </li>
        <li>
          <Link to="/about" className="sss-product-navbar-links">
            <EditableText text={aboutText} onChange={(newText) => handleTextChange(newText, 'about')} />
          </Link>
        </li>
        <li>
          <Link to="/features" className="sss-product-navbar-links">
            <EditableText text={featuresText} onChange={(newText) => handleTextChange(newText, 'features')} />
          </Link>
        </li>
        <li>
          <Link to="/join-us" className="sss-product-navbar-mobile-cta">
            <EditableText text={joinUsText} onChange={(newText) => handleTextChange(newText, 'joinUs')} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
