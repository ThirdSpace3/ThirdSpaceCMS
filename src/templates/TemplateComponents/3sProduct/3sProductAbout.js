import React, { useState, useEffect } from 'react';
import '../../templates-po/about.css';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const AboutSection = ({ handleSettingsChange, settings, openImagePanel }) => {
  const { enterReplacementMode, activeComponent, selectImage, selectedImage } = useImageHistory();
  const { getComponentStyle, updateStyle } = useStyle();

  const [aboutTitleText, setAboutTitleText] = useState('The best features to help you create all your projects');
  const [aboutDescriptionText, setAboutDescriptionText] = useState('Apsum dolor sit amet consectetur. Aliquam elementum elementum in ultrices. Dui maecenas ut eros turpis ultrices metus morbi aliquet vel.');
  const [aboutImages, setAboutImages] = useState(Array(6).fill().map((_, i) => `./images/templates-img/3sproduct/3sproduct-about-${i+1}.png`));


  const [imageHeight, setImageHeight] = useState(null);
  const getImageHeight = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img.height);
    });
  };
  useEffect(() => {
    getImageHeight(`./images/templates-img/3sproduct/3sproduct-about-1.png`).then((height) => setImageHeight(height));
  }, []);



  useEffect(() => {
    updateStyle(settings);
  }, [settings]);

  const handleTextChange = (newText, type) => {
    if (type === 'title') {
      setAboutTitleText(newText);
    } else if (type === 'description') {
      setAboutDescriptionText(newText);
    }
  };

  const handleImageClick = (index) => {
    const identifier = `aboutImage-${index}`;
                                            };

  const handleImageChange = (newSrc, index) => {
    if (activeComponent === `aboutImage-${index}`) {
      const updatedImages = [...aboutImages];
      updatedImages[index] = newSrc;
      setAboutImages(updatedImages);
      selectImage(newSrc);
    }
  };

  return (
    <div className="sss-product-about">
      <div className="sss-product-about-header">
        <h2 className="sss-product-about-title">
          <EditableText
            text={aboutTitleText}
            onChange={(text) => handleTextChange(text, 'title')}
          />
        </h2>
        <p className="sss-product-about-text">
          <EditableText
            text={aboutDescriptionText}
            onChange={(text) => handleTextChange(text, 'description')}
          />
        </p>
      </div>
      <div className="sss-product-about-box">
        {aboutImages.map((src, index) => (
          <div key={index} className="sss-product-about-item">
            <ReusableImage
              src={src}
              alt={`Feature ${index + 1}`}
              onClick={() => handleImageClick(index)}
              openImagePanel={() => openImagePanel()}
              onImageChange={(newSrc) => handleImageChange(newSrc, index)}
              selectedImage={activeComponent === `aboutImage-${index}` ? selectedImage : null}
              style={{ height: '150px', width: 'auto' }}
              identifier={`Feature ${index + 1}`}
              imageHeight={imageHeight}

            />
            <h3 className="sss-product-about-item-title">Feature Title {index + 1}</h3>
            <p className="sss-product-about-item-text">Feature description here. It can vary depending on the feature number {index + 1}.</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default AboutSection;
