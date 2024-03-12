import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const EditableText = forwardRef(
  ({ tagName, content, onContentChange, style, innerRef, onClick }, ref) => {
    const [editing, setEditing] = useState(false);
    const [currentContent, setCurrentContent] = useState(content);

    useEffect(() => {
      setCurrentContent(content);
    }, [content]);

    // Enter editing mode and focus on the editable element
    const handleEdit = () => {
      if (!editing) {
        setEditing(true);
        // Ensure focus is set after a brief delay to account for state update latency
        setTimeout(() => {
          if (innerRef.current) {
            innerRef.current.focus();
          }
        }, 0);
      }
    };

    // Capture live edits directly from the contentEditable element
    const handleContentChange = (event) => {
      event.preventDefault();
      const newContent = event.currentTarget.textContent;
      setCurrentContent(newContent);

      // Move cursor to the end of the content
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(event.currentTarget);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    };

    // Save changes and exit editing mode
    const handleSave = () => {
      onContentChange(currentContent);
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
          <TagName ref={innerRef} className="editable-text" style={style} onClick={handleEdit}>
            {currentContent}
          </TagName>
        )}
      </div>
    );
  }
);

export default EditableText;