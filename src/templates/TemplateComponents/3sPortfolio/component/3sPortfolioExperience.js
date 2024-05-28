import React from 'react';
import '../css/experience.css'

const SSSPortfolioExperience = () => {
  return (
    <div className="portfolio-experience" id="experience">
      <h2>Work Experience</h2>
      {/* Example of a single experience card */}
      <div className="experience-card">
        <h3>CIB on the Mobile</h3>
        <p>Full Stack Developer</p>
        <p>March 2020 - Present</p>
      </div>
      {/* Repeat the above div for each work experience entry */}
    </div>
  );
};

export default SSSPortfolioExperience;
