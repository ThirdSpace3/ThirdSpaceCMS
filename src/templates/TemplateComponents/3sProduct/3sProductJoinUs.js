import React, { useState } from 'react';
import '../../templates-po/joinus.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import { useStyle } from '../../../hooks/StyleContext';

const JoinUsSection = ({ onClick, handleSettingsChange, selectElement }) => {
  const { getComponentStyle } = useStyle();
  const [joinUsTitleText, setJoinUsTitleText] = useState('Join the community');
  const [joinUsTitleStyle, setJoinUsTitleStyle] = useState({ fontFamily: 'Outfit', fontSize: '24px', fontWeight: '600', color: '#333', textAlign: 'center' });
  const [joinUsDescriptionText, setJoinUsDescriptionText] = useState('Join our 400,000+ person community and contribute to a more private and decentralized internet. Start for free.');

  const handleTextChange = (newText, type) => {
    if (type === 'title') {
      setJoinUsTitleText(newText);
    } else if (type === 'description') {
      setJoinUsDescriptionText(newText);
    }
  };

  const handleTextStyleChange = (newStyle, type) => {
    if (type === 'title') {
      setJoinUsTitleStyle(newStyle);
    }
  };

  return (
    <div className='sss-product-joinus-main' onClick={onClick}>
    <div className="sss-product-joinus"  >
      <img
        src="./images/templates-img/3sproduct/3sproduct-joinus-1.png"
        className="sss-product-joinus-logo"
        alt="Join Us"
      />
      <h2 className="sss-product-joinus-title">
        <EditableText
          text={joinUsTitleText}
          style={joinUsTitleStyle}
          onChange={(text) => handleTextChange(text, 'title')}
          onStyleChange={(style) => handleTextStyleChange(style, 'title')}
          selectElement={selectElement}
        />
      </h2>
      <EditableText
        text={joinUsDescriptionText}
        style={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: 'normal', color: '#666', textAlign: 'left' }}
        onChange={(text) => handleTextChange(text, 'description')}
        onStyleChange={() => {}}
        selectElement={() => {}}
      />
      <a href="/join-discord" className="sss-product-joinus-cta">Join Discord</a>
    </div>
    </div>
  );
};

export default JoinUsSection;
