import React, { useState, useEffect } from 'react';
import './RightBar.css';
import '../Root.css';
import { useStyle } from '../../hooks/StyleContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SizeSection from './RightBarComponents/SizeSettings';
import SpacingSettings from './RightBarComponents/SpacingSettings';
import BorderSettings from './RightBarComponents/BorderSettings';
import BackgroundSettings from './RightBarComponents/BackgroundSettings';
import TypographySettings from './RightBarComponents/TypographySettings';
export default function RightBar({ selectedElement }) {

  const [typographyStyle, setTypographyStyle] = useState({});

  const [isOpen, setIsOpen] = useState({ size: false, background: false, typographie: false, border: false, });
  const [selectedAlign, setSelectedAlign] = useState(null);
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const { updateStyle } = useStyle(); // Get the function to update the style

  const [selectedSide, setSelectedSide] = useState(null);

  const [style, setStyle] = useState({
    background: {},
    typography: {},
    border: {}
  });

  const [backgroundStyle, setBackgroundStyle] = useState({
    backgroundColor: '',
    backgroundImage: '',
  });
  const [borderStyle, setBorderStyle] = useState({
    top: {},
    right: {},
    bottom: {},
    left: {}
  });
  const [sizeStyle, setSizeStyle] = useState({
    width: '',
    height: '',
    minWidth: '',
    maxWidth: '',
    minHeight: '',
    maxHeight: '',
    overflow: '',
  });

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

    
    if (['borderColor', 'borderWidth', 'borderStyle', 'borderRadius'].includes(styleProperty)) {
      const updatedStyle = selectedSide ? 
      { ...borderStyle, [selectedSide]: { ...borderStyle[selectedSide], [styleProperty]: value } } : 
      { ...borderStyle, top: value, right: value, bottom: value, left: value };
  
      setBorderStyle(updatedStyle);
      onSettingsChange(selectedElement, { border: updatedStyle });
    }
    // Directly construct the updated style object based on the property being changed
    if (styleProperty === 'fontFamily' || styleProperty === 'fontSize' || styleProperty === 'color' || styleProperty === 'fontStyle' || styleProperty === 'textDecoration' || styleProperty === 'textAlign' || styleProperty === 'fontWeight') {
      // Typography related properties
      const updatedTypographyStyle = { ...typographyStyle, [styleProperty]: value };
      setTypographyStyle(updatedTypographyStyle);
      onSettingsChange(selectedElement, { typography: updatedTypographyStyle });
    } if (styleProperty === 'borderColor' || styleProperty === 'borderWidth' || styleProperty === 'borderStyle' || styleProperty === 'borderRadius') {
      // Border related properties
      const updatedBorderStyle = { ...borderStyle, [styleProperty]: value };
      setBorderStyle(updatedBorderStyle);
      onSettingsChange(selectedElement, { border: updatedBorderStyle });
    } if (styleProperty === 'backgroundColor' || styleProperty === 'backgroundImage' || styleProperty === 'backgroundPosition' || styleProperty === 'backgroundSize') {
      // Background related properties
      const updatedBackgroundStyle = { ...backgroundStyle, [styleProperty]: value };
      setBackgroundStyle(updatedBackgroundStyle);
      onSettingsChange(selectedElement, { background: updatedBackgroundStyle });
    }
    if (styleProperty === 'width' || styleProperty === 'height' || styleProperty === 'minWidth' || styleProperty === 'maxWidth' || styleProperty === 'minHeight' || styleProperty === 'maxHeight' || styleProperty === 'overflow') {
      const updatedSizeStyle = { ...sizeStyle, [styleProperty]: value };
      setSizeStyle(updatedSizeStyle);
      onSettingsChange(selectedElement, { size: updatedSizeStyle });
    }

    console.log("Input change for:", styleProperty, "value:", value);
  };



  const onSettingsChange = (element, newSettings) => {
    if (element) {
      // Apply background settings
      if (newSettings.background) {
        const { backgroundColor, backgroundImage, backgroundPosition, backgroundSize } = newSettings.background;
        if (backgroundColor) {
          element.style.backgroundColor = backgroundColor;
        }
        if (backgroundImage) {
          element.style.backgroundImage = backgroundImage;
        }
        if (backgroundPosition) {
          element.style.backgroundPosition = backgroundPosition;
        }
        if (backgroundSize) {
          element.style.backgroundSize = backgroundSize;
        }
      }
  
      // Apply typography settings
      if (newSettings.typography) {
        const { fontFamily, fontSize, color, fontStyle, textDecoration, textAlign } = newSettings.typography;
        if (fontFamily) {
          element.style.fontFamily = fontFamily;
        }
        if (fontSize) {
          element.style.fontSize = `${fontSize}px`;
        }
        if (color) {
          element.style.color = color;
        }
        if (fontStyle) {
          element.style.fontStyle = fontStyle;
        }
        if (textDecoration) {
          element.style.textDecoration = textDecoration;
        }
        if (textAlign) {
          element.style.textAlign = textAlign;
        }
      }
  
      // Apply size settings
      if (newSettings.size) {
        const { width, height, minWidth, maxWidth, minHeight, maxHeight, overflow } = newSettings.size;
        if (width) {
          element.style.width = width;
        }
        if (height) {
          element.style.height = height;
        }
        if (minWidth) {
          element.style.minWidth = minWidth;
        }
        if (maxWidth) {
          element.style.maxWidth = maxWidth;
        }
        if (minHeight) {
          element.style.minHeight = minHeight;
        }
        if (maxHeight) {
          element.style.maxHeight = maxHeight;
        }
        if (overflow) {
          element.style.overflow = overflow;
        }
      }
  
      // Apply border settings selectively based on the selected side
      if (newSettings.border) {
        const sides = ['top', 'right', 'bottom', 'left'];
        sides.forEach(side => {
          if (selectedSide === side || !selectedSide) {
            const borderStyleForSide = newSettings.border[side] || newSettings.border;
            if (borderStyleForSide.borderColor) {
              element.style.setProperty(`border-${side}-color`, borderStyleForSide.borderColor);
            }
            if (borderStyleForSide.borderStyle) {
              element.style.setProperty(`border-${side}-style`, borderStyleForSide.borderStyle);
            }
            if (borderStyleForSide.borderWidth) {
              element.style.setProperty(`border-${side}-width`, `${borderStyleForSide.borderWidth}px`);
            }
            // Border radius is complex and may not apply uniformly to sides; handle with care.
          }
        });
      }
    if (newSettings.margin) {
      if (newSettings.margin.top) {
        element.style.marginTop = newSettings.margin.top;
      }
      if (newSettings.margin.right) {
        element.style.marginRight = newSettings.margin.right;
      }
      if (newSettings.margin.bottom) {
        element.style.marginBottom = newSettings.margin.bottom;
      }
      if (newSettings.margin.left) {
        element.style.marginLeft = newSettings.margin.left;
      }
    }

    if (newSettings.padding) {
      if (newSettings.padding.top) {
        element.style.paddingTop = newSettings.padding.top;
      }
      if (newSettings.padding.right) {
        element.style.paddingRight = newSettings.padding.right;
      }
      if (newSettings.padding.bottom) {
        element.style.paddingBottom = newSettings.padding.bottom;
      }
      if (newSettings.padding.left) {
        element.style.paddingLeft = newSettings.padding.left;
      }
    }
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


  return (
    <>
      <div className='rightbar-wrapper'>
        <div className='style-wrapper'>

          {/* Section Size */}

          <SizeSection
            isOpen={isOpen}
            toggleSection={toggleSection}
            sizeStyle={sizeStyle}
            onSettingsChange={onSettingsChange}
            selectedElement={selectedElement}
          />

          {/* Section Spacing */}
          <SpacingSettings
            isOpen={isOpen}
            toggleSection={toggleSection}
            sizeStyle={sizeStyle}
            onSettingsChange={onSettingsChange}
            selectedElement={selectedElement}
          />


          {/* Section Border */}
          <BorderSettings
            isOpen={isOpen}
            toggleSection={toggleSection}
            sizeStyle={borderStyle} // Note: Ensure the passed props align with your actual use case
            onSettingsChange={onSettingsChange}
            handleInputChange={handleInputChange}
            setSelectedSide={setSelectedSide}
          />



          {/* Section Background */}

          <BackgroundSettings
            isOpen={isOpen}
            toggleSection={toggleSection}
            handleBackgroundChange={handleBackgroundChange}
            backgroundStyle={backgroundStyle}
          />

          {/* Section Typographie */}
          <TypographySettings
            selectedElement={selectedElement}
            updateStyle={updateStyle}
            toggleSection={toggleSection}
            isOpen={isOpen}
            handleInputChange={handleInputChange}
            selectedDecoration={selectedDecoration}
            handleTextDecoration={handleTextDecoration}
            selectedAlign={selectedAlign}
            handleTextAlign={handleTextAlign}
          />



        </div>
      </div>
    </>
  );
}
