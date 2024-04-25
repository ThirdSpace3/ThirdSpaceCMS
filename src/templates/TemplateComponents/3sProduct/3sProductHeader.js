import React, { useState, useRef, useEffect } from 'react';
import '../../templates-po/header.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';

const HeaderSection = ({
  onClick, style, settings, handleSettingsChange, selectElement, openImagePanel, selectedImage
}) => {
  const headerRef = useRef(null);
  const { getComponentStyle, updateStyle } = useStyle();
  const [heroTitleText, setHeroTitleText] = useState('The first user-friendly website builder');
  const [heroDescriptionText, setHeroDescriptionText] = useState('Lorem ipsum dolor sit amet, consectetur...');
  const [joinUsText, setJoinUsText] = useState('Join Us');
  const [imageHeight, setImageHeight] = useState(null);

  const headerStyle = getComponentStyle('header');

  useEffect(() => {
    updateStyle(settings);
  }, [settings]);

  const handleTextChange = (newText, textType) => {
    switch (textType) {
      case 'title':
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
  };

  const getImageHeight = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img.height);
    });
  };

  useEffect(() => {
    getImageHeight(selectedImage || "./images/templates-img/3sproduct/3sproduct-hero.png").then(height => setImageHeight(height));
  }, [selectedImage]);

  return (
    <div className="sss-product-hero" ref={headerRef} onClick={onClick} style={{ ...style, ...settings.header }}>
      <ReusableImage
        src={selectedImage || "./images/templates-img/3sproduct/3sproduct-hero.png"}
        alt="Hero Image"
        openImagePanel={openImagePanel}
        imageHeight={imageHeight}
        selectElement={selectElement}
      />
      <h1 className="sss-product-hero-title">
        <EditableText
          text={heroTitleText}
          onChange={(newText) => handleTextChange(newText, 'title')}
          style={{...headerStyle, ...settings.textStyles?.heroTitleText}}
          selectElement={selectElement}
        />
      </h1>
      <p className="sss-product-hero-text">
        <EditableText
          text={heroDescriptionText}
          onChange={(newText) => handleTextChange(newText, 'description')}
          style={{...headerStyle, ...settings.textStyles?.heroDescriptionText}}
          selectElement={selectElement}
        />
      </p>
      <a href="/join-us" className="sss-product-hero-cta">
        <EditableText
          text={joinUsText}
          onChange={(newText) => handleTextChange(newText, 'joinUs')}
          style={settings.textStyles?.joinUsText}
          selectElement={selectElement}
        />
      </a>
    </div>
  );
};

export default HeaderSection;
