import React, { useState, useRef, useEffect } from 'react';
import './EditableText.css';

const EditableText = ({ text, onChange, style, handleSettingsChange, textType, selectElement, isPreviewMode  }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const [error, setError] = useState(false);
  const spanRef = useRef(null);
  const textAreaRef = useRef(null);

  const computedStyle = useRef({});

  const handleInputChange = (event) => {
    if (!isPreviewMode) {
      setCurrentText(event.target.value);
      setError(false);
    }
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
    if (isPreviewMode) return;  // Do nothing if in preview mode
  
    setIsEditing(true);
    if (spanRef.current) {
      const styles = window.getComputedStyle(spanRef.current);
      computedStyle.current = {
        width: `${spanRef.current.offsetWidth}px`,
        minHeight: `${spanRef.current.offsetHeight}px`, // use minHeight to allow expansion
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        border: 'none',
        padding: '0',
        resize: 'none', // disable resizing
      };
    }
  };
  

  useEffect(() => {
    if (isEditing && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isEditing]);
  
  if (isPreviewMode && isEditing ) {
    return <span style={style}>{text}</span>;
  }

  if (isEditing) {
    return (
        <textarea
            value={currentText}
            onChange={handleInputChange}
            onBlur={handleBlur}
            ref={textAreaRef}
            style={computedStyle.current}
            className={`editable-text-area ${error ? 'error' : ''}`}
        />
    );
  } else {
    return (
        <span
            ref={spanRef}
            onClick={handleSpanClick}
            style={style}
            className={`editable-text-span ${error ? 'error' : ''}`}
            id={selectElement}
        >
            {text}
        </span>
    );
  }
  
};

export default EditableText;
