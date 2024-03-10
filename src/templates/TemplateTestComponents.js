import React, { useState, useRef, useEffect } from 'react';
import EditableText from '../components/logiciel/TemplateComponent/EditableText';
import { useStyle } from '../components/logiciel/StyleContext';

export default function TemplateTestComponents({ settings, selectedElement, setSelectedElement }) {
  const { style } = useStyle();

  const [content, setContent] = useState({
    title: 'Template de Test #1',
    paragraph: 'Tu vas me devoir un café je crois bien',
  });

  const handleContentChange = (key, newValue) => {
    setContent((prevContent) => ({
      ...prevContent,
      [key]: newValue,
    }));
  };

  const handleTextClick = (elementRef) => {
    console.log('elementRef in handleTextClick:', elementRef);
    setSelectedElement(elementRef.current);
  };

  // Define your styles
  const styles = {
    templateWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      // height: '100%',
      backgroundColor: '#9600FA',
      overflow: 'auto',
    },
    templateWrapperColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    title: {
      ...style.typography,
      fontSize: '35px',
      color: '#fff',
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: '800',
    },
    paragraph: {
      ...style.typography,
      fontSize: '18px',
      color: '#a0a0a0',
      fontFamily: "'Inter', sans-serif",
      fontWeight: '500',
      textAlign: 'left',
    },
    button: {
      fontSize: '15px',
      color: '#fff',
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: '500',
      backgroundColor: '#58D7AD',
    },
  };

  // Use useRef to create references for the title and paragraph elements
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);

  return (
    <div style={styles.templateWrapper}>
      <img src='/images/template-test.png' />

      <div style={styles.templateWrapperColumn} >
        <EditableText
          tagName="h1"
          content={content.title}
          onContentChange={(newValue) => handleContentChange('title', newValue)}
          style={styles.title}
          innerRef={titleRef}
          onClick={(elementRef) => handleTextClick(elementRef)}
        />
        <EditableText
          tagName="p"
          content={content.paragraph}
          onContentChange={(newValue) => handleContentChange('paragraph', newValue)}
          style={styles.paragraph}
          innerRef={paragraphRef}
          onClick={(elementRef) => handleTextClick(elementRef)}
        />
        <button style={styles.button} >Clique</button>
      </div>

      <img id='redirect_test' src='/images/template-test.png' />
    </div>
  );
}
