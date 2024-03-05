import React, { useState } from 'react';
import './TemplateTestComponents.css';
export default function TemplateTestComponents({ settings, styles }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedElement, setSelectedElement] = useState('title');

  const [editableContent, setEditableContent] = useState({
    title: 'Template de Test #1',
    paragraph: 'Tu vas me devoir un café je crois bien',
  });

  const handleContentChange = (e, contentType) => {
    setEditableContent((prevContent) => ({
      ...prevContent,
      [contentType]: e.target.value,
    }));
  };

  const onElementSelect = (element) => {
    setSelectedElement(element);
  };

  const backgroundStyle = settings.background || {};
  const typographyStyle = settings.typography || {};
  const borderStyle = settings.border || {};


  const containerStyle = {
    ...backgroundStyle,
    border: `${borderStyle.borderWidth}px solid ${borderStyle.borderColor}`,
  };

  const textStyle = {
    ...typographyStyle,
    fontFamily: typographyStyle.fontFamily || 'Arial',
    fontSize: typographyStyle.fontSize || '16px',
    color: typographyStyle.color || '#000000',
    textAlign: typographyStyle.textAlign || 'left',
    textDecoration: typographyStyle.textDecoration || 'none',
  };


  return (
    <>
      <div className='template-wrapper' style={containerStyle}>
        <img src='/images/template-test.png' />

        <div className='template-wrapper-column' >


          {/* Conditional rendering for title */}
          {isEditing && selectedElement === 'title' ? (
            <input
              type="text"
              value={editableContent.title}
              onChange={(e) => handleContentChange(e, 'title')}
              onBlur={() => setIsEditing(false)} // Stop editing when the input loses focus
              autoFocus
            />
          ) : (
            <h1 className='title' style={textStyle} onClick={() => { setIsEditing(true); onElementSelect('title'); }}>
              {editableContent.title}
            </h1>
          )}

          {/* Conditional rendering for paragraph */}
          {isEditing && selectedElement === 'paragraph' ? (
            <textarea
              value={editableContent.paragraph}
              onChange={(e) => handleContentChange(e, 'paragraph')}
              onBlur={() => setIsEditing(false)} // Stop editing when the textarea loses focus
            />
          ) : (
            <p className='paragraph' style={textStyle} onClick={() => { setIsEditing(true); onElementSelect('paragraph'); }}>
              {editableContent.paragraph}
            </p>

          )}

          <button className='button' >Clique</button>
        </div>

        <img id='redirect_test' src='/images/template-test.png' />
      </div>
    </>
  );
}
