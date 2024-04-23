import React, { useState } from 'react';
import '../../templates-po/feature.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import { useStyle } from '../../../hooks/StyleContext';

const FeaturesSection = ({ onClick, handleSettingsChange, selectElement }) => {
  const { getComponentStyle } = useStyle();
  const [featuresTitleText, setFeaturesTitleText] = useState('Essential apps that protect your documents');
  const [featuresTitleStyle, setFeaturesTitleStyle] = useState({ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '600', color: '#333', textAlign: 'center' });

  const handleTextChange = (newText) => {
    setFeaturesTitleText(newText);
  };

  const handleTextStyleChange = (newStyle) => {
    setFeaturesTitleStyle(newStyle);
  };

  return (
    <div className="sss-product-features" onClick={onClick}>
      <h2 className="sss-product-features-title">
        <EditableText
          text={featuresTitleText}
          style={featuresTitleStyle}
          onChange={handleTextChange}
          onStyleChange={handleTextStyleChange}
          selectElement={selectElement} // Ensuring prop is passed
        />
      </h2>
      <div className="sss-product-features-box">
        {/* Content structure similar to PartnersSection, but for features */}
        <div className="sss-product-features-box-top">
          <div className="sss-product-features-box-top-left">
            <h3 className="sss-product-features-box-top-left-title">End-to-end encrypted inbox and messages</h3>
            <EditableText
              text="Rorem ipsum dolor sit amet consectetur. Proin dignissim tortor mauris viverra sed volutpat mauris. Amet nisi amet commodo adipiscing ut imperdiet nunc."
              style={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: 'normal', color: '#666' }}
              onChange={() => {}}
              onStyleChange={() => {}}
              selectElement={() => {}} // This function can be passed or removed based on requirement
            />
            <a href="" className="sss-product-features-box-top-left-cta">Join Us</a>
          </div>
          <div className="sss-product-features-box-top-right">
            <img
              src="./images/templates-img/3sproduct/3sproduct-feature-1.png"
              className="sss-product-features-box-top-right-img"
              alt="Feature 1"
            />
          </div>
        </div>
        <div className="sss-product-features-box-bottom">
          {/* Additional feature blocks can be added here similar to the structure above */}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
