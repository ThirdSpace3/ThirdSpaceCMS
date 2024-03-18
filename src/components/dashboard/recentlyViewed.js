import React from "react";
import "./Dashboard.css"

export default function RecentlyViewed() {
    return (
        <>

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

        </>
    );
}
