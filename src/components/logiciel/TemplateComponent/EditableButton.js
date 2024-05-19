import React, { useState, useRef, useEffect } from 'react';
import './EditableButton.css';

const EditableButton = ({ id, text, onChange, link, onLinkChange, style, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const [currentLink, setCurrentLink] = useState(link.url);
  const [openInNewTab, setOpenInNewTab] = useState(link.openInNewTab);
  const [error, setError] = useState(false);
  const [isLinkEditing, setIsLinkEditing] = useState(false);
  const buttonRef = useRef(null);
  const textAreaRef = useRef(null);
  const textWidthRef = useRef(null);
  const modalRef = useRef(null);

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setError(inputText.length >= 250);
    setCurrentText(inputText);
  };

  const handleBlur = (event) => {
    const editLinkButton = document.querySelector('.edit-link-button');
    if (event.target === editLinkButton || event.relatedTarget === editLinkButton) {
      return;
    }
    if (!currentText.trim()) {
      setCurrentText(text);
      onChange(text);
    } else {
      setIsEditing(false);
      handleLinkChange();
      onChange(currentText);
    }
  };

  const handleButtonClick = () => {
    setIsEditing(true);
  };

  const toggleLinkEdit = () => {
    setIsLinkEditing(!isLinkEditing);
    if (isLinkEditing === true) {
      setIsEditing(false);
      handleLinkChange();
    }
  };

  const handleLinkChange = () => {
    onLinkChange({ url: currentLink, openInNewTab });
    setIsEditing(false);
    setIsLinkEditing(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const editLinkButton = document.querySelector('.edit-link-button');
      if (modalRef.current && !modalRef.current.contains(event.target) && event.target !== editLinkButton) {
        setIsLinkEditing(false);
        setIsEditing(false);
        event.preventDefault();  // <-- This might be causing issues
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  useEffect(() => {
    if (isEditing) {
      textAreaRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    console.log("Component rendered with openInNewTab:", openInNewTab);
  }, [openInNewTab]);
  return (
    <>
      {isEditing ? (
        <>
          <textarea
            ref={textAreaRef}
            value={currentText}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`${className} editable-button-textarea ${error ? 'error' : ''}`}
            style={{ ...style, resize: 'none' }}
            maxLength={250}
          />
          {!isLinkEditing && (
            <button onClick={toggleLinkEdit} className="edit-link-button">Edit Link <i class="bi bi-pencil-square"></i></button>
          )}
          {isLinkEditing && (
            <div ref={modalRef} className="link-settings-modal">
              <div className='link-title'>
              <button className="link-close-button" onClick={toggleLinkEdit}>X</button>
              <h4>Link Settings</h4>
              </div>
              <hr />
              <div className='link-settings-content'>
                <p>URL</p>
                <input type="text" value={currentLink} onChange={e => setCurrentLink(e.target.value)} />
              </div>
              <label className='link-settings-target-chooser' onClick={(e) => setOpenInNewTab(!openInNewTab)}>
              <input
                  type="checkbox"
                  onChange={(e) => {
                    console.log("Checkbox clicked, current state:", openInNewTab);
                    setOpenInNewTab(!openInNewTab);
                  }}
                  checked={openInNewTab}
                />
                Open in new tab
              </label>


            </div>
          )}
        </>
      ) : (
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className={`${className} editable-button ${error ? 'error' : ''}`}
          style={style}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default EditableButton;
