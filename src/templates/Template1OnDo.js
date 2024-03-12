import React, { useState, useRef, useCallback } from 'react';
import EditableText from '../components/logiciel/TemplateComponent/EditableText';
import { useStyle } from '../hooks/StyleContext';

const Template1OnDo = ({ deviceSize, selectedElement, setSelectedElement, onToggleTemplate1OnDo, showOnlyTemplate1OnDo }) => {
  const { style } = useStyle();

  const [content, setContent] = useState({
    title: 'Your Landing Page Title',
    subtitle: 'Your Subtitle Here',
    introParagraph: 'This is an editable introductory paragraph providing an overview of what your landing page is about.',
    section1Title: 'Section 1 Title',
    section1Content: 'Content for section 1. This is editable.',
    section2Title: 'Section 2 Title',
    section2Content: 'Content for section 2. This is also editable.',
  });

  const handleContentChange = (key, newValue) => {
    setContent((prevContent) => ({
      ...prevContent,
      [key]: newValue,
    }));
  };

  const handleTextClick = (elementRef) => {
    setSelectedElement(elementRef.current);
  };

  const handleReturnClick = useCallback(() => {
    onToggleTemplate1OnDo();
  }, [onToggleTemplate1OnDo]);


  // Define your styles
  const styles = {
    templateWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: deviceSize,
      height: 'auto', // added height property for better layout control
      backgroundColor: '#2c3e50', // navy blue
      overflow: 'auto',
      alignItems: 'center',
    },
    templateWrapperColumn: {
      display: 'flex',
      flexDirection: 'column',
      width: '80%',
      gap: '15px',
    },
    title: {
      fontSize: '35px',
      color: '#ffffff', // white
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: '800',
    },
    subtitle: {
      fontSize: '25px',
      color: '#95a5a6', // light gray
      fontFamily: "'Inter', sans-serif",
      fontWeight: '500',
      textAlign: 'left',
    },
    paragraph: {
      fontSize: '18px',
      color: '#7f8c8d', // medium gray
      fontFamily: "'Inter', sans-serif",
      fontWeight: '500',
      textAlign: 'left',
    },
    sectionTitle: {
      fontSize: '30px',
      color: '#ffffff', // white
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: '800',
    },
    sectionContent: {
      fontSize: '18px',
      color: '#7f8c8d', // medium gray
      fontFamily: "'Inter', sans-serif",
      fontWeight: '500',
      textAlign: 'left',
    },
  };
    
  // Use useRef to create references for the title and paragraph elements
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const introParagraphRef = useRef(null);
  const section1TitleRef = useRef(null);
  const section1ContentRef = useRef(null);
  const section2TitleRef = useRef(null);
  const section2ContentRef = useRef(null);

  return (
    <div style={styles.templateWrapper}>
    {showOnlyTemplate1OnDo && <button onClick={handleReturnClick}>Return</button>}
    
      <div style={styles.templateWrapperColumn}>
      <EditableText
        isEditable={!showOnlyTemplate1OnDo}
        tagName="h1"
        content={content.title}
        onContentChange={(newValue) => handleContentChange('title', newValue)}
        style={{ ...styles.title, width: style.width, height: style.height }}
        innerRef={titleRef}
        onClick={(elementRef) => handleTextClick(elementRef)}
      />
        <EditableText
        isEditable={!showOnlyTemplate1OnDo}
        tagName="h2"
          content={content.subtitle}
          onContentChange={(newValue) => handleContentChange('subtitle', newValue)}
          style={{...styles.subtitle, width: style.width, height: style.height }}
          innerRef={subtitleRef}
          onClick={(elementRef) => handleTextClick(elementRef)}

        />
        <EditableText
                isEditable={!showOnlyTemplate1OnDo}

          tagName="p"
          content={content.introParagraph}
          onContentChange={(newValue) => handleContentChange('introParagraph', newValue)}
          style={{...styles.paragraph, width: style.width, height: style.height }}
          innerRef={introParagraphRef}
          onClick={(elementRef) => handleTextClick(elementRef)}

        />
      </div>

      {/* Section 1 */}
      <div style={styles.templateWrapperColumn}>
        <EditableText
          tagName="h2"
          isEditable={!showOnlyTemplate1OnDo}

          content={content.section1Title}
          onContentChange={(newValue) => handleContentChange('section1Title', newValue)}
          style={{...styles.sectionTitle, width: style.width, height: style.height }}
          innerRef={section1TitleRef}
          onClick={(elementRef) => handleTextClick(elementRef)}
        />
        <EditableText
          tagName="p"
          isEditable={!showOnlyTemplate1OnDo}

          content={content.section1Content}
          onContentChange={(newValue) => handleContentChange('section1Content', newValue)}
          style={{...styles.sectionContent, width: style.width, height: style.height }}
          innerRef={section1ContentRef}
          onClick={(elementRef) => handleTextClick(elementRef)}
        />
      </div>

      {/* Section 2 */}
      <div style={styles.templateWrapperColumn}>
        <EditableText
          tagName="h2"
          isEditable={!showOnlyTemplate1OnDo}
          content={content.section2Title}
          onContentChange={(newValue) => handleContentChange('section2Title', newValue)}
          style={{...styles.sectionTitle, width: style.width, height: style.height }}
          innerRef={section2TitleRef}
          onClick={(elementRef) => handleTextClick(elementRef)}
        />
        <EditableText
          tagName="p"
          isEditable={!showOnlyTemplate1OnDo}
          content={content.section2Content}
          onContentChange={(newValue) => handleContentChange('section2Content', newValue)}
          style={{...styles.sectionContent, width: style.width, height: style.height }}
          innerRef={section2ContentRef}
          onClick={(elementRef) => handleTextClick(elementRef)}
        />
      </div>

      {/* Add more sections as needed */}
    </div>
  );
};

export default Template1OnDo;