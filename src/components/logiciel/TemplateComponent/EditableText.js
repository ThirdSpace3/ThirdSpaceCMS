import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const EditableText = forwardRef(
  ({ tagName, content, onContentChange, style, innerRef, onClick, isEditable }, ref) => {
    const [editing, setEditing] = useState(false);
    const [currentContent, setCurrentContent] = useState(content);

    useEffect(() => {
      setCurrentContent(content);
    }, [content]);

    const handleEdit = () => {
      if (isEditable && !editing) {
        setEditing(true);
        setTimeout(() => innerRef.current?.focus(), 0);
      }
    };

    const handleContentChange = (event) => {
      const newContent = event.currentTarget.textContent;
      setCurrentContent(newContent);
    };

    const handleSave = () => {
      if (currentContent !== content) {
        onContentChange(currentContent);
      }
      setEditing(false);
    };

    useImperativeHandle(ref, () => ({
      getContent: () => currentContent,
    }));

    const TagName = tagName;

    return (
      <div className={`editable-text-container${editing ? ' editing' : ''}`} onClick={() => onClick(innerRef)}>
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
            onClick={handleEdit}
          >
            {currentContent}
          </TagName>
        )}
      </div>
    );
  }
);

export default EditableText;
