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
  onContentChange,
  handleImageUpload
}) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();
  const { style, updateStyle, getComponentStyle } = useStyle();

  // State for managing partner title and images
  const [partnersContent, setPartnersContent] = useState({
    title: 'Trusted by teams at over 1,000 of the world\'s leading organizations',
    images: [
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-partners-1.png?alt=media&token=0652a407-10b6-40f5-8253-fbf81fab5c87', id: 'partnerImage-1' },
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-partners-2.png?alt=media&token=5a890cd1-8371-4f0b-bb8f-bf1b2ccf0730', id: 'partnerImage-2' },
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-partners-3.png?alt=media&token=18805e7f-b021-4774-80e5-debc529cfc1f', id: 'partnerImage-3' },
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-partners-4.png?alt=media&token=a2879a2f-d31c-42f7-ab72-261202ab187c', id: 'partnerImage-4' },
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-partners-5.png?alt=media&token=cde19fcb-ce54-44ac-bfda-e1eee1bafb0a', id: 'partnerImage-5' },
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-partners-6.png?alt=media&token=26b39dcb-4ae8-42be-906c-8ea1e5f0b5c9', id: 'partnerImage-6' },
      { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-partners-7.png?alt=media&token=a5e99cf7-feb6-4bfb-a8f0-282b95d16f20', id: 'partnerImage-7' }
    ]
  });

  const partnerStyle = getComponentStyle('partners');
  const partnersTitleStyle = getComponentStyle('partnersTitle');

  const handleTextChange = async (newText) => {
    const updatedContent = {
      ...partnersContent,
      title: newText
    };
    setPartnersContent(updatedContent);
    updateStyle('partnersTitle', { text: newText });
    onContentChange(updatedContent);

    // Save the specific changes to Firebase if needed
  };

  const handleComponentClick = (event, identifier) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedElement(identifier);
    console.log(`${identifier} clicked, setting selected element to '${identifier}'`);
  };

  const handleImageChange = async (index, newSrc) => {
    const updatedImages = [...partnersContent.images];
    updatedImages[index].src = newSrc;
    const updatedContent = {
      ...partnersContent,
      images: updatedImages
    };
    setPartnersContent(updatedContent);
    onContentChange(updatedContent);

    // Save the specific changes to Firebase if needed
  };

  return (
    <div className="sss-product-partners" style={partnerStyle} onClick={(event) => handleComponentClick(event, 'partners')}>
      <h2 id='partnersTitle' className="sss-product-partners-title" onClick={(event) => handleComponentClick(event, 'partnersTitle')}>
        <EditableText
          text={partnersContent.title}
          onChange={handleTextChange}
          style={partnersTitleStyle}
        />
      </h2>
      <div className="sss-product-partners-box">
        {partnersContent.images.map((image, index) => (
          <ReusableImage
            key={image.id}
            src={image.src}
            alt={`Partner ${index + 1}`}
            onClick={() => enterReplacementMode(image.id)}
            openImagePanel={openImagePanel}
            onImageChange={(newSrc) => handleImageChange(index, newSrc)}
            selectedImage={activeComponent === image.id ? selectedImage : null}
            style={{ height: '150px', width: 'auto' }} // Adjust as needed
            identifier={image.id}
            handleImageUpload={handleImageUpload}
          />
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
