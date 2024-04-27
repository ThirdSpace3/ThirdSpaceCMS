import React, { useState, useEffect } from 'react';
import '../../templates-po/footer.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const Footer = ({ handleSettingsChange, onClick, openImagePanel, selectElement }) => {
  const { getComponentStyle, updateStyle } = useStyle();
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();
  const JoinUsStyles = getComponentStyle('footer');

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

  // Image states
  const [footerLogoSrc, setFooterLogoSrc] = useState("./images/templates-img/3sproduct/3sproduct-logo.png");
  const [footerTwitterSrc, setFooterTwitterSrc] = useState("./images/templates-img/3sproduct/3sproduct-footer-1.png");
  const [footerLinkedInSrc, setFooterLinkedInSrc] = useState("./images/templates-img/3sproduct/3sproduct-footer-4.png");

  // Handle text changes
  const handleTextChange = (text, setter) => {
    setter(text);
  };

  // Handle style changes for texts
  const handleTextStyleChange = (textType, newStyle) => {
    const updatedStyle = { ...defaultFooterStyle, ...newStyle };
    updateStyle(textType, updatedStyle);
  };

  // Effect for handling clicks on the footer
  useEffect(() => {
    const footerElement = document.querySelector('.sss-product-footer');
    if (footerElement) {
      footerElement.addEventListener('click', () => {
        console.log("Footer clicked, setting selected element to 'footer'");
        selectElement('footer');
      });
    }
    return () => {
      if (footerElement) {
        footerElement.removeEventListener('click', () => {
          console.log("Footer clicked, setting selected element to 'footer'");
          selectElement('footer');
        });
      }
    };
  }, []);

  // Effect for handling image replacement in the footer
  useEffect(() => {
    if (activeComponent && selectedImage) {
      switch (activeComponent) {
        case "FooterLogo":
          if (selectedImage !== footerLogoSrc) {
            setFooterLogoSrc(selectedImage);
          }
          break;
        case "FooterTwitter":
          if (selectedImage !== footerTwitterSrc) {
            setFooterTwitterSrc(selectedImage);
          }
          break;
        case "FooterLinkedIn":
          if (selectedImage !== footerLinkedInSrc) {
            setFooterLinkedInSrc(selectedImage);
          }
          break;
        default:
          break;
      }
    }
  }, [selectedImage, activeComponent, footerLogoSrc, footerTwitterSrc, footerLinkedInSrc]);

  return (
    <div className="sss-product-footer" onClick={onClick}  id='footer'> 
      <div className="sss-product-footer-top">
        <ReusableImage
          src={footerLogoSrc}
          alt="Footer Logo"
          openImagePanel={() => enterReplacementMode('FooterLogo')}
          identifier="FooterLogo"
          imageHeight="50px"
        />
        <ul className="sss-product-footer-top-links-box">
          <li className='sss-product-footer-top-links'>
            <EditableText
              text={homeText}
              onChange={(text) => handleTextChange(text, setHomeText)}
              style={JoinUsStyles}
              textType="homeText"
              selectElement={() => selectImage('homeText')}
            />
          </li>
          <li className='sss-product-footer-top-links'>
            <EditableText
              text={aboutText}
              onChange={(text) => handleTextChange(text, setAboutText)}
              style={JoinUsStyles}
              textType="aboutText"
              selectElement={() => selectImage('aboutText')}
            />
          </li>
          <li className='sss-product-footer-top-links'>
            <EditableText
              text={featuresText}
              onChange={(text) => handleTextChange(text, setFeaturesText)}
              style={JoinUsStyles}
              textType="featuresText"
              selectElement={() => selectImage('featuresText')}
            />
          </li>
        </ul>
        <div className="sss-product-footer-top-rs">
          <ReusableImage
            src={footerTwitterSrc}
            alt="Twitter"
            openImagePanel={() => enterReplacementMode('FooterTwitter')}
            identifier="FooterTwitter"
            imageHeight="30px"
          />
          <ReusableImage
            src={footerLinkedInSrc}
            alt="LinkedIn"
            openImagePanel={() => enterReplacementMode('FooterLinkedIn')}
            identifier="FooterLinkedIn"
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
            selectElement={() => selectImage('footerText')}
          />
        </p>
      </div>
    </div>
  );
};

export default Footer;
