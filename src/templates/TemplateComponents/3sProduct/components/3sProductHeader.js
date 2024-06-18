import React, { useState, useEffect } from 'react';
import '../css/header.css';
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import EditableButton from '../../../../components/logiciel/TemplateComponent/EditableButton';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';
import { fetchComponentData, saveComponentData } from '../../../../hooks/Fetchprojects';

const HeaderSection = ({
  settings,
  handleSettingsChange,
  openImagePanel,
  setSelectedElement,
  setSelectedColor,
  onContentChange,
  selectedProjectId,
  isPreviewMode,
  saveSettings
}) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();
  const { style, getComponentStyle, updateStyle } = useStyle();
  const [headerContent, setHeaderContent] = useState({
    heroTitle: 'The first user-friendly website builder',
    heroDescription: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    herojoinUs: 'Join Us',
    herojoinUsLink: { url: '#', openInNewTab: false },
    image: "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-hero.png?alt=media&token=44a64698-ecd8-4bca-8dea-b522c6505eed"
  });

  useEffect(() => {
    const fetchData = async () => {
      if (selectedProjectId) {
        const walletId = sessionStorage.getItem("userAccount");
        if (walletId) {
          try {
            console.log('Fetching data for project:', selectedProjectId);
            const data = await fetchComponentData(walletId, selectedProjectId, 'header');
            if (data) {
              console.log('Fetched data:', data);
              setHeaderContent(data);
            } else {
              console.log('No data found for header');
            }
          } catch (error) {
            console.error('Error fetching header data:', error);
          }
        } else {
          console.log('No walletId found in sessionStorage');
        }
      } else {
        console.log('No selectedProjectId provided');
      }
    };

    fetchData();
  }, [selectedProjectId]);

  useEffect(() => {
    if (onContentChange) {
      onContentChange(headerContent);
    }
  }, [headerContent, onContentChange]);

  const headerStyle = getComponentStyle('header');
  const heroTitleStyles = getComponentStyle('heroTitle');
  const heroDescriptionStyles = getComponentStyle('heroDescription');
  const herojoinUsStyles = getComponentStyle('herojoinUs');
  const [imageHeight, setImageHeight] = useState(null);

  const handleImageUpload = (file, identifier) => {
    const updatedContent = {
      ...headerContent,
      imageFile: file
    };
    setHeaderContent(updatedContent);
    console.log('Image file added to headerContent:', file);
  };

  const handleTextChange = async (newText, textType) => {
    const updatedContent = {
      ...headerContent,
      [textType]: newText
    };
    setHeaderContent(updatedContent);
    updateStyle(textType, { text: newText });

    const walletId = sessionStorage.getItem("userAccount");
    if (walletId && selectedProjectId) {
      await saveComponentData(walletId, selectedProjectId, 'header', updatedContent);
      console.log(`Saved new text for ${textType}:`, newText);
    }
  };

  const handleLinkChange = async (newLink) => {
    const updatedContent = {
      ...headerContent,
      herojoinUsLink: { ...headerContent.herojoinUsLink, url: newLink }
    };
    setHeaderContent(updatedContent);
    updateStyle('herojoinUs', { link: newLink });

    const walletId = sessionStorage.getItem("userAccount");
    if (walletId && selectedProjectId) {
      await saveComponentData(walletId, selectedProjectId, 'header', updatedContent);
      console.log('Saved new join us link:', newLink);
    }
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
        onClick={enterReplacementMode}
        openImagePanel={openImagePanel}
        identifier="HeaderSection"
        imageHeight={imageHeight}
        selectImage={selectImage}
        handleImageUpload={handleImageUpload}  // Pass the image upload handler
      />
    </div>
  );
};

export default HeaderSection;
