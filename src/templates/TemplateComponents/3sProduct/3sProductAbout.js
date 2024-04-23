import React, { useState } from 'react';
import '../../templates-po/about.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import { useStyle } from '../../../hooks/StyleContext';

const AboutSection = ({ onClick, handleSettingsChange, selectElement }) => {
  const { getComponentStyle } = useStyle();
  const [aboutTitleText, setAboutTitleText] = useState('The best features to help you create all your projects');
  const [aboutTitleStyle, setAboutTitleStyle] = useState({ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '600', color: '#333', textAlign: 'center' });
  const [aboutDescriptionText, setAboutDescriptionText] = useState('Apsum dolor sit amet consectetur. Aliquam elementum elementum in ultrices. Dui maecenas ut eros turpis ultrices metus morbi aliquet vel.');

  const handleTextChange = (newText, type) => {
    if (type === 'title') {
      setAboutTitleText(newText);
    } else if (type === 'description') {
      setAboutDescriptionText(newText);
    }
  };

  const handleTextStyleChange = (newStyle, type) => {
    if (type === 'title') {
      setAboutTitleStyle(newStyle);
    }
  };

  return (
    <div className="sss-product-about" onClick={onClick} style={getComponentStyle('aboutSection')}>
      <div className="sss-product-about-header">
        <h2 className="sss-product-about-title">
          <EditableText
            text={aboutTitleText}
            style={aboutTitleStyle}
            onChange={(text) => handleTextChange(text, 'title')}
            onStyleChange={(style) => handleTextStyleChange(style, 'title')}
            selectElement={selectElement}
          />
        </h2>
        <EditableText
          text={aboutDescriptionText}
          style={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: 'normal', color: '#666', textAlign: 'left' }}
          onChange={(text) => handleTextChange(text, 'description')}
          onStyleChange={() => {}}
          selectElement={() => {}}
        />
      </div>
      <div className="sss-product-about-box">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className="sss-product-about-item">
            <img
              src={`./images/templates-img/3sproduct/3sproduct-about-${num}.png`}
              className="sss-product-about-item-img"
              alt={`Feature ${num}`}
            />
            <h3 className="sss-product-about-item-title">Feature Title {num}</h3>
            <p className="sss-product-about-item-text">
              Feature description here. It can vary depending on the feature number {num}.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
