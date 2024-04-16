// In EditableDiv.js
import React, { useState } from 'react';

function EditableDiv() {
  const [style, setStyle] = useState({});

  const handleChange = (e) => {
    setStyle({ ...style, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div style={style}>Editable Div</div>
      <input name="backgroundColor" placeholder="Background Color" onChange={handleChange} />
      <input name="color" placeholder="Text Color" onChange={handleChange} />
      {/* Add more style properties as needed */}
    </div>
  );
}

export default EditableDiv;
