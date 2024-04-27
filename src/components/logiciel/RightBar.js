import React, { useState, useEffect } from "react";
import "./RightBar.css";
import "../Root.css";
import { useStyle } from "../../hooks/StyleContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import SizeSection from "./RightBarComponents/SizeSettings";
import SpacingSettings from "./RightBarComponents/SpacingSettings";
import BorderSettings from "./RightBarComponents/BorderSettings";
import BackgroundSettings from "./RightBarComponents/BackgroundSettings";
import TypographySettings from "./RightBarComponents/TypographySettings";
import { useImageHistory } from '../../hooks/ImageHistoryContext';

export default function RightBar({ selectedElement }) {
  const { addImageToHistory } = useImageHistory();

  const [isOpen, setIsOpen] = useState({
    size: false,
    background: false,
    typographie: false,
    border: false,
  });  
    const toggleSection = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  const [typographyStyle, setTypographyStyle] = useState({
  
  });
  
  const [selectedAlign, setSelectedAlign] = useState(null);
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const { updateStyle } = useStyle(); // Get the function to update the style

  const [selectedSide, setSelectedSide] = useState(null);

  const [style, setStyle] = useState({
    background: {},
    typography: {},
    border: {},
  });

  const [backgroundStyle, setBackgroundStyle] = useState({
    backgroundColor: "",
    backgroundImage: "",
  });
  const [borderStyle, setBorderStyle] = useState({
    top: {},
    right: {},
    bottom: {},
    left: {},
  });
  const [sizeStyle, setSizeStyle] = useState({
    width: "",
    height: "",
    minWidth: "",
    maxWidth: "",
    minHeight: "",
    maxHeight: "",
    overflow: "",
  });



  const saveStateInSessionStorage = (stateName, state) => {
    sessionStorage.setItem(stateName, JSON.stringify(state));
  };

  const handleInputChange = (e, styleProperty, inputType) => {
    let value;

    if (inputType === "select" || inputType === "color") {
      value = e.target.value;
    } else if (inputType === "checkbox") {
      value = e.target.checked;
    } else if (inputType === "number") {
      value = parseInt(e.target.value, 10); // Convert string to number
    } else {
      value = e.target.value; // For all other input types, use the string value
    }
    if (
      ["borderColor", "borderWidth", "borderStyle", "borderRadius"].includes(
        styleProperty
      )
    ) {
      const updatedStyle = selectedSide
        ? {
          ...borderStyle,
          [selectedSide]: {
            ...borderStyle[selectedSide],
            [styleProperty]: value,
          },
        }
        : {
          ...borderStyle,
          top: value,
          right: value,
          bottom: value,
          left: value,
        };

      setBorderStyle(updatedStyle);
      onSettingsChange(selectedElement, { border: updatedStyle });
      saveStateInSessionStorage("borderStyle", updatedStyle); // Save the state in session storage
    }

    if (
      styleProperty === "fontFamily" ||
      styleProperty === "fontSize" ||
      styleProperty === "color" ||
      styleProperty === "fontStyle" ||
      styleProperty === "textDecoration" ||
      styleProperty === "textAlign" ||
      styleProperty === "fontWeight"
    ) {
      const updatedTypographyStyle = {
        ...typographyStyle,
        [styleProperty]: value,
      };
      setTypographyStyle(updatedTypographyStyle);
      onSettingsChange(selectedElement, { typography: updatedTypographyStyle });
      saveStateInSessionStorage("typographyStyle", updatedTypographyStyle); // Save the state in session storage
    }

    if (
      styleProperty === "borderColor" ||
      styleProperty === "borderWidth" ||
      styleProperty === "borderStyle" ||
      styleProperty === "borderRadius"
    ) {
      const updatedBorderStyle = { ...borderStyle, [styleProperty]: value };
      setBorderStyle(updatedBorderStyle);
      onSettingsChange(selectedElement, { border: updatedBorderStyle });
      saveStateInSessionStorage("borderStyle", updatedBorderStyle); // Save the state in session storage
    }

    if (
      styleProperty === "backgroundColor" ||
      styleProperty === "backgroundImage" ||
      styleProperty === "backgroundPosition" ||
      styleProperty === "backgroundSize"
    ) {
      const updatedBackgroundStyle = {
        ...backgroundStyle,
        [styleProperty]: value,
      };
      setBackgroundStyle(updatedBackgroundStyle);
      onSettingsChange(selectedElement, { background: updatedBackgroundStyle });
      saveStateInSessionStorage("backgroundStyle", updatedBackgroundStyle); // Save the state in session storage
    }

    if (
      styleProperty === "width" ||
      styleProperty === "height" ||
      styleProperty === "minWidth" ||
      styleProperty === "maxWidth" ||
      styleProperty === "minHeight" ||
      styleProperty === "maxHeight" ||
      styleProperty === "overflow"
    ) {
      const updatedSizeStyle = { ...sizeStyle, [styleProperty]: value };
      setSizeStyle(updatedSizeStyle);
      onSettingsChange(selectedElement, { size: updatedSizeStyle });
      saveStateInSessionStorage("sizeStyle", updatedSizeStyle); // Save the state in session storage
    }
 // Use updateStyle to update the styles
 updateStyle(selectedElement, { [styleProperty]: value });

 // Then call onSettingsChange with the updated styles
 onSettingsChange(selectedElement, { [styleProperty]: value });

 // Save the state in session storage
 saveStateInSessionStorage(styleProperty, value);
    console.log("Input change for:", styleProperty, "value:", value);
  };

  const onSettingsChange = (elementId, newStyles) => {
    const element = document.getElementById(elementId);
    if (element) {
      // Apply the new styles to the element
      Object.keys(newStyles).forEach(styleKey => {
        const styleValue = newStyles[styleKey];
        if (typeof styleValue === 'object') {
          Object.keys(styleValue).forEach(subKey => {
            element.style[subKey] = styleValue[subKey];
          });
        } else {
          element.style[styleKey] = styleValue;
        }
      });
      console.log(`Styles applied to ${elementId}:`, newStyles);
    } else {
      console.error(`No element found with ID ${elementId}`);
    }
  };
  // Set the initial state of the RightBar component based on the selected element's current styles
  useEffect(() => {
    if (selectedElement && selectedElement.id) {
      const element = document.getElementById(selectedElement.id);
      if (element) {
        const elementStyle = window.getComputedStyle(element);

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
          width: element.style.width,
          height: element.style.height,
        });
        // Note: You might need to adjust or add more style settings based on your needs.
      }
    }
  }, [selectedElement]);



  const handleTextDecoration = (decorationType) => {
    if (selectedElement && selectedElement.id) {
      const element = document.getElementById(selectedElement.id);
      if (element) {
        const currentStyle = window.getComputedStyle(element);
        let newStyle = { ...typographyStyle };
        switch (decorationType) {
          case "italic":
            newStyle.fontStyle = currentStyle.fontStyle === "italic" ? "normal" : "italic";
            break;
          case "underline":
            newStyle.textDecoration = currentStyle.textDecoration.includes("underline") ? "none" : "underline";
            break;
          case "line-through":
            newStyle.textDecoration = currentStyle.textDecoration.includes("line-through") ? "none" : "line-through";
            break;
          default:
            break;
        }
        console.log("New Typography Style:", newStyle); // Debugging output
        setTypographyStyle(newStyle);
        onSettingsChange(selectedElement, { typography: newStyle });
      }
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
        textAlign: alignType,
      };
      setTypographyStyle(newStyle);
      onSettingsChange(selectedElement, { typography: newStyle });
    }
  };
  const handleSizeChange = (e, styleProperty) => {
    const newValue = e.target.value + sizeStyle.unit; // Combine value and unit
    // Assuming `updateStyle` updates the global context
    updateStyle({ [styleProperty]: newValue });
  };
  useEffect(() => {
    if (selectedElement && selectedElement.type === "navbar") {
      setIsOpen((prevState) => ({ ...prevState, background: true }));
    }
  }, [selectedElement]);

  return (
    <>
      <div className="rightbar-wrapper">
        <div className="style-wrapper">
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
            updateStyle={updateStyle}

          />

          {/* Section Border */}

          <BorderSettings
            isOpen={isOpen}
            toggleSection={toggleSection}
            borderStyle={borderStyle} // Note: Ensure the passed props align with your actual use case
            onSettingsChange={onSettingsChange}
            handleInputChange={handleInputChange}
            selectedSide={selectedSide}
            setSelectedSide={setSelectedSide}
          />

          {/* Section Background */}

          <BackgroundSettings
            isOpen={isOpen}
            toggleSection={toggleSection}
            selectedElement={selectedElement} // Pass selectedElement as a prop
          />


          {/* Section Typographie */}

          <TypographySettings
  selectedElement={selectedElement}
  toggleSection={toggleSection}
  isOpen={isOpen}
  selectedDecoration={selectedDecoration}
  selectedAlign={selectedAlign}
  handleTextAlign={handleTextAlign}
  updateStyle={updateStyle}
  onSettingsChange={onSettingsChange} // Passing it here
/>

        </div>
      </div>
    </>
  );
}
