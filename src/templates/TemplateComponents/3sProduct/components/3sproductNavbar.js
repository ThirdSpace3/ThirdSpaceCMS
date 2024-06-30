import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';
import EditableButton from '../../../../components/logiciel/TemplateComponent/EditableButton';
import { fetchComponentData } from '../../../../hooks/Fetchprojects';
import '../css/navbar.css';

const Navbar = ({
    openImagePanel,
    setSelectedElement,
    setSelectedColor,
    onContentChange,
    sections,
    selectedProjectId,
    handleImageUpload
}) => {
    const { selectedImage, enterReplacementMode } = useImageHistory();
    const [navbarContent, setNavbarContent] = useState({
        home: 'Home',
        navabout: 'About',
        navfeatures: 'Features',
        joinUsNav: 'Join Us',
        joinUsNavLink: { url: '#', openInNewTab: false },
        image: ''
    });

    const [imageHeight, setImageHeight] = useState(null);

    const { updateStyle, getComponentStyle } = useStyle();
    const navbarStyles = getComponentStyle('navbar');
    const homeStyles = getComponentStyle('home');
    const navaboutStyles = getComponentStyle('navabout');
    const featuresStyles = getComponentStyle('navfeatures');
    const joinUsStylesNav = getComponentStyle('navbar-cta');

    useEffect(() => {
        const fetchData = async () => {
            if (selectedProjectId) {
                const walletId = sessionStorage.getItem("userAccount");
                if (walletId) {
                    try {
                        const data = await fetchComponentData(walletId, selectedProjectId, 'navbar');
                        console.log('Fetched navbar data:', data); // Debug log
                        if (data) {
                            setNavbarContent({
                                home: data.home || 'Home',
                                navabout: data.navabout || 'About',
                                navfeatures: data.navfeatures || 'Features',
                                joinUsNav: data.joinUsNav || 'Join Us',
                                joinUsNavLink: data.joinUsNavLink || { url: '#', openInNewTab: false },
                                image: data.image || ''
                            });
                        }
                    } catch (error) {
                        console.error('Error fetching navbar data:', error);
                    }
                }
            }
        };

        fetchData();
    }, [selectedProjectId]);

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
