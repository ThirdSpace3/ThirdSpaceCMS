import React, { useState, useEffect } from 'react';
import '../../templates-po/about.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const AboutSection = ({
  handleSettingsChange, settings, openImagePanel, setSelectedElement, setSelectedColor, onContentChange }) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();
  const { getComponentStyle, updateStyle } = useStyle();

  const [aboutImages, setAboutImages] = useState(Array(6).fill().map((_, i) => `./images/templates-img/3sproduct/3sproduct-about-${i + 1}.png`));
  // Initialize feature titles and descriptions with unique placeholder texts for each card
  const [aboutTitleText, setAboutTitleText] = useState(localStorage.getItem('about-title-text') || 'The best features to help you create all your projects');
  const [aboutDescriptionText, setAboutDescriptionText] = useState(localStorage.getItem('about-description-text') || 'Apsum dolor sit amet consectetur...');
  
  const [featureTitles, setFeatureTitles] = useState(
    Array(6).fill().map((_, i) => localStorage.getItem(`feature-title-${i}`) || `Feature Title ${i + 1}`)
  );
  const [featureDescriptions, setFeatureDescriptions] = useState(
    Array(6).fill().map((_, i) => localStorage.getItem(`feature-description-${i}`) || 'Feature description for item ' + (i + 1))
  );
  
  const aboutStyles = getComponentStyle('about');
  const aboutTitleStyle = getComponentStyle('title');
  const aboutDescriptionStyles = getComponentStyle('description');
  const featureTitlesStyles = getComponentStyle('featureTitles');
  const featureDescriptionsStyles = getComponentStyle('featureDescriptions');
  // Initialize styles for each feature card
  const [featureTitleStyles, setFeatureTitleStyles] = useState(Array(6).fill().map(() => ({ featureTitlesStyles })));
  const [featureDescriptionStyles, setFeatureDescriptionStyles] = useState(Array(6).fill().map(() => ({ featureDescriptionsStyles })));

  const [imageHeight, setImageHeight] = useState(null);
  const getImageHeight = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img.height);
    });
  };
  useEffect(() => {
    getImageHeight(`./images/templates-img/3sproduct/3sproduct-about-1.png`).then((height) => setImageHeight(height));
  }, []);


  const handleComponentClick = (event, identifier, index = null) => {
    event.preventDefault();
    event.stopPropagation();
    if (!identifier) {
      console.error("Identifier is missing for handleComponentClick");
      return;
    }
    const elementID = index !== null ? `${identifier}-${index}` : identifier;
    console.log(`${identifier} at index ${index} clicked, setting selected element to '${elementID}'`);
    setSelectedElement(elementID);
  };


  const handleTextChange = (newText, identifier, index = null) => {
    if (identifier === 'title') {
      setAboutTitleText(newText);
      localStorage.setItem('about-title-text', newText);
    } else if (identifier === 'description') {
      setAboutDescriptionText(newText);
      localStorage.setItem('about-description-text', newText);
    } else if (identifier === 'featureTitle' && index !== null) {
      setFeatureTitles(currentTitles => {
        const updatedTitles = [...currentTitles];
        updatedTitles[index] = newText;
        localStorage.setItem(`feature-title-${index}`, newText);
        return updatedTitles;
      });
    } else if (identifier === 'featureDescription' && index !== null) {
      setFeatureDescriptions(currentDescriptions => {
        const updatedDescriptions = [...currentDescriptions];
        updatedDescriptions[index] = newText;
        localStorage.setItem(`feature-description-${index}`, newText);
        return updatedDescriptions;
      });
    }
    updateStyle(identifier, { text: newText });
  };
  


  useEffect(() => {
    const cssVarName = `--about-background-color`;
    const storedColor = localStorage.getItem(cssVarName);
    
    if (storedColor) {
      setSelectedColor(storedColor);
      document.documentElement.style.setProperty(cssVarName, storedColor);
    }
  }, [setSelectedColor]);

  useEffect(() => {
    // Propagate changes to parent component
    onContentChange({
      title: aboutTitleText,
      description: aboutDescriptionText,
      images: aboutImages,
      features: featureTitles.map((title, i) => ({ title, description: featureDescriptions[i] }))
    });
  }, [aboutTitleText, aboutDescriptionText, aboutImages, featureTitles, featureDescriptions, onContentChange]);


  return (
    <div className="sss-product-about" style={{ ...aboutStyles}} id='about' onClick={(event) => handleComponentClick(event, 'about')}>
      <div className="sss-product-about-header">
        <h2 className="sss-product-about-title" id='title' onClick={(event) => handleComponentClick(event, 'title')} >
          <EditableText
            text={aboutTitleText}
            onChange={(text) => handleTextChange(text, 'title')}
            style={{ ...aboutTitleStyle }}
          />
        </h2>
        <p className="sss-product-about-text" id='description' onClick={(event) => handleComponentClick(event, 'description')} >
          <EditableText
            text={aboutDescriptionText}
            onChange={(text) => handleTextChange(text, 'description')}
            style={{ ...aboutDescriptionStyles }}
          />
        </p>
      </div>
      <div className="sss-product-about-box">
        {aboutImages.map((src, index) => (
          <div key={index} className="sss-product-about-item">
            <ReusableImage
              src={src}
              alt={`Feature ${index + 1}`}
              openImagePanel={() => openImagePanel(`aboutImage-${index}`)}
              onImageChange={(newSrc) => selectImage(newSrc, index)}
              selectedImage={activeComponent === `aboutImage-${index}` ? selectedImage : null}
              style={{ height: '150px', width: 'auto' }}
              identifier={`aboutImage-${index}`}
              imageHeight={imageHeight}
            />
            <h3 className="sss-product-about-item-title" id={`featureTitle-${index}`} onClick={(event) => handleComponentClick(event, 'featureTitle', index)}>
              <EditableText
                text={featureTitles[index]}
                onChange={(text) => handleTextChange(text, 'featureTitle', index)}
                style={featureTitleStyles[index]}
              />
            </h3>
            <p className="sss-product-about-item-text" id={`featureDescription-${index}`} onClick={(event) => handleComponentClick(event, 'featureDescription', index)}>
              <EditableText
                text={featureDescriptions[index]}
                onChange={(text) => handleTextChange(text, 'featureDescription', index)}
                style={featureDescriptionStyles[index]}
              />
            </p>
          </div>
        ))}
      </div>



    </div>
  );
};

export default AboutSection;
