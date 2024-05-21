import React, { useState, useEffect } from 'react';
import '../../templates-po/joinus.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';
import { Link } from 'react-router-dom';
import EditableButton from '../../../components/logiciel/TemplateComponent/EditableButton';

const JoinUsSection = ({ setSelectedElement, selectElement, openImagePanel, setSelectedColor, onContentChange }) => {
  const { getComponentStyle, updateStyle } = useStyle();
  const { enterReplacementMode, activeComponent, selectImage, selectedImage } = useImageHistory();

  const [joinUsTitleText, setJoinUsTitleText] = useState(() => {
    const storedText = localStorage.getItem('joinUsTitleText');
    return storedText ? storedText : 'Join the community';
  });

  const [joinUsDescriptionText, setJoinUsDescriptionText] = useState(() => {
    const storedText = localStorage.getItem('joinUsDescriptionText');
    return storedText ? storedText : 'Join our 400,000+ person community and contribute to a more private and decentralized internet. Start for free.';
  });

  const [joinUsCta, setJoinUsCta] = useState(() => {
    const storedText = localStorage.getItem('joinUsCta');
    return storedText ? storedText : 'Join Us';
  });

  const [joinUsImageUrl, setJoinUsImageUrl] = useState("./images/templates-img/3sproduct/3sproduct-joinus-1.png");

  const JoinUsStyles = getComponentStyle('joinUs');
  const joinUsTitleStyles = getComponentStyle('joinUsTitle');
  const joinUsescriptionStyles = getComponentStyle('joinUsDescription');
  const joinUsCtaStyles = getComponentStyle('joinUs-cta');
  const [joinUsCtaLink, setJoinUsCtaLink] = useState({
    url: '#',
    openInNewTab: false
  });

  const [imageHeight, setImageHeight] = useState(null);
  const getImageHeight = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img.height);
    });
  };

  const handleCtaTextChange = (newText) => {
    setJoinUsCta(newText);
    localStorage.setItem('joinUsCta', newText);
  };

  const handleCtaLinkChange = (newLink) => {
    setJoinUsCtaLink(newLink);
    localStorage.setItem('joinUsCtaLink', JSON.stringify(newLink));
  };

  const handleTextChange = (newText, textType) => {
    console.log(`Updating text for ${textType}: ${newText}`);
    console.log(`Current styles for ${textType}:`, getComponentStyle(textType));

    switch (textType) {
      case 'joinUsTitle':
        setJoinUsTitleText(newText);
        localStorage.setItem('joinUsTitleText', newText);
        break;
      case 'joinUsDescription':
        setJoinUsDescriptionText(newText);
        localStorage.setItem('joinUsDescriptionText', newText);
        break;
      case 'joinUsCta':
        setJoinUsCta(newText);
        localStorage.setItem('joinUsCta', newText);
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

  // Update image interaction to better manage clicks and mode switching
  const handleImageClick = () => {
    console.log("Join Us image clicked, opening replacement mode.");
    enterReplacementMode('JoinUsSection');
    setSelectedElement('JoinUsImage');
  };


  useEffect(() => {
    const cssVarName = `--joinUs-background-color`;
    const storedColor = localStorage.getItem(cssVarName);

    if (storedColor) {
      setSelectedColor(storedColor);
      document.documentElement.style.setProperty(cssVarName, storedColor);
    }
  }, [setSelectedColor]);

  // Storing text changes in localStorage and updating state
  useEffect(() => {
    localStorage.setItem('joinUsTitleText', joinUsTitleText);
    localStorage.setItem('joinUsDescriptionText', joinUsDescriptionText);
    localStorage.setItem('joinUsCta', joinUsCta);
    // Inside JoinUsSection, call onContentChange with the updated state
    onContentChange({
      title: joinUsTitleText,
      description: joinUsDescriptionText,
      cta: joinUsCta,
      imageUrl: joinUsImageUrl
    });

  }, [joinUsTitleText, joinUsDescriptionText, joinUsCta]);

  // Update image URL in state and possibly local storage if necessary
  useEffect(() => {
    if (activeComponent === 'JoinUsImage' && selectedImage !== joinUsImageUrl) {
      setJoinUsImageUrl(selectedImage);
      // Optionally, save to localStorage if you plan to persist images changes
      // localStorage.setItem('joinUsImageUrl', selectedImage);
    }
  }, [selectedImage, activeComponent]);
  useEffect(() => {
    getImageHeight(joinUsImageUrl).then((height) => setImageHeight(height));
  }, []);
  return (
    <div className='sss-product-joinus-main' style={JoinUsStyles} id='joinUs' onClick={(event) => handleComponentClick(event, 'joinUs')}>
      <div className="sss-product-joinus">
        <ReusableImage
          src={joinUsImageUrl}
          alt="Join Us Logo"
          onClick={handleImageClick}
          openImagePanel={openImagePanel}
          selectedImage={activeComponent === 'JoinUsImage' ? selectedImage : null}
          identifier="JoinUs"
          imageHeight={imageHeight}
        />
        <h2 className="sss-product-joinus-title" id='joinUsTitle' onClick={(event) => handleComponentClick(event, 'joinUsTitle')}>
          <EditableText
            text={joinUsTitleText}
            onChange={(newText) => handleTextChange(newText, 'joinUsTitle')}
            style={joinUsTitleStyles}
          />
        </h2>
        <p className='sss-product-joinus-text' id='joinUsDescription' onClick={(event) => handleComponentClick(event, 'joinUsDescription')} >
          <EditableText
            text={joinUsDescriptionText}
            onChange={(newText) => handleTextChange(newText, 'joinUsDescription')}
            style={joinUsescriptionStyles}
          />
        </p>
        <Link onClick={(event) => handleComponentClick(event, 'joinUs-cta')} className='position-relative'>
          <EditableButton
            id='joinUs-cta'
            className="sss-product-joinus-cta"
            text={joinUsCta}
            link={joinUsCtaLink}
            onChange={handleCtaTextChange}
            onLinkChange={handleCtaLinkChange}
            style={joinUsCtaStyles}
          />

        </Link>
      </div>
    </div>
  );
};

export default JoinUsSection;
