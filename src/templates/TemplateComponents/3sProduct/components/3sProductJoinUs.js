import React, { useState, useEffect } from 'react';
import '../css/joinus.css';
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';
import { Link } from 'react-router-dom';
import EditableButton from '../../../../components/logiciel/TemplateComponent/EditableButton';
import { fetchComponentData, saveComponentData } from '../../../../hooks/Fetchprojects';

const JoinUsSection = ({ setSelectedElement, openImagePanel, setSelectedColor, onContentChange, handleImageUpload, selectedProjectId }) => {
  const { getComponentStyle, updateStyle } = useStyle();
  const { enterReplacementMode, activeComponent, selectImage, selectedImage } = useImageHistory();

  const defaultImageUrl = "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-joinus-1.png?alt=media&token=ab70cb1a-9791-4402-b8db-76c1c790ec91";

  const [joinUsContent, setJoinUsContent] = useState({
    title: 'Join the community',
    description: 'Join our 400,000+ person community and contribute to a more private and decentralized internet. Start for free.',
    cta: 'Join Us',
    imageUrl: defaultImageUrl,
    ctaLink: { url: '#', openInNewTab: false }
  });

  useEffect(() => {
    const fetchData = async () => {
      if (selectedProjectId) {
        const walletId = sessionStorage.getItem("userAccount");
        if (walletId) {
          try {
            const data = await fetchComponentData(walletId, selectedProjectId, 'joinUs');
            if (data) {
              setJoinUsContent({
                title: data.title || 'Join the community',
                description: data.description || 'Join our 400,000+ person community and contribute to a more private and decentralized internet. Start for free.',
                cta: data.cta || 'Join Us',
                imageUrl: data.imageUrl || defaultImageUrl,
                ctaLink: data.ctaLink || { url: '#', openInNewTab: false }
              });
            }
          } catch (error) {
            console.error('Error fetching joinUs data:', error);
          }
        }
      }
    };

    fetchData();
  }, [selectedProjectId]);

  const joinUsStyles = getComponentStyle('joinUs');
  const joinUsTitleStyles = getComponentStyle('joinUsTitle');
  const joinUsDescriptionStyles = getComponentStyle('joinUsDescription');
  const joinUsCtaStyles = getComponentStyle('joinUs-cta');
  const [imageHeight, setImageHeight] = useState(null);

  const handleTextChange = (newText, textType) => {
    setJoinUsContent(prev => ({
      ...prev,
      [textType]: newText
    }));
    updateStyle(textType, { text: newText });
    onContentChange({
      ...joinUsContent,
      [textType]: newText
    });

    // Save the specific changes to Firebase if needed
    const walletId = sessionStorage.getItem("userAccount");
    if (walletId && selectedProjectId) {
      saveComponentData(walletId, selectedProjectId, 'joinUs', {
        ...joinUsContent,
        [textType]: newText
      });
    }
  };

  const handleLinkChange = (newLink) => {
    setJoinUsContent(prev => ({
      ...prev,
      ctaLink: newLink
    }));
    onContentChange({
      ...joinUsContent,
      ctaLink: newLink
    });

    // Save the specific changes to Firebase if needed
    const walletId = sessionStorage.getItem("userAccount");
    if (walletId && selectedProjectId) {
      saveComponentData(walletId, selectedProjectId, 'joinUs', {
        ...joinUsContent,
        ctaLink: newLink
      });
    }
  };

  const handleImageChange = async (newSrc) => {
    setJoinUsContent(prev => ({
      ...prev,
      imageUrl: newSrc
    }));
    onContentChange({
      ...joinUsContent,
      imageUrl: newSrc
    });

    const walletId = sessionStorage.getItem("userAccount");
    if (walletId && selectedProjectId) {
      saveComponentData(walletId, selectedProjectId, 'joinUs', {
        ...joinUsContent,
        imageUrl: newSrc
      });
    }
  };

  const handleComponentClick = (event, identifier) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedElement(identifier);
  };

  useEffect(() => {
    if (activeComponent === 'JoinUsImage' && selectedImage !== joinUsContent.imageUrl) {
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
          onClick={() => handleComponentClick(null, 'JoinUsImage')}
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
