import React, { useState } from 'react';
import ImageSlots from '../components/logiciel/TemplateComponent/ImageSlots'; // New ImageSlots component
import EditableText from '../components/logiciel/TemplateComponent/EditableText';
import { useStyle } from '../hooks/StyleContext';
import { useImageHistory } from '../hooks/ImageHistoryContext';

export default function Template2ImageOnDo({ settings, selectedElement, setSelectedElement }) {
  const { style } = useStyle();
  const { imageHistory } = useImageHistory(); // Adjust based on your context

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

  
  return (
    <div style={styles.templateWrapper}>
      <ImageSlots styles={styles} imageHistory={imageHistory} />
      <div style={styles.templateWrapperColumn}>
        <EditableText
          tagName="h1"
          content={content.title}
          onContentChange={(newValue) => handleContentChange('title', newValue)}
          style={styles.title}
        />
        <EditableText
          tagName="p"
          content={content.paragraph}
          onContentChange={(newValue) => handleContentChange('paragraph', newValue)}
          style={styles.paragraph}
        />
        <button style={styles.button}>Clique</button>
      </div>
      <ImageSlots styles={styles} imageHistory={imageHistory} />

    </div>
  );
}