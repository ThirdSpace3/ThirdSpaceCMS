import React, { useState, useEffect } from 'react';
import '../css/partners.css';
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';

const PartnersSection = ({
  settings,
  handleSettingsChange,
  openImagePanel,
  setSelectedElement,
  setSelectedColor,
  onContentChange
}) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();
  const { style, updateStyle, getComponentStyle } = useStyle();

  // State for managing partner title and images
  const [partnersTitleText, setPartnersTitleText] = useState(localStorage.getItem('partners-partnersTitle-text') || 'Trusted by teams at over 1,000 of the world\'s leading organizations');
  const [partnerImages, setPartnerImages] = useState(() => Array(7).fill().map((_, i) => ({
    
    src: `gs://third--space.appspot.com/ImageLogiciel/templateimages/3sproduct-partners-${i + 1}.png`,
    id: `partnerImage-${i + 1}`
  })));

  const handleTextChange = (newText) => {
    setPartnersTitleText(newText);
    localStorage.setItem('partners-partnersTitle-text', newText);
    updateStyle('partnersTitle', { text: newText });
    onContentChange({
      title: partnersTitleText,
      images: partnerImages
    });
  };

  const handleComponentClick = (event, identifier) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedElement(identifier);
    console.log(`${identifier} clicked, setting selected element to '${identifier}'`);
  };

  const handleImageChange = (index, newSrc) => {
    const updatedImages = [...partnerImages];
    updatedImages[index].src = newSrc;
    setPartnerImages(updatedImages);
    onContentChange({
      title: partnersTitleText,
      images: updatedImages
    });
  };

  const partnerStyle = getComponentStyle('partners');
  const partnersTitleStyle = getComponentStyle('partnersTitle');

  useEffect(() => {
    localStorage.setItem('partners-content', JSON.stringify({ title: partnersTitleText, images: partnerImages }));
    const storedContent = localStorage.getItem('partners-content');
    if (storedContent) {
      const parsedContent = JSON.parse(storedContent);
      onContentChange(parsedContent);
    }
  }, [partnersTitleText, partnerImages, onContentChange]);

  return (
    <div className="sss-product-partners" style={partnerStyle} onClick={(event) => handleComponentClick(event, 'partners')}>
      <h2 id='partnersTitle' className="sss-product-partners-title" onClick={(event) => handleComponentClick(event, 'partnersTitle')} >
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
            onClick={() => enterReplacementMode()}
            openImagePanel={() => openImagePanel(image.id)}
            onImageChange={(newSrc) => handleImageChange(index, newSrc)}
            selectedImage={activeComponent === image.id ? selectedImage : null}
            style={{ height: '150px', width: 'auto' }} // Adjust as needed
            identifier={image.id}
          />
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
