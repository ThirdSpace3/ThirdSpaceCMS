import React, { useState, useRef, useEffect } from 'react';
import '../../templates-po/header.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';

const HeaderSection = ({
  style, settings, handleSettingsChange, openImagePanel
}) => {
  const [heroTitleText, setHeroTitleText] = useState('The first user-friendly website builder');
  const [heroDescriptionText, setHeroDescriptionText] = useState('Lorem ipsum dolor sit amet, consectetur...');
  const [joinUsText, setJoinUsText] = useState('Join Us');
  const [imageHeight, setImageHeight] = useState(null);
  const { getComponentStyle, updateStyle } = useStyle();
  const headerStyle = getComponentStyle('header');
  const [headerImage, setHeaderImage] = useState("./images/templates-img/3sproduct/3sproduct-hero.png");

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
    }
  };

  const handleImageChange = (newImageUrl) => {
    setHeaderImage(newImageUrl);
  };
  const handleNewImageSrc = (newSrc) => {
    setHeaderImage(newSrc);
  };
  useEffect(() => {
    const img = new Image();
    img.src = headerImage;
    img.onload = () => setImageHeight(img.height);
  }, [headerImage])
  const getImageHeight = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img.height);
    });
  };

  useEffect(() => {
    getImageHeight(headerImage).then(height => setImageHeight(height));
  }, [headerImage]);

  return (
    <div className="sss-product-hero" style={{ ...style, ...settings.header }}>
      <ReusableImage
        src={headerImage}
        alt="Hero Image"
        openImagePanel={openImagePanel}
        imageHeight={imageHeight}
        onImageChange={handleNewImageSrc}
      />
      <h1 className="sss-product-hero-title">
        <EditableText
          text={heroTitleText}
          onChange={(newText) => handleTextChange(newText, 'title')}
          style={{ ...headerStyle, ...settings.textStyles?.heroTitleText }}
        />
      </h1>
      <p className="sss-product-hero-text">
        <EditableText
          text={heroDescriptionText}
          onChange={(newText) => handleTextChange(newText, 'description')}
          style={{ ...headerStyle, ...settings.textStyles?.heroDescriptionText }}
        />
      </p>
      <a href="/join-us" className="sss-product-hero-cta">
        <EditableText
          text={joinUsText}
          onChange={(newText) => handleTextChange(newText, 'joinUs')}
          style={settings.textStyles?.joinUsText}
        />
      </a>
    </div>
  );
};

export default HeaderSection;
