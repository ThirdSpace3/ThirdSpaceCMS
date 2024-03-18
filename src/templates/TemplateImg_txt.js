import React, { useState, useRef, useEffect } from 'react';
import ImageSlots from '../components/logiciel/TemplateComponent/ImageSlots';
import EditableText from '../components/logiciel/TemplateComponent/EditableText';
import { useStyle } from '../hooks/StyleContext';
import { useImageHistory } from '../hooks/ImageHistoryContext';

export default function Template2ImageOnDo({ deviceSize, setSelectedElement, isPreviewMode, settings, handleSettingsChange }) {
  //#region Content Editing
  //Base style
  const { style, updateStyle } = useStyle();

  //Base Images from ImageSlots.js
  const { imageHistory } = useImageHistory();
  const responsiveStyles = {
    H1Size: deviceSize === "375px" ? "16px" : deviceSize === "768px" ? "20px" : "",
    PSize: deviceSize === "375px" ? "12px" : deviceSize === "768px" ? "16px" : "",
    // Add more responsive styles as needed
  };

  //Written content + class name
  const savedContent = JSON.parse(sessionStorage.getItem('content')) || {
    title: 'Template de Test #1',
    paragraph: 'Tu vas me devoir un café je crois bien',
  };

  const [content, setContent] = useState(savedContent);

  // Define your styles using the saved styles from the useStyle hook
  const styles = {
    templateWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: deviceSize,
      backgroundColor: style.backgroundColor || '#9600FA', // Use the saved background color
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
      color: style.color || '#fff', // Use the saved text color
      fontFamily: style.fontFamily || "'Montserrat', sans-serif", // Use the saved font family
      fontWeight: style.fontWeight || '800', // Use the saved font weight
    },
    paragraph: {
      ...style.typography,
      fontSize: responsiveStyles.PSize,
      color: style.color || '#a0a0a0', // Use the saved text color
      fontFamily: style.fontFamily || "'Inter', sans-serif", // Use the saved font family
      fontWeight: style.fontWeight || '500', // Use the saved font weight
      textAlign: 'left',
    },
    button: {
      fontSize: '15px',
      color: style.color || '#fff', // Use the saved text color
      fontFamily: style.fontFamily || "'Montserrat', sans-serif", // Use the saved font family
      fontWeight: style.fontWeight || '500', // Use the saved font weight
      backgroundColor: style.buttonBackgroundColor || '#58D7AD', // Use the saved button background color
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
    setContent(prevContent => {
      const updatedContent = { ...prevContent, [key]: newValue };
      // Save the updated content in session storage
      sessionStorage.setItem('content', JSON.stringify(updatedContent));
      return updatedContent;
    });
  };



const handleTextClick = (ref) => {
  if (!isPreviewMode) { // Only allow text selection if not in preview mode
    setSelectedElement(ref.current);
  }
};

useEffect(() => {
  // Retrieve the content from session storage when the component mounts
  const savedContent = JSON.parse(sessionStorage.getItem('content'));
  if (savedContent) {
    setContent(savedContent);
  }
}, []);

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
