import React, { useState } from "react";
import "../components/dashboard/DashboardMain.css";
import "../components/Root.css";
import LeftMenuDashboard from "../components/dashboard/LeftMenuDashboard";
import ProjectsDashboard from "../components/dashboard/ProjectsDashboard";
import SiteSettingsDashboard from "../components/dashboard/SiteSettingsDashboard";
import ProfileDashboard from "../components/dashboard/ProfileDashboard";

export default function Dashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("projects");

  return (
    <>
      <div className="dashboard-container">
        <div className="leftMenuDashboard">
          <LeftMenuDashboard setActiveMenuItem={setActiveMenuItem} />
        </div>
        <div className="projectsDashboard">
          {activeMenuItem === "projects" && <ProjectsDashboard />}
          {activeMenuItem === "settings" && <SiteSettingsDashboard />}
          {activeMenuItem === "profile" && <ProfileDashboard />}
        </div>
      </div>
    </>
  );
}
