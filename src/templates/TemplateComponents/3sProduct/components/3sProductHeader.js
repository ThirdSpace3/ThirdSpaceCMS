import React, { useState, useEffect } from 'react';
import '../css/header.css';
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import EditableButton from '../../../../components/logiciel/TemplateComponent/EditableButton';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';
import { fetchComponentData } from '../../../../hooks/Fetchprojects';

const HeaderSection = ({
  settings,
  handleSettingsChange,
  openImagePanel,
  setSelectedElement,
  setSelectedColor,
  onContentChange,
  selectedProjectId,
  isPreviewMode,
  saveSettings,
  handleImageUpload
}) => {
  const { selectedImage, selectImage } = useImageHistory();
  const { getComponentStyle, updateStyle } = useStyle();
  const [headerContent, setHeaderContent] = useState({
    heroTitle: 'The first user-friendly website builder',
    heroDescription: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    herojoinUs: 'Join Us',
    herojoinUsLink: { url: '#', openInNewTab: false },
    image: "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-hero.png?alt=media&token=44a64698-ecd8-4bca-8dea-b522c6505eed"  });

  useEffect(() => {
    const fetchData = async () => {
      if (selectedProjectId) {
        const walletId = sessionStorage.getItem("userAccount");
        if (walletId) {
          try {
            const data = await fetchComponentData(walletId, selectedProjectId, 'header');
            console.log('Fetched header data:', data); // Add this line to verify data
            if (data) {
              setHeaderContent(prev => ({
                ...prev,
                heroTitle: data.heroTitle || prev.heroTitle,
                heroDescription: data.heroDescription || prev.heroDescription,
                herojoinUs: data.herojoinUs || prev.herojoinUs,
                herojoinUsLink: data.herojoinUsLink || prev.herojoinUsLink,
                image: data.image || prev.image // Ensure the image URL is set correctly
              }));
            }
          } catch (error) {
            console.error('Error fetching header data:', error);
          }
        }
      }
    };

    fetchData();
  }, [selectedProjectId]);

  const handleTextChange = (newText, textType) => {
    setHeaderContent(prev => ({
      ...prev,
      [textType]: newText
    }));
    updateStyle(textType, { text: newText });
  };

  const handleLinkChange = (newLink) => {
    setHeaderContent(prev => ({
      ...prev,
      herojoinUsLink: { ...prev.herojoinUsLink, url: newLink }
    }));
    updateStyle('herojoinUs', { link: newLink });
  };

  const handleImageChange = (newSrc) => {
    setHeaderContent(prev => ({
      ...prev,
      image: newSrc
    }));
    selectImage(newSrc);
    onContentChange({
      ...headerContent,
      image: newSrc
    });
  };

  const handleComponentClick = (event, identifier) => {
    if (!isPreviewMode) {
      event.preventDefault();
      setSelectedElement(identifier);
    }
  };

  const headerStyle = getComponentStyle('header');
  const heroTitleStyles = getComponentStyle('heroTitle');
  const heroDescriptionStyles = getComponentStyle('heroDescription');
  const herojoinUsStyles = getComponentStyle('herojoinUs');

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
      <p className="sss-product-hero-text" onClick={(event) => handleComponentClick(event, 'heroDescription')}>
        <EditableText
          id='heroDescription'
          style={heroDescriptionStyles}
          text={headerContent.heroDescription}
          onChange={(newText) => handleTextChange(newText, 'heroDescription')}
        />
      </p>
      <a href={headerContent.herojoinUsLink.url} target={headerContent.herojoinUsLink.openInNewTab ? "_blank" : "_self"} className='position-relative' onClick={(event) => handleComponentClick(event, 'herojoinUs')}>
        <EditableButton
          id='herojoinUs'
          text={headerContent.herojoinUs}
          link={headerContent.herojoinUsLink}
          onChange={(newText) => handleTextChange(newText, 'herojoinUs')}
          onLinkChange={(newLink) => handleLinkChange(newLink.url)}
          style={herojoinUsStyles}
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
