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
    onContentChange
}) => {
    const { selectedImage, isReplacementMode, enterReplacementMode, selectImage, activeComponent } = useImageHistory();
    const [navbarContent, setNavbarContent] = useState({
        home: localStorage.getItem('navbar-home-text') || 'Home',
        about: localStorage.getItem('navbar-about-text') || 'About',
        navfeatures: localStorage.getItem('navbar-navfeatures-text') || 'Features',
        joinUsNav: localStorage.getItem('navbar-joinUs-text') || 'Join Us',
        image: "./images/templates-img/3sproduct/3sproduct-logo.png"
    });

    const [imageHeight, setImageHeight] = useState(null);

    const { setSelectedComponent, selectedComponent, updateStyle, getComponentStyle } = useStyle();
    const navbarStyles = getComponentStyle('navbar');
    const homeStyles = getComponentStyle('home');
    const navaboutStyles = getComponentStyle('navabout');
    const featuresStyles = getComponentStyle('navfeatures');
    const joinUsStylesNav = getComponentStyle('joinUsNav');

    const getImageHeight = (src) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img.height);
        });
    };
    useEffect(() => {
        getImageHeight(navbarContent.image).then((height) => setImageHeight(height));
    }, [navbarContent.image]);

    const handleComponentClick = (event, identifier) => {
        event.preventDefault(); // This will prevent the default action of the anchor tag
        event.stopPropagation(); // Stop the event from propagating up
        console.log(`${identifier} clicked, setting selected element to '${identifier}'`);
        setSelectedElement(identifier);
    };

    const handleTextChange = (newText, textType) => {
        console.log(`Updating text for ${textType}: ${newText}`);
        console.log(`Current styles for ${textType}:`, getComponentStyle(textType));

        setNavbarContent(prevContent => ({
            ...prevContent,
            [textType]: newText
        }));
        localStorage.setItem(`navbar-${textType}-text`, newText);
        updateStyle(textType, { text: newText });
      onContentChange({
    ...navbarContent,
    [textType]: newText
  });
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
        const storedContent = localStorage.getItem('navbar-content');
        if (storedContent) {
            const parsedContent = JSON.parse(storedContent);
            onContentChange(parsedContent);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('navbar-content', JSON.stringify(navbarContent));
    }, [navbarContent]);

    return (
        <div className="sss-product-navbar-container navbar-element" id='navbar' style={navbarStyles} onClick={(event) => handleComponentClick(event, 'navbar')}>
            <nav className="sss-product-navbar-navbar">
                <div className="image-container">
                    <ReusableImage
                        src={navbarContent.image}
                        alt="Navbar Logo"
                        handleImageClick={() => enterReplacementMode('Navbar')}
                        openImagePanel={openImagePanel}
                        imageHeight={imageHeight}
                        selectedImage={selectedImage}
                        onImageChange={(newSrc) => setNavbarContent(prevContent => ({
                            ...prevContent,
                            image: newSrc
                        }))}
                        identifier="NavbarImage"
                    />
                </div>
                <ul className="sss-product-navbar-links-box">
                    <li >
                        <Link className="sss-product-navbar-links" onDoubleClick={handleDoubleClick} id='home' onClick={(event) => handleComponentClick(event, 'home')} >
                            <EditableText
                                text={navbarContent.home}
                                onChange={(newText) => handleTextChange(newText, 'home')}
                                style={homeStyles}
                            />
                        </Link>
                    </li>
                    <li >
                        <Link className="sss-product-navbar-links" onDoubleClick={handleDoubleClick} id='navabout' onClick={(event) => handleComponentClick(event, 'navabout')} >
                            <EditableText
                                text={navbarContent.about}
                                onChange={(newText) => handleTextChange(newText, 'navabout')}
                                style={navaboutStyles}
                            />
                        </Link>
                    </li>
                    <li >
                        <Link className="sss-product-navbar-links" id='navfeatures' onClick={(event) => handleComponentClick(event, 'navfeatures')} >
                            <EditableText
                                text={navbarContent.navfeatures}
                                onChange={(newText) => handleTextChange(newText, 'navfeatures')}
                                style={featuresStyles}
                            />
                        </Link>
                    </li>

                </ul>
                <a >
                    <Link className="sss-product-navbar-cta" id='joinUsNav' onClick={(event) => handleComponentClick(event, 'joinUsNav')}>
                        <EditableText
                            text={navbarContent.joinUsNav}
                            onChange={(newText) => handleTextChange(newText, 'joinUsNav')}
                            style={joinUsStylesNav}
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
