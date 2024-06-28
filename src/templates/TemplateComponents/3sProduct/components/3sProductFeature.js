import React, { useState, useEffect } from 'react';
import '../css/feature.css';
import { Link } from 'react-router-dom';

import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import EditableButton from '../../../../components/logiciel/TemplateComponent/EditableButton';

import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';

const FeaturesSection = ({ handleSettingsChange, setSelectedElement, style, settings, openImagePanel, setSelectedColor, onContentChange, handleImageUpload }) => {
  const { getComponentStyle } = useStyle();
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();
  const [imageHeight1, setImage1Height] = useState(null);
  const [imageHeight2, setImage2Height] = useState(null);
  const [imageHeight3, setImage3Height] = useState(null);

  // State for text fields including descriptions
  const [featuresContent, setFeaturesContent] = useState({
    title: localStorage.getItem('featuresTitleText') || 'Essential apps that protect your documents',
    endToEnd: {
      title: localStorage.getItem('endToEndText') || 'End-to-end encrypted inbox and messages',
      description: localStorage.getItem('endToEndDesc') || 'Rorem ipsum dolor sit amet consectetur. Proin dignissim tortor mauris viverra sed volutpat mauris. Amet nisi amet commodo adipiscing ut imperdiet nunc.'
    },
    mobileApps: {
      title: localStorage.getItem('mobileAppsText') || 'Mobile applications',
      description: localStorage.getItem('mobileAppsDesc') || 'Prem ipsum dolor sit amet consectetur. Viverra sed dignissim risus aliquet condimentum. Vulputate varius feugiat egestas congue.'
    },
    uploadShare: {
      title: localStorage.getItem('uploadShareText') || 'Upload, share, and preview any file',
      description: localStorage.getItem('uploadShareDesc') || 'Tellus et adipiscing sit sit mauris pharetra bibendum. Ligula massa netus nulla ultricies purus.'
    },
    joinUs: {
      text: localStorage.getItem('joinUsText') || 'Join Us',
      link: JSON.parse(localStorage.getItem('joinUsLink')) || { url: '#', openInNewTab: false }
    },
    images: [
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-feature-1.png?alt=media&token=b7b15512-08ec-4d4a-a27f-f9dc04cbb5d5', id: 'featureImage-1' },
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-feature-2.png?alt=media&token=832071f6-e477-4f93-b294-ec2b2263ab18', id: 'featureImage-2' },
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-feature-3.png?alt=media&token=4b618f41-4413-463e-b04d-f785eac8c15f', id: 'featureImage-3' }
    ]
  });

  // Styles
  const featureStyles = getComponentStyle('features');
  const featureTitleStyles = getComponentStyle('featuresTitle');
  const endToEndTitleStyles = getComponentStyle('endToEndTitle');
  const endToEndDescriptionStyles = getComponentStyle('endToEndDescription');
  const mobileAppsTitleStyles = getComponentStyle('mobileAppTitle');
  const mobileAppsDescriptionStyles = getComponentStyle('mobileAppDescription');
  const uploadShareTitleStyles = getComponentStyle('uploadShareTitle');
  const uploadShareDescriptionStyles = getComponentStyle('uploadShareDescription');
  const featuresJoinsUsStyles = getComponentStyle('feature-cta');

  const handleTextChange = (newText, identifier, subIdentifier = null) => {
    const updatedContent = { ...featuresContent };
    if (subIdentifier) {
      updatedContent[identifier][subIdentifier] = newText;
    } else {
      updatedContent[identifier] = newText;
    }
    setFeaturesContent(updatedContent);
    localStorage.setItem(identifier + (subIdentifier ? subIdentifier.charAt(0).toUpperCase() + subIdentifier.slice(1) : ''), newText);
    onContentChange(updatedContent);
  };

  const handleLinkChange = (newLink) => {
    const updatedContent = { ...featuresContent, joinUs: { ...featuresContent.joinUs, link: newLink } };
    setFeaturesContent(updatedContent);
    localStorage.setItem('joinUsLink', JSON.stringify(newLink));
    onContentChange(updatedContent);
  };

  const handleImageChange = async (index, newSrc) => {
    const updatedImages = [...featuresContent.images];
    updatedImages[index].src = newSrc;
    const updatedContent = {
      ...featuresContent,
      images: updatedImages
    };
    setFeaturesContent(updatedContent);
    onContentChange(updatedContent);

    // Save the specific changes to Firebase if needed
  };

  const handleComponentClick = (event, identifier) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedElement(identifier);
    console.log(`${identifier} clicked, setting selected element to '${identifier}'`);
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
  }, [setSelectedColor]);

  return (
    <div className="sss-product-features" style={featureStyles} id='features' onClick={(event) => handleComponentClick(event, 'features')}>
      <h2 className="sss-product-features-title" id='featuresTitle' onClick={(event) => handleComponentClick(event, 'featuresTitle')}>
        <EditableText
          text={featuresContent.title}
          onChange={(newText) => handleTextChange(newText, 'title')}
          style={featureTitleStyles}
        />
      </h2>
      <div className="sss-product-features-box">
        {/* Top Feature Section */}
        <div className="sss-product-features-box-top">
          <div className="sss-product-features-box-top-left">
            <h3 className="sss-product-features-box-top-left-title" id='endToEndTitle' onClick={(event) => handleComponentClick(event, 'endToEndTitle')}>
              <EditableText
                text={featuresContent.endToEnd.title}
                onChange={(newText) => handleTextChange(newText, 'endToEnd', 'title')}
                style={endToEndTitleStyles}
              />
            </h3>
            <p className='sss-product-features-box-top-left-text' id='endToEndDescription' onClick={(event) => handleComponentClick(event, 'endToEndDescription')}>
              <EditableText
                text={featuresContent.endToEnd.description}
                onChange={(newText) => handleTextChange(newText, 'endToEnd', 'description')}
                style={endToEndDescriptionStyles}
              />
            </p>
            <Link to={featuresContent.joinUs.link.url} onClick={(event) => handleComponentClick(event, 'feature-cta')} target={featuresContent.joinUs.link.openInNewTab ? "_blank" : "_self"} className='position-relative'>
              <EditableButton
                className="sss-product-feature-cta"
                id='feature-cta'
                text={featuresContent.joinUs.text}
                link={featuresContent.joinUs.link}
                onChange={(newText) => handleTextChange(newText, 'joinUs', 'text')}
                onLinkChange={handleLinkChange}
                style={featuresJoinsUsStyles}
              />
            </Link>
          </div>
          <div className="sss-product-features-box-top-right">
            <ReusableImage
              src={featuresContent.images[0].src}
              onClick={() => enterReplacementMode(featuresContent.images[0].id)}
              openImagePanel={openImagePanel}
              onImageChange={(newSrc) => handleImageChange(0, newSrc)}
              selectedImage={activeComponent === featuresContent.images[0].id ? selectedImage : null}
              alt="Feature 1"
              identifier={featuresContent.images[0].id}
              imageHeight={imageHeight1}
              handleImageUpload={handleImageUpload}
            />
          </div>
        </div>
        {/* Bottom Feature Section */}
        <div className="sss-product-features-box-bottom">
          <div className="sss-product-features-box-bottom-left">
            <ReusableImage
              src={featuresContent.images[1].src}
              onClick={() => enterReplacementMode(featuresContent.images[1].id)}
              openImagePanel={openImagePanel}
              onImageChange={(newSrc) => handleImageChange(1, newSrc)}
              selectedImage={activeComponent === featuresContent.images[1].id ? selectedImage : null}
              alt="Mobile applications"
              identifier={featuresContent.images[1].id}
              imageHeight={imageHeight2}
              handleImageUpload={handleImageUpload}
            />
            <h3 className="sss-product-features-box-bottom-left-title" id='mobileAppTitle' onClick={(event) => handleComponentClick(event, 'mobileAppTitle')}>
              <EditableText
                text={featuresContent.mobileApps.title}
                onChange={(newText) => handleTextChange(newText, 'mobileApps', 'title')}
                style={mobileAppsTitleStyles}
              />
            </h3>
            <p className='sss-product-features-box-top-left-text' id='mobileAppDescription' onClick={(event) => handleComponentClick(event, 'mobileAppDescription')}>
              <EditableText
                text={featuresContent.mobileApps.description}
                onChange={(newText) => handleTextChange(newText, 'mobileApps', 'description')}
                style={mobileAppsDescriptionStyles}
              />
            </p>
          </div>
          <div className="sss-product-features-box-bottom-right">
            <h3 className="sss-product-features-box-bottom-right-title" id='uploadShareTitle' onClick={(event) => handleComponentClick(event, 'uploadShareTitle')}>
              <EditableText
                text={featuresContent.uploadShare.title}
                onChange={(newText) => handleTextChange(newText, 'uploadShare', 'title')}
                style={uploadShareTitleStyles}
              />
            </h3>
            <p className='sss-product-features-box-top-left-text' id='uploadShareDescription' onClick={(event) => handleComponentClick(event, 'uploadShareDescription')}>
              <EditableText
                text={featuresContent.uploadShare.description}
                onChange={(newText) => handleTextChange(newText, 'uploadShare', 'description')}
                style={uploadShareDescriptionStyles}
              />
            </p>
            <ReusableImage
              src={featuresContent.images[2].src}
              onClick={() => enterReplacementMode(featuresContent.images[2].id)}
              openImagePanel={openImagePanel}
              onImageChange={(newSrc) => handleImageChange(2, newSrc)}
              selectedImage={activeComponent === featuresContent.images[2].id ? selectedImage : null}
              alt="Feature 3"
              identifier={featuresContent.images[2].id}
              imageHeight={imageHeight3}
              handleImageUpload={handleImageUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
