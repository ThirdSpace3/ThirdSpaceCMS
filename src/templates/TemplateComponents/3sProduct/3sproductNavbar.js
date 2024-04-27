import React, { useState, useEffect } from 'react';
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
    const { style, selectedComponent, updateStyle } = useStyle();
    const [imageHeight, setImageHeight] = useState(null);
    const [localSelectedImage, setLocalSelectedImage] = useState(selectedImage || "./images/templates-img/3sproduct/3sproduct-logo.png");
    const [navbarImage, setNavbarImage] = useState("./images/templates-img/3sproduct/3sproduct-logo.png");
    const [navbarStyle, setNavbarStyle] = useState(style.navbar || {});
    const handleTextStyleChange = (textType, newStyle) => {
        handleSettingsChange('navbar', {
            ...settings,
            textStyles: {
                ...settings.textStyles,
                [textType]: newStyle
            }
        });
    };
// In your Navbar component useEffect
useEffect(() => {
    if (style.navbar) {
      setNavbarStyle({...style.navbar}); // Spread into a new object to ensure re-render
    }
  }, [style.navbar]);
  

    return (
        <div className="sss-product-navbar-container navbar-element" id='navbar'>
            <nav className="sss-product-navbar-navbar" onClick={() => setSelectedElement('navbar')}>
                <div className="image-container">
                    <ReusableImage
                        src={navbarImage}
                        alt="Navbar Logo"
                        handleImageClick={() => enterReplacementMode('Navbar')}
                        openImagePanel={openImagePanel}
                        imageHeight={imageHeight}
                        selectedImage={selectedImage}
                        onImageChange={(newSrc) => selectImage(newSrc)}
                        onClick={() => setSelectedElement('navbar')}
                        identifier="NavbarImage"
                    />
                </div>
                <ul className="sss-product-navbar-links-box">
                    <li onClick={() => setSelectedElement('home')}>
                        <Link to="/" className="sss-product-navbar-links">
                            <EditableText
                                text={homeText}
                                onChange={(text) => setHomeText(text)}
                                handleSettingsChange={(newStyle) => handleTextStyleChange('home', newStyle)}
                                style={navbarStyle} // Apply navbar style
                                textType="homeText"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="sss-product-navbar-links">
                            <EditableText
                                text={aboutText}
                                onChange={(text) => setAboutText(text)}
                                handleSettingsChange={(newStyle) => handleTextStyleChange('about', newStyle)}
                                style={navbarStyle} // Apply navbar style
                                textType="aboutText"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link to="/features" className="sss-product-navbar-links">
                            <EditableText
                                text={featuresText}
                                onChange={(text) => setFeaturesText(text)}
                                handleSettingsChange={(newStyle) => handleTextStyleChange('features', newStyle)}
                                style={navbarStyle} // Apply navbar style
                                textType="featuresText"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link to="/join-us" className="sss-product-navbar-cta">
                            <EditableText
                                text={joinUsText}
                                onChange={(text) => setJoinUsText(text)}
                                handleSettingsChange={(newStyle) => handleTextStyleChange('joinUs', newStyle)}
                                style={navbarStyle} // Apply navbar style
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
