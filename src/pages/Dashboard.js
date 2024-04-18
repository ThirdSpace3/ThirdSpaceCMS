import React, { useState, useEffect } from "react";
import "../components/dashboard/DashboardMain.css";
import "../components/Root.css";
import LeftMenuDashboard from "../components/dashboard/LeftMenuDashboard";
import ProjectsDashboard from "../components/dashboard/ProjectsDashboard";
import SiteSettingsDashboard from "../components/dashboard/SiteSettingsDashboard";
import ProfileDashboard from "../components/dashboard/ProfileDashboard";
import BillingDashboard from "../components/dashboard/BillingDashboard";

export default function Dashboard({ selectedTemplateId }) {
  console.log("Dashboard component rendered");
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const walletId = sessionStorage.getItem("userAccount");
  const [newTemplateName, setNewTemplateName] = useState("");

  console.log("isLoggedIn:", isLoggedIn); // Add this line
  console.log("walletId:", walletId); // Add this line
  const selectedTemplate = sessionStorage.getItem("selectedTemplateId");
  const projectName = sessionStorage.getItem("projectName");
  console.log("Retrieved template: ", selectedTemplate);
  console.log("Retrieved project name: ", projectName);

  const initialProject = {
    id: 1,
    name: projectName,
    logiciel: selectedTemplate,
    image: `./images/${selectedTemplate}screenshot.png`,
    createdAt: new Date().toISOString().slice(0, 10),
    description: "",
    favicon: "",
  };
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Load projects from localStorage on initial load
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    if (storedProjects.length > 0) {
      setProjects(storedProjects);
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever the projects state changes
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addNewProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const shortenAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  const [activeMenuItem, setActiveMenuItem] = useState("projects");

  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [username, setUsername] = useState(() => {
    // Load username from local storage or set a default value
    return localStorage.getItem("username") || shortenAddress(walletId);
  });

  const [description, setDescription] = useState(() => {
    // Load description from local storage or set a default value
    return localStorage.getItem("description") || "";
  });

  const [profilePicture, setProfilePicture] = useState(() => {
    // Load profile picture from local storage or set a default
    return (
      "../images/avatar-placeholder.png" ||
      localStorage.getItem("profilePicture")
    );
  });

  // Function to update user details
  const updateUserDetails = (
    newUsername,
    newDescription,
    newProfilePicture
  ) => {
    setUsername(newUsername);
    setDescription(newDescription);
    setProfilePicture(newProfilePicture);

    // Save to local storage
    localStorage.setItem("username", newUsername);
    localStorage.setItem("description", newDescription);
    localStorage.setItem("profilePicture", newProfilePicture);
  };

  const handleOpenSettings = (index) => {
    setSelectedProject(projects[index]);
    setActiveMenuItem("settings");
  };

  const updateProject = (updatedProject) => {
    const updatedProjects = projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    setProjects(updatedProjects);
    setSelectedProject(updatedProject); // Update selected project
  };

  const handleReturnToProjectsDashboard = () => {
    setActiveMenuItem("projects");
  };

  useEffect(() => {
    console.log("Projects updated:", projects);
    localStorage.setItem("projects", JSON.stringify(projects));

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
                projects={projects}
                handleOpenSettings={handleOpenSettings}
                setProjects={setProjects}
              />
            )}

            {activeMenuItem === "settings" && (
              <SiteSettingsDashboard
                project={selectedProject}
                updateProject={updateProject}
                onReturnToProjects={handleReturnToProjectsDashboard} // Pass the function as a prop here
              />
            )}

            {activeMenuItem === "billing" && <BillingDashboard />}

            {activeMenuItem === "profile" && (
              <ProfileDashboard updateUserDetails={updateUserDetails} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
