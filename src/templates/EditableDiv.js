import React, { useState, useRef, useCallback, useEffect } from 'react';
import EditableText from '../components/logiciel/TemplateComponent/EditableText';
import { useStyle } from '../hooks/StyleContext';
import axios from 'axios'; // Make sure axios is installed

const TemplateFullText = ({
  deviceSize,
  selectedElement,
  setSelectedElement,
  onToggleTemplate1OnDo,
  showOnlyTemplate1OnDo
}) => {
  const { style, setSelectedComponent } = useStyle();
  const [walletId, setWalletId] = useState('');
  const [content, setContent] = useState({
    title: 'Your Landing Page Title',
    subtitle: 'Your Subtitle Here',
    introParagraph: 'This is an editable introductory paragraph providing an overview of what your landing page is about.',
    section1Title: 'Section 1 Title',
    section1Content: 'Content for section 1. This is editable.',
    section2Title: 'Section 2 Title',
    section2Content: 'Content for section 2. This is also editable.',
  });
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
      border: '10px solid white',
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

  // const fetchStyleForKey = (key) => {
  //   // Mapping keys to their respective style properties
  //   const keyStyleMap = {
  //     title: styles.title,
  //     subtitle: styles.subtitle,
  //     introParagraph: styles.paragraph,
  //     section1Title: styles.sectionTitle,
  //     section1Content: styles.sectionContent,
  //     section2Title: styles.sectionTitle,
  //     section2Content: styles.sectionContent,
  //   };

  //   // Fetch and return the style for the given key
  //   return keyStyleMap[key] || {};
  // };

  // Use useRef to create references for the title and paragraph elements
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const introParagraphRef = useRef(null);
  const section1TitleRef = useRef(null);
  const section1ContentRef = useRef(null);
  const section2TitleRef = useRef(null);
  const section2ContentRef = useRef(null);

  // const getContentAndStyles = useCallback(() => {
  //   return { content, styles };
  // }, [content, styles]);
  


  const handleContentChange = (key, newValue) => {
    setContent((prevContent) => ({
      ...prevContent,
      [key]: newValue,
    }));
  };

const { updateStyle } = useStyle();

const handleTextClick = (elementRef) => {
  setSelectedElement(elementRef.current);
};
 
  const handleReturnClick = useCallback(() => {
    onToggleTemplate1OnDo();
  }, [onToggleTemplate1OnDo]);

  // Function to merge base styles with dynamic styles from context
  const getCombinedStyles = (styles) => {
    const combinedStyles = { ...styles, ...style }; // Merge base style with context style
    console.log("Combined Styles:", combinedStyles); // Log combined styles
    return combinedStyles;
  };


  useEffect(() => {
    // Retrieve the walletId from session storage
    const storedWalletId = sessionStorage.getItem('userAccount');
    if (storedWalletId) {
      setWalletId(storedWalletId);
    }
  }, []);

  useEffect(() => {
    // Apply styles to the selected element
    if (selectedElement && style) {
      Object.keys(style).forEach(key => {
        selectedElement.style[key] = style[key];
      });
    }
  }, [style, selectedElement]);


  
  const handleClick = () => {
    setSelectedComponent('TemplateFullText');
    console.log('Component Selected');
  };
  return (
    <div style={{ ...styles.templateWrapper, ...style }} onClick={handleClick}>
      {showOnlyTemplate1OnDo && <button onClick={handleReturnClick}>Return</button>}
      <p>Wallet ID: {walletId}</p>

      <div style={styles.templateWrapperColumn}>
        <EditableText
          isEditable={!showOnlyTemplate1OnDo}
          tagName="h1"
          content={content.title}
          onContentChange={(newValue) => handleContentChange('title', newValue)}
          style={getCombinedStyles(styles.title)} // Correctly apply combined styles
          innerRef={titleRef}
          onClick={(elementRef) => handleTextClick(elementRef)}
        />
        <EditableText
          isEditable={!showOnlyTemplate1OnDo}
          tagName="h2"
          content={content.subtitle}
          onContentChange={(newValue) => handleContentChange('subtitle', newValue)}
          style={getCombinedStyles(styles.subtitle)} // Correctly apply combined styles
          innerRef={subtitleRef}
          onClick={(elementRef) => handleTextClick(elementRef)}

        />
        <EditableText
          isEditable={!showOnlyTemplate1OnDo}

          tagName="p"
          content={content.introParagraph}
          onContentChange={(newValue) => handleContentChange('introParagraph', newValue)}
          style={getCombinedStyles(styles.paragraph)} // Correctly apply combined styles
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
          style={getCombinedStyles(styles.sectionTitle)} // Correctly apply combined styles
          innerRef={section1TitleRef}
          onClick={(elementRef) => handleTextClick(elementRef)}
        />
        <EditableText
          tagName="p"
          isEditable={!showOnlyTemplate1OnDo}

          content={content.section1Content}
          onContentChange={(newValue) => handleContentChange('section1Content', newValue)}
          style={getCombinedStyles(styles.sectionContent)} // Correctly apply combined styles
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
          style={getCombinedStyles(styles.sectionTitle)} // Correctly apply combined styles
          innerRef={section2TitleRef}
          onClick={(elementRef) => handleTextClick(elementRef)}
        />
        <EditableText
          tagName="p"
          isEditable={!showOnlyTemplate1OnDo}
          content={content.section2Content}
          onContentChange={(newValue) => handleContentChange('section2Content', newValue)}
          style={getCombinedStyles(styles.sectionContent)} // Correctly apply combined styles
          innerRef={section2ContentRef}
          onClick={(elementRef) => handleTextClick(elementRef)}
        />
      </div>

      {/* Add more sections as needed */}
    </div>
  );
};

export default TemplateFullText;