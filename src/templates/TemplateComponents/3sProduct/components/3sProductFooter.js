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
  onContentChange,
  handleImageUpload
}) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();
  const { getComponentStyle, updateStyle } = useStyle();

  const [footerContent, setFooterContent] = useState({
    footerText: 'Copyright © 3S.Product | Designed inspired by Webocean LTD - Powered by Third Space',
    homeText: 'Home',
    aboutText: 'About',
    featuresText: 'Features',
    logoSrc: "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-logo.png?alt=media&token=7e46320d-7e7d-45a2-9684-6ac565f97c71",
    twitterSrc: "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-footer-1.png?alt=media&token=44a94263-3fb4-4f6f-a9a0-d030033c136d",
    linkedInSrc: "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-footer-4.png?alt=media&token=b8d5125f-8b20-4701-86fd-8defd1aef14e"
  });

  const handleTextChange = (newText, textType) => {
    setFooterContent(prev => ({
      ...prev,
      [textType]: newText
    }));
    localStorage.setItem(textType, newText);
    updateStyle(textType, { text: newText });
  };

  const handleImageChange = (newSrc, identifier) => {
    setFooterContent(prev => ({
      ...prev,
      [identifier]: newSrc
    }));
    onContentChange({
      ...footerContent,
      [identifier]: newSrc
    });
    selectImage(newSrc);
  };

  const handleComponentClick = (event, identifier) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedElement(identifier);
    if (identifier.includes("Footer")) {
      enterReplacementMode(identifier);
    }
  };

  useEffect(() => {
    const cssVarName = `--footer-background-color`;
    const storedColor = localStorage.getItem(cssVarName);
  
    if (storedColor) {
      setSelectedColor(storedColor);
      document.documentElement.style.setProperty(cssVarName, storedColor);
    }
  }, [setSelectedColor]);

  const footerStyles = getComponentStyle('footer');

  return (
    <div className="sss-product-footer" style={footerStyles} id='footer' onClick={(event) => handleComponentClick(event, 'footer')}>
      <div className="sss-product-footer-top">
        <ReusableImage
          src={footerContent.logoSrc}
          alt="Footer Logo"
          onClick={() => enterReplacementMode('FooterLogo')}
          openImagePanel={openImagePanel}
          identifier="logoSrc"
          imageHeight="50px"
          handleImageUpload={handleImageUpload}
          onImageChange={(newSrc) => handleImageChange(newSrc, 'logoSrc')}
        />
        <ul className="sss-product-footer-top-links-box">
          <li className='sss-product-footer-top-links' id='homeText' onClick={(event) => handleComponentClick(event, 'homeText')}>
            <EditableText
              text={footerContent.homeText}
              onChange={(text) => handleTextChange(text, 'homeText')}
              style={{ ...getComponentStyle('homeText') }}
            />
          </li>
          <li className='sss-product-footer-top-links' id='aboutText' onClick={(event) => handleComponentClick(event, 'aboutText')}>
            <EditableText
              text={footerContent.aboutText}
              onChange={(text) => handleTextChange(text, 'aboutText')}
              style={{ ...getComponentStyle('aboutText') }}
            />
          </li>
          <li className='sss-product-footer-top-links' id='featuresText' onClick={(event) => handleComponentClick(event, 'featuresText')}>
            <EditableText
              text={footerContent.featuresText}
              onChange={(text) => handleTextChange(text, 'featuresText')}
              style={{ ...getComponentStyle('featuresText') }}
            />
          </li>
        </ul>
        <div className="sss-product-footer-top-rs">
          <ReusableImage
            src={footerContent.twitterSrc}
            alt="Twitter"
            onClick={() => enterReplacementMode('FooterTwitter')}
            identifier="twitterSrc"
            imageHeight="30px"
            handleImageUpload={handleImageUpload}
            onImageChange={(newSrc) => handleImageChange(newSrc, 'twitterSrc')}
          />
          <ReusableImage
            src={footerContent.linkedInSrc}
            alt="LinkedIn"
            onClick={() => enterReplacementMode('FooterLinkedIn')}
            identifier="linkedInSrc"
            imageHeight="30px"
            handleImageUpload={handleImageUpload}
            onImageChange={(newSrc) => handleImageChange(newSrc, 'linkedInSrc')}
          />
        </div>
      </div>
      <div className="sss-product-footer-bottom" onClick={(event) => handleComponentClick(event, 'footerBottom')}>
        <hr className="sss-product-footer-bottom-hr" />
        <p className="sss-product-footer-bottom-text" id='footerText' onClick={(event) => handleComponentClick(event, 'footerText')}>
          <EditableText
            text={footerContent.footerText}
            onChange={(text) => handleTextChange(text, 'footerText')}
            style={{ ...getComponentStyle('footerText') }}
          />
        </p>
      </div>
    </div>
  );
};

export default Footer;
