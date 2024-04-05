import React, { useState, useEffect } from "react";
import "../components/dashboard/DashboardMain.css";
import "../components/Root.css";
import LeftMenuDashboard from "../components/dashboard/LeftMenuDashboard";
import ProjectsDashboard from "../components/dashboard/ProjectsDashboard";
import SiteSettingsDashboard from "../components/dashboard/SiteSettingsDashboard";
import ProfileDashboard from "../components/dashboard/ProfileDashboard";
import BillingDashboard from "../components/dashboard/BillingDashboard"

export default function Dashboard() {
  console.log("Dashboard component rendered");
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const walletId = sessionStorage.getItem('userAccount');

  console.log("isLoggedIn:", isLoggedIn); // Add this line
  console.log("walletId:", walletId); // Add this line
  const InitialProjects = [
    {
      id: 1, // Add unique ID
      name: "TemplateFullText",
      logiciel: "TemplateFullText",
      image: "./images/project-image-test.png",
      createdAt: "2023-03-20",
      description: "",
      favicon: "",
    },
    {
      id: 2, // Add unique ID
      name: "TemplateImg_txt",
      logiciel: "TemplateImg_txt",

      image: "./images/project-image-test.png",
      createdAt: "2023-03-19",
      description: "",
      favicon: "",
    },
    {
      id: 3, // Add unique ID
      name: "TemplateTest1",
      logiciel: "TemplateTest1",
      image: "./images/project-image-test.png",
      createdAt: "2023-03-19",
      description: "",
      favicon: "",
    },
    // Add more projects as needed
  ];

  const [activeMenuItem, setActiveMenuItem] = useState("projects");
  const [projects, setProjects] = useState(() => {
    // Load projects from local storage or use initial data
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : InitialProjects;
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [username, setUsername] = useState(() => {
    // Load username from local storage or set a default value
    return localStorage.getItem('username') || 'My Username';
  });

  const [description, setDescription] = useState(() => {
    // Load description from local storage or set a default value
    return localStorage.getItem('description') || '';
  });

  const [profilePicture, setProfilePicture] = useState(() => {
    // Load profile picture from local storage or set a default
    return localStorage.getItem('profilePicture') || './images/avatar-placeholder.png';
  });

  // Function to update user details
  const updateUserDetails = (newUsername, newDescription, newProfilePicture) => {
    setUsername(newUsername);
    setDescription(newDescription);
    setProfilePicture(newProfilePicture);

    // Save to local storage
    localStorage.setItem('username', newUsername);
    localStorage.setItem('description', newDescription);
    localStorage.setItem('profilePicture', newProfilePicture);
  };

  useEffect(() => {
    // This might be used for other purposes or to handle changes in user details
  }, [username, description, profilePicture]);
  const handleOpenSettings = (index) => {
    setSelectedProject(projects[index]);
    setActiveMenuItem("settings");
  };


  const updateProject = (updatedProject) => {
    const updatedProjects = projects.map(project =>
      project.id === updatedProject.id ? updatedProject : project);
    setProjects(updatedProjects);
    // Assuming you're using local storage for persistence; otherwise, adapt as necessary.
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const handleReturnToProjectsDashboard = () => {
    setActiveMenuItem("projects");
  };

  useEffect(() => {
    console.log('Projects updated:', projects);
    localStorage.setItem('projects', JSON.stringify(projects));

    setFilteredProjects(projects);
  }, [projects]);


  return (
    <>
     {isLoggedIn && (
      <div className="dashboard-container">

        <div className="leftMenuDashboard">
          <LeftMenuDashboard
            setActiveMenuItem={setActiveMenuItem}
            username={username}
            profilePicture={profilePicture}
          />        
        </div>
        
        <div className="projectsDashboard">

          {activeMenuItem === "projects" && (
            <ProjectsDashboard
              projects={projects} // Directly use projects here for simplicity
              handleOpenSettings={handleOpenSettings}
            />
          )}

          {activeMenuItem === "settings" && (
            <SiteSettingsDashboard
              project={selectedProject}
              updateProject={updateProject}
              onReturnToProjects={handleReturnToProjectsDashboard} // Pass the function as a prop here
            />
          )}

          {activeMenuItem === "billing" && (
            <BillingDashboard
            />
          )}

          {activeMenuItem === "profile" && (
            <ProfileDashboard updateUserDetails={updateUserDetails} />
          )}

        </div>

      </div>
      )}
    </>
  );
}