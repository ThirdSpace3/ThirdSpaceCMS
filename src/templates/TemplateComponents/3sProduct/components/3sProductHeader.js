import React, { useState, useEffect } from 'react';
import '../css/header.css';
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import EditableButton from '../../../../components/logiciel/TemplateComponent/EditableButton';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';

const HeaderSection = ({
  handleSettingsChange,
  openImagePanel,
  setSelectedElement,
  setSelectedColor,
  onContentChange,
  selectedProjectId,
  isPreviewMode,
  saveSettings,
  handleImageUpload,
  headerData = {heroTitle: '', heroDescription: '',herojoinUs:'', herojoinUsLink: { url: '#', openInNewTab: false }, image: [] }
}) => {
  const { selectedImage, selectImage } = useImageHistory();
  const { getComponentStyle, updateStyle } = useStyle();

  const defaultHeaderContent = {
    heroTitle: 'The first user-friendly website builder',
    heroDescription: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    herojoinUs: 'Join Us',
    herojoinUsLink: { url: '#', openInNewTab: false },
    image: "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-hero.png?alt=media&token=44a64698-ecd8-4bca-8dea-b522c6505eed"
  };

  const [headerContent, setHeaderContent] = useState(defaultHeaderContent);

  useEffect(() => {
    if (headerData) {
      setHeaderContent({
        ...defaultHeaderContent,
        ...headerData.content,
      });
    }
  }, [headerData]);

  const headerStyles = getComponentStyle('header');
  const heroTitleStyles = getComponentStyle('heroTitle');
  const heroDescriptionStyles = getComponentStyle('heroDescription');
  const herojoinUsStyles = getComponentStyle('herojoinUs');

  const handleTextChange = (newText, textType) => {
    const updatedContent = { ...headerContent, [textType]: newText };
    setHeaderContent(updatedContent);
    console.log('Updated Content:', updatedContent); // Debug
    onContentChange('header', { content: updatedContent });
  
    // Update style context
    updateStyle(textType, { text: newText });
    console.log('Updated Style:', getComponentStyle(textType)); // Debug
  
    // Save settings
    saveSettings();
  };
  

  const handleLinkChange = (newLink) => {
    const updatedContent = { ...headerContent, herojoinUsLink: { ...headerContent.herojoinUsLink, url: newLink } };
    setHeaderContent(updatedContent);
    onContentChange('header', { content: updatedContent });

    // Update style context
    updateStyle('herojoinUs', { link: newLink });

    // Save settings
    saveSettings();
  };

  const handleImageChange = (newSrc) => {
    const updatedContent = { ...headerContent, image: newSrc };
    setHeaderContent(updatedContent);
    selectImage(newSrc);
    onContentChange('header', { content: updatedContent });

    // Save settings
    saveSettings();
  };

  const handleComponentClick = (event, identifier) => {
    if (!isPreviewMode) {
      event.stopPropagation();
      event.preventDefault();
      setSelectedElement(identifier);
    }
  };

  useEffect(() => {
    const cssVarName = '--header-background-color';
    const storedColor = localStorage.getItem(cssVarName);

    if (storedColor) {
      setSelectedColor(storedColor);
      document.documentElement.style.setProperty(cssVarName, storedColor);
    }
  }, [setSelectedColor]);

  return (
    <div className="sss-product-hero" style={{ ...headerStyles }} id='header' onClick={(event) => handleComponentClick(event, 'header')}>
      <h1 className="sss-product-hero-title" id='heroTitle' onClick={(event) => handleComponentClick(event, 'heroTitle')}>
        <EditableText
          text={headerContent.heroTitle}
          onChange={(newText) => handleTextChange(newText, 'heroTitle')}
          style={{ ...heroTitleStyles }}
        />
      </h1>
      <p className="sss-product-hero-text" id='heroDescription' onClick={(event) => handleComponentClick(event, 'heroDescription')}>
        <EditableText
          text={headerContent.heroDescription}
          onChange={(newText) => handleTextChange(newText, 'heroDescription')}
          style={{ ...heroDescriptionStyles }}
        />
      </p>
      <a href={headerContent.herojoinUsLink.url} id='herojoinUs' target={headerContent.herojoinUsLink.openInNewTab ? "_blank" : "_self"} className='position-relative' onClick={(event) => handleComponentClick(event, 'herojoinUs')}>
        <EditableButton
          text={headerContent.herojoinUs}
          link={headerContent.herojoinUsLink}
          onChange={(newText) => handleTextChange(newText, 'herojoinUs')}
          onLinkChange={(newLink) => handleLinkChange(newLink.url)}
          style={{ ...herojoinUsStyles }}
          className="sss-product-hero-cta"
        />
      </a>
      <ReusableImage
        src={headerContent.image}
        alt="Hero Image"
        openImagePanel={openImagePanel}
        identifier="HeaderImage"
        handleImageUpload={handleImageUpload}
        onImageChange={handleImageChange}
      />
    </div>
  );
};

export default HeaderSection;