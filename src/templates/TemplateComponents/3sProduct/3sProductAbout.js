import React, { useState, useEffect } from 'react';
import '../../templates-po/about.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const AboutSection = ({
  handleSettingsChange, settings, openImagePanel, setSelectedElement, style}) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();
  const { getComponentStyle, updateStyle } = useStyle();

  const [aboutTitleText, setAboutTitleText] = useState('The best features to help you create all your projects');
  const [aboutDescriptionText, setAboutDescriptionText] = useState('Apsum dolor sit amet consectetur. Aliquam elementum elementum in ultrices. Dui maecenas ut eros turpis ultrices metus morbi aliquet vel.');
  const [aboutImages, setAboutImages] = useState(Array(6).fill().map((_, i) => `./images/templates-img/3sproduct/3sproduct-about-${i+1}.png`));
  const [featureTitles, setFeatureTitles] = useState(Array(6).fill('Feature Title'));
  const [featureDescriptions, setFeatureDescriptions] = useState(Array(6).fill('Feature description here.'));
  const aboutStyles = getComponentStyle('about');

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

  useEffect(() => {
    updateStyle(settings);
  }, [settings]);

  useEffect(() => {
    if (activeComponent && activeComponent.startsWith('aboutImage') && selectedImage) {
      const index = parseInt(activeComponent.split('-')[1], 10);
      if (index >= 0 && index < aboutImages.length && aboutImages[index] !== selectedImage) {
        const newImages = [...aboutImages];
        newImages[index] = selectedImage;
        setAboutImages(newImages);
      }
    }
  }, [selectedImage, activeComponent, aboutImages]);

  const handleTextChange = (newText, index, type) => {
    if (type === 'title') {
      setAboutTitleText(newText);
    } else if (type === 'description') {
      setAboutDescriptionText(newText);
    } else if (type === 'featureTitle') {
      const newTitles = [...featureTitles];
      newTitles[index] = newText;
      setFeatureTitles(newTitles);
    } else if (type === 'featureDescription') {
      const newDescriptions = [...featureDescriptions];
      newDescriptions[index] = newText;
      setFeatureDescriptions(newDescriptions);
    }
  };

  const handleImageClick = (index) => {
    enterReplacementMode(`aboutImage-${index}`);
  };

  const handleImageChange = (newSrc, index) => {
    if (activeComponent === `aboutImage-${index}`) {
      const updatedImages = [...aboutImages];
      updatedImages[index] = newSrc;
      setAboutImages(updatedImages);
      selectImage(newSrc);
    }
  };

  const handleAboutClick = () => {
    console.log("About clicked, setting selected element to 'about'");
    setSelectedElement('about');
  };

  useEffect(() => {
    const aboutElement = document.querySelector('.sss-product-about');
    if (aboutElement) {
      aboutElement.addEventListener('click', handleAboutClick);
    }
    return () => {
      if (aboutElement) {
        aboutElement.removeEventListener('click', handleAboutClick);
      }
    };
  }, []);

  return (
    <div className="sss-product-about" style={{ ...style, ...settings.about }}>
      <div className="sss-product-about-header">
        <h2 className="sss-product-about-title">
          <EditableText
            text={aboutTitleText}
            onChange={(text) => handleTextChange(text, 'title')}
            style={{...settings.textStyles?.aboutTitleText, ...aboutStyles}}
          />
        </h2>
        <p className="sss-product-about-text">
          <EditableText
            text={aboutDescriptionText}
            onChange={(text) => handleTextChange(text, 'description')}
            style={{...settings.textStyles?.aboutDescriptionText, ...aboutStyles}}
          />
        </p>
      </div>
      <div className="sss-product-about-box">
        {aboutImages.map((src, index) => (
          <div key={index} className="sss-product-about-item">
            <ReusableImage
              src={src}
              alt={`Feature ${index + 1}`}
              onClick={() => handleImageClick(index)}
              openImagePanel={openImagePanel}
              onImageChange={(newSrc) => handleImageChange(newSrc, index)}
              selectedImage={activeComponent === `aboutImage-${index}` ? selectedImage : null}
              style={{ height: '150px', width: 'auto' }}
              identifier={`aboutImage-${index}`}
              imageHeight={imageHeight}
            />
            <h3 className="sss-product-about-item-title">
              <EditableText
                text={featureTitles[index]}
                onChange={(text) => handleTextChange(text, index, 'featureTitle')}
                style={{...settings.textStyles?.aboutDescriptionText, ...aboutStyles}}

              />
            </h3>
            <p className="sss-product-about-item-text">
              <EditableText
                text={featureDescriptions[index]}
                onChange={(text) => handleTextChange(text, index, 'featureDescription')}
                style={{...settings.textStyles?.aboutDescriptionText, ...aboutStyles}}

              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
