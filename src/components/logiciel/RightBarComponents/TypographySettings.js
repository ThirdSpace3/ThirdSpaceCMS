import React, { useState } from 'react';

export default function TypographySettings({
    selectedElement,
    updateStyle,
    toggleSection,
    isOpen,
    handleInputChange,
    selectedDecoration,
    handleTextDecoration,
    selectedAlign,
    handleTextAlign,
  }) {  const [typographyStyle, setTypographyStyle] = useState({});

  const handleTypographyChange = (e, styleProperty) => {
    setTypographyStyle(prevState => ({ ...prevState, [styleProperty]: e.target.value }));
    updateStyle({ [styleProperty]: e.target.value });
  };

  return (
    <div>
          <div className='parameters-wrapper'>
            <div className='parameters-wrapper-title-box' onClick={() => toggleSection('typographie')}>
              <p className='parameters-wrapper-title'>Typographie</p>
              <i className={`bi bi-caret-down-fill ${isOpen.typographie ? 'rotate' : ''}`}></i>
            </div>
            <div className={`parameters-wrapper-content ${isOpen.typographie ? 'open' : ''}`}>
              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Font Family</p>
                <div className='parameters-content-line-container'>
                  <select onChange={(e) => handleInputChange(e, 'fontFamily', 'select')}>
                    <option>Arial</option>
                    <option>Verdana</option>
                    <option>Helvetica</option>
                  </select>

                </div>
              </div>
              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Font Weight</p>
                <div className='parameters-content-line-container'>
                  <select onChange={(e) => handleInputChange(e, 'fontWeight', 'select')}>
                    <option value="100">Light</option>
                    <option value="500">Normal</option>
                    <option value="800">Bold</option>
                    <option value="1000">Extra Bold</option> 
                  </select>
                </div>
              </div>
              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Font Size</p>
                <div className='parameters-content-line-container'>
                  <input type="number" min="8" max="72" step="1" defaultValue="14" onChange={(e) => handleInputChange(e, 'fontSize', 'number')} />
                </div>
              </div>
              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Color</p>
                <div className='parameters-content-line-container'>
                  <input type="color" onChange={(e) => handleInputChange(e, 'color')} />
                </div>
              </div>
              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Text Decoration</p>
                <div className='parameters-content-line-container'>
                  <a href='#' className={`parameters-content-line-item ${selectedDecoration === 'italic' ? 'selected' : ''}`} onClick={() => handleTextDecoration('italic')}><i className="bi bi-type-italic"></i></a>
                  <hr className='parameters-content-line-separation' />
                  <a href='#' className={`parameters-content-line-item ${selectedDecoration === 'underline' ? 'selected' : ''}`} onClick={() => handleTextDecoration('underline')}><i className="bi bi-type-underline"></i></a>
                  <hr className='parameters-content-line-separation' />
                  <a href='#' className={`parameters-content-line-item ${selectedDecoration === 'line-through' ? 'selected' : ''}`} onClick={() => handleTextDecoration('line-through')}><i className="bi bi-type-strikethrough"></i></a>
                </div>

              </div>
              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Text Align</p>
                <div className='parameters-content-line-container'>
                  <a
                    href="#"
                    className={`parameters-content-line-item ${selectedAlign === 'left' ? 'selected' : ''}`}
                    onClick={() => handleTextAlign('left')}
                  >
                    <i className="bi bi-text-left"></i>
                  </a>

                  <hr className='parameters-content-line-separation' />

                  <a
                    href="#"
                    className={`parameters-content-line-item ${selectedAlign === 'center' ? 'selected' : ''}`}
                    onClick={() => handleTextAlign('center')}
                  >
                    <i className="bi bi-text-center"></i>
                  </a>

                  <hr className='parameters-content-line-separation' />

                  <a
                    href="#"
                    className={`parameters-content-line-item ${selectedAlign === 'right' ? 'selected' : ''}`}
                    onClick={() => handleTextAlign('right')}
                  >
                    <i className="bi bi-text-right"></i>
                  </a>

                  <hr className='parameters-content-line-separation' />

                  <a
                    href="#"
                    className={`parameters-content-line-item ${selectedAlign === 'justify' ? 'selected' : ''}`}
                    onClick={() => handleTextAlign('justify')}
                  >
                    <i className="bi bi-justify"></i>
                  </a>
                </div>
              </div>


            </div>
            <hr className='parameters-wrapper-separation' />
          </div>
    </div>
  );
}
