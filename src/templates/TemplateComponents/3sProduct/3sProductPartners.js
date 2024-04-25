import React, { useState, useEffect } from 'react';
import '../../templates-po/partners.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const PartnersSection = ({ handleSettingsChange, settings, openImagePanel }) => {
  const { enterReplacementMode, activeComponent, selectImage, selectedImage } = useImageHistory();
  const { getComponentStyle, updateStyle } = useStyle();
  const [partnersTitleText, setPartnersTitleText] = useState('Trusted by teams at over 1,000 of the world\'s leading organizations');
  const [partnersTitleStyle, setPartnersTitleStyle] = useState({ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '600', color: '#333', textAlign: 'center' });
  const [partnerImages, setPartnerImages] = useState(Array(7).fill().map((_, i) => `./images/templates-img/3sproduct/3sproduct-partners-${i+1}.png`));
  const partnerStyle = getComponentStyle('partners');

  const [imageHeight, setImageHeight] = useState(null);
  const getImageHeight = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img.height);
    });
  };
  useEffect(() => {
    getImageHeight(`./images/templates-img/3sproduct/3sproduct-partners-1.png`).then((height) => setImageHeight(height));
  }, []);


  useEffect(() => {
    updateStyle(settings);
  }, [settings]);

  const handleTextChange = (newText) => {
    setPartnersTitleText(newText);
  };

  const handleTextStyleChange = (newStyle) => {
    const updatedStyle = { ...partnersTitleStyle, ...newStyle };
    setPartnersTitleStyle(updatedStyle);
    handleSettingsChange('partnersTitle', updatedStyle);
  };

  const handleImageClick = (index) => {
    const identifier = `partnerImage-${index}`;
    console.log(`Image at index ${index} clicked, entering replacement mode for ${identifier}`);
    enterReplacementMode(identifier);
  };

  const handleImageChange = (newSrc, index) => {
    if (activeComponent === `partnerImage-${index}`) {
      console.log(`Updating image at index ${index} with src ${newSrc}`);
      const updatedImages = [...partnerImages];
      updatedImages[index] = newSrc;
      setPartnerImages(updatedImages);
      selectImage(newSrc);
    } else {
      console.log(`Active component mismatch: expected partnerImage-${index}, but active is ${activeComponent}`);
    }
  };
  useEffect(() => {
    console.log(`Component: PartnersSection, Active: ${activeComponent}, Image: ${selectedImage}`);
    if (activeComponent === 'PartnersSection' && selectedImage) {
      setPartnerImages(selectedImage);
    }
}, [selectedImage, activeComponent]);
  return (
    <div className="sss-product-partners">
      <h2 className="sss-product-partners-title">
        <EditableText
          text={partnersTitleText}
          style={{...partnerStyle, ...partnersTitleStyle}}
          onChange={handleTextChange}
          onStyleChange={handleTextStyleChange}
        />
      </h2>
      <div className="sss-product-partners-box">
        {partnerImages.map((src, index) => (
          <ReusableImage
            key={index}
            src={src}
            alt={`Partner ${index + 1}`}
            onClick={() => handleImageClick(index)}
            openImagePanel={() => openImagePanel()}
            onImageChange={(newSrc) => handleImageChange(newSrc, index)}
            selectedImage={activeComponent === `partnerImage-${index}` ? selectedImage : null}
            style={{ height: '150px', width: 'auto' }}  // Add necessary styles
            identifier={`Partner ${index + 1}`}
            imageHeight={imageHeight}

          />
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
