// In EditableButton.js
import React, { useState } from 'react';

function EditableButton() {
  const [text, setText] = useState('Button');
  const [style, setStyle] = useState({});

  const handleStyleChange = (e) => {
    setStyle({ ...style, [e.target.name]: e.target.value });
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input value={text} onChange={handleTextChange} />
      <button style={style}>{text}</button>
      <input name="backgroundColor" placeholder="Background Color" onChange={handleStyleChange} />
      <input name="color" placeholder="Text Color" onChange={handleStyleChange} />
      {/* Add more style properties as needed */}
    </div>
  );
}

export default EditableButton;
