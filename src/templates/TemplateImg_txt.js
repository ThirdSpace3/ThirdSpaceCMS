import React, { useState, useRef } from 'react';
import ImageSlots from '../components/logiciel/TemplateComponent/ImageSlots';
import EditableText from '../components/logiciel/TemplateComponent/EditableText';
import { useStyle } from '../hooks/StyleContext';
import { useImageHistory } from '../hooks/ImageHistoryContext';

export default function Template2ImageOnDo({ deviceSize, setSelectedElement }) {

  //#region Content Editing 
  //Base style 
  const { style } = useStyle();
  //Base Images from ImageSlots.js
  const { imageHistory } = useImageHistory();

  //Written content + class name 
  const [content, setContent] = useState({
    title: 'Template de Test #1',
    paragraph: 'Tu vas me devoir un café je crois bien',
  });
  // Define your styles
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

//#endregion

  //#region Functions
  // Consolidating useRef hooks into an object for easier management
  const refs = {
    title: useRef(null),
    paragraph: useRef(null),
  };

  const handleContentChange = (key, newValue) => {
    setContent((prevContent) => ({
      ...prevContent,
      [key]: newValue,
    }));
  };

  const handleTextClick = (ref) => {
    setSelectedElement(ref.current);
  };
  // A function to render EditableText components more concisely
  const renderEditableText = (key, tagName, style) => (
    <EditableText
      isEditable={true}
      tagName={tagName}
      content={content[key]}
      onContentChange={(newValue) => handleContentChange(key, newValue)}
      style={style}
      innerRef={refs[key]}
      onClick={() => handleTextClick(refs[key])}
    />
  );

//#endregion


  return (
    <div style={styles.templateWrapper}>
      {/* Styles from above, History = Saving in the PanelAssets */}
      <ImageSlots styles={styles} imageHistory={imageHistory} />
      <div style={styles.templateWrapperColumn}>
        {/* Class Name, Tag, Styles applied */}
        {renderEditableText('title', 'h1', styles.title)}
        {renderEditableText('paragraph', 'p', styles.paragraph)}
        {/* Buttons */}
        <button style={styles.button}>Clique</button>
      </div>
      <ImageSlots styles={styles} imageHistory={imageHistory} />
    </div>
  );
}
