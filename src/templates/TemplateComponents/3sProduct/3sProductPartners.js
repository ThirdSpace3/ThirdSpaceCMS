import React, { useState, useEffect } from 'react';
import '../../templates-po/partners.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const PartnersSection = ({ handleSettingsChange, settings, openImagePanel, setSelectedElement, setSelectedColor }) => {
  const { enterReplacementMode, activeComponent, selectImage, selectedImage } = useImageHistory();
  const { style, selectedComponent, updateStyle, getComponentStyle } = useStyle();
  const [partnersTitleText, setPartnersTitleText] = useState('Trusted by teams at over 1,000 of the world\'s leading organizations');
  const [partnerImages, setPartnerImages] = useState(Array(7).fill().map((_, i) => `./images/templates-img/3sproduct/3sproduct-partners-${i+1}.png`));
  const [imageHeight, setImageHeight] = useState(null);
  const getImageHeight = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img.height);
    });
  };
  useEffect(() => {
    getImageHeight(`./images/templates-img/3sproduct/3sproduct-partners-1.png`).then((height) => setImageHeight(height));
  }, []);


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
};

useEffect(() => {
  const cssVarName = `--partners-background-color`;
  const storedColor = localStorage.getItem(cssVarName);

  if (storedColor) {
    setSelectedColor(storedColor);
    document.documentElement.style.setProperty(cssVarName, storedColor);
  }
}, []);


return(
    <div className="sss-product-partners" id='partners' style={partnerStyle} onClick={(event) => handleComponentClick(event,'partners')}>
      <h2 className="sss-product-partners-title" id='partnersTitle' onClick={(event) => handleComponentClick(event, 'partnersTitle')}>
        <EditableText
          text={partnersTitleText}
          onChange={(newText) => handleTextChange(newText, 'partnersTitle')}
          style={{ ...partnersTitleStyle }}
/>
      </h2>
      <div className="sss-product-partners-box">
        {partnerImages.map((src, index) => (
          <ReusableImage
            key={index}
            src={src}
            alt={`Partner ${index + 1}`}
            openImagePanel={openImagePanel}
            onImageChange={(newSrc) => selectImage(newSrc)}
            selectedImage={activeComponent === `partnerImage-${index}` ? selectedImage : null}
            style={{ height: '150px', width: 'auto' }}  // Add necessary styles
            identifier={`Partner ${index + 1}`}
            imageHeight={imageHeight}
          />
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
