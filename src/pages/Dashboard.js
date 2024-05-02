import React, { useState, useEffect } from "react";
import "../components/dashboard/DashboardMain.css";
import "../components/Root.css";
import LeftMenuDashboard from "../components/dashboard/LeftMenuDashboard";
import ProjectsDashboard from "../components/dashboard/ProjectsDashboard";
import SiteSettingsDashboard from "../components/dashboard/SiteSettingsDashboard";
import ProfileDashboard from "../components/dashboard/ProfileDashboard";
import BillingDashboard from "../components/dashboard/BillingDashboard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // Retrieval from sessionStorage
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const walletId = sessionStorage.getItem("userAccount");
  const selectedTemplate = sessionStorage.getItem("selectedTemplateId");
  const projectName = sessionStorage.getItem("projectName");

  // Redirect logic based on session data
  // useEffect(() => {
  //   if (!isLoggedIn || !walletId || !selectedTemplate || !projectName) {
  //     navigate("/templatestep");
  //   }
  // }, [isLoggedIn, walletId, selectedTemplate, projectName, navigate]);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    if (storedProjects.length === 0) {
      const initialProject = {
        id: 1,
        name: projectName,
        logiciel: selectedTemplate,
        image: `./images/${selectedTemplate}screenshot.png`,
        createdAt: new Date().toISOString().slice(0, 10),
        description: "",
        favicon: `./images/${selectedTemplate}screenshot.png`,
      };
      setProjects([initialProject]);
    } else {
      setProjects(storedProjects);
    }
  }, []);

  // Updates localStorage whenever the projects state changes
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleOpenSettings = (index) => {
    setSelectedProject(projects[index]);
    setActiveMenuItem("settings");
  };

  const [activeMenuItem, setActiveMenuItem] = useState("projects");
  const [selectedProject, setSelectedProject] = useState(null);

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || (walletId ? walletId.slice(0, 6) + "..." + walletId.slice(-4) : "User");
  });

  const [profilePicture, setProfilePicture] = useState(() => {
    return localStorage.getItem("profilePicture") || "../images/avatar-placeholder.png";
  });

  const [description, setDescription] = useState(() => {
    return localStorage.getItem("description") || "";
  });

  const updateUserDetails = (newUsername, newDescription, newProfilePicture) => {
    setUsername(newUsername);
    setDescription(newDescription);
    setProfilePicture(newProfilePicture);
    localStorage.setItem("username", newUsername);
    localStorage.setItem("description", newDescription);
    localStorage.setItem("profilePicture", newProfilePicture);
  };

  const updateProject = (updatedProject) => {
    const updatedProjects = projects.map(project =>
      project.id === updatedProject.id ? updatedProject : project
    );
    setProjects(updatedProjects);
    setSelectedProject(updatedProject);
  };

  return (
    <>
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
              onReturnToProjects={() => setActiveMenuItem("projects")}
            />
          )}
          {activeMenuItem === "billing" && <BillingDashboard />}
          {activeMenuItem === "profile" && (
            <ProfileDashboard updateUserDetails={updateUserDetails} />
          )}
        </div>
      </div>
    </>
  );
}
