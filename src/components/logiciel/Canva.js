import React, { useState } from 'react';
import './Canva.css';
import './Root.css';
import TemplateTestComponents from '../../templates/TemplateTestComponents';

export default function Canva({ settings, onTextSelect }) {
    const [selectedText, setSelectedText] = useState(null);
  
    const handleTextSelect = (text) => {
      setSelectedText(text);
      onTextSelect(text);
    };
      return (
    <>
      <div className='canva-wrapper'>
        <TemplateTestComponents settings={settings} /> {/* Pass the settings prop to the TemplateTestComponents */}
      </div>
    </>
  );
}
