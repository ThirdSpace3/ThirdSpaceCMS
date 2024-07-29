import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, doc, getDoc } from '../../../../firebaseConfig'; // Adjust path as necessary
import './DeployedProjects.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faAngleUp, faAngleDown, faEquals, faRocket } from '@fortawesome/free-solid-svg-icons';

const DeployedProjects = ({ dateOption, preciseDate, startDate, endDate }) => {
    const [deployedProjects, setDeployedProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalDeployedProjects, setTotalDeployedProjects] = useState(0);
    const [deployedProjectsInRange, setDeployedProjectsInRange] = useState(0);
    const [growthPercentage, setGrowthPercentage] = useState(0);

    useEffect(() => {
        fetchDeployedProjects();
    }, [dateOption, preciseDate, startDate, endDate]);

    const fetchDeployedProjects = async () => {
        try {
            const usersCollectionRef = collection(db, 'wallets');
            const userDocs = await getDocs(usersCollectionRef);

            const allDeployedProjects = [];
            for (const userDoc of userDocs.docs) {
                const userId = userDoc.id;
                const projectsCollectionRef = collection(db, `projects/${userId}/projectData`);
                const projectDocs = await getDocs(projectsCollectionRef);

                for (const projectDoc of projectDocs.docs) {
                    const projectId = projectDoc.id;
                    const contentDocRef = doc(db, `projects/${userId}/projectData/${projectId}`);
                    const contentDocSnap = await getDoc(contentDocRef);

                    if (contentDocSnap.exists()) {
                        const projectData = contentDocSnap.data();
                        if (projectData.timestamp) {
                            allDeployedProjects.push({ id: projectDoc.id, ...projectData });
                        }
                    }
                }
            }

            const totalDeployedProjectsCount = allDeployedProjects.length;
            const deployedProjectsInRangeCount = calculateDeployedProjectsInRange(allDeployedProjects);

            setDeployedProjects(allDeployedProjects);
            setTotalDeployedProjects(totalDeployedProjectsCount);
            setDeployedProjectsInRange(deployedProjectsInRangeCount);
            setGrowthPercentage(calculateGrowthPercentage(totalDeployedProjectsCount, deployedProjectsInRangeCount));
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching deployed projects data:", error);
            setIsLoading(false);
        }
    };

    const calculateDeployedProjectsInRange = (projectsData) => {
        if (dateOption === 'all') {
            return projectsData.length;
        }

        if (dateOption === 'precise') {
            return projectsData.filter(project => new Date(project.timestamp).toDateString() === preciseDate.toDateString()).length;
        } else {
            return projectsData.filter(project => {
                const projectDate = new Date(project.timestamp);
                return projectDate >= startDate && projectDate <= endDate;
            }).length;
        }
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
        return (
            <div className="deployed-projects-container">
                <div className="deployed-projects-box">
                    <div className="deployed-projects-summary">
                        <p className='deployed-projects-summary-title'> <FontAwesomeIcon icon={faRocket} /> Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="deployed-projects-container">
            <div className="deployed-projects-box">
                <div className="deployed-projects-summary">
                    <p className='deployed-projects-summary-title'> <FontAwesomeIcon icon={faRocket} /> Projects Deployed </p>
                    <div className='deployed-projects-summary-count'>
                        <p className='deployed-projects-count'>{deployedProjectsInRange}</p>
                        <p className={`new-users-growth ${getGrowthClass(growthPercentage)}`}>
                            {growthPercentage}% <FontAwesomeIcon icon={getGrowthIcon(growthPercentage)} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeployedProjects;
