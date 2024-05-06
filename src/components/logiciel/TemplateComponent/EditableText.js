import React, { useState, useRef, useEffect } from 'react';
import './EditableText.css';

const EditableText = ({ text, onChange, style, handleSettingsChange, textType, selectElement, isPreviewMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const [error, setError] = useState(false);
  const spanRef = useRef(null);
  const textAreaRef = useRef(null);

  const computedStyle = useRef({});

  const handleInputChange = (event) => {
    setCurrentText(event.target.value);
    setError(false);
  };

  const handleBlur = () => {
    if (!currentText.trim()) {
      setError(true);
      setCurrentText(text); // revert to original text
    } else {
      setIsEditing(false);
      onChange(currentText);
      if (typeof handleSettingsChange === 'function') {
        handleSettingsChange(textType, { text: currentText });
      }
    }
  };

  const handleSpanClick = () => {
    setIsEditing(true);
    if (spanRef.current) {
      const styles = window.getComputedStyle(spanRef.current);
      computedStyle.current = {
        maxWidth: `${spanRef.current.offsetWidth + spanRef.current.offsetWidth}px`, // add 15% to width
        maxHeight: `${spanRef.current.offsetHeight + spanRef.current.offsetHeight}px`, // add 15% to height
        minWidth: `${spanRef.current.offsetWidth}px`,
        minHeight: `${spanRef.current.offsetHeight}px`, // use minHeight to allow expansion
        height: styles.height,
        width: styles.width,
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        border: 'none',
        padding: styles.padding,
        textAlign: styles.textAlign, // Ensure text alignment is copied
        lineHeight: styles.lineHeight, // Copy line height for consistent text positioning
        whiteSpace: 'pre-wrap', // allow text to wrap to next line
        overflowWrap: 'break-word', // allow long words to break to next line
      };
    }
  };



  useEffect(() => {
    if (isEditing && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isEditing]);

  return (
    <>
      {isEditing ? (
        <textarea
          value={currentText}
          onChange={handleInputChange}
          onBlur={handleBlur}
          ref={textAreaRef}
          style={computedStyle.current}
          className={`editable-text-area ${error ? 'error' : ''}`}
        />
      ) : (
        <div
          ref={spanRef}
          onClick={handleSpanClick}
          style={{ ...style, whiteSpace: 'pre-wrap' }} // add whiteSpace style to div
          className={`editable-text-span ${error ? 'error' : ''}`}
          id={selectElement}
        >
          {text}
        </div>
      )}
    </>
  );
};


export default EditableText;
