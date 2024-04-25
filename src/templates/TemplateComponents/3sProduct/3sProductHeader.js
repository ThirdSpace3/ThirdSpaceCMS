import React, { useState, useEffect } from 'react';
import '../../templates-po/header.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const HeaderSection = ({
  style, settings, handleSettingsChange, openImagePanel
}) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();

  const [heroTitleText, setHeroTitleText] = useState('The first user-friendly website builder');
  const [heroDescriptionText, setHeroDescriptionText] = useState('Lorem ipsum dolor sit amet, consectetur...');
  const [joinUsText, setJoinUsText] = useState('Join Us');
  const [headerImage, setHeaderImage] = useState("./images/templates-img/3sproduct/3sproduct-hero.png");
  const { getComponentStyle, updateStyle } = useStyle();
  const headerStyle = getComponentStyle('header');

  useEffect(() => {
    updateStyle(settings);
  }, [settings]);

  useEffect(() => {
    if (activeComponent === 'HeaderSection' && selectedImage !== headerImage) {
      setHeaderImage(selectedImage);
    }
  }, [selectedImage, activeComponent, headerImage]);

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

  const handleImageClick = () => {
    enterReplacementMode('HeaderSection');
  };

  const handleNewImageSrc = (newSrc) => {
    if (activeComponent === 'HeaderSection') {
      selectImage(newSrc);
    }
  };

  return (
    <div className="sss-product-hero" style={{ ...style, ...settings.header }}>
      
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
      <ReusableImage
        src={headerImage}
        alt="Hero Image"
        onClick={handleImageClick}
        openImagePanel={openImagePanel}
        onImageChange={handleNewImageSrc}
      />
    </div>
  );
};

export default HeaderSection;
