import React, { useState, useEffect } from 'react';
import '../../templates-po/partners.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const PartnersSection = ({
  handleSettingsChange,
  settings,
  openImagePanel,
  setSelectedElement,
  isPreviewMode
}) => {
  const { enterReplacementMode, activeComponent, selectImage, selectedImage } = useImageHistory();
  const { style, updateStyle, getComponentStyle } = useStyle();

  const [partnersTitleText, setPartnersTitleText] = useState('Trusted by teams at over 1,000 of the world\'s leading organizations');
  const [partnerImages, setPartnerImages] = useState(Array(7).fill().map((_, i) => `./images/templates-img/3sproduct/3sproduct-partners-${i+1}.png`));
  const [imageHeight, setImageHeight] = useState(null);

  useEffect(() => {
    getImageHeight(partnerImages[0]).then((height) => setImageHeight(height));  // Just as an example to get height from the first image
  }, [partnerImages]);

  const getImageHeight = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img.height);
    });
  };

  const partnerStyle = getComponentStyle('partners');
  const partnersTitleStyle = getComponentStyle('partnersTitle');

  const handleComponentClick = (event, identifier) => {
    event.preventDefault(); // This will prevent the default action of the anchor tag
    event.stopPropagation(); // Stop the event from propagating up
    console.log(`${identifier} clicked, setting selected element to '${identifier}'`);
    setSelectedElement(identifier);
  };

  const handleTextChange = (newText, textType) => {
    switch (textType) {
      case 'partnersTitle':
        setPartnersTitleText(newText);
        break;
    }
    updateStyle(textType, { text: newText });
    console.log(`Requested style update for ${textType}`);
  };

  return (

    <div className={`sss-product-partners ${isPreviewMode ? '' : 'interactive'}`} id='partners' style={partnerStyle} onClick={isPreviewMode ? undefined : (event) => setSelectedElement('partners')}>
      <h2 className="sss-product-partners-title" id='partnersTitle' style={partnersTitleStyle}>
        {isPreviewMode ? partnersTitleText : (
          <EditableText
            text={partnersTitleText}
            onChange={(newText) => handleTextChange(newText, 'partnersTitle')}
            onClick={(event) => handleComponentClick(event, 'partnersTitle')}
          />
        )}
      </h2>
      <div className="sss-product-partners-box">
        {partnerImages.map((src, index) => (
          isPreviewMode ? (
            <img className='sss-product-partners-box-img' key={index} src={src} alt={`Partner ${index + 1}`} style={{ height: '150px', width: 'auto' }} />
          ) : (
            <ReusableImage
              key={index}
              src={src}
              alt={`Partner ${index + 1}`}
              openImagePanel={openImagePanel}
              onImageChange={(newSrc) => selectImage(newSrc)}
              selectedImage={activeComponent === `partnerImage-${index}` ? selectedImage : null}
              identifier={`Partner ${index + 1}`}
              imageHeight={imageHeight}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
