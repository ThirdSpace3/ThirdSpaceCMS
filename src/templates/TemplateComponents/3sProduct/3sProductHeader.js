import React, { useState, useEffect } from 'react';
import '../../templates-po/header.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const HeaderSection = ({
  style, settings = { textStyles: {} }, handleSettingsChange, openImagePanel, setSelectedElement
}) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();

  const [heroTitleText, setHeroTitleText] = useState('The first user-friendly website builder');
  const [heroDescriptionText, setHeroDescriptionText] = useState('Lorem ipsum dolor sit amet, consectetur...');
  const [joinUsText, setJoinUsText] = useState('Join Us');
  const [headerImage, setHeaderImage] = useState("./images/templates-img/3sproduct/3sproduct-hero.png");
  const [menuToggleImg, setMenuToggleImg] = useState("path/to/menu/toggle/image");
  const { getComponentStyle, globalStyle, updateStyle } = useStyle();
  const headerStyle = getComponentStyle('header');
  const heroTitleStyles = getComponentStyle('HeroTitle');
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
    updateStyle(textType, { text: newText }); // Directly use the textType as the component key
    console.log(`Requested style update for ${textType}`);

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

  const handleComponentClick = (event, identifier) => {
    event.preventDefault(); // This will prevent the default action of the anchor tag
    event.stopPropagation(); // Stop the event from propagating up
    console.log(`${identifier} clicked, setting selected element to '${identifier}'`);
    setSelectedElement(identifier);
};

  return (
    <div className="sss-product-hero" style={{ ...style, ...settings.header }} id='header' onClick={(event) => handleComponentClick(event, 'header')}>

<h1 className="sss-product-hero-title"  id='heroTitle' onClick={(event) => handleComponentClick(event, 'heroTitle')} >
    <EditableText
        text={heroTitleText}
        onChange={(newText) => handleTextChange(newText, 'heroTitle')}
        style={{ ...heroTitleStyles }}
    />
</h1>

      <p className="sss-product-hero-text" id='heroDescription' onClick={(event) => handleComponentClick(event, 'heroDescription')} >
        <EditableText
          text={heroDescriptionText}
          onChange={(newText) => handleTextChange(newText, 'heroDescription')}
          style={{ ...heroDescriptionStyles }}

        />
      </p>
      <a href="#" id='herojoinUs' className="sss-product-hero-cta" onClick={(event) => handleComponentClick(event, 'joinUs')}>
        <EditableText
          text={joinUsText}
          onChange={(newText) => handleTextChange(newText, 'joinUs')}
          style={{ ...herojoinUsStyles }}
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
        selectImage={handleComponentClick} // Pass the handleComponentClick function
      />

    </div>
  );
};

export default HeaderSection;
