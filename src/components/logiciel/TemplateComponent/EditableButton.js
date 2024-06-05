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
  const textRef = useRef(null);
  const modalRef = useRef(null);
  const hiddenTextMeasureRef = useRef(null);
  const cursorPositionRef = useRef(0);

  useEffect(() => {
    const savedText = localStorage.getItem(`editableButtonText-${id}`);
    const savedLink = localStorage.getItem(`editableButtonLink-${id}`);
    const savedOpenInNewTab = localStorage.getItem(`editableButtonOpenInNewTab-${id}`);

    if (savedText) {
      setCurrentText(savedText);
    }
    if (savedLink) {
      setCurrentLink(savedLink);
    }
    if (savedOpenInNewTab !== null) {
      setOpenInNewTab(JSON.parse(savedOpenInNewTab));
    }
  }, [id]);

  useEffect(() => {
    updateButtonWidth();
  }, [currentText]);

  const handleInputChange = (event) => {
    const inputText = event.target.innerText;
    cursorPositionRef.current = window.getSelection().getRangeAt(0).startOffset;

    if (inputText.length > 100) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    setCurrentText(inputText);
    localStorage.setItem(`editableButtonText-${id}`, inputText);
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
    updateButtonWidth();
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
    localStorage.setItem(`editableButtonLink-${id}`, currentLink);
    localStorage.setItem(`editableButtonOpenInNewTab-${id}`, openInNewTab);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const editLinkButton = document.querySelector('.edit-link-button');
      if (modalRef.current && !modalRef.current.contains(event.target) && event.target !== editLinkButton) {
        setIsLinkEditing(false);
        setIsEditing(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  useEffect(() => {
    if (isEditing) {
      textRef.current.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(textRef.current.childNodes[0], cursorPositionRef.current);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, [isEditing, currentText]);

  const updateButtonWidth = () => {
    if (hiddenTextMeasureRef.current && buttonRef.current) {
      const width = hiddenTextMeasureRef.current.offsetWidth + 20; // Adding some padding
      buttonRef.current.style.width = `${width}px`;
    }
  };

  return (
    <>
      {isEditing ? (
        <>
          <div
            ref={textRef}
            contentEditable
            suppressContentEditableWarning
            onBlur={handleBlur}
            onInput={handleInputChange}
            className={`${className} editable-button-textarea ${error ? 'error' : ''}`}
            style={{ ...style }}
          >
            {currentText}
          </div>
          {!isLinkEditing && (
            <button onClick={toggleLinkEdit} className="edit-link-button">Edit Link <i className="bi bi-pencil-square"></i></button>
          )}
          {isLinkEditing && (
            <div ref={modalRef} className="link-settings-modal">
              <div className='link-title'>
                <h4>Link Settings</h4>
                <button className="link-close-button" onClick={toggleLinkEdit}><i className="bi bi-x"></i></button>
              </div>
              <hr />
              <div className='link-settings-content'>
                <p>URL</p>
                <input type="text" value={currentLink} onChange={e => setCurrentLink(e.target.value)} />
              </div>
              <label className='link-settings-target-chooser'>
                <input
                  type="checkbox"
                  onChange={() => {
                    setOpenInNewTab(prev => !prev);
                  }}
                  checked={openInNewTab}
                />
                Open in new tab
              </label>
            </div>
          )}
          <div ref={hiddenTextMeasureRef} className="hidden-text-measure">
            {currentText}
          </div>
        </>
      ) : (
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className={`${className} editable-button ${error ? 'error' : ''}`}
          style={style}
        >
          {currentText}
        </button>
      )}
    </>
  );
};

export default EditableButton;
