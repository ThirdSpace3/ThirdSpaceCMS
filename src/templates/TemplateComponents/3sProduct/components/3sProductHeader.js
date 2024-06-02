import React, { useState, useEffect } from 'react';
import '../css/header.css';
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import EditableButton from '../../../../components/logiciel/TemplateComponent/EditableButton';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';

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
    herojoinUs: localStorage.getItem('header-header-cta-text') || 'Join Us',
    herojoinUsLink: JSON.parse(localStorage.getItem('header-joinUs-link')) || { url: '#', openInNewTab: false },
    image: localStorage.getItem('header-image') || "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-hero.png?alt=media&token=44a64698-ecd8-4bca-8dea-b522c6505eed"
  });

  const headerStyle = getComponentStyle('header');
  const heroTitleStyles = getComponentStyle('heroTitle');
  const heroDescriptionStyles = getComponentStyle('heroDescription');
  const herojoinUsStyles = getComponentStyle('header-cta');
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
      <h1 className="sss-product-hero-title" onClick={(event) => handleComponentClick(event, 'heroTitle')}>
        <EditableText
         id='heroTitle'
         style={heroTitleStyles}
          text={headerContent.heroTitle}
          onChange={(newText) => handleTextChange(newText, 'heroTitle')}
        />
      </h1>
      <p className="sss-product-hero-text"onClick={(event) => handleComponentClick(event, 'heroDescription')}>
        <EditableText
         id='heroDescription' 
         style={heroDescriptionStyles}
          text={headerContent.heroDescription}
          onChange={(newText) => handleTextChange(newText, 'heroDescription')}
        />
      </p>
      <a  href={headerContent.herojoinUsLink.url} target={headerContent.herojoinUsLink.openInNewTab ? "_blank" : "_self"} className='position-relative' onClick={(event) => handleComponentClick(event, 'header-cta')}>
        <EditableButton
          id='header-cta'
          text={headerContent.herojoinUs}
          link={headerContent.herojoinUsLink}
          onChange={(newText) => handleTextChange(newText, 'header-cta')}
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
