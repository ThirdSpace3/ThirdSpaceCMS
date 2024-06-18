import React from 'react';
import '../css/projects.css';

const projects = [
  {
    title: 'Example Project',
    description: 'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.',
    image: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FProject1.png?alt=media&token=2bf3e426-5b45-4a19-8003-3cb4eda1b6e8', // Replace with the actual path to the image
    icon: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2Fcliquez-sur.png?alt=media&token=18f4a587-576d-488b-a123-027913242ad9'    // Replace with the actual path to the icon
  },
  {
    title: 'Example Project',
    description: 'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.',
    image: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2Fprojectleft.png?alt=media&token=835d18b6-ccbb-4422-b47e-09f8111d6ae6', // Replace with the actual path to the image
    icon: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2Fcliquez-sur.png?alt=media&token=18f4a587-576d-488b-a123-027913242ad9'    // Replace with the actual path to the icon
  },
  {
    title: 'Example Project',
    description: 'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.',
    image: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2FProject1.png?alt=media&token=2bf3e426-5b45-4a19-8003-3cb4eda1b6e8', // Replace with the actual path to the image
    icon: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageLogiciel%2Ftemplateimages%2Fportfolio%2Fcliquez-sur.png?alt=media&token=18f4a587-576d-488b-a123-027913242ad9'    // Replace with the actual path to the icon
  },
];

const SSSPortfolioProjects = () => {
  return (
    <div className="portfolio-projects" id="projects">
      {projects.map((project, index) => (
        <div className={`project-card ${index % 2 === 0 ? 'right' : 'left'}`} key={index}>
          <div className="project-image">
            <img src={project.image} alt={project.title} />
          </div>
          <div className={`project-details ${index % 2 === 0 ? 'details-right' : 'details-left'}`}>
            <h2>Featured Project</h2>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-icon">
              <img src={project.icon} alt="Project icon" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SSSPortfolioProjects;
