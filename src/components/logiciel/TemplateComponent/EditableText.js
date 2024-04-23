import React, { useState, useRef, useEffect } from 'react';

const EditableText = ({ text, onChange, style }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const [error, setError] = useState(false);
  const spanRef = useRef(null);
  const inputRef = useRef(null);

  // Capture the computed styles of the span to apply to the input
  const computedStyle = useRef({});

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setCurrentText(event.target.value);
    setError(false);
  };

  const handleBlur = () => {
    if (!currentText.trim()) {
      setError(true);
    } else {
      setIsEditing(false);
      onChange(currentText);
    }
  };

  const handleSpanClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // Capture styles when the span is clicked and before editing begins
    if (spanRef.current) {
      const styles = window.getComputedStyle(spanRef.current);
      computedStyle.current = {
        width: `${spanRef.current.offsetWidth}px`, // Maintain width
        height: `${spanRef.current.offsetHeight}px`, // Maintain height
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        color: styles.color,
        textAlign: styles.textAlign,
        backgroundColor: styles.backgroundColor,
        border: 'none', // Add custom properties for the input
      };
    }
    setIsEditing(true);
  };

  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error]);

  if (isEditing) {
    return (
      <input
        type="text"
        value={currentText}
        onChange={handleInputChange}
        onBlur={handleBlur}
        autoFocus
        ref={inputRef}
        className={`editable-text-input ${error ? 'error' : ''}`}
        style={{...style, ...computedStyle.current}} // Apply captured styles along with any additional inline styles
      />
    );
  }

  return (
    <span ref={spanRef} onClick={handleSpanClick} style={style}>
      {text}
    </span>
  );
};

export default EditableText;
