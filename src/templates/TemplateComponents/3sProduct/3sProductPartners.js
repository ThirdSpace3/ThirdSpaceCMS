import React, { useState, useEffect } from 'react';
import '../../templates-po/partners.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext'; // Import the context

const PartnersSection = ({ handleSettingsChange, settings, openImagePanel }) => {
  const { getComponentStyle, updateStyle } = useStyle();
  const { enterReplacementMode, activeComponent, selectImage, selectedImage } = useImageHistory(); // Use the context
  const [partnersTitleText, setPartnersTitleText] = useState('Trusted by teams at over 1,000 of the world\'s leading organizations');
  const [partnersTitleStyle, setPartnersTitleStyle] = useState({ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '600', color: '#333', textAlign: 'center' });
  const [partnerImages, setPartnerImages] = useState(Array(7).fill().map((_, i) => `./images/templates-img/3sproduct/3sproduct-partners-${i+1}.png`));
  const partnerStyle = getComponentStyle('partners');

  useEffect(() => {
    updateStyle(settings);
  }, [settings]);

  const handleTextChange = (newText) => {
    setPartnersTitleText(newText);
  };

  const handleTextStyleChange = (newStyle) => {
    const updatedStyle = {
      ...partnersTitleStyle,
      ...newStyle
    };
    setPartnersTitleStyle(updatedStyle);
    handleSettingsChange('partnersTitle', updatedStyle);
  };

  const handleImageChange = (newSrc, index) => {
    console.log(`Attempting to update image at index ${index} with src ${newSrc}`);
    if (activeComponent === `partnerImage-${index}`) {
      console.log(`Updating image at index ${index}`);
      const updatedImages = [...partnerImages];
      updatedImages[index] = newSrc;
      setPartnerImages(updatedImages);
      selectImage(newSrc);
    } else {
      console.log(`Active component mismatch: ${activeComponent} expected partnerImage-${index}`);
    }
  };
  
  
  const handleImageClick = (index) => {
    console.log(`Image at index ${index} clicked`);
    enterReplacementMode(`partnerImage-${index}`);
  };
  
  

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
  openImagePanel={() => openImagePanel(index, (newSrc) => handleImageChange(newSrc, index))}
  style={{ height: '150px', width: 'auto' }} // Set the desired height and width
/>

        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
