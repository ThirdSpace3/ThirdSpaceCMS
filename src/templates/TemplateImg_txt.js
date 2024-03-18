import React, { useState, useRef } from 'react';
import ImageSlots from '../components/logiciel/TemplateComponent/ImageSlots';
import EditableText from '../components/logiciel/TemplateComponent/EditableText';
import { useStyle } from '../hooks/StyleContext';
import { useImageHistory } from '../hooks/ImageHistoryContext';

export default function Template2ImageOnDo({ deviceSize, setSelectedElement, isPreviewMode, settings, handleSettingsChange }) {

  //#region Content Editing 
  //Base style 
  const { style } = useStyle();
  //Base Images from ImageSlots.js
  const { imageHistory } = useImageHistory();
  const responsiveStyles = {
    H1Size: deviceSize === "375px" ? "16px" : deviceSize === "768px" ? "20px" : "",
    PSize: deviceSize === "375px" ? "12px" : deviceSize === "768px" ? "16px" : "",

    // Add more responsive styles as needed
  };
  //Written content + class name 
  const [content, setContent] = useState({
     title: 'Template de Test #1',
     paragraph: 'Tu vas me devoir un café je crois bien',
   });
   //Define your styles
  const styles = {
    templateWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: deviceSize,
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
      fontSize: responsiveStyles.H1Size, // Make font size responsive
      color: '#fff',
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: '800',
    },
    paragraph: {
      ...style.typography,
      fontSize: responsiveStyles.PSize,
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

//#endregion

  //#region Functions
  // Consolidating useRef hooks into an object for easier management
  const refs = {
    title: useRef(null),
    paragraph: useRef(null),
  };

  const handleContentChange = (key, newValue) => {
    setContent(prevContent => ({
      ...prevContent,
      [key]: newValue,
    }));
  };  

const handleTextClick = (ref) => {
  if (!isPreviewMode) { // Only allow text selection if not in preview mode
    setSelectedElement(ref.current);
  }
};

// Then, in the renderEditableText function
const renderEditableText = (key, tagName, style) => {
  return (
    <EditableText
      isEditable={!isPreviewMode}
      tagName={tagName}
      content={content[key]}
      onContentChange={(newValue) => handleContentChange(key, newValue)}
      style={style}
      innerRef={refs[key]}
      onClick={() => handleTextClick(refs[key])}
    />
  );
};

//#endregion


  return (
    <div style={styles.templateWrapper}>
      {/* Styles from above, History = Saving in the PanelAssets */}
      <ImageSlots styles={styles} imageHistory={imageHistory} />
      <div style={styles.templateWrapperColumn}>
        {/* Class Name, Tag, Styles applied */}
        {content && renderEditableText('title', 'h1', styles.title)}
        {content && renderEditableText('paragraph', 'p', styles.paragraph)}
        {/* Buttons */}
        <button style={styles.button}>Clique</button>
      </div>
      <ImageSlots styles={styles} imageHistory={imageHistory} />
    </div>
  );
}
