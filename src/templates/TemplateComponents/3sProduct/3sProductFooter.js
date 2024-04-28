import React, { useState, useEffect } from 'react';
import '../../templates-po/footer.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const Footer = ({
  style, settings = { textStyles: {} }, handleSettingsChange, openImagePanel, setSelectedElement, isPreviewMode
}) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();
  const { getComponentStyle, updateStyle } = useStyle();

  const [footerText, setFooterText] = useState('Copyright © 3S.Product | Designed inspired by Webocean LTD - Powered by Third Space');
  const [homeText, setHomeText] = useState('Home');
  const [aboutText, setAboutText] = useState('About');
  const [featuresText, setFeaturesText] = useState('Features');
  const [footerLogoSrc, setFooterLogoSrc] = useState("./images/templates-img/3sproduct/3sproduct-logo.png");
  const [footerTwitterSrc, setFooterTwitterSrc] = useState("./images/templates-img/3sproduct/3sproduct-footer-1.png");
  const [footerLinkedInSrc, setFooterLinkedInSrc] = useState("./images/templates-img/3sproduct/3sproduct-footer-4.png");

  useEffect(() => {
    updateStyle(settings);
  }, [settings]);

  useEffect(() => {
    if (activeComponent && selectedImage) {
      switch (activeComponent) {
        case "FooterLogo":
          setFooterLogoSrc(selectedImage);
          break;
        case "FooterTwitter":
          setFooterTwitterSrc(selectedImage);
          break;
        case "FooterLinkedIn":
          setFooterLinkedInSrc(selectedImage);
          break;
        default:
          break;
      }
    }
  }, [selectedImage, activeComponent]);

  const handleTextChange = (newText, textType) => {
    switch (textType) {
      case 'homeText':
        setHomeText(newText);
        break;
      case 'aboutText':
        setAboutText(newText);
        break;
      case 'featuresText':
        setFeaturesText(newText);
        break;
      case 'footerText':
        setFooterText(newText);
        break;
      default:
        break;
    }
    updateStyle(textType, { text: newText });
  };

  const handleComponentClick = (event, identifier) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedElement(identifier);
  };
  return (
    <div className="sss-product-footer" style={{ ...style, ...settings.footer }} id='footer' onClick={isPreviewMode ? undefined : (event) => handleComponentClick(event, 'footer')}>
      <div className="sss-product-footer-top">
        {isPreviewMode ? (
          <img src={footerLogoSrc} alt="Footer Logo" style={{ height: '50px' }} />
        ) : (
          <ReusableImage
            src={footerLogoSrc}
            alt="Footer Logo"
            onClick={() => enterReplacementMode('FooterLogo')}
            openImagePanel={openImagePanel}
            identifier="FooterLogo"
            imageHeight="50px"
          />
        )}
        <ul className="sss-product-footer-top-links-box">
          <li className='sss-product-footer-top-links' id='homeText' onClick={isPreviewMode ? undefined : (event) => handleComponentClick(event, 'homeText')}>
            {isPreviewMode ? homeText : (
              <EditableText
                text={homeText}
                onChange={(text) => handleTextChange(text, 'homeText')}
                style={{ ...getComponentStyle('homeText') }}
              />
            )}
          </li>
          <li className='sss-product-footer-top-links' id='aboutText' onClick={isPreviewMode ? undefined : (event) => handleComponentClick(event, 'aboutText')}>
            {isPreviewMode ? aboutText : (
              <EditableText
                text={aboutText}
                onChange={(text) => handleTextChange(text, 'aboutText')}
                style={{ ...getComponentStyle('aboutText') }}
              />
            )}
          </li>
          <li className='sss-product-footer-top-links' id='featuresText' onClick={isPreviewMode ? undefined : (event) => handleComponentClick(event, 'featuresText')}>
            {isPreviewMode ? featuresText : (
              <EditableText
                text={featuresText}
                onChange={(text) => handleTextChange(text, 'featuresText')}
                style={{ ...getComponentStyle('featuresText') }}
              />
            )}
          </li>
        </ul>
        <div className="sss-product-footer-top-rs">
          {isPreviewMode ? (
            <>
              <img src={footerTwitterSrc} alt="Twitter" style={{ height: '30px' }} />
              <img src={footerLinkedInSrc} alt="LinkedIn" style={{ height: '30px' }} />
            </>
          ) : (
            <>
              <ReusableImage
                src={footerTwitterSrc}
                alt="Twitter"
                onClick={() => enterReplacementMode('FooterTwitter')}
                identifier="FooterTwitter"
                imageHeight="30px"
              />
              <ReusableImage
                src={footerLinkedInSrc}
                alt="LinkedIn"
                onClick={() => enterReplacementMode('FooterLinkedIn')}
                identifier="FooterLinkedIn"
                imageHeight="30px"
              />
            </>
          )}
        </div>
      </div>
      <div className="sss-product-footer-bottom" onClick={isPreviewMode ? undefined : (event) => handleComponentClick(event, 'footerBottom')}>
        <hr className="sss-product-footer-bottom-hr" />
        <p className="sss-product-footer-bottom-text" id='footerText' onClick={isPreviewMode ? undefined : (event) => handleComponentClick(event, 'footerText')}>
          {isPreviewMode ? footerText : (
            <EditableText
              text={footerText}
              onChange={(text) => handleTextChange(text, 'footerText')}
              style={{ ...getComponentStyle('footerText') }}
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default Footer;