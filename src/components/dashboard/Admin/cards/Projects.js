import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../../../../firebaseConfig'; // Adjust path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faAngleUp, faAngleDown, faEquals } from '@fortawesome/free-solid-svg-icons';
import './Projects.css';

const Projects = ({ dateOption, preciseDate, startDate, endDate }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [totalProjects, setTotalProjects] = useState(0);
    const [projectsInRange, setProjectsInRange] = useState(0);
    const [growthPercentage, setGrowthPercentage] = useState(0);

    useEffect(() => {
        fetchProjects();
    }, [dateOption, preciseDate, startDate, endDate]);

    const fetchProjects = async () => {
        try {
            const usersCollectionRef = collection(db, 'wallets');
            const userDocs = await getDocs(usersCollectionRef);

            const allProjects = [];
            for (const userDoc of userDocs.docs) {
                const userId = userDoc.id;
                const projectsCollectionRef = collection(db, `projects/${userId}/projectData`);
                const querySnapshot = await getDocs(projectsCollectionRef);

                querySnapshot.forEach((doc) => {
                    allProjects.push({ id: doc.id, ...doc.data() });
                });
            }

            const totalProjectsCount = allProjects.length;
            const projectsInRangeCount = calculateProjectsInRange(allProjects);

            setTotalProjects(totalProjectsCount);
            setProjectsInRange(projectsInRangeCount);
            setGrowthPercentage(calculateGrowthPercentage(totalProjectsCount, projectsInRangeCount));
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching projects data:", error);
            setIsLoading(false);
        }
    };

    const calculateProjectsInRange = (projectsData) => {
        const preciseDateStart = preciseDate ? new Date(preciseDate.setHours(0, 0, 0, 0)) : null;
        const preciseDateEnd = preciseDate ? new Date(preciseDate.setHours(23, 59, 59, 999)) : null;
        if (dateOption === 'precise' && preciseDateStart && preciseDateEnd) {
            return projectsData.filter(project => {
                const projectDate = new Date(project.createdAt);
                return projectDate >= preciseDateStart && projectDate <= preciseDateEnd;
            }).length;
        } else if (dateOption === 'range' && startDate && endDate) {
            return projectsData.filter(project => {
                const projectDate = new Date(project.createdAt);
                return projectDate >= startDate && projectDate <= endDate;
            }).length;
        }
        return projectsData.length;
    };

    const calculateGrowthPercentage = (totalProjects, projectsInRange) => {
        if (totalProjects === 0) return 0;
        return ((projectsInRange / totalProjects) * 100).toFixed(2);
    };

    const getGrowthClass = (growthPercentage) => {
        if (growthPercentage > 0) {
            return 'project-growth-positive';
        } else if (growthPercentage < 0) {
            return 'project-growth-negative';
        } else {
            return 'project-growth-null';
        }
    };

    const getGrowthIcon = (growthPercentage) => {
        if (growthPercentage > 0) {
            return faAngleUp;
        } else if (growthPercentage < 0) {
            return faAngleDown;
        } else {
            return faEquals;
        }
    };

    if (isLoading) {
        return <div>
            <div className="admin-projects-container">
                <div className="projects-box">
                    <div className="projects-summary">
                        <p className='projects-summary-title'> <FontAwesomeIcon icon={faFolder} /> Loading... </p>
                    </div>
                </div>
            </div>
        </div>;
    }

    return (
        <div className="admin-projects-container">
            <div className="projects-box">
                <div className="projects-summary">
                    <p className='projects-summary-title'> <FontAwesomeIcon icon={faFolder} /> Projects Created </p>
                    <div className='projects-summary-count'>
                        <p className='projects-count'>{projectsInRange}</p>
                        <p className={`project-growth ${getGrowthClass(growthPercentage)}`}>
                            {growthPercentage}% <FontAwesomeIcon icon={getGrowthIcon(growthPercentage)} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
