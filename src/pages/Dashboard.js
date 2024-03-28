import React from "react";
import "../components/dashboard/DashboardMain.css";
import "../components/Root.css";
import LeftMenuDashboard from "../components/dashboard/LeftMenuDashboard";
import ProjectsDashboard from "../components/dashboard/ProjectsDashboard";
import SiteSettingsDashboard from "../components/dashboard/SiteSettingsDashboard";
import ProfileDashboard from "../components/dashboard/ProfileDashboard";



export default function Dashboard() {
return (
     <>
     <div className="dashboard-container">
    <div className="leftMenuDashboard">
        <LeftMenuDashboard />
    </div>
    <div className="projectsDashboard">
        {/* <ProjectsDashboard /> */}
        {/* <SiteSettingsDashboard /> */}
        <ProfileDashboard />
    </div>
</div>
        
        
    </>
    
);
}
