import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../templates-po/navbar.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const Navbar = ({ isMenuOpen, toggleMenu, menuToggleImg, onClick, style, settings, handleSettingsChange, selectElement, openImagePanel, imageHistory, selectedImage, setSelectedImage }) => {
  const [homeText, setHomeText] = useState('Home');
  const [aboutText, setAboutText] = useState('About');
  const [featuresText, setFeaturesText] = useState('Features');
  const [joinUsText, setJoinUsText] = useState('Join Us');
  const { updateStyle, getComponentStyle } = useStyle();
  const [showReplaceButton, setShowReplaceButton] = useState(false);
  // useEffect(() => {
  //   console.log("Settings updated in Navbar:", settings);
  // }, [settings]);
  // console.log(setSelectedImage);

  const handleImageClick = (src) => {
    setSelectedImage(src);
    onClick(); // Call the onClick prop to update the selectedImage state

    console.log("handle image clicked,src used: " + src);
  };


  const handleButtonClick = () => {
    openImagePanel();
  };
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imageContainerRef.current && !imageContainerRef.current.contains(event.target)) {
        setShowReplaceButton(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navbarStyle = getComponentStyle('navbar');

  // useEffect(() => {
  //   console.log("Navbar styles updated:", navbarStyle);
  // }, [navbarStyle]);


  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--background-color', settings.backgroundColor || '#200627');
    root.style.setProperty('--navbar-border-color', settings.navbarBorderColor || '#151934');
    root.style.setProperty('--primary-btn-bg', settings.primaryBtnBg || '#7214ff');
    root.style.setProperty('--navbar-text-color', settings.navbarTextColor || '#8f9bb7');
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
  const [imageHeight, setImageHeight] = useState(null);

  const getImageHeight = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img.height);
    });
  };
  useEffect(() => {
    getImageHeight("./images/templates-img/3sproduct/3sproduct-logo.png").then((height) => setImageHeight(height));
  }, []);


  return (
    <div className="sss-product-navbar-container" style={{ ...navbarStyle, ...settings.navbar }} onClick={onClick}>
      <nav className="sss-product-navbar-navbar">
        <div className="image-container" ref={imageContainerRef}>
          <ReusableImage
            src={selectedImage || "./images/templates-img/3sproduct/3sproduct-logo.png"}
            alt="Logo"
            onClick={() => handleImageClick(selectedImage || "./images/templates-img/3sproduct/3sproduct-logo.png")}
            openImagePanel={openImagePanel}
            imageHeight={imageHeight}
            selectElement={selectElement} // Pass down the selectElement function
            selectedImage={selectedImage}
          />
        </div>

        <ul className="sss-product-navbar-links-box">
          <li onClick={onClick}>
            <Link to="/" className="sss-product-navbar-links">
              <EditableText
                text={homeText}
                onChange={(newText) => handleTextChange(newText, 'home')}
                handleSettingsChange={(newStyle) => handleTextStyleChange('home', newStyle)}
                style={{ ...navbarStyle, ...settings.textStyles?.homeText }}
                textType="homeText"
                selectElement={selectElement}
              />

            </Link>
          </li>
          <li>
            <Link to="/about" className="sss-product-navbar-links">
              <EditableText
                text={aboutText}
                onChange={(newText) => handleTextChange(newText, 'about')}
                handleSettingsChange={(newStyle) => handleTextStyleChange('about', newStyle)}
                style={{ ...navbarStyle, ...settings.textStyles?.aboutText }}
                textType="aboutText"
                selectElement={selectElement}
              />
            </Link>
          </li>
          <li>
            <Link to="/features" className="sss-product-navbar-links">
              <EditableText
                text={featuresText}
                onChange={(newText) => handleTextChange(newText, 'features')}
                handleSettingsChange={(newStyle) => handleTextStyleChange('features', newStyle)}
                style={{ ...navbarStyle, ...settings.textStyles?.featuresText }}
                textType="featuresText"
                selectElement={selectElement}
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
            selectElement={selectElement}
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
