import React from 'react';
import '../css/experience.css';

const SSSPortfolioExperience = () => {
  return (
    <div className="portfolio-experience" id="experience">
      <h2>Work Experience</h2>
      <div className="experience-cards">
        {/* Example of a single experience card */}
        <div className="experience-card">
          <div className="icon star-icon"></div>
          <div className='experience-card-content'>
            <h3>CIB on the Mobile</h3>
            <p>Take your client onboard seamlessly by our amazing tool of digital onboard process.</p>
            <button>Learn More</button>
          </div>
        </div>
        <div className="experience-card">
          <div className="icon message-icon"></div>
          <div className='experience-card-content'>
            <h3>CIB on the Mobile</h3>
            <p>Take your client onboard seamlessly by our amazing tool of digital onboard process.</p>
            <button>Learn More</button>
          </div>
        </div>
        <div className="experience-card">
          <div className="icon hat-icon"></div>
          <div className='experience-card-content'>
            <h3>CIB on the Mobile</h3>
            <p>Take your client onboard seamlessly by our amazing tool of digital onboard process.</p>
            <button>Learn More</button>
          </div>
        </div>
        <div className="experience-card">
          <div className="icon magic-icon"></div>
          <div className='experience-card-content'>
            <h3>CIB on the Mobile</h3>
            <p>Take your client onboard seamlessly by our amazing tool of digital onboard process.</p>
            <button>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SSSPortfolioExperience;
