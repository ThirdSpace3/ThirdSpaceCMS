import React, { useState, useRef, useEffect } from 'react';

const EditableText = ({ text, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const [error, setError] = useState(false);
  const spanRef = useRef(null);
  const inputRef = useRef(null);

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
    setIsEditing(true);
  };

  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error]);

  const inputStyles = {
    width: spanRef.current ? spanRef.current.offsetWidth : 'auto',
    minWidth: '100px', // Set the minimum width you desire
  };

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
        style={inputStyles}
      />
    );
  }

  return (
    <span ref={spanRef} onClick={handleSpanClick}>
      {text}
    </span>
  );
};

export default EditableText;
