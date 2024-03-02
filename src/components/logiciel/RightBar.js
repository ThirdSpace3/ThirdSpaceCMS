import React, { useState } from 'react';
import './RightBar.css';
import './Root.css';

export default function RightBar({ onSettingsChange }) {
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [typographyStyle, setTypographyStyle] = useState({});
  const [borderStyle, setBorderStyle] = useState({});
  const [isOpen, setIsOpen] = useState({ background: false, typographie: false, border: false });
  const [selectedAlign, setSelectedAlign] = useState(null);
  const [selectedDecoration, setSelectedDecoration] = useState(null);

  const handleInputChange = (e, styleProperty, inputType) => {
    let value;
  
    if (inputType === 'select') {
      value = e.target.value;
    } else if (inputType === 'checkbox') {
      value = e.target.checked;
    } else {
      value = parseInt(e.target.value); // Convert string to number
    }
  
    setTypographyStyle(prevState => ({ ...prevState, [styleProperty]: value }));
    onSettingsChange('typography', { [styleProperty]: value });
  };

  const handleBackgroundChange = (e, styleProperty) => {
    setBackgroundStyle(prevState => ({ ...prevState, [styleProperty]: e.target.value }));
    onSettingsChange('background', { [styleProperty]: e.target.value });
  };

  const handleBorderChange = (e, styleProperty) => {
    setBorderStyle(prevState => ({ ...prevState, [styleProperty]: parseInt(e.target.value) })); // Convert string to number
    onSettingsChange('border', { [styleProperty]: parseInt(e.target.value) }); // Convert string to number
  };

  const handleTextDecoration = (decorationType) => {
    setTypographyStyle(prevState => {
      const newStyle = { ...prevState };
  
      if (decorationType === 'italic') {
        if (newStyle.fontStyle === 'italic') {
          newStyle.fontStyle = 'normal';
          setSelectedDecoration(null);
        } else {
          newStyle.fontStyle = 'italic';
          setSelectedDecoration('italic');
        }
      } else {
        if (newStyle.textDecoration) {
          if (newStyle.textDecoration.includes(decorationType)) {
            newStyle.textDecoration = newStyle.textDecoration.split(' ').filter(style => style !== decorationType).join(' ');
            setSelectedDecoration(null);
          } else {
            newStyle.textDecoration += ` ${decorationType}`;
            setSelectedDecoration(decorationType);
          }
        } else {
          newStyle.textDecoration = decorationType;
          setSelectedDecoration(decorationType);
        }
      }
  
      onSettingsChange('typography', newStyle);
  
      return newStyle;
    });
  };
    
  
  const handleTextAlign = (alignType) => {
    setTypographyStyle(prevState => {
      const newStyle = { ...prevState, textAlign: alignType };
      onSettingsChange('typography', newStyle);
      setSelectedAlign(alignType); // Set the selectedAlign state
      return newStyle;
    });
  };
  

  const toggleSection = (section) => {
    setIsOpen(prevState => ({ ...prevState, [section]: !prevState[section] }));
  };

  return (
    <>
      <div className='rightbar-wrapper'>
        <div className='style-wrapper'>
          {/* Section Background */}
          <div className='parameters-wrapper'>
            <div className='parameters-wrapper-title-box' onClick={() => toggleSection('background')}>
              <p className='parameters-wrapper-title'>Background</p>
              <i className={`bi bi-caret-down-fill ${isOpen.background ? 'rotate' : ''}`}></i>
            </div>

            <div className={`parameters-wrapper-content ${isOpen.background ? 'open' : ''}`}>
              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Color</p>
                <div className='parameters-content-line-container'>
                  <input type="color" onChange={(e) => handleBackgroundChange(e, 'backgroundColor')} />
                </div>
              </div>
              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Image</p>
                <div className='parameters-content-line-container'>
                  <input type="file" accept="image/*" onChange={(e) => handleBackgroundChange(e, 'backgroundImage')} />
                </div>
              </div>
            </div>
            <hr className='parameters-wrapper-separation' />
          </div>

          {/* Section Typographie */}
          <div className='parameters-wrapper'>
            <div className='parameters-wrapper-title-box' onClick={() => toggleSection('typographie')}>
              <p className='parameters-wrapper-title'>Typographie</p>
              <i className={`bi bi-caret-down-fill ${isOpen.typographie ? 'rotate' : ''}`}></i>
            </div>
            <div className={`parameters-wrapper-content ${isOpen.typographie ? 'open' : ''}`}>
            <div className='parameters-content-line'>
              <p className='parameters-content-line-title'>Font Family</p>
              <div className='parameters-content-line-container'>
                <select onChange={(e) => handleInputChange(e, 'fontFamily')}>
                  <option>Arial</option>
                  <option>Verdana</option>
                  <option>Helvetica</option>
                </select>
              </div>
            </div>
            <div className='parameters-content-line'>
              <p className='parameters-content-line-title'>Font Size</p>
              <div className='parameters-content-line-container'>
                <input type="number" min="8" max="72" step="1" defaultValue="14" onChange={(e) => handleInputChange(e, 'fontSize')} /> px
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

          {/* Section Border */}
          <div className='parameters-wrapper'>
            <div className='parameters-wrapper-title-box' onClick={() => toggleSection('border')}>
              <p className='parameters-wrapper-title'>Border</p>
              <i className={`bi bi-caret-down-fill ${isOpen.border ? 'rotate' : ''}`}></i>
            </div>
            <div className={`parameters-wrapper-content ${isOpen.border ? 'open' : ''}`}>
              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Border Color</p>
                <div className='parameters-content-line-container'>
                  <input type="color" onChange={(e) => handleBorderChange(e, 'borderColor')} />
                </div>
              </div>
              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Border Width</p>
                <div className='parameters-content-line-container'>
                  <input type="number" min="0" max="20" step="1" defaultValue="1" onChange={(e) => handleBorderChange(e, 'borderWidth')} /> px
                </div>
              </div>
            </div>
            <hr className='parameters-wrapper-separation' />
          </div>
        </div>
      </div>
    </>
  );
}
