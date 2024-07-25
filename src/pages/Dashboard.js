import React, { useState, useEffect, useContext } from "react";
import "../components/dashboard/DashboardMain.css";
import "../components/Root.css";
import LeftMenuDashboard from "../components/dashboard/LeftMenuDashboard";
import ProjectsDashboard from "../components/dashboard/ProjectsDashboard";
import SiteSettingsDashboard from "../components/dashboard/SiteSettingsDashboard";
import ProfileDashboard from "../components/dashboard/ProfileDashboard";
import BillingDashboard from "../components/dashboard/BillingDashboard";
import { useNavigate } from "react-router-dom";
import PopupWallet from "../components/website/login/PopupWallet";
import { db, collection, getDocs } from '../firebaseConfig';
import ReportBugBTN from "../components/website/ReportBugBTN";
import { AuthContext } from "../hooks/AuthProvide"; // Ensure the path is correct

export default function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, walletId, setIsLoggedIn, setWalletId } = useContext(AuthContext);
  const [hasWalletData, setHasWalletData] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [hasStepData, setHasStepData] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [currentProject, setCurrentProject] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState("projects");
  const [selectedProject, setSelectedProject] = useState(null);
  const [project, setProjects] = useState([]);
  const projects = JSON.parse(localStorage.getItem("projects") || '[]');
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (walletId != "null") {
      fetchProjects(walletId);
      console.log('Logged in');
    } else {
      setShowPopup(true);
      console.log('Not logged in');
    }
  }, [isLoggedIn]);

  const handleOpenSettings = (index) => {
    setSelectedProject(projects[index]);
    setCurrentProject(index);
    setActiveMenuItem("settings");
  };

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

  const fetchProjects = async (walletId) => {
    try {
      if (walletId) {
        const collectionRef = collection(db, 'projects', walletId, 'projectData');
        const querySnapshot = await getDocs(collectionRef);
        const projects = [];
        querySnapshot.forEach((doc) => {
          projects.push({ id: doc.id, ...doc.data() });
        });
        setUserData(projects);
        setIsLoading(false);
      } else {
        console.error("walletId is undefined");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      setIsLoading(false);
    }
  };

  const checkWalletData = async () => {
    const userAccount = sessionStorage.getItem("userAccount");
    if (userAccount) {
      const docRef = collection(db, 'projects', userAccount, 'projectData');
      const docSnap = await getDocs(docRef);
      if (!docSnap.empty) {
        setHasWalletData(true);
        let userData = [];
        docSnap.forEach((doc) => {
          userData.push(doc.data());
        });
        console.log(userData);
        if (userData.length > 0) {
          setHasStepData(true);
        }
      } else {
        setHasWalletData(false);
      }
      setAccounts([userAccount]);
    }
  };

  const handleUserLogin = (account) => {
    setWalletId(account);
    setIsLoggedIn(true);
    setShowPopup(false);
  };

  if (showPopup) {
    return (
      <PopupWallet
        onClose={() => setShowPopup(false)}
        onUserLogin={handleUserLogin}
        checkWalletData={() => checkWalletData(walletId)}
      />
    );
  }

  return (
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
            setSelectedProject={setSelectedProject}
            handleOpenSettings={handleOpenSettings}
            setProjects={setProjects}
            userData={userData}
            isLoading={isLoading}
            setUserData={setUserData}
            fetchProjects={fetchProjects}
          />
        )}
        {activeMenuItem === "settings" && (
          <SiteSettingsDashboard
            projects={projects}
            selectedProject={selectedProject}
            setProjects={setProjects}
            updateProject={updateProject}
            onReturnToProjects={() => setActiveMenuItem("projects")}
            setActiveMenuItem={setActiveMenuItem}
            setCurrentProject={setCurrentProject}
          />
        )}
        {activeMenuItem === "billing" && <BillingDashboard />}
        {activeMenuItem === "profile" && (
          <ProfileDashboard updateUserDetails={updateUserDetails} />
        )}
      </div>
      <ReportBugBTN />
    </div>
  );
}
