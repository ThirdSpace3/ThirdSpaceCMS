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
  const modalRef = useRef(null); // Ref for the modal to handle outside clicks

  useEffect(() => {
    if (buttonRef.current && textAreaRef.current) {
      textAreaRef.current.style.width = `${buttonRef.current.offsetWidth}px`;
    }
  }, [text]);

  useEffect(() => {
    if (textWidthRef.current && textAreaRef.current) {
      textAreaRef.current.style.width = `${textWidthRef.current.offsetWidth + 20}px`;
    }
  }, [currentText]);

  // Listen for clicks outside the modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsLinkEditing(false); // Close modal if clicking outside
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setError(inputText.length >= 250);
    setCurrentText(inputText);
  };

  const handleBlur = () => {
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
            <button onClick={toggleLinkEdit} className="edit-link-button">Edit Link</button>
          )}
          {isLinkEditing && (
            <div ref={modalRef} className="link-settings-modal">
              <button className="close-button" onClick={toggleLinkEdit}>X</button>
              <h4>Link Settings</h4>

              <hr></hr>
              <div className='link-settings-content'>

                <p>URL</p>
                <input type="text" value={currentLink} onChange={e => setCurrentLink(e.target.value)} />
              </div>
              <label className='link-settings-target-chooser'>
                <input
                  type="checkbox"
                  checked={openInNewTab}
                  onChange={(e) => {
                    setOpenInNewTab(!openInNewTab);
                    onLinkChange({ url: currentLink, openInNewTab: !openInNewTab });
                  }}
                />
                Open in new tab
              </label>

            </div>
          )}
          <span ref={textWidthRef} className="hidden-text-measure" aria-hidden="true" style={{ ...style, visibility: 'hidden', position: 'absolute', whiteSpace: 'pre' }}>
            {currentText || ' '}
          </span>
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
