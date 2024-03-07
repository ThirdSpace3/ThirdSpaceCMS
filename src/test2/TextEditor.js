import React, { useState } from 'react';
import EditableText from './EditableText'; // Adjust the import path according to your file structure

const TextEditor = ({ settings }) => {
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

  const [selectedElement, setSelectedElement] = useState(null);

  const handleContentChange = (key, newValue) => {
    setContent((prevContent) => ({
      ...prevContent,
      [key]: newValue,
    }));
  };

  // Safely extract style settings, providing fallbacks if undefined
  const { background = {}, typography = {}, border = {} } = settings || {};

  const containerStyle = {
    ...background,
    border: `${border.borderWidth || 0}px solid ${border.borderColor || '#000'}`,
  };

  const getTextStyle = (element) => ({
    ...typography,
    fontFamily: typography.fontFamily || 'Arial',
    fontSize: typography.fontSize ? `${typography.fontSize}px` : '16px',
    color: typography.color || '#000',
    textAlign: typography.textAlign || 'left',
    textDecoration: typography.textDecoration || 'none',
    outline: selectedElement === element ? '2px solid blue' : 'none',
  });

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section>
        <EditableText
          tagName="h1"
          content={content.title}
          onContentChange={(newValue) => handleContentChange('title', newValue)}
          style={getTextStyle('title')}
          onClick={() => setSelectedElement('title')}
        />
        <EditableText
          tagName="h2"
          content={content.subtitle}
          onContentChange={(newValue) => handleContentChange('subtitle', newValue)}
          style={getTextStyle('subtitle')}
          onClick={() => setSelectedElement('subtitle')}
        />
        <EditableText
          tagName="p"
          content={content.introParagraph}
          onContentChange={(newValue) => handleContentChange('introParagraph', newValue)}
          style={getTextStyle('introParagraph')}
          onClick={() => setSelectedElement('introParagraph')}
        />
      </section>
      
      {/* Section 1 */}
      <section>
        <EditableText
          tagName="h2"
          content={content.section1Title}
          onContentChange={(newValue) => handleContentChange('section1Title', newValue)}
          style={getTextStyle('section1Title')}
          onClick={() => setSelectedElement('section1Title')}
        />
        <EditableText
          tagName="p"
          content={content.section1Content}
          onContentChange={(newValue) => handleContentChange('section1Content', newValue)}
          style={getTextStyle('section1Content')}
          onClick={() => setSelectedElement('section1Content')}
        />
      </section>
      
      {/* Section 2 */}
      <section>
        <EditableText
          tagName="h2"
          content={content.section2Title}
          onContentChange={(newValue) => handleContentChange('section2Title', newValue)}
          style={getTextStyle('section2Title')}
          onClick={() => setSelectedElement('section2Title')}
        />
        <EditableText
          tagName="p"
          content={content.section2Content}
          onContentChange={(newValue) => handleContentChange('section2Content', newValue)}
          style={getTextStyle('section2Content')}
          onClick={() => setSelectedElement('section2Content')}
        />
      </section>
      
      {/* Add more sections as needed */}
    </div>
  );
};

export default TextEditor;
