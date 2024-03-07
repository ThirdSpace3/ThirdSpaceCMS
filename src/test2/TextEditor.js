import React, { useState, useEffect } from 'react';
import EditableText from './EditableText'; // Ensure the path is correct

const TextEditor = ({ settings, selectedElement, setSelectedElement }) => {
  const [content, setContent] = useState({
    title: 'Your Landing Page Title',
    subtitle: 'Your Subtitle Here',
    introParagraph: 'This is an editable introductory paragraph providing an overview of what your landing page is about.',
    section1Title: 'Section 1 Title',
    section1Content: 'Content for section 1. This is editable.',
    section2Title: 'Section 2 Title',
    section2Content: 'Content for section 2. This is also editable.',
    // Extend with more content as needed
  });

  const handleContentChange = (key, newValue) => {
    setContent((prevContent) => ({
      ...prevContent,
      [key]: newValue,
    }));
  };

  // Logs for debugging
  useEffect(() => {
    console.log("New settings received:", settings);
  }, [settings]);

  const getTextStyle = (element) => {
    const elementSettings = settings[element]?.typography || {};

    return {
      fontFamily: elementSettings.fontFamily || 'Arial',
      fontSize: elementSettings.fontSize ? `${elementSettings.fontSize}px` : '16px',
      color: elementSettings.color || '#000',
      textAlign: elementSettings.textAlign || 'left',
      textDecoration: elementSettings.textDecoration || 'none',
      outline: selectedElement === element ? '2px solid blue' : 'none',
    };
  };

  return (
    <div>
      {/* Iterate over content keys to dynamically generate EditableText components */}
      {Object.keys(content).map((key) => (
        <section key={key}>
          <EditableText
            tagName={key.includes('Title') ? 'h2' : 'p'} // Simple logic to determine tag type
            content={content[key]}
            onContentChange={(newValue) => handleContentChange(key, newValue)}
            style={getTextStyle(key)}
            onClick={() => setSelectedElement(key)}
          />
        </section>
      ))}
    </div>
  );
};

export default TextEditor;
