import React, { useState, useRef, useEffect } from 'react';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ImageSlots from '../../../components/logiciel/TemplateComponent/ImageSlots';
import EditableButton from '../../../components/logiciel/TemplateComponent/EditableButton';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';

const SectionNavBar1 = ({ deviceSize, setSelectedElement, isPreviewMode }) => {
  const { style } = useStyle();
  const { imageHistory } = useImageHistory();

  const savedContent = JSON.parse(sessionStorage.getItem('navbarContent')) || {
    logoText: 'YourLogo',
    linkTexts: ['Link 1', 'Link 2', 'Link 3', 'Link 4', 'Link 5'],
  };

  const [content, setContent] = useState(savedContent);

  const logoTextRef = useRef(null);
  // Initialize refs for link texts
  const linkTextRefs = useRef(content.linkTexts.map(() => React.createRef()));

  // Correctly defining responsiveStyles based on deviceSize
  const responsiveStyles = {
    logoSize: deviceSize === "375px" ? "60px" : deviceSize === "768px" ? "100px" : "120px",
    linkSize: deviceSize === "375px" ? "12px" : deviceSize === "768px" ? "15px" : "18px",
  };
  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: style.backgroundColor || '#333',
      color: style.color || '#fff',
    },
    logoImage: {
      width: responsiveStyles.logoSize,
      height: 'auto',
    },
    navLinks: {
      listStyle: 'none',
      display: 'flex',
    },
    navItem: {
      padding: '0 1rem',
    },
    navLink: {
      textDecoration: 'none',
      color: style.color || '#fff',
      fontSize: responsiveStyles.linkSize,
    },
    buttonMain: {
      padding: '0.5rem 1rem',
      border: 'none',
      backgroundColor: style.buttonBackgroundColor || '#0066ff',
      color: style.color || '#fff',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  const handleContentChange = (key, index, newValue) => {
    setContent((prevContent) => {
      const updatedContent = { ...prevContent };
      if (key === 'logoText') {
        updatedContent[key] = newValue;
      } else {
        updatedContent.linkTexts[index] = newValue;
      }
      sessionStorage.setItem('navbarContent', JSON.stringify(updatedContent));
      return updatedContent;
    });
  };

  useEffect(() => {
    const savedContent = JSON.parse(sessionStorage.getItem('navbarContent'));
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const renderEditableText = (key, index, tagName, style) => {
    const contentKey = key === 'logoText' ? content[key] : content.linkTexts[index];
    const ref = key === 'logoText' ? logoTextRef : linkTextRefs.current[index];

// Default function definition if not passed as prop
const handleSelectedElement = setSelectedElement || ((element) => {
  console.log("Element selected:", element);
});

// Then use handleSelectedElement in place of setSelectedElement


// In SectionNavBar1, guard the usage or provide a default behavior
const handleTextClick = (elementRef) => {
  if (typeof setSelectedElement === 'function') {
    setSelectedElement(elementRef.current);
  } else {
    // Default behavior or simply omit this else block if no action is needed
    console.log("setSelectedElement prop not provided.");
  }
};


    return (
      <EditableText
        isEditable={!isPreviewMode}
        tagName={tagName}
        content={contentKey}
        onContentChange={(newValue) => handleContentChange(key, index, newValue)}
        style={style}
        innerRef={ref}
        onClick={(elementRef) => handleTextClick(elementRef)}

      />
    );
  };

  return (
    <nav style={styles.navbar}>
      <ImageSlots styles={{ image: styles.logoImage }} imageHistory={imageHistory} />
      <ul style={styles.navLinks}>
        {content.linkTexts.map((_, index) => (
          <li key={index} style={styles.navItem}>
            {renderEditableText('linkTexts', index, 'a', styles.navLink)}
          </li>
        ))}
      </ul>
      <EditableButton
  initialText="Click Me"
  onTextChange={(newText) => console.log('New Button Text:', newText)}
  onEditStyle={() => console.log('Trigger style editing')}
  style={{ /* Initial button styles */ }}
/>
    </nav>
  );
};

export default SectionNavBar1;
