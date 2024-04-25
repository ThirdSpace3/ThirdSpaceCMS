import React, { useState } from 'react';
import '../../templates-po/feature.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const FeaturesSection = ({ onClick, handleSettingsChange, selectElement, openImagePanel }) => {
  const { getComponentStyle } = useStyle();
  const { selectedImage, updateSelectedImage } = useImageHistory();

  // State for text fields including descriptions
  const [featuresTitleText, setFeaturesTitleText] = useState('Essential apps that protect your documents');
  const [endToEndText, setEndToEndText] = useState('End-to-end encrypted inbox and messages');
  const [endToEndDesc, setEndToEndDesc] = useState({
    text: 'Rorem ipsum dolor sit amet consectetur. Proin dignissim tortor mauris viverra sed volutpat mauris. Amet nisi amet commodo adipiscing ut imperdiet nunc.',
    style: { color: '#8f9bb7', fontFamily: 'Inter', fontSize: '16px', fontWeight: '400' }
  });
  const [mobileAppsText, setMobileAppsText] = useState('Mobile applications');
  const [mobileAppsDesc, setMobileAppsDesc] = useState({
    text: 'Prem ipsum dolor sit amet consectetur. Viverra sed dignissim risus aliquet condimentum. Vulputate varius feugiat egestas congue.',
    style: { color: '#8f9bb7', fontFamily: 'Inter', fontSize: '16px', fontWeight: '400' }
  });
  const [uploadShareText, setUploadShareText] = useState('Upload, share, and preview any file');
  const [uploadShareDesc, setUploadShareDesc] = useState({
    text: 'Tellus et adipiscing sit sit mauris pharetra bibendum. Ligula massa netus nulla ultricies purus.',
    style: { color: '#8f9bb7', fontFamily: 'Inter', fontSize: '16px', fontWeight: '400' }
  });

  // State for image sources
  const [feature1Image, setFeature1Image] = useState('./images/templates-img/3sproduct/3sproduct-feature-1.png');
  const [feature2Image, setFeature2Image] = useState('./images/templates-img/3sproduct/3sproduct-feature-2.png');
  const [feature3Image, setFeature3Image] = useState('./images/templates-img/3sproduct/3sproduct-feature-3.png');

  return (
    <div className="sss-product-features" onClick={onClick}>
      <h2 className="sss-product-features-title">
        <EditableText
          text={featuresTitleText}
          onChange={(newText) => setFeaturesTitleText(newText)}
          style={getComponentStyle('featuresTitle') || { fontFamily: 'Outfit', fontSize: '56px', fontWeight: '700', color: '#f6f6f7' }}
          selectElement={selectElement}
        />
      </h2>
      <div className="sss-product-features-box">
        {/* Top Feature Section */}
        <div className="sss-product-features-box-top">
          <div className="sss-product-features-box-top-left">
            <h3 className="sss-product-features-box-top-left-title">
              <EditableText
                text={endToEndText}
                onChange={(newText) => setEndToEndText(newText)}
                style={getComponentStyle('featuresTopLeftTitle')}
                selectElement={selectElement}
              />
            </h3>
            <EditableText
              text={endToEndDesc.text}
              onChange={(newText) => setEndToEndDesc({...endToEndDesc, text: newText})}
              style={endToEndDesc.style}
              selectElement={selectElement}
            />
            <a href="" className="sss-product-features-box-top-left-cta">Join Us</a>
          </div>
          <div className="sss-product-features-box-top-right">
            <ReusableImage
              src={feature1Image}
              onClick={() => setFeature1Image(selectedImage || feature1Image)}
              openImagePanel={openImagePanel}
              selectElement={selectElement}
              alt="Feature 1"
            />
          </div>
        </div>
        {/* Bottom Feature Section */}
        <div className="sss-product-features-box-bottom">
          <div className="sss-product-features-box-bottom-left">
            <ReusableImage
              src={feature2Image}
              onClick={() => setFeature2Image(selectedImage || feature2Image)}
              openImagePanel={openImagePanel}
              selectElement={selectElement}
              alt="Mobile applications"
            />
            <h3 className="sss-product-features-box-bottom-left-title">
              <EditableText
                text={mobileAppsText}
                onChange={(newText) => setMobileAppsText(newText)}
                style={getComponentStyle('featuresBottomLeftTitle')}
                selectElement={selectElement}
              />
            </h3>
            <EditableText
              text={mobileAppsDesc.text}
              onChange={(newText) => setMobileAppsDesc({...mobileAppsDesc, text: newText})}
              style={mobileAppsDesc.style}
              selectElement={selectElement}
            />
          </div>
          <div className="sss-product-features-box-bottom-right">
            <h3 className="sss-product-features-box-bottom-right-title">
              <EditableText
                text={uploadShareText}
                onChange={(newText) => setUploadShareText(newText)}
                style={getComponentStyle('featuresBottomRightTitle')}
                selectElement={selectElement}
              />
            </h3>
            <EditableText
              text={uploadShareDesc.text}
              onChange={(newText) => setUploadShareDesc({...uploadShareDesc, text: newText})}
              style={uploadShareDesc.style}
              selectElement={selectElement}
            />
            <ReusableImage
              src={feature3Image}
              onClick={() => setFeature3Image(selectedImage || feature3Image)}
              openImagePanel={openImagePanel}
              selectElement={selectElement}
              alt="Feature 3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
