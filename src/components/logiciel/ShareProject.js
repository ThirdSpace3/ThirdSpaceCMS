import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProjects, fetchAllTemplateData } from '../../hooks/Fetchprojects';

const ShareProject = () => {
  const { projectName } = useParams();
  const [project, setProject] = useState(null);
  const [templateContent, setTemplateContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const walletId = localStorage.getItem("userAccount");

  console.log('Wallet ID:', walletId);
  console.log('Project Name:', projectName);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projects = await fetchProjects(walletId);
        console.log('Projects:', projects);

        // Ensure that the projectName matches the 'id' field in the fetched projects
        const selectedProject = projectName;
        console.log('Selected Project:', selectedProject);

        if (selectedProject) {
          setProject(selectedProject);

          // Fetch all template content based on selected project ID
          const allTemplateData = await fetchAllTemplateData(walletId, selectedProject);
          console.log('All Template Data:', allTemplateData);

          if (allTemplateData) {
            setTemplateContent(allTemplateData);
          } else {
            console.error(`Template data not found for project ID '${selectedProject.id}'.`);
          }
        } else {
          console.error(`Project '${projectName}' not found.`);
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      } finally {
        setLoading(false); // Update loading state regardless of success or failure
      }
    };

    fetchProjectDetails();
  }, [projectName, walletId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project || !templateContent) {
    return <div>Error: Project or template data not found.</div>;
  }

  return (
    <div>
      <h1>Shared Project: {project.name}</h1>
      <p>Project ID: {project}</p>
      {/* Render template content here */}
      <div>
        {/* Example: Display template content */}
        <h2>Template Content</h2>
        <pre>{JSON.stringify(templateContent, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ShareProject;
