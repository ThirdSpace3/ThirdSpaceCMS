import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './EditableText.css';

const EditableText = forwardRef(({ tagName, content, onContentChange, style, innerRef, onClick }, ref) => {
  const [editing, setEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onContentChange(currentContent);
    setEditing(false);
  };

  const handleContentChange = (event) => {
    setCurrentContent(event.target.value);
  };

  useImperativeHandle(ref, () => ({
    getContent: () => currentContent,
  }));

  const TagName = tagName;

  return (
    <div className="editable-text-container">
      {editing ? (
        <TagName
          ref={innerRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="editable-text-input"
          style={style}
          onInput={handleContentChange}
          onBlur={handleSave}
        >
          {currentContent}
        </TagName>
      ) : (
        <TagName
          ref={innerRef}
          className="editable-text"
          style={style}
          onClick={() => onClick(innerRef)} // Update this line
        >
          {currentContent}
        </TagName>
      )}
    </div>
  );
});


export default EditableText;
