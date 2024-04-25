import React, { useState } from 'react';
import '../../templates-po/footer.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';

const Footer = ({ settings, handleSettingsChange, selectElement, onClick, openImagePanel }) => {
  const { getComponentStyle, updateStyle } = useStyle();

  // State for editable texts
  const [footerText, setFooterText] = useState('Copyright © 3S.Product | Designed inspired by Webocean LTD - Powered by Third Space');
  const [homeText, setHomeText] = useState('Home');
  const [aboutText, setAboutText] = useState('About');
  const [featuresText, setFeaturesText] = useState('Features');

  const defaultFooterStyle = getComponentStyle('footer') || {
    fontFamily: 'Arial', 
    fontSize: '14px', 
    fontWeight: 'normal', 
    color: '#666', 
    textAlign: 'center'
  };

  const handleTextChange = (text, setter) => {
    setter(text);
  };

  const handleTextStyleChange = (textType, newStyle) => {
    const updatedStyle = { ...defaultFooterStyle, ...newStyle };
    updateStyle(textType, updatedStyle);
  };

  return (
    <div className="sss-product-footer" onClick={onClick}>
      <div className="sss-product-footer-top">
        <ReusableImage 
          src="./images/templates-img/3sproduct/3sproduct-logo.png" 
          alt="Footer Logo" 
          openImagePanel={openImagePanel}
          imageHeight="50px"
        />
        <ul className="sss-product-footer-top-links-box">
          <li>
            <EditableText
              text={homeText}
              onChange={(text) => handleTextChange(text, setHomeText)}
              style={defaultFooterStyle}
              textType="homeText"
              selectElement={selectElement}
            />
          </li>
          <li>
            <EditableText
              text={aboutText}
              onChange={(text) => handleTextChange(text, setAboutText)}
              style={defaultFooterStyle}
              textType="aboutText"
              selectElement={selectElement}
            />
          </li>
          <li>
            <EditableText
              text={featuresText}
              onChange={(text) => handleTextChange(text, setFeaturesText)}
              style={defaultFooterStyle}
              textType="featuresText"
              selectElement={selectElement}
            />
          </li>
        </ul>
        <div className="sss-product-footer-top-rs">
          <ReusableImage 
            src="./images/templates-img/3sproduct/3sproduct-footer-1.png" 
            alt="Twitter" 
            openImagePanel={openImagePanel}
            imageHeight="30px"
          />
          <ReusableImage 
            src="./images/templates-img/3sproduct/3sproduct-footer-4.png" 
            alt="LinkedIn" 
            openImagePanel={openImagePanel}
            imageHeight="30px"
          />
        </div>
      </div>
      <div className="sss-product-footer-bottom">
        <hr className="sss-product-footer-bottom-hr" />
        <p className="sss-product-footer-bottom-text">
          <EditableText
            text={footerText}
            onChange={(text) => handleTextChange(text, setFooterText)}
            onStyleChange={(newStyle) => handleTextStyleChange('footerText', newStyle)}
            style={defaultFooterStyle}
            textType="footerText"
            selectElement={selectElement}
          />
        </p>
      </div>
    </div>
  );
};

export default Footer;
