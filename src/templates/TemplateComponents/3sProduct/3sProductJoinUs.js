import React, { useState, useEffect } from 'react';
import '../../templates-po/joinus.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';
import { Link } from 'react-router-dom';

const JoinUsSection = ({ setSelectedElement, selectElement, openImagePanel }) => {
  const { getComponentStyle, updateStyle } = useStyle();
  const { enterReplacementMode, activeComponent, selectImage, selectedImage } = useImageHistory();

  const [joinUsTitleText, setJoinUsTitleText] = useState('Join the community');
  const [joinUsDescriptionText, setJoinUsDescriptionText] = useState('Join our 400,000+ person community and contribute to a more private and decentralized internet. Start for free.');
  const [joinUsCta, setjoinUsCta] = useState('Join Us');
  const [joinUsImageUrl, setJoinUsImageUrl] = useState("./images/templates-img/3sproduct/3sproduct-joinus-1.png");

  const JoinUsStyles = getComponentStyle('joinUs');
  const joinUsTitleStyles = getComponentStyle('joinUsTitle');
  const joinUsescriptionStyles = getComponentStyle('joinUsDescription');
  const joinUsCtaStyles = getComponentStyle('joinUsCta');

  const [imageHeight, setImageHeight] = useState(null);
  const getImageHeight = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img.height);
    });
  };
  useEffect(() => {
    getImageHeight(joinUsImageUrl).then((height) => setImageHeight(height));
  }, []);

  const handleTextChange = (newText, textType) => {
    console.log(`Updating text for ${textType}: ${newText}`);
    console.log(`Current styles for ${textType}:`, getComponentStyle(textType));

    switch (textType) {
      case 'heroTitle':
        setJoinUsTitleText(newText);
        break;
      case 'description':
        setJoinUsDescriptionText(newText);
        break;
      case 'joinUs':
        setjoinUsCta(newText);
        break;
      default:
        break;
    }
    updateStyle(textType, { text: newText });
    console.log(`Requested style update for ${textType}`);
  };

  const handleComponentClick = (event, identifier) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(`${identifier} clicked, setting selected element to '${identifier}'`);
    setSelectedElement(identifier);
  };


  return (
    <div className='sss-product-joinus-main'  style={JoinUsStyles} id='joinUs' onClick={(event) => handleComponentClick(event, 'joinUs')}>
      <div className="sss-product-joinus" >
        <ReusableImage
          src={joinUsImageUrl}
          alt="Join Us Logo"
          onClick={() => enterReplacementMode('JoinUsSection')}
          openImagePanel={openImagePanel}
          selectedImage={activeComponent === 'JoinUsImage' ? selectedImage : null}
          identifier={"joinUs"}
          imageHeight={imageHeight}
          selectImage={handleComponentClick}
  
        />
        <h2 className="sss-product-joinus-title" id='joinUsTitle' onClick={(event) => handleComponentClick(event, 'joinUsTitle')} >
          <EditableText
            text={joinUsTitleText}
            onChange={(newText) => handleTextChange(newText, 'joinUsTitle')}
            style={joinUsTitleStyles}

          />
        </h2>
        <p className='sss-product-joinus-text' id='joinUsDescription' onClick={(event) => handleComponentClick(event, 'joinUsDescription')} style={joinUsescriptionStyles}>
          <EditableText
            text={joinUsDescriptionText}
            onChange={(newText) => handleTextChange(newText, 'joinUsDescription')}
          />
        </p>
        <Link to="/join-us" className="sss-product-navbar-cta" id='joinUsCta' onClick={(event) => handleComponentClick(event, 'joinUsCta')}>
          <EditableText
            text={joinUsCta}
            style={joinUsCtaStyles}
            onChange={(newText) => handleTextChange(newText, 'joinUsCta')}
          />
        </Link>
      </div>
    </div>
  );
};

export default JoinUsSection;
