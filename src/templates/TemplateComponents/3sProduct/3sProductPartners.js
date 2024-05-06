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
  setSelectedColor,
  onContentChange  
}) => {
  const { enterReplacementMode, activeComponent, selectImage, selectedImage } = useImageHistory();
  const { style, updateStyle, getComponentStyle } = useStyle();

  // State for managing partner title and images
  const [partnersTitleText, setPartnersTitleText] = useState(localStorage.getItem('partners-partnersTitle-text') || 'Trusted by teams at over 1,000 of the world\'s leading organizations');
  const [partnerImages, setPartnerImages] = useState(() => Array(7).fill().map((_, i) => ({
    src: `./images/templates-img/3sproduct/3sproduct-partners-${i+1}.png`,
    id: `partnerImage-${i+1}`
  })));

  const handleTextChange = (newText) => {
    setPartnersTitleText(newText);
    localStorage.setItem('partners-partnersTitle-text', newText);
    updateStyle('partnersTitle', { text: newText });
  };
  const handleComponentClick = (event, identifier) => {
    event.preventDefault(); // This will prevent the default action of the anchor tag
    event.stopPropagation(); // Stop the event from propagating up
    console.log(`${identifier} clicked, setting selected element to '${identifier}'`);
    setSelectedElement(identifier);
};
  const handleImageChange = (index, newSrc) => {
    const updatedImages = [...partnerImages];
    updatedImages[index].src = newSrc;
    setPartnerImages(updatedImages);
  };

  const partnerStyle = getComponentStyle('partners');
  const partnersTitleStyle = getComponentStyle('partnersTitle');

  useEffect(() => {
    onContentChange({ title: partnersTitleText, images: partnerImages });
  }, [partnersTitleText, partnerImages, onContentChange]);

  return (
    <div className="sss-product-partners" style={partnerStyle} onClick={event => handleComponentClick(event, 'partners')}>
      <h2 id='partners' className="sss-product-partners-title" onClick={event => event.stopPropagation()}>
        <EditableText
          text={partnersTitleText}
          onChange={handleTextChange}
          style={partnersTitleStyle}
        />
      </h2>
      <div className="sss-product-partners-box">
        {partnerImages.map((image, index) => (
          <ReusableImage
            key={image.id}
            src={image.src}
            alt={`Partner ${index + 1}`}
            openImagePanel={() => openImagePanel(image.id)}
            onImageChange={(newSrc) => handleImageChange(index, newSrc)}
            selectedImage={activeComponent === image.id ? selectedImage : null}
            style={{ height: '150px', width: 'auto' }} // Add necessary styles
            identifier={image.id}
          />
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
