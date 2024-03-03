import React, { useState } from 'react';
import './TemplateTestComponents.css';

export default function TemplateTestComponents({ settings = {}, settingsFetched = true }) {
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

  // Define default styles directly in the component
  const defaultStyles = {
    templateWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      backgroundColor: '#9600FA',
    },
    templateWrapperColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    title: {
      fontSize: '35px',
      color: '#fff',
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: '800',
    },
    paragraph: {
      fontSize: '18px',
      color: '#a0a0a0',
      fontFamily: "'Inter', sans-serif",
      fontWeight: '500',
      textAlign: 'left',
    },
    button: {
      fontSize: '15px',
      color: '#fff',
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: '500',
      backgroundColor: '#58D7AD',
    },
  };

  // Apply styles conditionally based on whether settings have been successfully fetched
  const wrapperStyle = settingsFetched ? { ...defaultStyles.templateWrapper, ...settings.templateWrapper } : defaultStyles.templateWrapper;
  const columnStyle = settingsFetched ? { ...defaultStyles.templateWrapperColumn, ...settings.templateWrapperColumn } : defaultStyles.templateWrapperColumn;
  const titleStyle = settingsFetched ? { ...defaultStyles.title, ...settings.title } : defaultStyles.title;
  const paragraphStyle = settingsFetched ? { ...defaultStyles.paragraph, ...settings.paragraph } : defaultStyles.paragraph;
  const buttonStyle = settingsFetched ? { ...defaultStyles.button, ...settings.button } : defaultStyles.button;

  return (
    <div style={wrapperStyle} className='template-wrapper'>
      <img src='/images/template-test.png' alt="Template Test" />

      <div style={columnStyle} className='template-wrapper-column'>
        {isEditing && selectedElement === 'title' ? (
          <input
            type="text"
            value={editableContent.title}
            onChange={(e) => handleContentChange(e, 'title')}
            onBlur={() => setIsEditing(false)}
            autoFocus
          />
        ) : (
          <h1
            style={titleStyle}
            className='title'
            onClick={() => { setIsEditing(true); onElementSelect('title'); }}
          >
            {editableContent.title}
          </h1>
        )}

        {isEditing && selectedElement === 'paragraph' ? (
          <textarea
            value={editableContent.paragraph}
            onChange={(e) => handleContentChange(e, 'paragraph')}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <p
            style={paragraphStyle}
            className='paragraph'
            onClick={() => { setIsEditing(true); onElementSelect('paragraph'); }}
          >
            {editableContent.paragraph}
          </p>
        )}

        <button style={buttonStyle} className='button'>Clique</button>
      </div>

      <img id='redirect_test' src='/images/template-test.png' alt="Template Test" />
    </div>
  );
}
