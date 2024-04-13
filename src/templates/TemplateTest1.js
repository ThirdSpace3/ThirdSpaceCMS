import React, { useEffect } from 'react';
import html2canvas from 'html2canvas';
import './TemplateComponents/Template1/TemplateTest1.css'
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
  const captureScreen = () => {
    html2canvas(document.querySelector(".templatebody")).then(canvas => {
      canvas.toBlob(blob => {
        // Create a FormData object
        const formData = new FormData();
  
        // Add the blob to the FormData object
        formData.append('file', blob);
  
        // Send the FormData object to your server
        fetch('/your-endpoint', {
          method: 'POST',
          body: formData
        });
      });
    });
  }
  useEffect(() => {
    // This function will be called when the component is unmounted
    return () => {
      captureScreen();
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
      <SectionHero1
              setSelectedElement={setSelectedElement}
              settings={settings}

      />
      <SectionTrustUs1/>
      <SectionAboutUs1/>
      <SectionPartners1/>
      <SectionBlog1/>
      <SectionReview/>
      <SectionFAQ1/>
      <SectionBanner1/>
      <SectionFooter1/>
      {/* Other sections of the template would go here */}
    </div>
  );
}

export default TemplateTest1;
