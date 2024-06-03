import React, { useState, useEffect } from 'react';
import '../css/about.css';
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';

const AboutSection = ({
  handleSettingsChange, settings, openImagePanel, setSelectedElement, setSelectedColor, onContentChange }) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();
  const { getComponentStyle, updateStyle } = useStyle();

  // State for managing about images
  const [aboutImages, setAboutImages] = useState(() => {
    const storedImages = localStorage.getItem('about-images');
    return storedImages ? JSON.parse(storedImages) : [
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-about-1.png?alt=media&token=9ca80d2e-270b-46a0-8557-433bfdada20a', id: 'aboutImage-1' },
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-about-2.png?alt=media&token=16fae0b2-1ee9-43f5-8e07-99f406f3ee2c', id: 'aboutImage-2' },
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-about-3.png?alt=media&token=5133fe7c-62b1-49db-9776-188c2aefe6de', id: 'aboutImage-3' },
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-about-4.png?alt=media&token=94093593-f989-4fc0-9ea5-4b3f8160ba33', id: 'aboutImage-4' },
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-about-5.png?alt=media&token=85a1cb0d-da50-4649-82a1-dfed7e70e6a5', id: 'aboutImage-5' },
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-about-6.png?alt=media&token=995009fa-e65d-4953-8492-2a3e2ca9070a', id: 'aboutImage-6' }
    ];
  });

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
    getImageHeight('https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-about-1.png?alt=media&token=9ca80d2e-270b-46a0-8557-433bfdada20a').then((height) => setImageHeight(height));
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
    const cssVarName = '--about-background-color';
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
    localStorage.setItem('about-images', JSON.stringify(aboutImages));
  }, [aboutTitleText, aboutDescriptionText, aboutImages, featureTitles, featureDescriptions, onContentChange]);

  return (
    <div className="sss-product-about" style={{ ...aboutStyles }} id='about' onClick={(event) => handleComponentClick(event, 'about')}>
      <div className="sss-product-about-header">
        <h2 className="sss-product-about-title" id='title' onClick={(event) => handleComponentClick(event, 'title')}>
          <EditableText
            text={aboutTitleText}
            onChange={(text) => handleTextChange(text, 'title')}
            style={{ ...aboutTitleStyle }}
          />
        </h2>
        <p className="sss-product-about-text" id='description' onClick={(event) => handleComponentClick(event, 'description')}>
          <EditableText
            text={aboutDescriptionText}
            onChange={(text) => handleTextChange(text, 'description')}
            style={{ ...aboutDescriptionStyles }}
          />
        </p>
      </div>
      <div className="sss-product-about-box">
        {aboutImages.map((image, index) => (
          <div key={image.id} className="sss-product-about-item">
            <ReusableImage
              src={image.src}
              alt={`Feature ${index + 1}`}
              openImagePanel={() => openImagePanel(`aboutImage-${index}`)}
              onImageChange={(newSrc) => {
                const updatedImages = [...aboutImages];
                updatedImages[index].src = newSrc;
                setAboutImages(updatedImages);
                selectImage(newSrc, index);
              }}
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