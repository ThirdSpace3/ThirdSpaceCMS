import React, { useState, useEffect } from 'react';
import '../css/joinus.css';
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';
import { Link } from 'react-router-dom';
import EditableButton from '../../../../components/logiciel/TemplateComponent/EditableButton';

const JoinUsSection = ({ setSelectedElement, openImagePanel, setSelectedColor, onContentChange, handleImageUpload }) => {
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

  const [joinUsImageUrl, setJoinUsImageUrl] = useState("https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-joinus-1.png?alt=media&token=ab70cb1a-9791-4402-b8db-76c1c790ec91");

  const joinUsStyles = getComponentStyle('joinUs');
  const joinUsTitleStyles = getComponentStyle('joinUsTitle');
  const joinUsDescriptionStyles = getComponentStyle('joinUsDescription');
  const joinUsCtaStyles = getComponentStyle('joinUs-cta');
  const [joinUsCtaLink, setJoinUsCtaLink] = useState({
    url: '#',
    openInNewTab: false
  });

  const [imageHeight, setImageHeight] = useState(null);

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

  const handleImageClick = () => {
    console.log("Join Us image clicked, opening replacement mode.");
    enterReplacementMode('JoinUsImage');
    setSelectedElement('JoinUsImage');
  };

  const handleImageChange = async (newSrc) => {
    const updatedContent = {
      ...joinUsImageUrl,
      imageUrl: newSrc
    };
    setJoinUsImageUrl(newSrc);
    onContentChange(updatedContent);

    const downloadURL = await handleImageUpload(newSrc, 'joinUsImageUrl');
    if (downloadURL) {
      setJoinUsImageUrl(downloadURL);
      console.log('Saved new image URL:', downloadURL);
    }
  };

  useEffect(() => {
    const cssVarName = `--joinUs-background-color`;
    const storedColor = localStorage.getItem(cssVarName);

    if (storedColor) {
      setSelectedColor(storedColor);
      document.documentElement.style.setProperty(cssVarName, storedColor);
    }
  }, [setSelectedColor]);

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

  useEffect(() => {
    if (activeComponent === 'JoinUsImage' && selectedImage !== joinUsImageUrl) {
      handleImageChange(selectedImage);
    }
  }, [selectedImage, activeComponent]);

  useEffect(() => {
    const img = new Image();
    img.src = joinUsImageUrl;
    img.onload = () => setImageHeight(img.height);
  }, [joinUsImageUrl]);

  return (
    <div className='sss-product-joinus-main' style={joinUsStyles} id='joinUs' onClick={(event) => handleComponentClick(event, 'joinUs')}>
      <div className="sss-product-joinus">
        <ReusableImage
          src={joinUsImageUrl}
          alt="Join Us Logo"
          onClick={handleImageClick}
          openImagePanel={openImagePanel}
          selectedImage={activeComponent === 'JoinUsImage' ? selectedImage : null}
          identifier="JoinUsImage"
          imageHeight={imageHeight}
          handleImageUpload={handleImageUpload}
          onImageChange={handleImageChange} // Added this line
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
            style={joinUsDescriptionStyles}
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
