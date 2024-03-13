import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const EditableText = forwardRef(
  ({ tagName, content, onContentChange, style, innerRef, onClick, isEditable }, ref) => {
    const [editing, setEditing] = useState(false);
    const contentRef = useRef(content);
    const [cursorPosition, setCursorPosition] = useState(null);

    useEffect(() => {
      contentRef.current = content;
    }, [content]);

    const handleEdit = () => {
      if (isEditable && !editing) {
        setEditing(true);
        setTimeout(() => {
          if (innerRef.current) {
            innerRef.current.focus();
          }
        }, 0);
      }
    };

    const handleContentChange = (event) => {
      event.preventDefault();
      const newContent = event.currentTarget.textContent;
      contentRef.current = newContent;
      const cursorPos = window.getSelection().getRangeAt(0).startOffset;
      setCursorPosition(cursorPos);
    };

    const handleSave = () => {
      onContentChange(contentRef.current);
      setEditing(false);
      setCursorPosition(null);
    };

    useImperativeHandle(ref, () => ({
      getContent: () => contentRef.current,
    }));

    const TagName = tagName;

    useEffect(() => {
      if (cursorPosition !== null && innerRef.current && innerRef.current.childNodes[0]) {
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(innerRef.current.childNodes[0], cursorPosition);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }, [cursorPosition, innerRef]);

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
            {contentRef.current}
          </TagName>
        ) : (
          <TagName ref={innerRef} className="editable-text" style={style} onClick={handleEdit}>
            {contentRef.current}
          </TagName>
        )}
      </div>
    );
  }
);

export default EditableText;
