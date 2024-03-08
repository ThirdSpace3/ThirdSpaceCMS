import React, { useState, useEffect } from 'react';
import './RightBar.css';
import '../Root.css';
import { useStyle } from './StyleContext'; // Adjust the path as necessary

export default function RightBar({ selectedElement }) {

  const onSettingsChange = (element, newSettings) => {
    if (element) {
      const currentStyles = window.getComputedStyle(element);
  
      for (const [key, value] of Object.entries(newSettings)) {
        if (key === 'background') {
          element.style.setProperty('background-color', value.backgroundColor);
          element.style.setProperty('background-image', value.backgroundImage);
        } else if (key === 'border') {
          element.style.setProperty('border-color', value.borderColor);
          element.style.setProperty('border-width', `${value.borderWidth}px`);
        } else if (key === 'typography') {
          element.style.setProperty('font-family', value.fontFamily || currentStyles.fontFamily);
          element.style.setProperty('font-size', `${value.fontSize || currentStyles.fontSize}px`);
          element.style.setProperty('color', value.color);
          element.style.setProperty('font-style', value.fontStyle);
          element.style.setProperty('text-decoration', value.textDecoration);
          element.style.setProperty('text-align', value.textAlign);
        }
      }
    }
  };
  
  

  console.log('Selected element in RightBar:', selectedElement); // Add this line

  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [typographyStyle, setTypographyStyle] = useState({});
  const [borderStyle, setBorderStyle] = useState({});
  const [isOpen, setIsOpen] = useState({ background: false, typographie: false, border: false });
  const [selectedAlign, setSelectedAlign] = useState(null);
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const { updateStyle } = useStyle(); // Get the function to update the style

  const [style, setStyle] = useState({
    background: {},
    typography: {},
    border: {}
  });

  // Set the initial state of the RightBar component based on the selected element's current styles
  useEffect(() => {
    if (selectedElement) {
      const elementStyle = window.getComputedStyle(selectedElement);

      setBackgroundStyle({
        backgroundColor: elementStyle.backgroundColor,
        backgroundImage: elementStyle.backgroundImage
      });

      setBorderStyle({
        borderColor: elementStyle.borderColor,
        borderWidth: parseInt(elementStyle.borderWidth, 10)
      });

      setTypographyStyle({
        fontFamily: elementStyle.fontFamily,
        fontSize: parseInt(elementStyle.fontSize, 10),
        color: elementStyle.color,
        fontStyle: elementStyle.fontStyle,
        textDecoration: elementStyle.textDecoration,
        textAlign: elementStyle.textAlign
      });
    }
  }, [selectedElement]);

  useEffect(() => {
    // Update the global style whenever the local style state changes
    updateStyle(style);
  }, [style, updateStyle]);

  const handleInputChange = (e, styleProperty, inputType) => {
    let value;
  
    if (inputType === 'select') {
      value = e.target.value;
    } else if (inputType === 'color') {
      value = e.target.value;
    } else if (inputType === 'checkbox') {
      value = e.target.checked;
    } else if (inputType === 'number') {
      value = parseInt(e.target.value, 10); // Convert string to number
    } else {
      value = e.target.value; // For all other input types, use the string value
    }
  
    // Update the state of the specific style category for the selected element only
    if (styleProperty === 'fontFamily') {
      setTypographyStyle(prevState => ({ ...prevState, [styleProperty]: value }));
      onSettingsChange(selectedElement, { typography: { [styleProperty]: value } });
    } else if (styleProperty === 'fontSize') {
      setTypographyStyle(prevState => ({ ...prevState, [styleProperty]: value }));
      onSettingsChange(selectedElement, { typography: { [styleProperty]: `${value}px` } });
    } else if (styleProperty === 'color') {
      setTypographyStyle(prevState => ({ ...prevState, [styleProperty]: value }));
      onSettingsChange(selectedElement, { typography: { [styleProperty]: value } });
    } else if (styleProperty === 'fontWeight') {
      setTypographyStyle(prevState => ({ ...prevState, [styleProperty]: value }));
      onSettingsChange(selectedElement, { typography: { [styleProperty]: value } });
    }
  
    console.log("Input change for:", styleProperty, "value:", value);
  };
  
  

  const handleSectionToggle = (section) => {
    setIsOpen(prevState => ({ ...prevState, [section]: !prevState[section] }));
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
    if (selectedElement) {
      const currentStyle = window.getComputedStyle(selectedElement);
      let newStyle = {};
  
      if (decorationType === 'italic') {
        newStyle.fontStyle = currentStyle.fontStyle === 'italic' ? 'normal' : 'italic';
      } else if (decorationType === 'underline') {
        newStyle.textDecoration = currentStyle.textDecoration === 'underline' ? 'none' : 'underline';
      } else if (decorationType === 'line-through') {
        newStyle.textDecoration = currentStyle.textDecoration === 'line-through' ? 'none' : 'line-through';
      }
  
      onSettingsChange(selectedElement, { typography: newStyle });
    }
  };
  
  const handleTextAlign = (alignType) => {
    if (selectedElement) {
      const newStyle = { textAlign: alignType };
      onSettingsChange(selectedElement, { typography: newStyle });
    }
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
                  <select onChange={(e) => handleInputChange(e, 'fontFamily', 'select')}>
                    <option>Arial</option>
                    <option>Verdana</option>
                    <option>Helvetica</option>
                  </select>

                </div>
              </div>
              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Font Size</p>
                <div className='parameters-content-line-container'>
                  <input type="number" min="8" max="72" step="1" defaultValue="14" onChange={(e) => handleInputChange(e, 'fontSize', 'number')} /> px
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
              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Font Weight</p>
                <div className='parameters-content-line-container'>
                  <select onChange={(e) => handleInputChange(e, 'fontWeight', 'select')}>
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                  </select>
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
                  <input type="color" onChange={(e) => handleInputChange(e, 'borderColor', 'color')}></input>
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
