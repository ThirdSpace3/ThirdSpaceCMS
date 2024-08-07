import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';
import EditableButton from '../../../../components/logiciel/TemplateComponent/EditableButton';
import '../css/navbar.css';
import { fetchComponentData, saveComponentData } from '../../../../hooks/Fetchprojects';

const Navbar = ({
    openImagePanel,
    setSelectedElement,
    setSelectedColor,
    onContentChange,
    sections,
    selectedProjectId,
    handleImageUpload,
    navbarData,
    selectedElement
}) => {
    const { selectedImage, enterReplacementMode } = useImageHistory();
    const { updateStyle, getComponentStyle } = useStyle();

    const defaultNavbarContent = {
        home: 'Home',
        navabout: 'About',
        navfeatures: 'Features',
        joinUsNav: 'Join Us',
        joinUsNavLink: { url: '#', openInNewTab: false },
        image: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-logo.png?alt=media&token=7e46320d-7e7d-45a2-9684-6ac565f97c71'
    };

    const [navbarContent, setNavbarContent] = useState(defaultNavbarContent);
    const [imageHeight, setImageHeight] = useState(null);

    useEffect(() => {
        if (navbarData) {
            console.log('Fetched navbar data:', navbarData);
            setNavbarContent({
                home: navbarData.home || defaultNavbarContent.home,
                navabout: navbarData.navabout || defaultNavbarContent.navabout,
                navfeatures: navbarData.navfeatures || defaultNavbarContent.navfeatures,
                joinUsNav: navbarData.joinUsNav || defaultNavbarContent.joinUsNav,
                joinUsNavLink: navbarData.joinUsNavLink || defaultNavbarContent.joinUsNavLink,
                image: navbarData.image || defaultNavbarContent.image
            });
        }
    }, [navbarData]);

    useEffect(() => {
        const getImageHeight = (src) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(img.height);
            });
        };
        getImageHeight(navbarContent.image).then((height) => setImageHeight(height));
    }, [navbarContent.image]);

    const handleComponentClick = (event, identifier) => {
        event.preventDefault();
        event.stopPropagation();
        setSelectedElement(identifier);
        console.log(identifier);
        if (sections[identifier] && sections[identifier].current) {
            sections[identifier].current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleTextChange = (newText, textType) => {
        setNavbarContent(prevContent => ({
            ...prevContent,
            [textType]: newText
        }));
        updateStyle(textType, { text: newText });
        onContentChange({
            ...navbarContent,
            [textType]: newText
        });

        const walletId = sessionStorage.getItem("userAccount");
        if (walletId && selectedProjectId) {
            saveComponentData(walletId, selectedProjectId, 'navbar', { ...navbarContent, [textType]: newText });
        }
    };

    const handleLinkChange = (newLink, linkType) => {
        setNavbarContent(prevContent => ({
            ...prevContent,
            [`${linkType}Link`]: newLink
        }));
        updateStyle(linkType, { link: newLink });
    };

    const handleDoubleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    useEffect(() => {
        const cssVarName = `--navbar-background-color`;
        const storedColor = localStorage.getItem(cssVarName);

        if (storedColor) {
            setSelectedColor(storedColor);
            document.documentElement.style.setProperty(cssVarName, storedColor);
        }
    }, [setSelectedColor]);

    const navbarStyles = getComponentStyle('navbar');
    const homeStyles = getComponentStyle('home');
    const navaboutStyles = getComponentStyle('navabout');
    const featuresStyles = getComponentStyle('navfeatures');
    const joinUsStylesNav = getComponentStyle('navbar-cta');

    return (
        <div className="sss-product-navbar-container navbar-element" id='navbar' style={navbarStyles} onClick={(event) => handleComponentClick(event, 'navbar')}>
            <nav className="sss-product-navbar-navbar">
                <div className="image-container">
                    <ReusableImage
                        src={navbarContent.image}
                        alt="Navbar Logo"
                        openImagePanel={openImagePanel}
                        imageHeight={imageHeight}
                        identifier="NavbarImage"
                        handleImageUpload={(file, identifier) => handleImageUpload(file, identifier)}
                        onImageChange={(newSrc) => setNavbarContent(prevContent => ({
                            ...prevContent,
                            image: newSrc
                        }))}
                    />
                </div>
                <ul className="sss-product-navbar-links-box">
                    <li>
                        <Link className="sss-product-navbar-links" onDoubleClick={handleDoubleClick} onClick={(event) => handleComponentClick(event, 'home')}>
                            <EditableText
                                text={navbarContent.home}
                                onChange={(newText) => handleTextChange(newText, 'home')}
                                style={homeStyles}
                                id='home'
                                setSelectedColor={setSelectedColor}
                                selectedElement={selectedElement}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link className="sss-product-navbar-links" onDoubleClick={handleDoubleClick} onClick={(event) => handleComponentClick(event, 'navabout')}>
                            <EditableText
                                id='navabout'
                                text={navbarContent.navabout}
                                onChange={(newText) => handleTextChange(newText, 'navabout')}
                                style={navaboutStyles}
                                setSelectedColor={setSelectedColor}
                                selectedElement={selectedElement}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link className="sss-product-navbar-links" onClick={(event) => handleComponentClick(event, 'navfeatures')}>
                            <EditableText
                                id='navfeatures'
                                text={navbarContent.navfeatures}
                                onChange={(newText) => handleTextChange(newText, 'navfeatures')}
                                style={featuresStyles}
                                setSelectedColor={setSelectedColor}
                                selectedElement={selectedElement}
                            />
                        </Link>
                    </li>
                </ul>
                <a href={navbarContent.joinUsNavLink.url} target={navbarContent.joinUsNavLink.openInNewTab ? "_blank" : "_self"} className='position-relative' onClick={(event) => handleComponentClick(event, 'navbar-cta')}>
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
