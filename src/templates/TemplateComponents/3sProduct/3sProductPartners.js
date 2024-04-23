import React, { useState, useContext } from 'react';
import '../../templates-po/partners.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import { useStyle } from '../../../hooks/StyleContext';

const PartnersSection = ({ onClick, handleSettingsChange, selectElement  }) => {
  const { getComponentStyle } = useStyle();
  const [partnersTitleText, setPartnersTitleText] = useState('Trusted by teams at over 1,000 of the world\'s leading organizations');
  const [partnersTitleStyle, setPartnersTitleStyle] = useState({ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '600', color: '#333', textAlign: 'center' });

  const handleTextChange = (newText) => {
    setPartnersTitleText(newText);
  };

  const handleTextStyleChange = (newStyle) => {
    setPartnersTitleStyle(newStyle);
  };

  return (
    <div className="sss-product-partners" onClick={onClick}>
      <h2 className="sss-product-partners-title">
        <EditableText
          text={partnersTitleText}
          style={partnersTitleStyle}
          onChange={handleTextChange}
          onStyleChange={handleTextStyleChange}
          selectElement={selectElement} // Ensuring prop is passed

        />
      </h2>
      <div className="sss-product-partners-box">
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <img
            key={num}
            src={`./images/templates-img/3sproduct/3sproduct-partners-${num}.png`}
            className="sss-product-partners-box-img"
            alt={`Partner ${num}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
