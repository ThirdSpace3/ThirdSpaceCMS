import React, { useEffect } from 'react';
import html2canvas from 'html2canvas';
import './TemplateComponents/Template1/TemplateTest1.css';
import SectionNavBar1 from '../templates/TemplateComponents/Template1/SectionNavbar1'; // Adjust the path based on your project structure
import SectionHero1 from './TemplateComponents/Template1/SectionHero1';
import SectionTrustUs1 from './TemplateComponents/Template1/SectionTrustUs1';
import SectionAboutUs1 from './TemplateComponents/Template1/SectionAboutUs1';
import SectionPartners1 from './TemplateComponents/Template1/SectionPartners1';
import SectionBlog1 from './TemplateComponents/Template1/SectionBlog1';
import SectionReview from './TemplateComponents/Template1/SectionReview';
import SectionFAQ1 from './TemplateComponents/Template1/SectionFAQ1';
import SectionBanner1 from './TemplateComponents/Template1/SectionBanner1';
import SectionFooter1 from './TemplateComponents/Template1/SectionFooter1';

const TemplateTest1 = ({ deviceSize, settings, handleSettingsChange, selectedElement, setSelectedElement, isPreviewMode }) => {

  // Function to take a screenshot
  const takeScreenshot = () => {
    html2canvas(document.body).then((canvas) => {
      // Create an image element
      const img = document.createElement('img');
      // Set the source of the image to the canvas data URL
      img.src = canvas.toDataURL('image/png');
      // Append the image to the body, or handle it as needed
      // For demonstration, we'll log the URL to the console
      console.log(img.src);
      // Here, you might want to upload the image to a server, save it locally, etc.
    });
  };

  useEffect(() => {
    // Function to handle the beforeunload event
    const handleBeforeUnload = (e) => {
      // Prevent the default unload behavior
      e.preventDefault();
      // Take a screenshot before leaving the page
      takeScreenshot();
      // Chrome requires returnValue to be set
      e.returnValue = '';
    };

    // Add the event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className='templatebody'>
      <SectionNavBar1
        deviceSize={deviceSize}
        settings={settings}
        handleSettingsChange={handleSettingsChange}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        isPreviewMode={isPreviewMode}
      />
      <SectionHero1 setSelectedElement={setSelectedElement} settings={settings} />
      <SectionTrustUs1 />
      <SectionAboutUs1 />
      <SectionPartners1 />
      <SectionBlog1 />
      <SectionReview />
      <SectionFAQ1 />
      <SectionBanner1 />
      <SectionFooter1 />
      {/* Other sections of the template would go here */}
    </div>
  );
};

export default TemplateTest1;
