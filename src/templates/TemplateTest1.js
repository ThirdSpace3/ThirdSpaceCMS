import React from 'react';
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
