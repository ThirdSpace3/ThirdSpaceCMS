import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';
import EditableButton from '../../../../components/logiciel/TemplateComponent/EditableButton';
import '../css/navbar.css';

const Navbar = ({
    openImagePanel,
    setSelectedElement,
    setSelectedColor,
    onContentChange,
    sections // New prop for section refs
}) => {
    const { selectedImage, isReplacementMode, enterReplacementMode, selectImage, activeComponent } = useImageHistory();
    const [navbarContent, setNavbarContent] = useState({
        home: localStorage.getItem('navbar-home-text') || 'Home',
        navabout: localStorage.getItem('navbar-about-text') || 'About',
        navfeatures: localStorage.getItem('navbar-navfeatures-text') || 'Features',
        joinUsNav: localStorage.getItem('navbar-navbar-cta-text') || 'Join Us',
        joinUsNavLink: JSON.parse(localStorage.getItem('navbar-navbar-cta-link')) || { url: '#', openInNewTab: false },
        image: "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-logo.png?alt=media&token=7e46320d-7e7d-45a2-9684-6ac565f97c71"
    });

    const [imageHeight, setImageHeight] = useState(null);

    const { setSelectedComponent, selectedComponent, updateStyle, getComponentStyle } = useStyle();
    const navbarStyles = getComponentStyle('navbar');
    const homeStyles = getComponentStyle('home');
    const navaboutStyles = getComponentStyle('navabout');
    const featuresStyles = getComponentStyle('navfeatures');
    const joinUsStylesNav = getComponentStyle('navbar-cta');

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
        if (sections[identifier] && sections[identifier].current) {
            sections[identifier].current.scrollIntoView({ behavior: 'smooth' });
        }
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

    const handleLinkChange = (newLink, linkType) => {
        setNavbarContent(prevContent => ({
            ...prevContent,
            [`${linkType}Link`]: newLink
        }));
        localStorage.setItem(`navbar-${linkType}-link`, JSON.stringify(newLink));
        updateStyle(linkType, { link: newLink });
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
                    <li>
                        <Link className="sss-product-navbar-links" onDoubleClick={handleDoubleClick} onClick={(event) => handleComponentClick(event, 'header')}>
                            <EditableText
                                text={navbarContent.home}
                                onChange={(newText) => handleTextChange(newText, 'home')}
                                style={homeStyles}
                                id='home'
                            />
                        </Link>
                    </li>
                    <li>
                        <Link className="sss-product-navbar-links" onDoubleClick={handleDoubleClick} onClick={(event) => handleComponentClick(event, 'about')}>
                            <EditableText
                                id='navabout'
                                text={navbarContent.navabout}
                                onChange={(newText) => handleTextChange(newText, 'navabout')}
                                style={navaboutStyles}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link className="sss-product-navbar-links" onClick={(event) => handleComponentClick(event, 'features')}>
                            <EditableText
                                id='navfeatures'
                                text={navbarContent.navfeatures}
                                onChange={(newText) => handleTextChange(newText, 'navfeatures')}
                                style={featuresStyles}
                            />
                        </Link>
                    </li>
                </ul>
                <a href={navbarContent.joinUsNavLink.url} target={navbarContent.joinUsNavLink.openInNewTab ? "_blank" : "_self"} className='position-relative' onClick={(event) => handleComponentClick(event, 'joinUs')}>
                    <EditableButton
                        className="sss-product-navbar-cta"
                        id='navbar-cta'
                        text={navbarContent.joinUsNav}
                        link={navbarContent.joinUsNavLink}
                        onChange={(newText) => handleTextChange(newText, 'navbar-cta')}
                        onLinkChange={(newLink) => handleLinkChange(newLink, 'navbar-cta')}
                        style={joinUsStylesNav}
                    />
                </a>
            </nav>
        </div>
    );
};

export default Navbar;
