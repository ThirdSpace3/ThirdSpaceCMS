import React, { useState, useRef, useEffect } from 'react';
import './EditableText.css';

const EditableText = ({ text, onChange, style, handleSettingsChange, textType, selectElement }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const [error, setError] = useState(false);
  const spanRef = useRef(null);
  const inputRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  // Capture the computed styles of the span to apply to the input
  const computedStyle = useRef({});

  const handleInputChange = (event) => {
    setCurrentText(event.target.value);
    setError(false);
  };

  const handleBlur = () => {
    if (!currentText.trim()) {
      setError(true);
      setCurrentText(text); // revert to original text or keep the changed text
    } else {
      setIsActive(false);
      setIsEditing(false);
      onChange(currentText);
      if (typeof handleSettingsChange === 'function') {
        handleSettingsChange(textType, { text: currentText });
      }
    }
  };

  const handleSpanClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (typeof selectElement === 'function') {
      selectElement(textType);
    }
    setIsActive(true);
    setIsEditing(true);
    // Capture styles when the span is clicked and before editing begins
    if (spanRef.current) {
      const styles = window.getComputedStyle(spanRef.current);
      computedStyle.current = {
        width: `${spanRef.current.offsetWidth}px`,
        height: `${spanRef.current.offsetHeight}px`,
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        color: styles.color,
        backgroundColor: styles.backgroundColor,
      };
    }
  };
  const finalStyle = {...style, ...computedStyle.current};

  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error]);
  useEffect(() => {
    if (style) {
      computedStyle.current = { ...computedStyle.current, ...style }; // Merge existing computed styles with new styles
    }
  }, [style]);
  
  useEffect(() => {
    if (!isEditing && spanRef.current) {
      const styles = window.getComputedStyle(spanRef.current);
      computedStyle.current = {
        width: `${spanRef.current.offsetWidth}px`,
        height: `${spanRef.current.offsetHeight}px`,
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        color: styles.color,
        textAlign: styles.textAlign,
        backgroundColor: styles.backgroundColor,
        cursor: 'pointer',
      };
    }
  }, [text, isEditing]);

  if (isEditing) {
    return (
        <input
            type="text"
            value={currentText}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoFocus
            ref={inputRef}
            className={`editable-text-input ${error ? 'error' : ''} ${isActive ? 'active' : ''}`}
            style={finalStyle}
        />
    );
} else {
    return (
        <span
            ref={spanRef}
            onClick={handleSpanClick}
            style={finalStyle}
            className={`editable-text-span ${error ? 'error' : ''} ${isActive ? 'active' : ''}`}
        >
            {text}
        </span>
    );
}
};

export default EditableText;
