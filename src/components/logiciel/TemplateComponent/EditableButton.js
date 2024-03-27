// EditableButton.js
import React, { useState, useRef, forwardRef } from 'react';

const EditableButton = forwardRef(({ initialText, onTextChange, onEditStyle, style, isEditable = true }, ref) => {
    const [editing, setEditing] = useState(false);
    const [buttonText, setButtonText] = useState(initialText);

    const handleEdit = () => {
        if (isEditable && !editing) {
            setEditing(true);
        }
    };

    const handleSave = () => {
        if (onTextChange) {
            onTextChange(buttonText);
        }
        setEditing(false);
    };

    const handleChange = (event) => {
        setButtonText(event.target.value);
    };

    const handleEditStyle = () => {
        if (onEditStyle) {
            onEditStyle();
        }
    };

    return (
        <div>
            {editing ? (
                <input
                    type="text"
                    value={buttonText}
                    onChange={handleChange}
                    onBlur={handleSave}
                    style={{ ...style }}
                />
            ) : (
                <button
                    style={{ ...style }}
                    onClick={handleEdit}
                    onDoubleClick={handleEditStyle} // Double click to trigger style edit
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
});

export default EditableButton;
