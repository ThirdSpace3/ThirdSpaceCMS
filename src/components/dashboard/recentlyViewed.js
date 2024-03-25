import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function RecentlyViewed() {

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
  
    if (!template) return <div>Loading...</div>; // Display loading state or nothing if no template is selected
  

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
