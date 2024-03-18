import React from "react";
import "../components/dashboard/Dashboard.css"
import LeftBar from "../components/dashboard/LeftBar";
import NavBarDashboard from "../components/dashboard/NavBarDashboard";
import RecentlyViewed from "../components/dashboard/recentlyViewed";
import Projectlists from "../components/dashboard/ProjectLists";

export default function Dashboard() {
return (
     <>
        <div className="Dahsboard_Wrapper">
                <LeftBar />
            <div className="Dashboard_Column">
                <NavBarDashboard />
                <RecentlyViewed />
                <Projectlists />
            </div>
        </div>
    </>
    
);
}
