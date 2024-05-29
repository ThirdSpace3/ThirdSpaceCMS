import React, { useState, useEffect } from 'react';
import '../css/footer.css';
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';

const Footer = ({
  handleSettingsChange,
  setSelectedElement,
  openImagePanel,
  setSelectedColor,
  onContentChange  // This prop will be used to update the parent component
}) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();
  const { getComponentStyle, updateStyle } = useStyle();

  const [footerText, setFooterText] = useState(localStorage.getItem('footerText') || 'Copyright © 3S.Product | Designed inspired by Webocean LTD - Powered by Third Space');
  const [homeText, setHomeText] = useState(localStorage.getItem('homeText') || 'Home');
  const [aboutText, setAboutText] = useState(localStorage.getItem('aboutText') || 'About');
  const [featuresText, setFeaturesText] = useState(localStorage.getItem('featuresText') || 'Features');

  const [footerLogoSrc, setFooterLogoSrc] = useState("https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-logo.png?alt=media&token=7e46320d-7e7d-45a2-9684-6ac565f97c71");
  const [footerTwitterSrc, setFooterTwitterSrc] = useState("https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-footer-1.png?alt=media&token=44a94263-3fb4-4f6f-a9a0-d030033c136d");
  const [footerLinkedInSrc, setFooterLinkedInSrc] = useState("https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-footer-4.png?alt=media&token=b8d5125f-8b20-4701-86fd-8defd1aef14e");

  // Dynamically update parent component state
  useEffect(() => {
    onContentChange({
      text: footerText,
      home: homeText,
      about: aboutText,
      features: featuresText,
      logoSrc: footerLogoSrc,
      twitterSrc: footerTwitterSrc,
      linkedInSrc: footerLinkedInSrc
    });
  }, [footerText, homeText, aboutText, featuresText, footerLogoSrc, footerTwitterSrc, footerLinkedInSrc, onContentChange]);

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
    localStorage.setItem(textType, newText);
    updateStyle(textType, { text: newText });
  };

  const handleImageChange = (newSrc, identifier) => {
    switch (identifier) {
      case "FooterLogo":
        setFooterLogoSrc(newSrc);
        break;
      case "FooterTwitter":
        setFooterTwitterSrc(newSrc);
        break;
      case "FooterLinkedIn":
        setFooterLinkedInSrc(newSrc);
        break;
      default:
        break;
    }
    selectImage(newSrc);
  };

  const handleComponentClick = (event, identifier) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedElement(identifier);
    if (identifier.includes("Footer")) {
      enterReplacementMode(identifier);
    }
    console.log(`${identifier} clicked, setting selected element to '${identifier}'`);

  };

  useEffect(() => {
    const cssVarName = `--footer-background-color`;
    const storedColor = localStorage.getItem(cssVarName);
  
    if (storedColor) {
      setSelectedColor(storedColor);
      document.documentElement.style.setProperty(cssVarName, storedColor);
    }
  }, [setSelectedColor]);

  return (
    <div className="sss-product-footer" style={{ ...getComponentStyle('footer') }} id='footer'  onClick={(event) => handleComponentClick(event, 'footer')}>
      <div className="sss-product-footer-top">
        <ReusableImage
          src={footerLogoSrc}
          alt="Footer Logo"
          onClick={() => enterReplacementMode('FooterLogo')}
          openImagePanel={openImagePanel}
          identifier="FooterLogo"
          imageHeight="50px"
        />
        <ul className="sss-product-footer-top-links-box">
          <li className='sss-product-footer-top-links' id='homeText' onClick={(event) => handleComponentClick(event, 'homeText')}>
            <EditableText
              text={homeText}
              onChange={(text) => handleTextChange(text, 'homeText')}
              style={{ ...getComponentStyle('homeText') }}
            />
          </li>
          <li className='sss-product-footer-top-links' id='aboutText' onClick={(event) => handleComponentClick(event, 'aboutText')}>
            <EditableText
              text={aboutText}
              onChange={(text) => handleTextChange(text, 'aboutText')}
              style={{ ...getComponentStyle('aboutText') }}
            />
          </li>
          <li className='sss-product-footer-top-links' id='featuresText' onClick={(event) => handleComponentClick(event, 'featuresText')}>
            <EditableText
              text={featuresText}
              onChange={(text) => handleTextChange(text, 'featuresText')}
              style={{ ...getComponentStyle('featuresText') }}
            />
          </li>
        </ul>
        <div className="sss-product-footer-top-rs">
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
        </div>
      </div>
      <div className="sss-product-footer-bottom" onClick={(event) => handleComponentClick(event, 'footerBottom')}>
        <hr className="sss-product-footer-bottom-hr" />
        <p className="sss-product-footer-bottom-text" id='footerText' onClick={(event) => handleComponentClick(event, 'footerText')}>
          <EditableText
            text={footerText}
            onChange={(text) => handleTextChange(text, 'footerText')}
            style={{ ...getComponentStyle('footerText') }}
          />
        </p>
      </div>
    </div>
  );
};

export default Footer;
