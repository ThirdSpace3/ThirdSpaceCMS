import React, { useState, useRef, useEffect } from 'react';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ImageSlots from '../../../components/logiciel/TemplateComponent/ReusableImage';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';
const SectionHero = ({ isPreviewMode, setSelectedElement }) => {
  const { style, setSelectedComponent } = useStyle();
  const { imageHistory } = useImageHistory();

  // Default content structure for the hero section
  const savedContent = JSON.parse(sessionStorage.getItem('heroContent')) || {
    heading: 'Great Design is Invisible',
    subtext: 'Lorem ipsum dolor sit amet consectetur',
  };

  const [content, setContent] = useState(savedContent);

  // Refs for editable texts
  const refs = {
    heading: useRef(null),
    subtext: useRef(null),
  };

  // Handling content change for both heading and subtext
  const handleContentChange = (key, newValue) => {
    setContent(prevContent => {
      const updatedContent = { ...prevContent, [key]: newValue };
      sessionStorage.setItem('heroContent', JSON.stringify(updatedContent));
      return updatedContent;
    });
  };

  // Handle click on text elements to potentially set them as selected elements
  const handleTextClick = (ref) => {
    if (!isPreviewMode && typeof setSelectedElement === 'function') {
      setSelectedElement(ref.current);
    }
  };

  const handleClick = () => {
    setSelectedComponent('SectionHero');
  };
  // Dynamic styles for the hero section, possibly enhanced by useStyle
  const dynamicStyles = {
    hero: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      backgroundColor: style.backgroundColor || '#f0f0f0',
      padding: '20px',
      textAlign: 'center',
    },
    heading: {
      fontSize: '4rem',
      color: style.color || '#333',
      marginBottom: '1rem',
    },
    subtext: {
      fontSize: '1.5rem',
      color: style.color || '#666',
      marginBottom: '2rem',
    },
    button: {
      fontSize: '1rem',
      padding: '10px 20px',
      backgroundColor: '#0066ff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  useEffect(() => {
    const savedContent = JSON.parse(sessionStorage.getItem('heroContent'));
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  return (
    <div className='hero-section-1' onClick={handleClick} style={dynamicStyles.hero}>
      <ImageSlots styles={dynamicStyles} imageHistory={imageHistory} className={dynamicStyles.heroImage}/>
      <section >
        <EditableText
          isEditable={!isPreviewMode}
          tagName="h1"
          content={content.heading}
          onContentChange={(newValue) => handleContentChange('heading', newValue)}
          style={dynamicStyles.heading}
          innerRef={refs.heading}
          onClick={() => handleTextClick(refs.heading)}
        />
        <EditableText
          isEditable={!isPreviewMode}
          tagName="p"
          content={content.subtext}
          onContentChange={(newValue) => handleContentChange('subtext', newValue)}
          style={dynamicStyles.subtext}
          innerRef={refs.subtext}
          onClick={() => handleTextClick(refs.subtext)}
        />
        <button style={dynamicStyles.button}>
          Button
        </button>
      </section>
    </div>
  );
}

export default SectionHero;
