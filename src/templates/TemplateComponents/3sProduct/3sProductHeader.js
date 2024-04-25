import React, { useState, useEffect } from 'react';
import '../../templates-po/header.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const HeaderSection = ({
  style, settings, handleSettingsChange, openImagePanel, setSelectedElement
}) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();

  const [heroTitleText, setHeroTitleText] = useState('The first user-friendly website builder');
  const [heroDescriptionText, setHeroDescriptionText] = useState('Lorem ipsum dolor sit amet, consectetur...');
  const [joinUsText, setJoinUsText] = useState('Join Us');
  const [headerImage, setHeaderImage] = useState("./images/templates-img/3sproduct/3sproduct-hero.png");
  const [menuToggleImg, setMenuToggleImg] = useState("path/to/menu/toggle/image");
  const { getComponentStyle, updateStyle } = useStyle();
  const headerStyle = getComponentStyle('header');

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

  useEffect(() => {
    updateStyle(settings);
  }, [settings]);

 
  // Ensure the header image updates to the selected image when this component is active
  useEffect(() => {
    if (activeComponent === 'HeaderSection' && selectedImage && selectedImage !== headerImage) {
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

  // This function now will ensure image change only when this component is active
  const handleNewImageSrc = (newSrc) => {
    if (activeComponent === 'HeaderSection') {
      selectImage(newSrc);
    }
  };

  useEffect(() => {
    console.log(`Component: HeaderSection, Active: ${activeComponent}, Image: ${selectedImage}`);
    if (activeComponent === 'HeaderSection' && selectedImage) {
        setHeaderImage(selectedImage);
    }
  }, [selectedImage, activeComponent]);


  const handleHeaderClick = () => {
    console.log("Header clicked, setting selected element to 'header'");
    setSelectedElement('header');
  };

  useEffect(() => {
    const headerElement = document.querySelector('.sss-product-hero');
    if (headerElement) {
      headerElement.addEventListener('click', handleHeaderClick);
    }
    return () => {
      if (headerElement) {
        headerElement.removeEventListener('click', handleHeaderClick);
      }
    };
  }, []);

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
        onClick={() => enterReplacementMode('HeaderSection')}
        openImagePanel={openImagePanel}
        onImageChange={handleNewImageSrc}
        identifier="HeaderSection"
        imageHeight={imageHeight}

      />

    </div>
  );
};

export default HeaderSection;
