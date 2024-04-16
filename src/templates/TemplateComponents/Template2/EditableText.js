// In EditableText.js
import React, { useState } from 'react';

function EditableText() {
  const [text, setText] = useState('Editable Text');
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
      <div style={style}>{text}</div>
      <input name="color" placeholder="Text Color" onChange={handleStyleChange} />
      {/* Add more style properties as needed */}
    </div>
  );
}

export default EditableText;
