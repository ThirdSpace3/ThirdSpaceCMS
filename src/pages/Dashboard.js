import React from "react";
import "../components/dashboard/DashboardMain.css";
import "../components/Root.css";
import LeftMenuDashboard from "../components/dashboard/LeftMenuDashboard";
import ProjectsDashboard from "../components/dashboard/ProjectsDashboard";



export default function Dashboard() {
return (
     <>
     <div className="dashboard-container">
    <div className="leftMenuDashboard">
        <LeftMenuDashboard />
    </div>
    <div className="projectsDashboard">
        <ProjectsDashboard />
    </div>
</div>
        
        
    </>
    
);
}
