import React, { useState, useEffect } from 'react';
import '../../templates-po/feature.css';
import { Link } from 'react-router-dom';

import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';
import { get } from 'lodash';
const FeaturesSection = ({ handleSettingsChange, setSelectedElement, style, settings, openImagePanel, setSelectedColor ,onContentChange }) => {
  const { getComponentStyle } = useStyle();
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();

  // State for text fields including descriptions
  const [featuresTitleText, setFeaturesTitleText] = useState(() => {
    const storedText = localStorage.getItem('featuresTitleText');
    return storedText ? storedText : 'Essential apps that protect your documents';
  });

  const [endToEndText, setEndToEndText] = useState(() => {
    const storedText = localStorage.getItem('endToEndText');
    return storedText ? storedText : 'End-to-end encrypted inbox and messages';
  });

  const [endToEndDesc, setEndToEndDesc] = useState(() => {
    const storedText = localStorage.getItem('endToEndDesc');
    return storedText
      ? { text: storedText }
      : {
          text: 'Rorem ipsum dolor sit amet consectetur. Proin dignissim tortor mauris viverra sed volutpat mauris. Amet nisi amet commodo adipiscing ut imperdiet nunc.',
        };
  });

  const [mobileAppsText, setMobileAppsText] = useState(() => {
    const storedText = localStorage.getItem('mobileAppsText');
    return storedText ? storedText : 'Mobile applications';
  });

  const [mobileAppsDesc, setMobileAppsDesc] = useState(() => {
    const storedText = localStorage.getItem('mobileAppsDesc');
    return storedText
      ? { text: storedText }
      : {
          text: 'Prem ipsum dolor sit amet consectetur. Viverra sed dignissim risus aliquet condimentum. Vulputate varius feugiat egestas congue.',
        };
  });

  const [uploadShareText, setUploadShareText] = useState(() => {
    const storedText = localStorage.getItem('uploadShareText');
    return storedText ? storedText : 'Upload, share, and preview any file';
  });

  const [uploadShareDesc, setUploadShareDesc] = useState(() => {
    const storedText = localStorage.getItem('uploadShareDesc');
    return storedText
      ? { text: storedText }
      : {
          text: 'Tellus et adipiscing sit sit mauris pharetra bibendum. Ligula massa netus nulla ultricies purus.',
        };
  });

  const [joinUsText, setJoinUsText] = useState(() => {
    const storedText = localStorage.getItem('joinUsText');
    return storedText ? storedText : 'Join Us';
  });

  // State for image sources
  const [feature1Image, setFeature1Image] = useState('./images/templates-img/3sproduct/3sproduct-feature-1.png');
  const [feature2Image, setFeature2Image] = useState('./images/templates-img/3sproduct/3sproduct-feature-2.png');
  const [feature3Image, setFeature3Image] = useState('./images/templates-img/3sproduct/3sproduct-feature-3.png');
  const [imageHeight1, setImage1Height] = useState(null);
  const [imageHeight2, setImage2Height] = useState(null);
  const [imageHeight3, setImage3Height] = useState(null);

  //Styles  

  const featureStyles = getComponentStyle('features');
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
  }, [selectedImage, activeComponent]);
  


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
    const eventHandler = (event) => {
      console.log("Features clicked, setting selected element to 'features'");
      setSelectedElement('features');
    };
  
    featuresElement?.addEventListener('click', eventHandler);
    return () => {
      featuresElement?.removeEventListener('click', eventHandler);
    };
  }, []);

  useEffect(() => {
    const cssVarName = `--features-background-color`;
    const storedColor = localStorage.getItem(cssVarName);
  
    if (storedColor) {
      setSelectedColor(storedColor);
      document.documentElement.style.setProperty(cssVarName, storedColor);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('featuresTitleText', featuresTitleText);
    localStorage.setItem('endToEndText', endToEndText);
    localStorage.setItem('endToEndDesc', endToEndDesc.text);
    localStorage.setItem('mobileAppsText', mobileAppsText);
    localStorage.setItem('mobileAppsDesc', mobileAppsDesc.text);
    localStorage.setItem('uploadShareText', uploadShareText);
    localStorage.setItem('uploadShareDesc', uploadShareDesc.text);
    localStorage.setItem('joinUsText', joinUsText);
  }, [featuresTitleText, endToEndText, endToEndDesc.text, mobileAppsText, mobileAppsDesc.text, uploadShareText, uploadShareDesc.text, joinUsText]);
  // Assuming there's a prop from the parent component named `onContentChange`
useEffect(() => {
  onContentChange({
    title: featuresTitleText,
    endToEnd: { title: endToEndText, description: endToEndDesc.text },
    mobileApps: { title: mobileAppsText, description: mobileAppsDesc.text },
    uploadShare: { title: uploadShareText, description: uploadShareDesc.text },
    joinUsText: joinUsText,
    images: [feature1Image, feature2Image, feature3Image]
  });
}, [featuresTitleText, endToEndText, endToEndDesc.text, mobileAppsText, mobileAppsDesc.text, uploadShareText, uploadShareDesc.text, joinUsText, feature1Image, feature2Image, feature3Image]);

  return (
    <div className="sss-product-features" style={{ ...featureStyles }} id='features' onClick={(event) => handleComponentClick(event, 'features')}>
      <h2 className="sss-product-features-title" id='featuresTitle' onClick={(event) => handleComponentClick(event, 'featuresTitle')} >
        <EditableText
          text={featuresTitleText}
          onChange={(newText) => setFeaturesTitleText(newText)}
          style={{ ...featureTitleStyles }}
        />
      </h2>
      <div className="sss-product-features-box">
        {/* Top Feature Section */}
        <div className="sss-product-features-box-top">
          <div className="sss-product-features-box-top-left">
            <h3 className="sss-product-features-box-top-left-title" id='endToEndTitle' onClick={(event) => handleComponentClick(event, 'endToEndTitle')} >
              <EditableText
                text={endToEndText}
                onChange={(newText) => setEndToEndText(newText)}
                style={{...endToEndTitleStyles}}
              />
            </h3>
            <p className='sss-product-features-box-top-left-text'  id='endToEndDescription' onClick={(event) => handleComponentClick(event, 'endToEndDescription')} >
              <EditableText
                text={endToEndDesc.text}
                onChange={(newText) => setEndToEndDesc({ ...endToEndDesc, text: newText })}
                style={{...endToEndDescriptionStyles}}
              />
            </p>
            <Link to="/join-us" className="sss-product-navbar-cta" id='featuresJoinUs' onClick={(event) => handleComponentClick(event, 'featuresJoinUs')} >
              <EditableText
                text={joinUsText}
                onChange={(newText) => setEndToEndDesc({ ...endToEndDesc, text: newText })}
                style={{...featuresJoinsUsStyles}}
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
            <p className='sss-product-features-box-top-left-text' id='mobileAppDescription' onClick={(event) => handleComponentClick(event, 'mobileAppDescription')} >
              <EditableText
                text={mobileAppsDesc.text}
                onChange={(newText) => setMobileAppsDesc({ ...mobileAppsDesc, text: newText })}
                style={{...mobileAppsDescriptionStyles}}
              />
            </p>
          </div>
          <div className="sss-product-features-box-bottom-right">
            <h3 className="sss-product-features-box-bottom-right-title" id='uploadShareTitle' onClick={(event) => handleComponentClick(event, 'uploadShareTitle')}>
              <EditableText
                text={uploadShareText}
                onChange={(newText) => setUploadShareText(newText)}
                 style={{...uploadShareTitleStyles}}
              />
            </h3>
            <p className='sss-product-features-box-top-left-text' id='uploadShareDescription' onClick={(event) => handleComponentClick(event, 'uploadShareDescription')} >
              <EditableText
                text={uploadShareDesc.text}
                onChange={(newText) => setUploadShareDesc({ ...uploadShareDesc, text: newText })}
                style={{...uploadShareDescriptionStyles}}
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
