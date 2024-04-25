import React, { useState } from 'react';
import '../../templates-po/joinus.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { Link } from 'react-router-dom';
const JoinUsSection = ({ handleSettingsChange, selectElement, openImagePanel }) => {
  const { getComponentStyle, updateStyle } = useStyle();

  // States for texts and their styles
  const [joinUsTitleText, setJoinUsTitleText] = useState('Join the community');
  const [joinUsDescriptionText, setJoinUsDescriptionText] = useState('Join our 400,000+ person community and contribute to a more private and decentralized internet. Start for free.');
  const [joinUsCta, setjoinUsCta] = useState('Join Us');

  const defaultJoinUsStyle = getComponentStyle('joinUs');
  const defaultTitleStyle = getComponentStyle('joinUsTitle') || {
    fontFamily: 'Outfit',
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    textAlign: 'center'
  };
  const defaultDescriptionStyle = getComponentStyle('joinUsDescription') || {
    fontFamily: 'inter',
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#8f9bb7',
    textAlign: 'left'
  };

  const handleTextChange = (newText, setter) => {
    setter(newText);
  };

  const handleTextStyleChange = (textType, newStyle) => {
    updateStyle(textType, newStyle);
  };

  return (
    <div className='sss-product-joinus-main'>
      <div className="sss-product-joinus">
        <ReusableImage
          src="./images/templates-img/3sproduct/3sproduct-joinus-1.png"
          alt="Join Us Logo"
          openImagePanel={openImagePanel}
          imageHeight="80px" // Adjust as needed
        />
        <h2 className="sss-product-joinus-title">
          <EditableText
            text={joinUsTitleText}
            style={defaultJoinUsStyle}
            onChange={(text) => handleTextChange(text, setJoinUsTitleText)}
            onStyleChange={(style) => handleTextStyleChange('joinUsTitle', style)}
            selectElement={selectElement}
          />
        </h2>
        <p className='sss-product-joinus-text'>
          <EditableText
            text={joinUsDescriptionText}
            style={defaultJoinUsStyle}
            onChange={(text) => handleTextChange(text, setJoinUsDescriptionText)}
            onStyleChange={(style) => handleTextStyleChange('joinUsDescription', style)}
            selectElement={selectElement}
          />
        </p>
        <Link to="/join-us" className="sss-product-navbar-cta">
          <EditableText
            text={joinUsCta}
            style={defaultJoinUsStyle}
            onChange={(text) => handleTextChange(text, setjoinUsCta)}
            onStyleChange={(style) => handleTextStyleChange('joinUsCta', style)}
            selectElement={selectElement}
          />
        </Link>      </div>
    </div>
  );
};

export default JoinUsSection;
