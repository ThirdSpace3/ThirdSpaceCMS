// SizeSection.js
import React, { useState } from 'react';
import '../RightBar.css';

const SizeSection = ({ isOpen, toggleSection, updateStyle, onSettingsChange, selectedElement }) => {
  const [sizeStyle, setSizeStyle] = useState({
    width: '',
    height: '',
    minWidth: '',
    maxWidth: '',
    minHeight: '',
    maxHeight: '',
    overflow: '',
  });

  const handleSizeChange = (e, styleProperty) => {
    setSizeStyle(prevState => ({ ...prevState, [styleProperty]: e.target.value }));
    updateStyle({ [styleProperty]: e.target.value });
  };
  return (
    <div className='parameters-wrapper'>
      <div className='parameters-wrapper-title-box' onClick={() => toggleSection('size')}>
        <p className='parameters-wrapper-title'>Size</p>
        <i className={`bi bi-caret-down-fill ${isOpen.size ? 'rotate' : ''}`}></i>
      </div>

      <div className={`parameters-wrapper-content ${isOpen.size ? 'open' : ''}`}>
        <div className='parameters-content-line'>
          <p className='parameters-content-line-title'>Width</p>
          <div className='parameters-content-line-container'>
            <input type="text" value={sizeStyle.width} onChange={(e) => setSizeStyle({ ...sizeStyle, width: e.target.value })} onBlur={() => onSettingsChange(selectedElement, { width: sizeStyle.width })} />
            <span className="px-label">px</span>

          </div>
        </div>
        <div className='parameters-content-line'>
          <p className='parameters-content-line-title'>Height</p>
          <div className='parameters-content-line-container'>
            <input type="text" value={sizeStyle.height} onChange={(e) => setSizeStyle({ ...sizeStyle, height: e.target.value })} onBlur={() => onSettingsChange(selectedElement, { height: sizeStyle.height })} />
            <span className="px-label">px</span>

          </div>
        </div>
        <div className='parameters-content-line'>
          <p className='parameters-content-line-title'>Min Width</p>
          <div className='parameters-content-line-container'>
            <input type="text" value={sizeStyle.minWidth} onChange={(e) => setSizeStyle({ ...sizeStyle, minWidth: e.target.value })} onBlur={() => onSettingsChange(selectedElement, { size: sizeStyle })} />
            <span className="px-label">px</span>
          </div>
        </div>
        <div className='parameters-content-line'>
          <p className='parameters-content-line-title'>Max Width</p>
          <div className='parameters-content-line-container'>
            <input type="text" value={sizeStyle.maxWidth} onChange={(e) => setSizeStyle({ ...sizeStyle, maxWidth: e.target.value })} onBlur={() => onSettingsChange(selectedElement, { size: sizeStyle })} />
            <span className="px-label">px</span>
          </div>
        </div>
        <div className='parameters-content-line'>
          <p className='parameters-content-line-title'>Min Height</p>
          <div className='parameters-content-line-container'>
            <input type="text" value={sizeStyle.minHeight} onChange={(e) => setSizeStyle({ ...sizeStyle, minHeight: e.target.value })} onBlur={() => onSettingsChange(selectedElement, { size: sizeStyle })} />
            <span className="px-label">px</span>
          </div>
        </div>
        <div className='parameters-content-line'>
          <p className='parameters-content-line-title'>Max Height</p>
          <div className='parameters-content-line-container'>
            <input type="text" value={sizeStyle.maxHeight} onChange={(e) => setSizeStyle({ ...sizeStyle, maxHeight: e.target.value })} onBlur={() => onSettingsChange(selectedElement, { size: sizeStyle })} />
            <span className="px-label">px</span>
          </div>
        </div>


        <div className='parameters-content-line'>
          <p className='parameters-content-line-title'>Overflow</p>
          <div className='parameters-content-line-container'>
            <button
              className={`parameters-content-line-button ${sizeStyle.overflow === 'visible' ? 'selected' : ''}`}
              onClick={() => {
                setSizeStyle({ ...sizeStyle, overflow: 'visible' });
                onSettingsChange(selectedElement, { size: sizeStyle });
              }}
            >
              <i className="bi bi-eye"></i>
            </button>
            <button
              className={`parameters-content-line-button ${sizeStyle.overflow === 'hidden' ? 'selected' : ''}`}
              onClick={() => {
                setSizeStyle({ ...sizeStyle, overflow: 'hidden' });
                onSettingsChange(selectedElement, { size: sizeStyle });
              }}
            >
              <i className="bi bi-eye-slash"></i>
            </button>
          </div>
        </div>






      </div>
      <hr className='parameters-wrapper-separation' />
    </div>
  );
};

export default SizeSection;
