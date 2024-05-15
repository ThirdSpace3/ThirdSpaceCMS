import React, { useState, useEffect } from 'react';
import '../../templates-po/header.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import EditableButton from '../../../components/logiciel/TemplateComponent/EditableButton';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const HeaderSection = ({
  settings,
  handleSettingsChange,
  openImagePanel,
  setSelectedElement,
  setSelectedColor,
  onContentChange,
}) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();
  const { style, getComponentStyle, updateStyle } = useStyle();

  const [headerContent, setHeaderContent] = useState({
    heroTitle: localStorage.getItem('header-heroTitle-text') || 'The first user-friendly website builder',
    heroDescription: localStorage.getItem('header-heroDescription-text') || 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    herojoinUs: localStorage.getItem('header-joinUs-text') || 'Join Us',
    herojoinUsLink: JSON.parse(localStorage.getItem('header-joinUs-link')) || { url: '#', openInNewTab: false },
    image: localStorage.getItem('header-image') || "./images/templates-img/3sproduct/3sproduct-hero.png"
  });

  const headerStyle = getComponentStyle('header');
  const heroTitleStyles = getComponentStyle('heroTitle');
  const heroDescriptionStyles = getComponentStyle('heroDescription');
  const herojoinUsStyles = getComponentStyle('herojoinUs');
  const [imageHeight, setImageHeight] = useState(null);

  const handleTextChange = (newText, textType) => {
    setHeaderContent(prevContent => ({
      ...prevContent,
      [textType]: newText
    }));
    localStorage.setItem(`header-${textType}-text`, newText);
    updateStyle(textType, { text: newText });
    onContentChange({
      ...headerContent,
      [textType]: newText
    });
  };

  const handleLinkChange = (newLink) => {
    setHeaderContent(prevContent => ({
      ...prevContent,
      herojoinUsLink: newLink
    }));
    localStorage.setItem('header-joinUs-link', JSON.stringify(newLink));
    updateStyle('herojoinUs', { link: newLink });
  };

  const handleComponentClick = (event, identifier) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedElement(identifier);
  };

  return (
    <div className="sss-product-hero" style={headerStyle} id='header' onClick={(event) => handleComponentClick(event, 'header')}>
      <h1 className="sss-product-hero-title" id='heroTitle' onClick={(event) => handleComponentClick(event, 'heroTitle')} style={heroTitleStyles}>
        <EditableText
          text={headerContent.heroTitle}
          onChange={(newText) => handleTextChange(newText, 'heroTitle')}
        />
      </h1>
      <p className="sss-product-hero-text" id='heroDescription' onClick={(event) => handleComponentClick(event, 'heroDescription')} style={heroDescriptionStyles}>
        <EditableText
          text={headerContent.heroDescription}
          onChange={(newText) => handleTextChange(newText, 'heroDescription')}
        />
      </p>
      <a href={headerContent.herojoinUsLink.url} target={headerContent.herojoinUsLink.openInNewTab ? "_blank" : "_self"} onClick={(event) => handleComponentClick(event, 'herojoinUs')}>
        <EditableButton
          id='herojoinUs'
          text={headerContent.herojoinUs}
          link={headerContent.herojoinUsLink}
          onChange={(newText) => handleTextChange(newText, 'herojoinUs')}
          onLinkChange={handleLinkChange}
          style={herojoinUsStyles}
          className="sss-product-hero-cta"
        />
      </a>
      <ReusableImage
        src={headerContent.image}
        alt="Hero Image"
        onClick={enterReplacementMode}
        openImagePanel={openImagePanel}
        identifier="HeaderSection"
        imageHeight={imageHeight}
        selectImage={selectImage}
      />
    </div>
  );
};

export default HeaderSection;
