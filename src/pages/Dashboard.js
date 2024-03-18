import React from "react";
import "../components/dashboard/Dashboard.css"
import ProjectList from "../components/dashboard/ProjectList";
import LeftBar from "../components/dashboard/LeftBar";
import NavBarDashboard from "../components/dashboard/NavBarDashboard";
export default function Dashboard() {

    const projects = [
        // This should be your fetched or static list of projects
        // For example:
        { id: 1, title: "Project One", description: "This is a description.", image: "path_to_image" },
        { id: 2, title: "Project Two", description: "This is a description.", image: "path_to_image" },
    ];
    return (
        <>
            <div className="Dahsboard_Wrapper">
                <LeftBar />
                <div className="Dashboard_Column">
                    <NavBarDashboard />

                    <div className="RecentlyViewed">
                        <div className="recentlyviewed_element">
                            <div className="recentlyviewed_element_top">
                                <i>Time</i>
                                <p>Recently Viewed</p>
                            </div>
                            <img></img>
                            <div className="recentlyviewed_element_bottom">
                                <p>Name Project</p>
                                <i>Dots</i>
                            </div>

                        </div>
                        <div className="recentlyviewed_element">
                            <div className="recentlyviewed_element_top">
                                <i>Time</i>
                                <p>Recently Viewed</p>
                            </div>
                            <img></img>
                            <div className="recentlyviewed_element_bottom">
                                <p>Name Project</p>
                                <i>Dots</i>
                            </div>

                        </div>
                    </div>

                    <div className="Projectlists">
                        <div className="NewProjects">
                            <img></img>
                            <h2>New Project</h2>
                        </div>

                        <div className="Projectlists_element">
                            <div className="Projectlists_element_top">
                                <i>Time</i>
                                <p>Recently Viewed</p>
                            </div>
                            <img></img>
                            <div className="Projectlists_element_bt">
                                <p>Name Project</p>
                                <i>Dots</i>
                            </div>

                        </div>
                        <div className="Projectlists_element">
                            <div className="Projectlists_element_top">
                                <i>Time</i>
                                <p>Recently Viewed</p>
                            </div>
                            <img></img>
                            <div className="Projectlists_element_bt">
                                <p>Name Project</p>
                                <i>Dots</i>
                            </div>

                        </div>
                        <div className="Projectlists_element">
                            <div className="Projectlists_element_top">
                                <i>Time</i>
                                <p>Recently Viewed</p>
                            </div>
                            <img></img>
                            <div className="Projectlists_element_bt">
                                <p>Name Project</p>
                                <i>Dots</i>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
