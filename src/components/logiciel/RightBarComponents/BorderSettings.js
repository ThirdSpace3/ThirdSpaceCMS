import React, { useState, useEffect } from 'react';
import '../RightBar.css';
export default function BorderSettings({ setSelectedSide, toggleSection, isOpen, handleInputChange, borderStyle, selectedSide }) {

  const [selectedBorderStyle, setSelectedBorderStyle] = useState(borderStyle.borderStyle || 'none');

// useEffect hook to synchronize component state with changes in selectedSide or borderStyle
useEffect(() => {
  if (selectedSide && borderStyle[selectedSide]) {
    setSelectedBorderStyle(borderStyle[selectedSide].borderStyle || 'none');
  }
}, [borderStyle, selectedSide]);

const selectAllBorders = () => {
  setSelectedSide('all'); // Adjusted to 'all' based on your comment in the code
};

const handleBorderStyleChange = (newStyle) => {
  setSelectedBorderStyle(newStyle); // Update local state for visual feedback
  handleInputChange({ target: { value: newStyle } }, 'borderStyle', 'select'); // Mimicking an event structure
};
return (
    <div>
      <div className='parameters-wrapper'>
        <div className='parameters-wrapper-title-box' onClick={() => toggleSection('border')}>
          <p className='parameters-wrapper-title'>Border</p>
          <i className={`bi bi-caret-down-fill ${isOpen.border ? 'rotate' : ''}`}></i>
        </div>
        <div className={`parameters-wrapper-content ${isOpen.border ? 'open' : ''}`}>

          {/* Icons for selecting the side */}
          <div className='parameters-content-line'>
            <i className="bi bi-border-outer" onClick={selectAllBorders} style={{ color: 'white' }}></i>
            <i className="bi bi-border-top" onClick={() => setSelectedSide('top')} style={{ color: 'white' }}></i>
            <i className="bi bi-border-right" onClick={() => setSelectedSide('right')} style={{ color: 'white' }}></i>
            <i className="bi bi-border-bottom" onClick={() => setSelectedSide('bottom')} style={{ color: 'white' }}></i>
            <i className="bi bi-border-left" onClick={() => setSelectedSide('left')} style={{ color: 'white' }}></i>
          </div>
          <div className='parameters-content-line'>
            <p className='parameters-content-line-title'>Border Radius</p>
            <div className='parameters-content-line-container'>
              <input type="number" min="0" max="100" step="1" defaultValue="0" onChange={(e) => handleInputChange(e, 'borderRadius', 'number')} />
              <span className="px-label">px</span>
            </div>
          </div>
          <div className='parameters-content-line'>
            <p className='parameters-content-line-title'>Border Color</p>
            <div className='parameters-content-line-container'>
              <input type="color" onChange={(e) => handleInputChange(e, 'borderColor', 'color')}></input>
            </div>
          </div>
          <div className='parameters-content-line'>
            <p className='parameters-content-line-title'>Border Width</p>
            <div className='parameters-content-line-container'>
              <input type="number" min="0" max="20" step="1" defaultValue="0" onChange={(e) => handleInputChange(e, 'borderWidth')} />
              <span className="px-label">px</span>

            </div>
          </div>
          <div className='parameters-content-line'>
            <p className='parameters-content-line-title'>Border Style</p>
            <div className='parameters-content-line-container'>
              {/* Icon-based selection for Border Style */}
              <i className={`bi bi-slash-circle ${selectedBorderStyle === 'none' ? 'selected-icon' : ''}`} onClick={() => handleBorderStyleChange('none')}></i>
              <i className={`bi bi-dash-lg ${selectedBorderStyle === 'solid' ? 'selected-icon' : ''}`} onClick={() => handleBorderStyleChange('solid')}></i>
              <i className={`bi bi-dash ${selectedBorderStyle === 'dashed' ? 'selected-icon' : ''}`} onClick={() => handleBorderStyleChange('dashed')}></i>
              {/* Optional: Add an icon for 'dotted' if needed */}
            </div>
          </div>

        </div>
        <hr className='parameters-wrapper-separation' />

      </div>
    </div>
  );
}
