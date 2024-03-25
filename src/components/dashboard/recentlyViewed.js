import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function RecentlyViewed() {

    //#region Fetch template saved
    const [template, setTemplate] = useState(null); // Change to hold single template
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the selected template name from session storage
        const selectedTemplateName = sessionStorage.getItem('selectedTemplateName');

        if (selectedTemplateName) {
            fetch(`http://localhost:5000/api/templates/${selectedTemplateName}`) // Adjust the URL based on your server setup
                .then(response => response.json())
                .then(data => setTemplate(data)) // Now expecting data for a single template
                .catch(error => console.error("Failed to load the selected template:", error));
        }
    }, []);

    const handleProjectClick = (templateName) => {
        navigate(`/logiciel/${templateName}`);
    };
    //#endregion
    if (!template) {
        return (
            <div className="RecentlyViewed">

                <div className="recentlyviewed_element placeholder">

                    <div className="recentlyviewed_element_top">
                        <i>Time</i>
                        <p>Placeholder</p>
                    </div>
                    <img></img>
                    <div className="recentlyviewed_element_bottom">
                        <p>Template Name</p>
                        <i>Dots</i>
                    </div>

                </div>
                <div className="recentlyviewed_element placeholder">
                    <div className="recentlyviewed_element_top">
                        <i>Time</i>
                        <p>Placeholder</p>
                    </div>
                    <img></img>
                    <div className="recentlyviewed_element_bottom">
                        <p>Template Name</p>
                        <i>Dots</i>
                    </div>
                </div>




                {/* Duplique cette partie si tu as besion de plus de composant  */}

                <div className="recentlyviewed_element placeholder">
                    <div className="recentlyviewed_element_top">
                        <i>Time</i>
                        <p>Placeholder</p>
                    </div>
                    <img></img>
                    <div className="recentlyviewed_element_bottom">
                        <p>Template Name</p>
                        <i>Dots</i>
                    </div>
                </div>








            </div>
        );
    }


    //#region Return dynamique same class
    return (
        <>

            <div className="RecentlyViewed">
                <div className="recentlyviewed_element"
                    key={template.name}
                    onClick={() => handleProjectClick(template.name)}
                >
                    <div className="recentlyviewed_element_top">
                        <i>Time</i>
                        <p>Recently Viewed</p>
                    </div>
                    <iframe scrolling="no" src={`/template-preview/${template.name}`} title={`${template.name} Preview`} />
                    <div className="recentlyviewed_element_bottom">
                        <p>{template.name}</p>
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
//#endregion