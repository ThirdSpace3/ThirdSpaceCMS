import React, { useState } from 'react';
import '../../templates-po/footer.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import { useStyle } from '../../../hooks/StyleContext';

const Footer = ({ onClick }) => {
  const { getComponentStyle } = useStyle();
  const [footerText, setFooterText] = useState('Copyright © 3S.Product | Designed inspired by Webocean LTD - Powered by Third Space');
  const [footerTextStyle, setFooterTextStyle] = useState({ fontFamily: 'Arial', fontSize: '14px', fontWeight: 'normal', color: '#666', textAlign: 'center' });

  const handleTextChange = (newText) => {
    setFooterText(newText);
  };

  const handleTextStyleChange = (newStyle) => {
    setFooterTextStyle(newStyle);
  };

  return (
    <div className="sss-product-footer" onClick={onClick}>
      <div className="sss-product-footer-top">
        <img
          src="./images/templates-img/3sproduct/3sproduct-logo.png"
          className="sss-product-footer-top-logo"
          alt="Footer Logo"
        />
        {/* You could add more editable elements here if needed */}
      </div>
      <div className="sss-product-footer-bottom">
        <hr className="sss-product-footer-bottom-hr" />
        <p className="sss-product-footer-bottom-text">
          <EditableText
            text={footerText}
            style={footerTextStyle}
            onChange={handleTextChange}
            onStyleChange={handleTextStyleChange}
          />
        </p>
      </div>
    </div>
  );
};

export default Footer;
