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
  isPreviewMode
}) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();

  const [heroTitleText, setHeroTitleText] = useState('The first user-friendly website builder');
  const [heroDescriptionText, setHeroDescriptionText] = useState('Lorem ipsum dolor sit amet, consectetur...');
  const [joinUsText, setJoinUsText] = useState('Join Us');
  const [headerImage, setHeaderImage] = useState("./images/templates-img/3sproduct/3sproduct-hero.png");
  const [menuToggleImg, setMenuToggleImg] = useState("path/to/menu/toggle/image");

  const { style, getComponentStyle, updateStyle } = useStyle();
  const headerStyle = getComponentStyle('header');
  const heroTitleStyles = getComponentStyle('heroTitle');
  const heroDescriptionStyles = getComponentStyle('heroDescription');
  const heroJoinUsStyles = getComponentStyle('herojoinUs');

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
      case 'description':
        setHeroDescriptionText(newText);
        break;
      case 'joinUs':
        setJoinUsText(newText);
        break;
      default:
        break;
    }
    updateStyle(textType, { text: newText });
    console.log(`Requested style update for ${textType}`);
  };

  const handleComponentClick = (event, identifier) => {
    if (isPreviewMode) {
      event.preventDefault(); // Prevent default action
      
      return; // Stop further processing
    }
    event.preventDefault();
    event.stopPropagation();
    console.log(`${identifier} clicked, setting selected element to '${identifier}'`);
    setSelectedElement(identifier);
  };

  return (
    <div className="sss-product-hero" style={headerStyle} id='header'  onClick={(event) => handleComponentClick(event, 'header')}>
      <h1 className="sss-product-hero-title" style={heroTitleStyles} id='heroTitle' onClick={(event) => handleComponentClick(event, 'heroTitle')}>
        {isPreviewMode ? heroTitleText : (
          <EditableText
            text={heroTitleText}
            onChange={(newText) => setHeroTitleText(newText)}
          />
        )}
      </h1>
      <p className="sss-product-hero-text" style={heroDescriptionStyles}>
        {isPreviewMode ? heroDescriptionText : (
          <EditableText
            text={heroDescriptionText}
            onChange={(newText) => setHeroDescriptionText(newText)}
          />
        )}
      </p>
      <a href="#" className="sss-product-hero-cta" style={heroJoinUsStyles}>
        {isPreviewMode ? joinUsText : (
          <EditableText
            text={joinUsText}
            onChange={(newText) => setJoinUsText(newText)}
          />
        )}
      </a>
      {isPreviewMode ? (
        <img src={headerImage} alt="Hero Image" style={{ height: imageHeight }} />
      ) : (
        <ReusableImage
          src={headerImage}
          alt="Hero Image"
          onClick={() => enterReplacementMode('HeaderSection')}
          openImagePanel={openImagePanel}
          imageHeight={imageHeight}
          selectImage={selectImage}
          identifier="HeaderSection"
        />
      )}
    </div>
  );
};

export default HeaderSection;