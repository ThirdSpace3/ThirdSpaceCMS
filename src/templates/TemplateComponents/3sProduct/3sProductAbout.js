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
  const aboutTitleStyle = getComponentStyle('aboutTitle');
  const aboutDescriptionStyles = getComponentStyle('aboutDescription');
  const featureTitlesStyles = getComponentStyle('featureTitles');
  const featureDescriptionsStyles = getComponentStyle('featureDescriptions');

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

  const handleComponentClick = (event, identifier) => {
    event.preventDefault(); // This will prevent the default action of the anchor tag
    event.stopPropagation(); // Stop the event from propagating up
    console.log(`${identifier} clicked, setting selected element to '${identifier}'`);
    setSelectedElement(identifier);
};
const handleTextChange = (newText, textType) => {
  switch (textType) {
      case 'title':
        setAboutTitleText(newText);
          break;
      case 'description':
          setAboutDescriptionText(newText);
          break;
      case 'featureTitle':
        setFeatureTitles(newText);
          break;
      case 'featureDescription':
        setFeatureDescriptions(newText);
          break;
      default:
          break;
  }
  updateStyle(textType, { text: newText });
};

  return (
    <div className="sss-product-about" style={{ ...style, ...settings.about }}  id='about'>
      <div className="sss-product-about-header">
        <h2 className="sss-product-about-title"  id='title' onClick={(event) => handleComponentClick(event, 'title')}>
          <EditableText
            text={aboutTitleText}
            onChange={(text) => handleTextChange(text, 'title')}
            style={{...aboutTitleStyle}}
          />
        </h2>
        <p className="sss-product-about-text"  id='description' onClick={(event) => handleComponentClick(event, 'description')}>
          <EditableText
            text={aboutDescriptionText}
            onChange={(text) => handleTextChange(text, 'description')}
            style={{...aboutDescriptionStyles}}
          />
        </p>
      </div>
      <div className="sss-product-about-box">
        {aboutImages.map((src, index) => (
          <div key={index} className="sss-product-about-item">
            <ReusableImage
              src={src}
              alt={`Feature ${index + 1}`}
              openImagePanel={openImagePanel}
              onImageChange={(newSrc) => selectImage(newSrc)}
              selectedImage={activeComponent === `aboutImage-${index}` ? selectedImage : null}
              style={{ height: '150px', width: 'auto' }}
              identifier={`aboutImage-${index}`}
              imageHeight={imageHeight}
            />
            <h3 className="sss-product-about-item-title"  id='featureTitle' onClick={(event) => handleComponentClick(event, 'featureTitle')}>
              <EditableText
                text={featureTitles[index]}
                onChange={(text) => handleTextChange(text, index, 'featureTitle')}
                style={{...featureTitlesStyles}}

              />
            </h3>
            <p className="sss-product-about-item-text" id='featureDescription' onClick={(event) => handleComponentClick(event, 'featureDescription')}>
              <EditableText
                text={featureDescriptions[index]}
                onChange={(text) => handleTextChange(text, index, 'featureDescription')}
                style={{...featureDescriptionsStyles}}

              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
