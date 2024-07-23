import React, { useState, useEffect } from 'react';
import '../css/joinus.css';
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';
import { Link } from 'react-router-dom';
import EditableButton from '../../../../components/logiciel/TemplateComponent/EditableButton';
import { fetchComponentData, saveComponentData } from '../../../../hooks/Fetchprojects';

const JoinUsSection = ({
  setSelectedElement,
  openImagePanel,
  setSelectedColor,
  onContentChange,
  handleImageUpload,
  selectedProjectId,
  joinUsData
}) => {
  const { getComponentStyle, updateStyle } = useStyle();
  const { enterReplacementMode, activeComponent, selectedImage } = useImageHistory();

  const defaultImageUrl = "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-joinus-1.png?alt=media&token=ab70cb1a-9791-4402-b8db-76c1c790ec91";

  const [joinUsContent, setJoinUsContent] = useState({
    title: 'Join the community',
    description: 'Join our 400,000+ person community and contribute to a more private and decentralized internet. Start for free.',
    cta: 'Join Us',
    imageUrl: defaultImageUrl,
    ctaLink: { url: '#', openInNewTab: false }
  });

  useEffect(() => {
    if (joinUsData) {
      setJoinUsContent({
        title: joinUsData.title || 'Join the community',
        description: joinUsData.description || 'Join our 400,000+ person community and contribute to a more private and decentralized internet. Start for free.',
        cta: joinUsData.cta || 'Join Us',
        imageUrl: joinUsData.imageUrl || defaultImageUrl,
        ctaLink: joinUsData.ctaLink || { url: '#', openInNewTab: false }
      });
    }
  }, [joinUsData]);


  const joinUsStyles = getComponentStyle('joinUs');
  const joinUsTitleStyles = getComponentStyle('joinUsTitle');
  const joinUsDescriptionStyles = getComponentStyle('joinUsDescription');
  const joinUsCtaStyles = getComponentStyle('joinUs-cta');
  const [imageHeight, setImageHeight] = useState(null);

  const handleTextChange = async (newText, textType) => {
    const updatedContent = {
      ...joinUsContent,
      [textType]: newText
    };
    setJoinUsContent(updatedContent);
    updateStyle(textType, { text: newText });
    onContentChange(updatedContent);

    const walletId = sessionStorage.getItem("userAccount");
    if (walletId && selectedProjectId) {
      await saveComponentData(walletId, selectedProjectId, 'joinUs', updatedContent);
    }
  };

  const handleLinkChange = async (newLink) => {
    const updatedContent = {
      ...joinUsContent,
      ctaLink: newLink
    };
    setJoinUsContent(updatedContent);
    onContentChange(updatedContent);

    const walletId = sessionStorage.getItem("userAccount");
    if (walletId && selectedProjectId) {
      await saveComponentData(walletId, selectedProjectId, 'joinUs', updatedContent);
    }
  };

  const handleImageChange = async (newSrc) => {
    const updatedContent = {
      ...joinUsContent,
      imageUrl: newSrc
    };
    setJoinUsContent(updatedContent);
    onContentChange(updatedContent);

    const walletId = sessionStorage.getItem("userAccount");
    if (walletId && selectedProjectId) {
      await saveComponentData(walletId, selectedProjectId, 'joinUs', updatedContent);
    }
  };

  const handleComponentClick = (event, identifier) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedElement(identifier);
    if (identifier === 'JoinUsImage') {
      enterReplacementMode(identifier);
    }
  };

  useEffect(() => {
    if (activeComponent === 'JoinUsImage' && selectedImage && selectedImage !== joinUsContent.imageUrl) {
      handleImageChange(selectedImage);
    }
  }, [selectedImage, activeComponent]);

  useEffect(() => {
    const img = new Image();
    img.src = joinUsContent.imageUrl;
    img.onload = () => setImageHeight(img.height);
  }, [joinUsContent.imageUrl]);

  return (
    <div className='sss-product-joinus-main' style={joinUsStyles} id='joinUs' onClick={(event) => handleComponentClick(event, 'joinUs')}>
      <div className="sss-product-joinus">
        <ReusableImage
          src={joinUsContent.imageUrl}
          alt="Join Us Logo"
          onClick={(event) => handleComponentClick(event, 'JoinUsImage')}
          openImagePanel={openImagePanel}
          selectedImage={activeComponent === 'JoinUsImage' ? selectedImage : null}
          identifier="JoinUsImage"
          imageHeight={imageHeight}
          handleImageUpload={handleImageUpload}
          onImageChange={handleImageChange}
        />
        <h2 className="sss-product-joinus-title" id='joinUsTitle' onClick={(event) => handleComponentClick(event, 'joinUsTitle')}>
          <EditableText
            text={joinUsContent.title}
            onChange={(newText) => handleTextChange(newText, 'title')}
            style={joinUsTitleStyles}
          />
        </h2>
        <p className='sss-product-joinus-text' id='joinUsDescription' onClick={(event) => handleComponentClick(event, 'joinUsDescription')} >
          <EditableText
            text={joinUsContent.description}
            onChange={(newText) => handleTextChange(newText, 'description')}
            style={joinUsDescriptionStyles}
          />
        </p>
        <Link onClick={(event) => handleComponentClick(event, 'joinUs-cta')} className='position-relative'>
          <EditableButton
            id='joinUs-cta'
            className="sss-product-joinus-cta"
            text={joinUsContent.cta}
            link={joinUsContent.ctaLink}
            onChange={(newText) => handleTextChange(newText, 'cta')}
            onLinkChange={handleLinkChange}
            style={joinUsCtaStyles}
          />
        </Link>
      </div>
    </div>
  );
};

export default JoinUsSection;
