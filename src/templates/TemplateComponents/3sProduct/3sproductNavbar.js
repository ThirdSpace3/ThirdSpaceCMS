import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../templates-po/navbar.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const Navbar = ({
    toggleMenu,
    menuToggleImg,
    settings,
    handleSettingsChange,
    openImagePanel,
    setSelectedElement
}) => {
    const { selectedImage, isReplacementMode, enterReplacementMode, selectImage, activeComponent } = useImageHistory();
    const [homeText, setHomeText] = useState('Home');
    const [aboutText, setAboutText] = useState('About');
    const [featuresText, setFeaturesText] = useState('Features');
    const [joinUsText, setJoinUsText] = useState('Join Us');
    const { style, selectedComponent, updateStyle } = useStyle(); // Get style from context
    const [imageHeight, setImageHeight] = useState(null);
    const [localSelectedImage, setLocalSelectedImage] = useState(selectedImage || "./images/templates-img/3sproduct/3sproduct-logo.png");
    const [navbarImage, setNavbarImage] = useState("./images/templates-img/3sproduct/3sproduct-logo.png");
    const navbarStyle = style.navbar || {}; // This should only contain navbar-related styles
    const [navbarStyleehe, setNavbarStyle] = useState(navbarStyle); // Add a state variable for the navbar style
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


    useEffect(() => {
        if (isReplacementMode && activeComponent === 'Navbar') {
            setNavbarImage(selectedImage);
        }
    }, [selectedImage, isReplacementMode, activeComponent]);
    useEffect(() => {
        console.log(`Component: Navbar, Active: ${activeComponent}, Image: ${selectedImage}`);
        if (activeComponent === 'Navbar' && selectedImage) {
            setNavbarImage(selectedImage);
        }
    }, [selectedImage, activeComponent]);

    const handleImageClick = () => {
        enterReplacementMode('Navbar');
    };

    const handleNewImageSrc = (newSrc) => {
        if (activeComponent === 'Navbar') {
            selectImage(newSrc);
        }
    };
    const handleNavbarClick = () => {
        console.log("Navbar clicked, setting selected element to 'navbar'");
        setSelectedElement('navbar');
    };



    useEffect(() => {
        const img = new Image();
        img.src = selectedImage || "./images/templates-img/3sproduct/3sproduct-logo.png";
    }, [selectedImage]);


    // useEffect(() => {
    //     const root = document.documentElement;
    //     root.style.setProperty('--background-color', settings.backgroundColor || '#200627');
    //     root.style.setProperty('--navbar-border-color', settings.navbarBorderColor || '#151934');
    //     root.style.setProperty('--primary-btn-bg', settings.primaryBtnBg || '#7214ff');
    //     root.style.setProperty('--navbar-text-color', settings.navbarTextColor || '#8f9bb7');
    // }, [settings]);

    const handleTextChange = (text, textType) => {
        switch (textType) {
            case 'home':
                setHomeText(text);
                break;
            case 'about':
                setAboutText(text);
                break;
            case 'features':
                setFeaturesText(text);
                break;
            case 'joinUs':
                setJoinUsText(text);
                break;
            default:
                break;
        }
    };

    const handleTextStyleChange = (textType, newStyle) => {
        handleSettingsChange('navbar', {
            ...settings,
            textStyles: {
                ...settings.textStyles,
                [textType]: newStyle
            }
        });
    };

    useEffect(() => {
        console.log("Component Name: Reacting to new selected image", selectedImage);
    }, [selectedImage]);



    useEffect(() => {
        console.log("Navbar style updated to:", navbarStyle);

        const root = document.documentElement;
        if (navbarStyle.backgroundColor) {
            root.style.setProperty('--background-color', navbarStyle.backgroundColor);
        }
    }, [navbarStyle.backgroundColor]); // Apply background color directly to CSS variable

    useEffect(() => {
        console.log("Navbar style:", navbarStyle);
    }, [navbarStyle]);

    useEffect(() => {
        // Update the state of the Navbar component when the navbarStyle object changes
        setNavbarStyle(navbarStyle);
    }, [navbarStyle]);
    useEffect(() => {
        console.log("Current style:", style);
    }, [style]);

    return (
        <div className="sss-product-navbar-container navbar-element" onClick={handleNavbarClick} style={navbarStyle}>
            <nav className="sss-product-navbar-navbar">
                <div className="image-container">
                    <ReusableImage
                        src={navbarImage}
                        alt="Navbar Logo"
                        handleImageClick={handleImageClick}
                        openImagePanel={openImagePanel}
                        imageHeight={imageHeight}
                        selectedImage={selectedImage}
                        onImageChange={handleNewImageSrc}
                        onClick={handleImageClick}
                        identifier="NavbarImage"

                    />
                </div>
                <ul className="sss-product-navbar-links-box">
  <li>
    <Link to="/" className="sss-product-navbar-links">
      <EditableText
        text={homeText}
        onChange={(text) => handleTextChange(text, 'home')}
        handleSettingsChange={(newStyle) => handleTextStyleChange('home', newStyle)}
        style={{...settings.textStyles?.homeText, ...navbarStyle}} // Pass the navbarStyle here
        textType="homeText"
      />
    </Link>
  </li>
  <li>
    <Link to="/about" className="sss-product-navbar-links">
      <EditableText
        text={aboutText}
        onChange={(text) => handleTextChange(text, 'about')}
        handleSettingsChange={(newStyle) => handleTextStyleChange('about', newStyle)}
        style={{...settings.textStyles?.aboutText, ...navbarStyle}} // Pass the navbarStyle here
        textType="aboutText"
      />
    </Link>
  </li>
  <li>
    <Link to="/features" className="sss-product-navbar-links">
      <EditableText
        text={featuresText}
        onChange={(text) => handleTextChange(text, 'features')}
        handleSettingsChange={(newStyle) => handleTextStyleChange('features', newStyle)}
        style={{...settings.textStyles?.featuresText, ...navbarStyle}} // Pass the navbarStyle here
        textType="featuresText"
      />
    </Link>
  </li>
  <li>
    <Link to="/join-us" className="sss-product-navbar-cta">
      <EditableText
        text={joinUsText}
        onChange={(text) => handleTextChange(text, 'joinUs')}
        handleSettingsChange={(newStyle) => handleTextStyleChange('joinUs', newStyle)}
        style={{...settings.textStyles?.joinUsText, ...navbarStyle}} // Pass the navbarStyle here
        textType="joinUsText"
      />
    </Link>
  </li>
</ul>

                <img
                    src={menuToggleImg}
                    className="sss-product-navbar-mobile-toggle"
                    onClick={toggleMenu}
                    alt="Menu Toggle"
                />
            </nav>
        </div>
    );
};

export default Navbar;
