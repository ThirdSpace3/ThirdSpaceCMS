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
  const [borderStyle, setBorderStyle] = useState({});
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
    if (newSettings.size) {
      if (newSettings.size.width) {
        element.style.width = newSettings.size.width;
      }
      if (newSettings.size.height) {
        element.style.height = newSettings.size.height;
      }
      if (newSettings.size.minWidth) {
        element.style.minWidth = newSettings.size.minWidth;
      }
      if (newSettings.size.maxWidth) {
        element.style.maxWidth = newSettings.size.maxWidth;
      }
      if (newSettings.size.minHeight) {
        element.style.minHeight = newSettings.size.minHeight;
      }
      if (newSettings.size.maxHeight) {
        element.style.maxHeight = newSettings.size.maxHeight;
      }
      if (newSettings.size.overflow) {
        element.style.overflow = newSettings.size.overflow;
      }
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
            sizeStyle={sizeStyle}
            onSettingsChange={onSettingsChange}
            handleInputChange={handleInputChange}
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
