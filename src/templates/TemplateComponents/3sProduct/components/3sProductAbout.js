import React, { useState, useEffect } from 'react';
import '../css/about.css';
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';
import { fetchComponentData, saveComponentData } from '../../../../hooks/Fetchprojects';

const AboutSection = ({
  handleSettingsChange,
  settings, 
  openImagePanel, 
  setSelectedElement, 
  setSelectedColor, 
  onContentChange, 
  handleImageUpload, 
  selectedProjectId, 
  aboutData = { title: '', description: '', images: [] }
}) => {
  const { selectedImage, selectImage } = useImageHistory();
  const { getComponentStyle, updateStyle } = useStyle();

  const defaultImages = [
    { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-about-1.png?alt=media&token=9ca80d2e-270b-46a0-8557-433bfdada20a', id: 'aboutImage-1', text: 'Feature 1 description' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-about-2.png?alt=media&token=16fae0b2-1ee9-43f5-8e07-99f406f3ee2c', id: 'aboutImage-2', text: 'Feature 2 description' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-about-3.png?alt=media&token=5133fe7c-62b1-49db-9776-188c2aefe6de', id: 'aboutImage-3', text: 'Feature 3 description' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-about-4.png?alt=media&token=94093593-f989-4fc0-9ea5-4b3f8160ba33', id: 'aboutImage-4', text: 'Feature 4 description' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-about-5.png?alt=media&token=85a1cb0d-da50-4649-82a1-dfed7e70e6a5', id: 'aboutImage-5', text: 'Feature 5 description' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-about-6.png?alt=media&token=995009fa-e65d-4953-8492-2a3e2ca9070a', id: 'aboutImage-6', text: 'Feature 6 description' }
  ];

  const [aboutContent, setAboutContent] = useState({
    title: 'The best features to help you create all your projects',
    description: 'Apsum dolor sit amet consectetur...',
    images: defaultImages
  });

  useEffect(() => {
    if (aboutData) {
      setAboutContent({
        title: aboutData.title || 'The best features to help you create all your projects',
        description: aboutData.description || 'Apsum dolor sit amet consectetur...',
        images: Array.isArray(aboutData.images) && aboutData.images.length ? aboutData.images : defaultImages
      });
    }
  }, [aboutData]);

  const aboutStyles = getComponentStyle('about');
  const aboutTitleStyle = getComponentStyle('title');
  const aboutDescriptionStyles = getComponentStyle('description');

  const handleTextChange = (newText, textType, index = null) => {
    let updatedContent = { ...aboutContent };

    if (index !== null) {
      updatedContent.images[index].text = newText;
    } else {
      updatedContent[textType] = newText;
      updateStyle(textType, { text: newText });
    }

    setAboutContent(updatedContent);
    onContentChange(updatedContent);

    // Save the specific changes to Firebase if needed
    const walletId = sessionStorage.getItem("userAccount");
    if (walletId && selectedProjectId) {
      saveComponentData(walletId, selectedProjectId, 'about', updatedContent);
    }
  };

  const handleImageChange = (index, newSrc) => {
    const updatedImages = [...aboutContent.images];
    updatedImages[index].src = newSrc;
    const updatedContent = {
      ...aboutContent,
      images: updatedImages
    };
    setAboutContent(updatedContent);
    selectImage(newSrc);
    onContentChange(updatedContent);

    // Save the specific changes to Firebase if needed
    const walletId = sessionStorage.getItem("userAccount");
    if (walletId && selectedProjectId) {
      saveComponentData(walletId, selectedProjectId, 'about', updatedContent);
    }
  };

  const handleComponentClick = (event, identifier, index = null) => {
    event.preventDefault();
    event.stopPropagation();
    const elementID = index !== null ? `${identifier}-${index}` : identifier;
    setSelectedElement(elementID);
  };

  useEffect(() => {
    const cssVarName = '--about-background-color';
    const storedColor = localStorage.getItem(cssVarName);

    if (storedColor) {
      setSelectedColor(storedColor);
      document.documentElement.style.setProperty(cssVarName, storedColor);
    }
  }, [setSelectedColor]);

  return (
    <div className="sss-product-about" style={{ ...aboutStyles }} id='about' onClick={(event) => handleComponentClick(event, 'about')}>
      <div className="sss-product-about-header">
        <h2 className="sss-product-about-title" id='title' onClick={(event) => handleComponentClick(event, 'title')}>
          <EditableText
            text={aboutContent.title}
            onChange={(text) => handleTextChange(text, 'title')}
            style={{ ...aboutTitleStyle }}
          />
        </h2>
        <p className="sss-product-about-text" id='description' onClick={(event) => handleComponentClick(event, 'description')}>
          <EditableText
            text={aboutContent.description}
            onChange={(text) => handleTextChange(text, 'description')}
            style={{ ...aboutDescriptionStyles }}
          />
        </p>
      </div>
      <div className="sss-product-about-box">
        {aboutContent.images.map((image, index) => (
          <div key={image.id} className="sss-product-about-item">
            <ReusableImage
              src={image.src}
              alt={`Feature ${index + 1}`}
              openImagePanel={() => openImagePanel(`aboutImage-${index}`)}
              onImageChange={(newSrc) => handleImageChange(index, newSrc)}
              selectedImage={selectedImage}
              style={{ height: '150px', width: 'auto' }}
              identifier={`aboutImage-${index}`}
              handleImageUpload={handleImageUpload}
            />
            <div className="sss-product-about-item-text">



              <EditableText
                text={image.text}
                onChange={(text) => handleTextChange(text, 'imageText', index)}
                style={{ marginTop: '10px' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
