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
  const [newTemplateName, setNewTemplateName] = useState("");

  console.log("isLoggedIn:", isLoggedIn); // Add this line
  console.log("walletId:", walletId); // Add this line
  const selectedTemplate = sessionStorage.getItem('selectedTemplateId');
  const projectName = sessionStorage.getItem('projectName');
  console.log("Retrieved template: ", selectedTemplate);
  console.log("Retrieved project name: ", projectName);
  
  useEffect(() => {
  
    // Use these values as needed to display the correct template and project name
    // This might involve setting state, conditional rendering, etc.
  }, []);
  
  const InitialProjects = [
    // {
    //   id: 1, // Add unique ID
    //   name: "TemplateFullText",
    //   logiciel: "TemplateFullText",
    //   image: "./images/project-image-test.png",
    //   createdAt: "2023-03-20",
    //   description: "",
    //   favicon: "",
    // },
    // {
    //   id: 2, // Add unique ID
    //   name: "TemplateImg_txt",
    //   logiciel: "TemplateImg_txt",

    //   image: "./images/project-image-test.png",
    //   createdAt: "2023-03-19",
    //   description: "",
    //   favicon: "",
    // },
    // {
    //   id: 3, // Add unique ID
    //   name: "TemplateTest1",
    //   logiciel: "TemplateTest1",
    //   image: "./images/project-image-test.png",
    //   createdAt: "2023-03-19",
    //   description: "",
    //   favicon: "",
    // },
    {
      id: 1, // dynamically assign next ID based on existing ones,
      name: projectName, // Use the projectName from sessionStorage
      logiciel: selectedTemplate, // Adapt based on how you're identifying templates
      image: "./images/"+selectedTemplate+"screenshot.png", // Adjust based on template
      createdAt: new Date().toISOString().slice(0, 10), // Set to current date
      description: "",
      favicon: "",
    },
    // Add more projects as needed
  ];
  const shortenAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  };
  const createNewTemplate = () => {
    const newTemplate = {
      id: projects.length + 1, // dynamically assign next ID based on existing ones,
      name: newTemplateName, // Use the newTemplateName state
      logiciel: "NewTemplate", // Adapt based on how you're identifying templates
      image: "./images/NewTemplateScreenshot.png", // Adjust based on template
      createdAt: new Date().toISOString().slice(0, 10), // Set to current date
      description: "",
      favicon: "",
    };
  
    setProjects([...projects, newTemplate]); // Add the new template to the projects list
    localStorage.setItem('projects', JSON.stringify([...projects, newTemplate])); // Save to local storage
    setNewTemplateName(""); // Reset the newTemplateName state
  };
  
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
    return localStorage.getItem('username') || shortenAddress(walletId);
  });

  const [description, setDescription] = useState(() => {
    // Load description from local storage or set a default value
    return localStorage.getItem('description') || '';
  });

  const [profilePicture, setProfilePicture] = useState(() => {
    // Load profile picture from local storage or set a default
    return  '../images/avatar-placeholder.png' || localStorage.getItem('profilePicture') ;
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
              projects={InitialProjects} // Directly use projects here for simplicity
              handleOpenSettings={handleOpenSettings}
              createNewTemplate={createNewTemplate} // Pass the createNewTemplate function as a prop

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