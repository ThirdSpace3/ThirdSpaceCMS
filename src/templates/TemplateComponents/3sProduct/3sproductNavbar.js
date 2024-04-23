import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../templates-po/navbar.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import { useStyle } from '../../../hooks/StyleContext';

const Navbar = ({ isMenuOpen, toggleMenu, menuToggleImg, onClick, style, settings, handleSettingsChange, selectElement }) => {
  const [homeText, setHomeText] = useState('Home');
  const [aboutText, setAboutText] = useState('About');
  const [featuresText, setFeaturesText] = useState('Features');
  const [joinUsText, setJoinUsText] = useState('Join Us');
  const { getComponentStyle } = useStyle();

  const navbarStyle = getComponentStyle('navbar');

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--background-color', settings.backgroundColor || '#200627');
    root.style.setProperty('--navbar-border-color', settings.navbarBorderColor || '#151934');
    root.style.setProperty('--primary-btn-bg', settings.primaryBtnBg || '#7214ff');
    root.style.setProperty('--navbar-text-color', settings.navbarTextColor || '#8f9bb7');
  }, [settings]);

  // console.log('selectElement prop in Navbar:', selectElement); // Debugging line

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
    }
  };

  const handleTextStyleChange = (textType, newStyle) => {
    const updatedSettings = {
      ...settings,
      textStyles: {
        ...settings.textStyles,
        [textType]: newStyle,
      },
    };
    handleSettingsChange('navbar', updatedSettings);
  };
  

  const handleToggleClick = (event) => {
    event.stopPropagation();
    toggleMenu();
  };
  useEffect(() => {
    console.log('Settings updated', settings.textStyles);
  }, [settings.textStyles]);
  return (
    <div className="sss-product-navbar-container" style={navbarStyle} onClick={onClick}>
      <nav className="sss-product-navbar-navbar">
        <img src="./images/templates-img/3sproduct/3sproduct-logo.png" className="sss-product-navbar-logo" alt="Logo" />
        <ul className="sss-product-navbar-links-box">
          <li onClick={onClick}>
            <Link to="/" className="sss-product-navbar-links">
              <EditableText
                text={homeText}
                onChange={(newText) => handleTextChange(newText, 'home')}
                handleSettingsChange={(newStyle) => handleTextStyleChange('home', newStyle)}
                style={settings.textStyles?.homeText}
                textType="homeText"
                selectElement={selectElement} // Ensuring prop is passed
              />
            </Link>
          </li>
          <li>
            <Link to="/about" className="sss-product-navbar-links">
              <EditableText
                text={aboutText}
                onChange={(newText) => handleTextChange(newText, 'about')}
                handleSettingsChange={(newStyle) => handleTextStyleChange('about', newStyle)}
                style={settings.textStyles?.aboutText}
                textType="aboutText"
                selectElement={selectElement} // Ensuring prop is passed
              />
            </Link>
          </li>
          <li>
            <Link to="/features" className="sss-product-navbar-links">
              <EditableText
                text={featuresText}
                onChange={(newText) => handleTextChange(newText, 'features')}
                handleSettingsChange={(newStyle) => handleTextStyleChange('features', newStyle)}
                style={settings.textStyles?.featuresText}
                textType="featuresText"
                selectElement={selectElement} // Ensuring prop is passed
              />
            </Link>
          </li>
        </ul>
        <Link to="/join-us" className="sss-product-navbar-cta">
          <EditableText
            text={joinUsText}
            onChange={(newText) => handleTextChange(newText, 'joinUs')}
            handleSettingsChange={(newStyle) => handleTextStyleChange('joinUs', newStyle)}
            style={settings.textStyles?.joinUsText}
            textType="joinUsText"
            selectElement={selectElement} // Ensuring prop is passed
          />
        </Link>
        <img
          src={menuToggleImg}
          className="sss-product-navbar-mobile-toggle"
          onClick={handleToggleClick}
          alt="Menu Toggle"
        />
      </nav>
    </div>
  );
};

export default Navbar;
