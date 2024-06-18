import React, { useState, useEffect } from 'react';
import '../css/header.css'; // Ensure the path matches your project structure
import EditableText from '../../../../components/logiciel/TemplateComponent/EditableText';
import ReusableImage from '../../../../components/logiciel/TemplateComponent/ReusableImage';
import EditableButton from '../../../../components/logiciel/TemplateComponent/EditableButton';
import { useStyle } from '../../../../hooks/StyleContext';
import { useImageHistory } from '../../../../hooks/ImageHistoryContext';

const SSSPortfolioHeader = ({ setSelectedElement, onContentChange, openImagePanel, selectedImage, setSelectedImage, selectedColor, setSelectedColor }) => {
  const { style, getComponentStyle, updateStyle } = useStyle();
  const { enterReplacementMode, activeComponent, selectImage } = useImageHistory();

  const [headerContent, setHeaderContent] = useState({
    heroTitle: localStorage.getItem('portfolio-heroTitle-text') || 'Hello! I Am Pauline Milo-Alonso',
    heroDescription: localStorage.getItem('portfolio-heroDescription-text') || 'A Designer who Judges a book by its cover... Because if the cover does not impress you what else can?',
    arrowImage: localStorage.getItem('portfolio-arrowImage') || 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FArrow.png?alt=media&token=0842b36d-d8f5-4064-8517-aad7f386386a',
    meImage: localStorage.getItem('portfolio-meImage') || 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FMe.png?alt=media&token=24818c94-0d3e-4bbc-915d-acd97b38bbdc',
    navItems: JSON.parse(localStorage.getItem('portfolio-navItems')) || [
      { text: 'About', link: '#about' },
      { text: 'Experiences', link: '#experiences' },
      { text: 'Portfolio', link: '#portfolio' },
      { text: 'Contact', link: '#contact' }
    ]
  });

  useEffect(() => {
    onContentChange(headerContent);
  }, [headerContent, onContentChange]);

  const handleTextChange = (newText, textType) => {
    setHeaderContent(prevContent => ({
      ...prevContent,
      [textType]: newText
    }));
    localStorage.setItem(`portfolio-${textType}-text`, newText);
    updateStyle(textType, { text: newText });
  };

  const handleLinkChange = (newLink, index) => {
    const newNavItems = headerContent.navItems.map((item, i) => {
      if (i === index) {
        return { ...item, link: newLink.url };
      }
      return item;
    });
    setHeaderContent(prevContent => ({
      ...prevContent,
      navItems: newNavItems
    }));
    localStorage.setItem('portfolio-navItems', JSON.stringify(newNavItems));
    updateStyle(`navItem-${index}`, { link: newLink });
  };

  const handleNavItemChange = (newText, index) => {
    const newNavItems = headerContent.navItems.map((item, i) => {
      if (i === index) {
        return { ...item, text: newText };
      }
      return item;
    });
    setHeaderContent(prevContent => ({
      ...prevContent,
      navItems: newNavItems
    }));
    localStorage.setItem('portfolio-navItems', JSON.stringify(newNavItems));
    updateStyle(`navItem-${index}`, { text: newText });
  };

  const handleComponentClick = (event, identifier) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedElement(identifier);
  };

  return (
    <>
      <nav className='PortfolioNavbar' style={getComponentStyle('PortfolioNavbar')} id='PortfolioNavbar' onClick={(event) => handleComponentClick(event, 'PortfolioNavbar')}>
        <ReusableImage
          src='https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2F3s-portfolio-logo.png?alt=media&token=c60b905d-c2d3-426d-b86d-b959598750fe'
          alt="3S Product Logo"
          identifier="portfolioLogo"
          openImagePanel={openImagePanel}
          style={getComponentStyle('portfolioLogo')}
          onClick={(event) => handleComponentClick(event, 'portfolioLogo')}
        />
        <ul style={getComponentStyle('navList')} id='navList' onClick={(event) => handleComponentClick(event, 'navList')}>
          {headerContent.navItems.map((item, index) => (
            <li key={index} className='position-relative' style={getComponentStyle(`navItem-${index}`)} id={`navItem-${index}`} onClick={(event) => handleComponentClick(event, `navItem-${index}`)}>
              <EditableButton
                id={`navItem-${index}`}
                text={item.text}
                link={{ url: item.link, openInNewTab: false }}
                onChange={(newText) => handleNavItemChange(newText, index)}
                onLinkChange={(newLink) => handleLinkChange(newLink, index)}
                style={getComponentStyle(`navItem-${index}`)}
                className="nav-item-button"
              />
            </li>
          ))}
        </ul>
      </nav>
      <header className="portfolio-header" style={getComponentStyle('portfolio-header')} id='portfolio-header' onClick={(event) => handleComponentClick(event, 'portfolio-header')}>
        <div style={getComponentStyle('headerDiv')} id='headerDiv' onClick={(event) => handleComponentClick(event, 'headerDiv')}>
          <div className='meSection' style={getComponentStyle('meSection')} id='meSection' onClick={(event) => handleComponentClick(event, 'meSection')}>
            <ReusableImage
              src={headerContent.arrowImage}
              alt="Arrow Icon"
              identifier="arrowIcon"
              openImagePanel={openImagePanel}
              style={getComponentStyle('arrowIcon')}
              onClick={(event) => handleComponentClick(event, 'arrowIcon')}
            />
            <h1 style={getComponentStyle('heroTitle')} id='heroTitle' onClick={(event) => handleComponentClick(event, 'heroTitle')}>
              <EditableText
                text={headerContent.heroTitle}
                onChange={(newText) => handleTextChange(newText, 'heroTitle')}
                className="header-title"
              />
            </h1>
          </div>
          <div className="header-content" style={getComponentStyle('headerContent')} id='headerContent' onClick={(event) => handleComponentClick(event, 'headerContent')}>
            <ReusableImage
              src={headerContent.meImage}
              alt="Me Image"
              identifier="meImage"
              openImagePanel={openImagePanel}
              style={getComponentStyle('meImage')}
              onClick={(event) => handleComponentClick(event, 'meImage')}
            />
            <div className='header-text' style={getComponentStyle('headerText')} id='headerText' onClick={(event) => handleComponentClick(event, 'headerText')}>
              <p className="start" style={getComponentStyle('heroDescriptionStart')} id='heroDescriptionStart' onClick={(event) => handleComponentClick(event, 'heroDescriptionStart')}>
                <EditableText
                  text="A Designer who"
                  onChange={(newText) => handleTextChange(newText, 'heroDescriptionStart')}
                />
              </p>
              <p className="mid" style={getComponentStyle('heroDescriptionMiddle1')} id='heroDescriptionMiddle1' onClick={(event) => handleComponentClick(event, 'heroDescriptionMiddle1')}>
                <EditableText
                  text="Judges a book"
                  onChange={(newText) => handleTextChange(newText, 'heroDescriptionMiddle1')}
                />
              </p>
              <p className="mid" style={getComponentStyle('heroDescriptionMiddle2')} id='heroDescriptionMiddle2' onClick={(event) => handleComponentClick(event, 'heroDescriptionMiddle2')}>
                <EditableText
                  text="by its cover..."
                  onChange={(newText) => handleTextChange(newText, 'heroDescriptionMiddle2')}
                />
              </p>
              <p className="end" style={getComponentStyle('heroDescriptionEnd')} id='heroDescriptionEnd' onClick={(event) => handleComponentClick(event, 'heroDescriptionEnd')}>
                <EditableText
                  text="Because if the cover does not impress you what else can?"
                  onChange={(newText) => handleTextChange(newText, 'heroDescriptionEnd')}
                />
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default SSSPortfolioHeader;
