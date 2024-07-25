import React, { useState, useRef, useEffect } from 'react';
import './EditableText.css';
import { useStyle } from '../../../hooks/StyleContext';

const EditableText = ({ text, onChange, style, selectElement, isPreviewMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text || '');
  const [error, setError] = useState(false);
  const spanRef = useRef(null);
  const textAreaRef = useRef(null);
  const { updateStyle } = useStyle();

  const computedStyle = useRef({});

  useEffect(() => {
    setCurrentText(text);
  }, [text]);

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
      updateStyle(selectElement, { text: currentText });
    }
  };

  const handleSpanClick = () => {
    setIsEditing(true);
    if (spanRef.current) {
      const styles = window.getComputedStyle(spanRef.current);
      computedStyle.current = {
        minWidth: `${spanRef.current.offsetWidth}px`,
        minHeight: `${spanRef.current.offsetHeight}px`,
        height: styles.height,
        width: styles.width,
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        border: 'none',
        padding: styles.padding,
        textAlign: styles.textAlign,
        lineHeight: styles.lineHeight,
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
        textDecorationLine: styles.textDecorationLine,
        fontStyle: styles.fontStyle,
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
          style={{ ...style, whiteSpace: 'pre-wrap' }}
          className={`editable-text-span ${error ? 'error' : ''}`}
        >
          {currentText}
        </div>
      )}
    </>
  );
};

export default EditableText;
