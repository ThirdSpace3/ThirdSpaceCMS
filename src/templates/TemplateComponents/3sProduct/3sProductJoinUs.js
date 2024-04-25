import React, { useState } from 'react';
import '../../templates-po/joinus.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext'; // Import the image history context
import { Link } from 'react-router-dom';

const JoinUsSection = ({ handleSettingsChange, selectElement, openImagePanel }) => {
  const { getComponentStyle, updateStyle } = useStyle();
  const { enterReplacementMode, activeComponent, selectImage, selectedImage } = useImageHistory(); // Use context for image handling

  // States for texts and their styles
  const [joinUsTitleText, setJoinUsTitleText] = useState('Join the community');
  const [joinUsDescriptionText, setJoinUsDescriptionText] = useState('Join our 400,000+ person community and contribute to a more private and decentralized internet. Start for free.');
  const [joinUsCta, setjoinUsCta] = useState('Join Us');
  const [joinUsImageUrl, setJoinUsImageUrl] = useState("./images/templates-img/3sproduct/3sproduct-joinus-1.png");

  const handleTextChange = (newText, setter) => {
    setter(newText);
  };

  const handleTextStyleChange = (textType, newStyle) => {
    updateStyle(textType, newStyle);
  };

  const handleImageClick = () => {
    enterReplacementMode('JoinUsImage');
  };

  const handleImageChange = (newSrc) => {
    if (activeComponent === 'JoinUsImage') {
      setJoinUsImageUrl(newSrc);
      selectImage(newSrc);
    }
  };

  return (
    <div className='sss-product-joinus-main'>
      <div className="sss-product-joinus">
        <ReusableImage
          src={joinUsImageUrl}
          alt="Join Us Logo"
          onClick={handleImageClick}
          openImagePanel={openImagePanel}
          onImageChange={handleImageChange}
          selectedImage={activeComponent === 'JoinUsImage' ? selectedImage : null}
          imageHeight="80px"
          identifier={"joinUs"}
        />
        <h2 className="sss-product-joinus-title">
          <EditableText
            text={joinUsTitleText}
            style={getComponentStyle('joinUsTitle')}
            onChange={(text) => handleTextChange(text, setJoinUsTitleText)}
            onStyleChange={(style) => handleTextStyleChange('joinUsTitle', style)}
            selectElement={selectElement}
          />
        </h2>
        <p className='sss-product-joinus-text'>
          <EditableText
            text={joinUsDescriptionText}
            style={getComponentStyle('joinUsDescription')}
            onChange={(text) => handleTextChange(text, setJoinUsDescriptionText)}
            onStyleChange={(style) => handleTextStyleChange('joinUsDescription', style)}
            selectElement={selectElement}
          />
        </p>
        <Link to="/join-us" className="sss-product-navbar-cta">
          <EditableText
            text={joinUsCta}
            style={getComponentStyle('joinUsCta')}
            onChange={(text) => handleTextChange(text, setjoinUsCta)}
            onStyleChange={(style) => handleTextStyleChange('joinUsCta', style)}
            selectElement={selectElement}
          />
        </Link>
      </div>
    </div>
  );
};

export default JoinUsSection;
