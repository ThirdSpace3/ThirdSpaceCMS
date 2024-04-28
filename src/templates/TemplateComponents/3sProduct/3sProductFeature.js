import React, { useState, useEffect } from 'react';
import '../../templates-po/feature.css';
import { Link } from 'react-router-dom';

import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';
import { get } from 'lodash';
const FeaturesSection = ({ handleSettingsChange, setSelectedElement, style, settings, openImagePanel }) => {
  const { getComponentStyle } = useStyle();
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();

  // State for text fields including descriptions
  const [featuresTitleText, setFeaturesTitleText] = useState('Essential apps that protect your documents');
  const [endToEndText, setEndToEndText] = useState('End-to-end encrypted inbox and messages');
  const [endToEndDesc, setEndToEndDesc] = useState({
    text: 'Rorem ipsum dolor sit amet consectetur. Proin dignissim tortor mauris viverra sed volutpat mauris. Amet nisi amet commodo adipiscing ut imperdiet nunc.',
  });
  const [mobileAppsText, setMobileAppsText] = useState('Mobile applications');
  const [mobileAppsDesc, setMobileAppsDesc] = useState({
    text: 'Prem ipsum dolor sit amet consectetur. Viverra sed dignissim risus aliquet condimentum. Vulputate varius feugiat egestas congue.',
  });
  const [uploadShareText, setUploadShareText] = useState('Upload, share, and preview any file');
  const [uploadShareDesc, setUploadShareDesc] = useState({
    text: 'Tellus et adipiscing sit sit mauris pharetra bibendum. Ligula massa netus nulla ultricies purus.',
  });
  const [joinUsText, setJoinUsText] = useState('Join Us');

  // State for image sources
  const [feature1Image, setFeature1Image] = useState('./images/templates-img/3sproduct/3sproduct-feature-1.png');
  const [feature2Image, setFeature2Image] = useState('./images/templates-img/3sproduct/3sproduct-feature-2.png');
  const [feature3Image, setFeature3Image] = useState('./images/templates-img/3sproduct/3sproduct-feature-3.png');
  const [imageHeight1, setImage1Height] = useState(null);
  const [imageHeight2, setImage2Height] = useState(null);
  const [imageHeight3, setImage3Height] = useState(null);

  //Styles  

  const aboutStyles = getComponentStyle('features');
  const featureTitleStyles = getComponentStyle('featuresTitle');
  const endToEndTitleStyles = getComponentStyle('endToEndTitle')
  const endToEndDescriptionStyles = getComponentStyle('endToEndDescription');
  const mobileAppsTitleStyles = getComponentStyle('mobileAppTitle');
  const mobileAppsDescriptionStyles = getComponentStyle('mobileAppDescription');
  const uploadShareTitleStyles = getComponentStyle('uploadShareTitle');
  const uploadShareDescriptionStyles = getComponentStyle('uploadShareDescription');
  const featuresJoinsUsStyles = getComponentStyle('featuresJoinUs');

  const getImageHeight = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img.height);
    });
  };
  useEffect(() => {
    getImageHeight(feature1Image).then((height) => setImage1Height(height));
    getImageHeight(feature2Image).then((height) => setImage2Height(height));
    getImageHeight(feature3Image).then((height) => setImage3Height(height));
  }, []);

  useEffect(() => {
    if (activeComponent === 'featureImage-1' && selectedImage !== feature1Image) {
      setFeature1Image(selectedImage);
    }
    if (activeComponent === 'featureImage-2' && selectedImage !== feature2Image) {
      setFeature2Image(selectedImage);
    }
    if (activeComponent === 'featureImage-3' && selectedImage !== feature3Image) {
      setFeature3Image(selectedImage);
    }
  }, [selectedImage, activeComponent, feature1Image, feature2Image, feature3Image]);

  const handleFeaturesClick = () => {
    console.log("Features clicked, setting selected element to 'features'");
    setSelectedElement('features');
  };

  useEffect(() => {
    const featuresElement = document.querySelector('.sss-product-features');
    if (featuresElement) {
      featuresElement.addEventListener('click', handleFeaturesClick);
    }
    return () => {
      if (featuresElement) {
        featuresElement.removeEventListener('click', handleFeaturesClick);
      }
    };
  }, []);

  const handleImageClick = (index) => {
    const identifier = `featureImage-${index}`;
    enterReplacementMode(identifier);
    console.log(`${identifier} clicked, opening replacement mode.`);
    setSelectedElement(identifier);
  };

  const handleTextChange = (newText, setText) => {
    setText(newText);
    console.log("Text updated:", newText);
  };

  const handleImageChange = (newSrc, index) => {
    const identifier = `featureImage-${index}`;
    if (activeComponent === identifier) {
      switch (index) {
        case 1:
          setFeature1Image(newSrc);
          break;
        case 2:
          setFeature2Image(newSrc);
          break;
        case 3:
          setFeature3Image(newSrc);
          break;
        default:
          console.error("Invalid index for feature image:", index);
          break;
      }
      selectImage(newSrc);
      console.log(`Image for ${identifier} updated.`);
    }
  };

  const handleComponentClick = (event, identifier, index = null) => {
    event.preventDefault();
    event.stopPropagation();
    if (!identifier) {
      console.error("Identifier is missing for handleComponentClick");
      return;
    }
    const elementID = index !== null ? `${identifier}-${index}` : identifier;
    console.log(`${identifier} at index ${index} clicked, setting selected element to '${elementID}'`);
    setSelectedElement(elementID);
  };

  useEffect(() => {
    const featuresElement = document.querySelector('.sss-product-features');
    const eventHandler = () => {
      console.log("Features clicked, setting selected element to 'features'");
      setSelectedElement('features');
    };

    if (featuresElement) {
      featuresElement.addEventListener('click', eventHandler);
    }

    return () => {
      if (featuresElement) {
        featuresElement.removeEventListener('click', eventHandler);
      }
    };
  }, []);


  return (
    <div className="sss-product-features" style={{ ...style, ...settings.features }} id='features'>
      <h2 className="sss-product-features-title" id='featuresTitle' onClick={(event) => handleComponentClick(event, 'featuresTitle')} style={{ ...featureTitleStyles }}>
        <EditableText
          text={featuresTitleText}
          onChange={(newText) => setFeaturesTitleText(newText)}
          
        />
      </h2>
      <div className="sss-product-features-box">
        {/* Top Feature Section */}
        <div className="sss-product-features-box-top">
          <div className="sss-product-features-box-top-left">
            <h3 className="sss-product-features-box-top-left-title" id='endToEndTitle' onClick={(event) => handleComponentClick(event, 'endToEndTitle')} style={{...endToEndTitleStyles}}>
              <EditableText
                text={endToEndText}
                onChange={(newText) => setEndToEndText(newText)}
                
              />
            </h3>
            <p className='sss-product-features-box-top-left-text'  id='endToEndDescription' onClick={(event) => handleComponentClick(event, 'endToEndDescription')} style={{...endToEndDescriptionStyles}}>
              <EditableText
                text={endToEndDesc.text}
                onChange={(newText) => setEndToEndDesc({ ...endToEndDesc, text: newText })}
                
              />
            </p>
            <Link to="/join-us" className="sss-product-navbar-cta" id='featuresJoinUs' onClick={(event) => handleComponentClick(event, 'featuresJoinUs')} style={{...featuresJoinsUsStyles}}>
              <EditableText
                text={joinUsText}
                onChange={(newText) => setEndToEndDesc({ ...endToEndDesc, text: newText })}
                
              />
            </Link>          </div>
          <div className="sss-product-features-box-top-right">
            <ReusableImage
              src={feature1Image}
              onClick={() => handleImageClick(1)}
              openImagePanel={openImagePanel}
              onImageChange={(newSrc) => handleImageChange(newSrc, 1)}
              selectedImage={activeComponent === 'featureImage-1' ? feature1Image : null}
              alt="Feature 1"
              identifier={"Feature1"}
              imageHeight={imageHeight1}
            />
          </div>
        </div>
        {/* Bottom Feature Section */}
        <div className="sss-product-features-box-bottom">
          <div className="sss-product-features-box-bottom-left">
            <ReusableImage
              src={feature2Image}
              onClick={() => handleImageClick(2)}
              openImagePanel={openImagePanel}
              onImageChange={(newSrc) => handleImageChange(newSrc, 2)}
              selectedImage={activeComponent === 'featureImage-2' ? feature2Image : null}
              alt="Mobile applications"
              identifier={"Feature2"}
              imageHeight={imageHeight2}
            />
            <h3 className="sss-product-features-box-bottom-left-title"  id='mobileAppTitle' onClick={(event) => handleComponentClick(event, 'mobileAppTitle')}>
              <EditableText
                text={mobileAppsText}
                onChange={(newText) => setMobileAppsText(newText)}
                style={{...mobileAppsTitleStyles}}
              />
            </h3>
            <p className='sss-product-features-box-top-left-text' id='mobileAppDescription' onClick={(event) => handleComponentClick(event, 'mobileAppDescription')} style={{...mobileAppsDescriptionStyles}}>
              <EditableText
                text={mobileAppsDesc.text}
                onChange={(newText) => setMobileAppsDesc({ ...mobileAppsDesc, text: newText })}
                
              />
            </p>
          </div>
          <div className="sss-product-features-box-bottom-right">
            <h3 className="sss-product-features-box-bottom-right-title" id='uploadShareTitle' onClick={(event) => handleComponentClick(event, 'uploadShareTitle')} style={{...uploadShareTitleStyles}}>
              <EditableText
                text={uploadShareText}
                onChange={(newText) => setUploadShareText(newText)}
                
              />
            </h3>
            <p className='sss-product-features-box-top-left-text' id='uploadShareDescription' onClick={(event) => handleComponentClick(event, 'uploadShareDescription')} style={{...uploadShareDescriptionStyles}}>
              <EditableText
                text={uploadShareDesc.text}
                onChange={(newText) => setUploadShareDesc({ ...uploadShareDesc, text: newText })}
                
              />
            </p>
            <ReusableImage
              src={feature3Image}
              onClick={() => handleImageClick(3)}
              openImagePanel={openImagePanel}
              onImageChange={(newSrc) => handleImageChange(newSrc, 3)}
              selectedImage={activeComponent === 'featureImage-3' ? feature3Image : null}
              alt="Feature 3"
              identifier={"Feature3"}
              imageHeight={imageHeight3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
