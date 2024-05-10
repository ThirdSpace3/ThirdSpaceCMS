import React, { useState, useEffect } from "react";
import "../components/dashboard/DashboardMain.css";
import "../components/Root.css";
import LeftMenuDashboard from "../components/dashboard/LeftMenuDashboard";
import ProjectsDashboard from "../components/dashboard/ProjectsDashboard";
import SiteSettingsDashboard from "../components/dashboard/SiteSettingsDashboard";
import ProfileDashboard from "../components/dashboard/ProfileDashboard";
import BillingDashboard from "../components/dashboard/BillingDashboard";
import { useNavigate } from "react-router-dom";
import PopupWallet from "../components/website/PopupWallet";
import { db, collection, getDocs } from '../firebaseConfig'; // Assuming Firestore is correctly imported and configured
import ReportBugBTN from "../components/website/ReportBugBTN";
export default function Dashboard() {
  const navigate = useNavigate();
  const [hasWalletData, setHasWalletData] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [hasStepData, setHasStepData] = useState(false); // State to track if stepData is available
  const [showPopup, setShowPopup] = useState(false);

  // Retrieval from sessionStorage
  const walletId = sessionStorage.getItem("userAccount");
  const selectedTemplate = sessionStorage.getItem("selectedTemplateId");
  const projectName = sessionStorage.getItem("projectName");
  const [currentProject, setCurrentProject] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState("projects");
  const [selectedProject, setSelectedProject] = useState(null);
  const [project, setProjects] = useState([]);
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");  // Ensure this is a boolean
  const projects = JSON.parse(localStorage.getItem("projects") || '[]');
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(isLoggedIn);

  useEffect(() => {
    if (walletId) {

      // Fetch projects and other user data here
      fetchProjects(walletId);
      console.log('Logged in');
    } else {
      // Potentially open a login modal or redirect
      const walletId = sessionStorage.getItem("userAccount");
      console.log(walletId);
      console.log('Not logged in');

    }
  }, [isLoggedIn]); // Depend on the isLoggedIn state



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
      }
      else {
        console.error("walletId is undefined");
      }
    }
    catch (error) {
      console.error("Error fetching documents:", error);
      setIsLoading(false);
    }
  };
  const checkWalletData = async () => {
    const userAccount = sessionStorage.getItem("userAccount");
    if (userAccount) {
      const docRef = collection(db, 'projects', userAccount, 'projectData');
      const docSnap = await getDocs(docRef);
      if (!docSnap.empty) { // Check if the snapshot is not empty
        setHasWalletData(true);
        let userData = [];
        docSnap.forEach((doc) => {
          userData.push(doc.data());
        });
        console.log(userData);
        if (userData.length > 0) { // Check if userData is present
          setHasStepData(true);
        }
        // navigate("/dashboard"); // Redirect to dashboard if wallet data exists
      } else {
        setHasWalletData(false);
      }
      setAccounts([userAccount]);
    }
  };



  // The rest of your existing code...

  if (!walletId) {
    return <PopupWallet onClose={() => setShowPopup(false)} onUserLogin={(account) => setAccounts([account])} checkWalletData={() => checkWalletData(accounts[0])} />;
  }

  
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
    </>
  );
}
