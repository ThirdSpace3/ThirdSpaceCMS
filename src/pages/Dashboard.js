import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/dashboard/DashboardMain.css";
import "../components/Root.css";
import LeftMenuDashboard from "../components/dashboard/LeftMenuDashboard";
import ProjectsDashboard from "../components/dashboard/ProjectsDashboard";
import SiteSettingsDashboard from "../components/dashboard/SiteSettingsDashboard";
import ProfileDashboard from "../components/dashboard/ProfileDashboard";
import BillingDashboard from "../components/dashboard/BillingDashboard";
import PopupWallet from "../components/website/login/PopupWallet";
import { db, collection, getDocs, doc, getDoc } from '../firebaseConfig';
import ReportBugBTN from "../components/website/ReportBugBTN";
import ConnectAdmin from "../components/dashboard/Admin/ConnectAdmin";

export default function Dashboard() {
  const navigate = useNavigate();
  const [hasWalletData, setHasWalletData] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [hasStepData, setHasStepData] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState("projects");
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConnectAdmin, setShowConnectAdmin] = useState(false);

  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const walletId = sessionStorage.getItem("userAccount");
  const selectedTemplate = sessionStorage.getItem("selectedTemplateId");
  const projectName = sessionStorage.getItem("projectName");
  const savedProjects = JSON.parse(localStorage.getItem("projects") || '[]');
  console.log(walletId);

  useEffect(() => {
    if (walletId) {
      fetchProjects(walletId);
      fetchUserRole(walletId);
    }
  }, [isLoggedIn]);

  const fetchUserRole = async (walletId) => {
    try {
      const userDocRef = doc(db, 'users', walletId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserRole(userData.role || "user"); // Default to "user" if no role is set
      } else {
        console.error("No such user document!");
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
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

  const handleOpenSettings = (index) => {
    setSelectedProject(savedProjects[index]);
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
    const updatedProjects = savedProjects.map(project =>
      project.id === updatedProject.id ? updatedProject : project
    );
    setProjects(updatedProjects);
    setSelectedProject(updatedProject);
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
        if (userData.length > 0) {
          setHasStepData(true);
        }
      } else {
        setHasWalletData(false);
      }
      setAccounts([userAccount]);
    }
  };

  const handleAdminVerified = (isAdmin) => {
    if (isAdmin) {
      navigate("/dashboard-admin", { state: { walletId } });
    } else {
      navigate("/dashboard", { state: { walletId } });
    }
  };

  if (isLoggedIn === "true") {
    return (
      <>
        <div className="dashboard-container">
          <div className="leftMenuDashboard">
            <LeftMenuDashboard
              setActiveMenuItem={setActiveMenuItem}
              username={username}
              profilePicture={profilePicture}
              userRole={userRole}
              walletId={walletId}
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
            {activeMenuItem === "billing" && <BillingDashboard walletId={walletId} />}
            {activeMenuItem === "profile" && (
              <ProfileDashboard updateUserDetails={updateUserDetails} />
            )}
            {activeMenuItem === "admin" && userRole === "admin" && !showConnectAdmin && (
              <button onClick={() => setShowConnectAdmin(true)}>Admin</button>
            )}
            {showConnectAdmin && (
              <ConnectAdmin walletId={walletId} onAdminVerified={handleAdminVerified} />
            )}
          </div>
          <ReportBugBTN />
        </div>
      </>
    );
  } else {
    return <PopupWallet onClose={() => setShowPopup(false)} onUserLogin={(account) => setAccounts([account])} checkWalletData={() => checkWalletData(accounts[0])} />;
  }
}
