import React, { useState, useEffect } from 'react';
import '../../templates-po/header.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const HeaderSection = ({
  settings,
  handleSettingsChange,
  openImagePanel,
  setSelectedElement,
  setSelectedColor,
  
}) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();

  const [heroTitleText, setHeroTitleText] = useState(() => localStorage.getItem('header-heroTitle-text') || 'The first user-friendly website builder');
  const [heroDescriptionText, setHeroDescriptionText] = useState(() => localStorage.getItem('header-heroDescription-text') || 'Rorem ipsum dolor sit amet consectetur. Gravida convallis orci ultrices non. Ultricies tempor at ut cursus mi. Aliquam sed amet vitae orci ac penatibus consectetur.');
  const [joinUsText, setJoinUsText] = useState(() => localStorage.getItem('header-joinUs-text') || 'Join Us');
  const [headerImage, setHeaderImage] = useState("./images/templates-img/3sproduct/3sproduct-hero.png");
  const [menuToggleImg, setMenuToggleImg] = useState("path/to/menu/toggle/image");

  const { style, getComponentStyle, updateStyle } = useStyle();
  const headerStyle = getComponentStyle('header');
  const heroTitleStyles = getComponentStyle('heroTitle');
  const heroDescriptionStyles = getComponentStyle('heroDescription');
  const herojoinUsStyles = getComponentStyle('herojoinUs');

  const [imageHeight, setImageHeight] = useState(null);
  const getImageHeight = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img.height);
    });
  };
  useEffect(() => {
    getImageHeight(headerImage).then((height) => setImageHeight(height));
  }, []);

  const handleTextChange = (newText, textType) => {
    console.log(`Updating text for ${textType}: ${newText}`);
    console.log(`Current styles for ${textType}:`, getComponentStyle(textType));

    switch (textType) {
      case 'heroTitle':
        setHeroTitleText(newText);
        break;
      case 'heroDescription':
        setHeroDescriptionText(newText);
        break;
      case 'joinUs':
        setJoinUsText(newText);
        break;
      default:
        break;
    }
    updateStyle(textType, { text: newText });
    localStorage.setItem(`header-${textType}-text`, newText);

    console.log(`Requested style update for ${textType}`);
  };

  const handleComponentClick = (event, identifier) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(`${identifier} clicked, setting selected element to '${identifier}'`);
    setSelectedElement(identifier);
  };
  useEffect(() => {
    // This useEffect could also manage theme colors or other properties.
    const cssVarName = `--header-background-color`;
    const storedColor = localStorage.getItem(cssVarName);
    if (storedColor) {
      setSelectedColor(storedColor);
      document.documentElement.style.setProperty(cssVarName, storedColor);
    }
  }, [setSelectedColor]);
  

  return (
    <div className="sss-product-hero" style={headerStyle} id='header' onClick={(event) => handleComponentClick(event, 'header')}>
      <h1 className="sss-product-hero-title" id='heroTitle' onClick={(event) => handleComponentClick(event, 'heroTitle')} style={heroTitleStyles}>
        <EditableText
          text={heroTitleText}
          onChange={(newText) => handleTextChange(newText, 'heroTitle')}
          
        />
      </h1>
      <p className="sss-product-hero-text" id='heroDescription' onClick={(event) => handleComponentClick(event, 'heroDescription')}>
        <EditableText
          text={heroDescriptionText}
          onChange={(newText) => handleTextChange(newText, 'heroDescription')}
          style={heroDescriptionStyles}
        />
      </p>
      <a href="#" id='herojoinUs' className="sss-product-hero-cta" onClick={(event) => handleComponentClick(event, 'joinUs')}>
        <EditableText
          text={joinUsText}
          onChange={(newText) => handleTextChange(newText, 'joinUs')}
          style={herojoinUsStyles}
        />
      </a>
      <ReusableImage
        src={headerImage}
        alt="Hero Image"
        onClick={() => enterReplacementMode('HeaderSection')}
        openImagePanel={openImagePanel}
        identifier="HeaderSection"
        imageHeight={imageHeight}
        selectImage={handleComponentClick}
      />
    </div>
  );
};

export default HeaderSection;
