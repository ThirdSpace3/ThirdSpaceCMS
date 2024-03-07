import React from 'react';
import './EditableText.css'
const EditableText = ({ tagName, content, onContentChange, style, onClick }) => {
  const Tag = tagName; // Dynamically determined tag based on props

  const handleBlur = (event) => {
    // Use innerText to capture content without HTML, or innerHTML if you need HTML content
    onContentChange(event.target.innerText);
  };

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning={true}
      onBlur={handleBlur}
      dangerouslySetInnerHTML={{ __html: content }}
      className={`editable ${tagName}`}
      style={style} // Apply the style prop
      onClick={onClick} // Attach the onClick handler
    />
  );
};

export default EditableText;
