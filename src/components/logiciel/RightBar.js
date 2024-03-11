import React, { useState, useEffect } from 'react';
import './RightBar.css';
import '../Root.css';
import { useStyle } from '../../hooks/StyleContext';

export default function RightBar({ selectedElement }) {

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
  const [backgroundStyle, setBackgroundStyle] = useState({
    backgroundColor: '',
    backgroundImage: '',
  }); 


  console.log('Selected element in RightBar:', selectedElement); // Add this line


  const toggleSection = (section) => {
    setIsOpen(prevState => ({ ...prevState, [section]: !prevState[section] }));
  };


  const handleInputChange = (e, styleProperty, inputType) => {
    let value;

    if (inputType === 'select' || inputType === 'color') {
      value = e.target.value;
    } else if (inputType === 'checkbox') {
      value = e.target.checked;
    } else if (inputType === 'number') {
      value = parseInt(e.target.value, 10); // Convert string to number
    } else {
      value = e.target.value; // For all other input types, use the string value
    }

    // Directly construct the updated style object based on the property being changed
    if (styleProperty === 'fontFamily' || styleProperty === 'fontSize' || styleProperty === 'color' || styleProperty === 'fontStyle' || styleProperty === 'textDecoration' || styleProperty === 'textAlign' || styleProperty === 'fontWeight') {
      // Typography related properties
      const updatedTypographyStyle = { ...typographyStyle, [styleProperty]: value };
      setTypographyStyle(updatedTypographyStyle);
      onSettingsChange(selectedElement, { typography: updatedTypographyStyle });
    } else if (styleProperty === 'borderColor' || styleProperty === 'borderWidth' || styleProperty === 'borderStyle' || styleProperty === 'borderRadius') {
      // Border related properties
      const updatedBorderStyle = { ...borderStyle, [styleProperty]: value };
      setBorderStyle(updatedBorderStyle);
      onSettingsChange(selectedElement, { border: updatedBorderStyle });
    } else if (styleProperty === 'backgroundColor' || styleProperty === 'backgroundImage' || styleProperty === 'backgroundPosition' || styleProperty === 'backgroundSize') {
      // Background related properties
      const updatedBackgroundStyle = { ...backgroundStyle, [styleProperty]: value };
      setBackgroundStyle(updatedBackgroundStyle);
      onSettingsChange(selectedElement, { background: updatedBackgroundStyle });
    }

    console.log("Input change for:", styleProperty, "value:", value);
  };



  const onSettingsChange = (element, newSettings) => {
    if (element) {
      const currentStyles = window.getComputedStyle(element);

      for (const [key, value] of Object.entries(newSettings)) {
        if (key === 'background') {
          if (value.backgroundColor) {
            element.style.setProperty('background-color', value.backgroundColor);
          }
          if (value.backgroundImage) {
            element.style.setProperty('background-image', value.backgroundImage);
          }
        } else if (key === 'border') {
          element.style.setProperty('border-color', value.borderColor);
          element.style.setProperty('border-style', value.borderStyle);
          if (value.borderWidth) {
            element.style.setProperty('border-width', `${value.borderWidth}px`); // Append 'px' here
            console.log(`Border width set to ${value.borderWidth}px`); // Log the borderWidth value
          }
          if (value.borderRadius) {
            element.style.setProperty('border-radius', `${value.borderRadius}px`); // Append 'px' here
            console.log(`Border radius set to ${value.borderRadius}px`); // Log the borderRadius value
          }
        } else if (key === 'typography') {
          element.style.setProperty('font-family', value.fontFamily);
          element.style.setProperty('font-size', `${value.fontSize}px`); // Append 'px' here
          element.style.setProperty('color', value.color);
          element.style.setProperty('font-style', value.fontStyle);
          element.style.setProperty('text-decoration', value.textDecoration);
          element.style.setProperty('text-align', value.textAlign);
        }
      }
    }
    // Inside onSettingsChange function
if (newSettings.width) {
  element.style.width = newSettings.width; // Directly applying width
}
if (newSettings.height) {
  element.style.height = newSettings.height; // Directly applying height
}

  };



  // Set the initial state of the RightBar component based on the selected element's current styles
  useEffect(() => {
    if (selectedElement) {
      const elementStyle = window.getComputedStyle(selectedElement);
      
      setBackgroundStyle({
        backgroundColor: elementStyle.backgroundColor,
        backgroundImage: elementStyle.backgroundImage,
      });
  
      setBorderStyle({
        borderColor: elementStyle.borderColor,
        borderWidth: parseInt(elementStyle.borderWidth, 10),
      });
  
      setTypographyStyle({
        fontFamily: elementStyle.fontFamily,
        fontSize: parseInt(elementStyle.fontSize, 10),
        color: elementStyle.color,
        fontStyle: elementStyle.fontStyle,
        textDecoration: elementStyle.textDecoration,
        textAlign: elementStyle.textAlign,
      });
  
      // Capture initial width and height
      setSizeStyle({
        width: selectedElement.style.width,
        height: selectedElement.style.height,
      });
      updateStyle(style);
    }
  }, [selectedElement]);
  

  const handleBackgroundChange = (e, styleProperty) => {
    let value;

    if (styleProperty === 'backgroundColor') {
      value = e.target.value;
    } else if (styleProperty === 'backgroundImage') {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        value = `url(${reader.result})`;
        setBackgroundStyle(prevState => ({ ...prevState, [styleProperty]: value }));
        onSettingsChange(selectedElement, { background: { [styleProperty]: value } });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }


    setBackgroundStyle(prevState => ({ ...prevState, [styleProperty]: value }));
    onSettingsChange(selectedElement, { background: { [styleProperty]: value } });
  };


  const handleTextDecoration = (decorationType) => {
    if (selectedElement) {
      const currentStyle = window.getComputedStyle(selectedElement);
      let newStyle = {
        fontFamily: typographyStyle.fontFamily,
        fontSize: typographyStyle.fontSize,
        color: typographyStyle.color,
        fontStyle: currentStyle.fontStyle,
        textDecoration: currentStyle.textDecoration,
        textAlign: currentStyle.textAlign
      };

      if (decorationType === 'italic') {
        newStyle.fontStyle = currentStyle.fontStyle === 'italic' ? 'normal' : 'italic';
      } else if (decorationType === 'underline') {
        newStyle.textDecoration = currentStyle.textDecoration === 'underline' ? 'none' : 'underline';
      } else if (decorationType === 'line-through') {
        newStyle.textDecoration = currentStyle.textDecoration === 'line-through' ? 'none' : 'line-through';
      }

      setTypographyStyle(newStyle);
      onSettingsChange(selectedElement, { typography: newStyle });
    }
  };

  const handleTextAlign = (alignType) => {
    if (selectedElement) {
      const newStyle = {
        fontFamily: typographyStyle.fontFamily,
        fontSize: typographyStyle.fontSize,
        color: typographyStyle.color,
        fontStyle: typographyStyle.fontStyle,
        textDecoration: typographyStyle.textDecoration,
        textAlign: alignType
      };
      setTypographyStyle(newStyle);
      onSettingsChange(selectedElement, { typography: newStyle });
    }
  };




  const handleBorderChange = (e, styleProperty) => {
    const value = parseInt(e.target.value, 10); // Convert string to number
    setBorderStyle(prevState => ({ ...prevState, [styleProperty]: value }));
    onSettingsChange(selectedElement, { border: { ...borderStyle, [styleProperty]: value, borderRadius: borderStyle.borderRadius } });
  };

  const [sizeStyle, setSizeStyle] = useState({
    width: '',
    height: '',
  });
  
// Handler for changing width in RightBar
const handleWidthChange = (newWidth) => {
  updateStyle({ ...style, width: newWidth + 'px' }); // Append 'px' to make it a valid CSS value
};

// Handler for changing width in RightBar
const handleHeightChange = (newWidth) => {
  updateStyle({ ...style, height: newWidth + 'px' }); // Append 'px' to make it a valid CSS value
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
              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Background Position</p>
                <div className='parameters-content-line-container'>
                  <select onChange={(e) => handleInputChange(e, 'backgroundPosition', 'select')}>
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>

              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Background Size</p>
                <div className='parameters-content-line-container'>
                  <select onChange={(e) => handleInputChange(e, 'backgroundSize', 'select')}>
                    <option value="auto">Auto</option>
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                  </select>
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
                  <input type="number" min="0" max="20" step="1" defaultValue="1" onChange={(e) => handleBorderChange(e, 'borderWidth')} />
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

              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Border Radius</p>
                <div className='parameters-content-line-container'>
                  <input type="number" min="0" max="100" step="1" defaultValue="0" onChange={(e) => handleInputChange(e, 'borderRadius', 'number')} />
                </div>
              </div>



            </div>
            <hr className='parameters-wrapper-separation' />
            <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Width</p>
                <div className='parameters-content-line-container'>
                  <input type="text" value={sizeStyle.width} onChange={(e) => setSizeStyle({...sizeStyle, width: e.target.value})} onBlur={() => onSettingsChange(selectedElement, { width: sizeStyle.width })} />
                </div>
              </div>
              <div className='parameters-content-line'>
                <p className='parameters-content-line-title'>Height</p>
                <div className='parameters-content-line-container'>
                  <input type="text" value={sizeStyle.height} onChange={(e) => setSizeStyle({...sizeStyle, height: e.target.value})} onBlur={() => onSettingsChange(selectedElement, { height: sizeStyle.height })} />
                </div>
              </div>

          </div>
        </div>
      </div>
    </>
  );
}
