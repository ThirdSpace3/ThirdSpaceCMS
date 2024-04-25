import React, { useState, useContext, useEffect } from 'react';
import '../../templates-po/partners.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';

const PartnersSection = ({ onClick, handleSettingsChange, selectElement, settings, openImagePanel }) => {
  const { getComponentStyle, updateStyle } = useStyle();
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
    const updatedImages = [...partnerImages];
    updatedImages[index] = newSrc;
    setPartnerImages(updatedImages);
  };

  return (
    <div className="sss-product-partners" onClick={onClick}>
      <h2 className="sss-product-partners-title">
        <EditableText
          text={partnersTitleText}
          style={{...partnerStyle, partnersTitleStyle}}

          onChange={handleTextChange}
          onStyleChange={handleTextStyleChange}
          selectElement={selectElement}
        />
      </h2>
      <div className="sss-product-partners-box">
        {partnerImages.map((src, index) => (
          <ReusableImage
            key={index}
            src={src}
            alt={`Partner ${index + 1}`}
            onClick={() => selectElement(`partnerImage-${index}`)}
            openImagePanel={() => openImagePanel(index, handleImageChange)}
            selectElement={selectElement}
          />
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
