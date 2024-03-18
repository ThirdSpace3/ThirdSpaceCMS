import React, { } from 'react';
import '../RightBar.css';
export default function BorderSettings({ setSelectedSide, toggleSection, isOpen, handleInputChange }) {

  const selectAllBorders = () => {
    setSelectedSide(''); // Use a special value 'all' to indicate all borders
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
            </div>
          </div>
          <div className='parameters-content-line'>
            <p className='parameters-content-line-title'>Border Style</p>
            <div className='parameters-content-line-container'>
              <select onChange={(e) => handleInputChange(e, 'borderStyle', 'select')}>
                <option value="none">None</option>
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </select>
            </div>
          </div>

        </div>
        <hr className='parameters-wrapper-separation' />

      </div>
    </div>
  );
}
