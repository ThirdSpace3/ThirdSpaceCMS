import React from 'react';
import '../css/projects.css'

const SSSPortfolioProjects = () => {
  return (
    <div className="portfolio-projects" id="projects">
      <h2>Featured Project</h2>
      <div className="project-card">
        <h3>Example Project</h3>
        <p>A web app for visualizing personalized Spotify data.</p>
      </div>
      {/* Repeat the above div for each project */}
    </div>
  );
};

export default SSSPortfolioProjects;
