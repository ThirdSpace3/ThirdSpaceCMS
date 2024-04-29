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
    setSelectedElement,
    setSelectedColor,
}) => {
    const { selectedImage, isReplacementMode, enterReplacementMode, selectImage, activeComponent } = useImageHistory();
    const [homeText, setHomeText] = useState(() => localStorage.getItem('navbar-home-text') || 'Home');
    const [aboutText, setAboutText] = useState(() => localStorage.getItem('navbar-about-text') || 'About');
    const [featuresText, setFeaturesText] = useState(() => localStorage.getItem('navbar-navfeatures-text') || 'Features');
    const [joinUsText, setJoinUsText] = useState(() => localStorage.getItem('navbar-joinUs-text') || 'Join Us');
    
    const [imageHeight, setImageHeight] = useState(null);
    const [navbarImage, setNavbarImage] = useState("./images/templates-img/3sproduct/3sproduct-logo.png");

    const { setSelectedComponent, selectedComponent, updateStyle, getComponentStyle } = useStyle();
    const navbarStyles = getComponentStyle('navbar');
    const homeStyles = getComponentStyle('home');
    const aboutStyles = getComponentStyle('about');
    const featuresStyles = getComponentStyle('navfeatures');
    const joinUsStyles = getComponentStyle('joinUs');

    const getImageHeight = (src) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img.height);
        });
    };
    useEffect(() => {
        getImageHeight(navbarImage).then((height) => setImageHeight(height));
    }, []);

    const handleComponentClick = (event, identifier) => {
        event.preventDefault(); // This will prevent the default action of the anchor tag
        event.stopPropagation(); // Stop the event from propagating up
        console.log(`${identifier} clicked, setting selected element to '${identifier}'`);
        setSelectedElement(identifier);
    };

    const handleTextChange = (newText, textType) => {
        console.log(`Updating text for ${textType}: ${newText}`);
        console.log(`Current styles for ${textType}:`, getComponentStyle(textType));

        switch (textType) {
            case 'home':
                setHomeText(newText);
                break;
            case 'about':
                setAboutText(newText);
                break;
            case 'navfeatures':
                setFeaturesText(newText);
                break;
            case 'joinUs':
                setJoinUsText(newText);
                break;
            default:
                break;
        }
        localStorage.setItem(`navbar-${textType}-text`, newText);
        updateStyle(textType, { text: newText });
    };

    const handleDoubleClick = (event) => {
        event.preventDefault();  // Prevent the default link behavior
        event.stopPropagation(); // Stop propagation to avoid unwanted side effects
    };
    useEffect(() => {
        const cssVarName = `--navbar-background-color`;
        const storedColor = localStorage.getItem(cssVarName);

        if (storedColor) {
            setSelectedColor(storedColor);
            document.documentElement.style.setProperty(cssVarName, storedColor);
        }
    }, []);

    useEffect(() => {
        setHomeText(localStorage.getItem('navbar-home-text') || 'Home');
        setAboutText(localStorage.getItem('navbar-about-text') || 'About');
        setFeaturesText(localStorage.getItem('navbar-navfeatures-text') || 'Features');
        setJoinUsText(localStorage.getItem('navbar-joinUs-text') || 'Join Us');

        const storedColor = localStorage.getItem(`--navbar-background-color`);
        if (storedColor) {
            setSelectedColor(storedColor);
        }
    }, [setSelectedColor]);

    return (
        <div className="sss-product-navbar-container navbar-element" id='navbar' style={navbarStyles} onClick={(event) => handleComponentClick(event, 'navbar')}>
            <nav className="sss-product-navbar-navbar">
                <div className="image-container">
                    <ReusableImage
                        src={navbarImage}
                        alt="Navbar Logo"
                        handleImageClick={() => enterReplacementMode('Navbar')}
                        openImagePanel={openImagePanel}
                        imageHeight={imageHeight}
                        selectedImage={selectedImage}
                        onImageChange={(newSrc) => selectImage(newSrc)}
                        identifier="NavbarImage"
                    />
                </div>
                <ul className="sss-product-navbar-links-box">
                    <li id='home' onClick={(event) => handleComponentClick(event, 'home')} >
                        <Link className="sss-product-navbar-links" onDoubleClick={handleDoubleClick}>
                            <EditableText
                                text={homeText}
                                onChange={(newText) => handleTextChange(newText, 'home')}
                                style={homeStyles}
                            />
                        </Link>
                    </li>
                    <li id='about' onClick={(event) => handleComponentClick(event, 'about')} >
                        <Link className="sss-product-navbar-links" onDoubleClick={handleDoubleClick}>
                            <EditableText
                                text={aboutText}
                                onChange={(newText) => handleTextChange(newText, 'about')}
                                style={aboutStyles}
                            />
                        </Link>
                    </li>
                    <li id='navfeatures' onClick={(event) => handleComponentClick(event, 'navfeatures')} >
                        <Link className="sss-product-navbar-links" >
                            <EditableText
                                text={featuresText}
                                onChange={(newText) => handleTextChange(newText, 'navfeatures')}
                                style={featuresStyles}
                            />
                        </Link>
                    </li>

                </ul>
                <a id='joinUs' onClick={(event) => handleComponentClick(event, 'joinUs')} style={{ ...joinUsStyles }}>
                    <Link className="sss-product-navbar-cta">
                        <EditableText
                            text={joinUsText}
                            onChange={(newText) => handleTextChange(newText, 'joinUs')}
                            style={joinUsStyles}
                        />
                    </Link>
                </a>
                {/* Menu mobile toggler */}
                {/* <img
            src={menuToggleImg}
            className="sss-product-navbar-mobile-toggle"
            onClick={(event) => {
                toggleMenu(event);
                setSelectedElement('menuToggle');
            }}
            alt="Menu Toggle"
        /> */}
            </nav>
        </div>
    );
};

export default Navbar;
