import React, { useState, useRef, useEffect } from 'react';
import { useStyle } from '../hooks/StyleContext';
import EditableText from '../components/logiciel/TemplateComponent/EditableText';
import Modal from 'react-responsive-modal';
import { useDropzone } from 'react-dropzone';


export default function Template2ImageOnDo({ settings, selectedElement, setSelectedElement, addImageToHistory }) {
  const { style } = useStyle();
  const handleContentChange = (key, newValue) => {
    setContent((prevContent) => ({
      ...prevContent,
      [key]: newValue,
    }));
  };

  const handleTextClick = (elementRef) => {
    console.log('elementRef in handleTextClick:', elementRef);
    setSelectedElement(elementRef.current);
  };


  const [imageSources, setImageSources] = useState({
    img1: '/images/template-test.png',
    img2: '/images/template-test.png',
  });
  

  const [content, setContent] = useState({
    title: 'Template de Test #1',
    paragraph: 'Tu vas me devoir un café je crois bien',
  });


  // Define your styles
  const styles = {
    templateWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      // height: '100%',
      backgroundColor: '#9600FA',
      overflow: 'auto',
    },
    templateWrapperColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    title: {
      ...style.typography,
      fontSize: '35px',
      color: '#fff',
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: '800',
    },
    paragraph: {
      ...style.typography,
      fontSize: '18px',
      color: '#a0a0a0',
      fontFamily: "'Inter', sans-serif",
      fontWeight: '500',
      textAlign: 'left',
    },
    button: {
      fontSize: '15px',
      color: '#fff',
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: '500',
      backgroundColor: '#58D7AD',
    },
  };
  const customModalStyles = {
    modal: {
      maxWidth: '400px',
      width: '100%',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      textAlign: 'center',
      color: '#fff'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };
  const dropzoneStyles = {
    border: '2px dashed #9600FA',
    borderRadius: '8px',
    padding: '24px',
    width: '100%',
    cursor: 'pointer',
    marginBottom: '16px',
  };
  const selectedFileStyles = {
    marginTop: '16px',
    maxWidth: '100%',
    height: 'auto',
  };
  // Use useRef to create references for the title and paragraph elements
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (selectedImageIndex !== null && acceptedFiles.length > 0) {
      handleReplaceImage(selectedImageIndex, acceptedFiles[0]);
    }
    setSelectedImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleImageClick = (imageIndex) => {
    setOpen(true);
    setSelectedImageIndex(imageIndex);
  };
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);


  const handleCloseModal = () => {
    setOpen(false);
  };


  const handleReplaceImage = (imageIndex, newImageFile) => {
    const newImageSources = { ...imageSources };
    const oldImageURL = newImageSources[`img${imageIndex}`];
    const newImageURL = URL.createObjectURL(newImageFile);
  
    // Add both old and new image URLs to the history
    addImageToHistory(oldImageURL);
    addImageToHistory(newImageURL);
  
    newImageSources[`img${imageIndex}`] = newImageURL;
    setImageSources(newImageSources);
  };
  
  
  return (
    <div style={styles.templateWrapper}>
<img src={imageSources.img1} onClick={() => handleImageClick(1)} />

      <div style={styles.templateWrapperColumn} >
        <EditableText
          tagName="h1"
          content={content.title}
          onContentChange={(newValue) => handleContentChange('title', newValue)}
          style={styles.title}
          innerRef={titleRef}
          onClick={(elementRef) => handleTextClick(elementRef)}
        />
        <EditableText
          tagName="p"
          content={content.paragraph}
          onContentChange={(newValue) => handleContentChange('paragraph', newValue)}
          style={styles.paragraph}
          innerRef={paragraphRef}
          onClick={(elementRef) => handleTextClick(elementRef)}
        />
        <button style={styles.button} >Clique</button>
      </div>

      <img id='redirect_test' src={imageSources.img2} onClick={() => handleImageClick(2)} />
      <Modal open={open} onClose={handleCloseModal} center modalStyles={customModalStyles}>
      <div {...getRootProps()} style={dropzoneStyles}>
  <input {...getInputProps()} />
  <p>Drag 'n' drop some files here, or click to select files</p>
</div>

        
      </Modal>
    </div>
  );
}
