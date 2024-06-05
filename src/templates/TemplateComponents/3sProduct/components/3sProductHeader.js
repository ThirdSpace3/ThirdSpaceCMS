import React, { useState, useEffect } from 'react';
import '../css/header.css';
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import EditableButton from '../../../../components/logiciel/TemplateComponent/EditableButton';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';
import { db, doc, getDoc } from '../../../../firebaseConfig'; // Adjust the path accordingly

const HeaderSection = ({
  saveSettings,
  settings,
  handleSettingsChange,
  openImagePanel,
  setSelectedElement,
  setSelectedColor,
  onContentChange,
}) => {
  const { selectedImage, enterReplacementMode, activeComponent, selectImage } = useImageHistory();
  const { style, getComponentStyle, updateStyle } = useStyle();

  const [headerContent, setHeaderContent] = useState({
    heroTitle: 'The first user-friendly website builder',
    heroDescription: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    herojoinUs: 'Join Us',
    herojoinUsLink: { url: '#', openInNewTab: false },
    image: "https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2F3sproduct-hero.png?alt=media&token=44a64698-ecd8-4bca-8dea-b522c6505eed"
  });

  useEffect(() => {
    const fetchData = async () => {
      const walletId = sessionStorage.getItem("userAccount");
      if (!walletId) {
        console.log("No wallet ID found. Please log in.");
        return;
      }

      try {
        const docRef = doc(db, "settings", walletId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setHeaderContent(prevContent => ({
            ...prevContent,
            heroTitle: data.heroTitle || prevContent.heroTitle,
            heroDescription: data.heroDescription || prevContent.heroDescription,
            herojoinUs: data.herojoinUs || prevContent.herojoinUs,
            herojoinUsLink: data.herojoinUsLink || prevContent.herojoinUsLink,
            image: data.image || prevContent.image,
          }));
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, []);

  const headerStyle = getComponentStyle('header');
  const heroTitleStyles = getComponentStyle('heroTitle');
  const heroDescriptionStyles = getComponentStyle('heroDescription');
  const herojoinUsStyles = getComponentStyle('header-cta');
  const [imageHeight, setImageHeight] = useState(null);

  const handleTextChange = async (newText, textType) => {
    const updatedContent = {
      ...headerContent,
      [textType]: newText
    };
    setHeaderContent(updatedContent);
    updateStyle(textType, { text: newText });
    onContentChange(updatedContent);

    // Save the specific changes to Firebase
    await saveSettings(textType, { text: newText });
  };

  const handleLinkChange = async (newLink) => {
    const updatedContent = {
      ...headerContent,
      herojoinUsLink: { ...headerContent.herojoinUsLink, url: newLink }
    };
    setHeaderContent(updatedContent);
    updateStyle('herojoinUs', { link: newLink });

    // Save the specific changes to Firebase
    await saveSettings('herojoinUs', { link: newLink });
  };

  const handleComponentClick = (event, identifier) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedElement(identifier);
  };

  return (
    <div className="sss-product-hero" style={headerStyle} id='header' onClick={(event) => handleComponentClick(event, 'header')}>
      <h1 className="sss-product-hero-title" onClick={(event) => handleComponentClick(event, 'heroTitle')}>
        <EditableText
          id='heroTitle'
          style={heroTitleStyles}
          text={headerContent.heroTitle}
          onChange={(newText) => handleTextChange(newText, 'heroTitle')}
        />
      </h1>
      <p className="sss-product-hero-text" onClick={(event) => handleComponentClick(event, 'heroDescription')}>
        <EditableText
          id='heroDescription'
          style={heroDescriptionStyles}
          text={headerContent.heroDescription}
          onChange={(newText) => handleTextChange(newText, 'heroDescription')}
        />
      </p>
      <a href={headerContent.herojoinUsLink.url} target={headerContent.herojoinUsLink.openInNewTab ? "_blank" : "_self"} className='position-relative' onClick={(event) => handleComponentClick(event, 'header-cta')}>
        <EditableButton
          id='header-cta'
          text={headerContent.herojoinUs}
          link={headerContent.herojoinUsLink.url} // Ensure correct data structure
          onChange={(newText) => handleTextChange(newText, 'header-cta')}
          onLinkChange={(newLink) => handleLinkChange(newLink.url)} // Adjust to pass only the URL
          style={herojoinUsStyles}
          className="sss-product-hero-cta"
        />
      </a>
      <ReusableImage
        src={headerContent.image}
        alt="Hero Image"
        onClick={enterReplacementMode}
        openImagePanel={openImagePanel}
        identifier="HeaderSection"
        imageHeight={imageHeight}
        selectImage={selectImage}
      />
    </div>
  );
};

export default HeaderSection;
