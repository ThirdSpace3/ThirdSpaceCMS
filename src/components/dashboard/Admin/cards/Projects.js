import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, query, where } from '../../../../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faAngleUp, faAngleDown, faEquals } from '@fortawesome/free-solid-svg-icons';
import './Projects.css';

const Projects = ({ dateOption, preciseDate, startDate, endDate, userType }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [totalProjects, setTotalProjects] = useState(0);
    const [projectsInRange, setProjectsInRange] = useState(0);
    const [growthPercentage, setGrowthPercentage] = useState(0);

    useEffect(() => {
        fetchProjects();
    }, [dateOption, preciseDate, startDate, endDate, userType]);

    const fetchProjects = async () => {
        setIsLoading(true); // Ensure loading state is updated here
        try {
            const walletsCollectionRef = collection(db, 'wallets');
            let walletsQuery = walletsCollectionRef;

            // Apply user type filter
            if (userType === 'email') {
                walletsQuery = query(walletsCollectionRef, where('email', '!=', null));
            } else if (userType === 'walletId') {
                walletsQuery = query(walletsCollectionRef, where('walletId', '!=', null));
            }

            const userDocs = await getDocs(walletsQuery);

            const allProjects = [];
            for (const userDoc of userDocs.docs) {
                const userId = userDoc.id;
                const projectsCollectionRef = collection(db, `projects/${userId}/projectData/`);
                const querySnapshot = await getDocs(projectsCollectionRef);

                querySnapshot.forEach((doc) => {
                    allProjects.push({ id: doc.id, ...doc.data() });
                });
            }

            const totalProjectsCount = allProjects.length;
            const projectsInRangeCount = calculateProjectsInRange(allProjects);
            const previousProjectsInRangeCount = await calculatePreviousProjectsInRange(allProjects);

            setTotalProjects(totalProjectsCount);
            setProjectsInRange(projectsInRangeCount);
            setGrowthPercentage(calculateGrowthPercentage(projectsInRangeCount, previousProjectsInRangeCount));
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching projects data:", error);
            setIsLoading(false);
        }
    };

    const calculateProjectsInRange = (projectsData) => {
        if (dateOption === 'precise' && preciseDate) {
            const preciseDateStart = new Date(preciseDate);
            preciseDateStart.setHours(0, 0, 0, 0);
            const preciseDateEnd = new Date(preciseDate);
            preciseDateEnd.setHours(23, 59, 59, 999);
            return projectsData.filter(project => {
                const projectDate = new Date(project.createdAt);
                return projectDate >= preciseDateStart && projectDate <= preciseDateEnd;
            }).length;
        } else if (startDate && endDate) {
            return projectsData.filter(project => {
                const projectDate = new Date(project.createdAt);
                return projectDate >= new Date(startDate) && projectDate <= new Date(endDate);
            }).length;
        }
        return projectsData.length;
    };

    const calculatePreviousProjectsInRange = async (projectsData) => {
        if (dateOption === 'all') {
            return 0;
        }

        let previousStartDate = new Date(startDate);
        let previousEndDate = new Date(endDate);

        switch (dateOption) {
            case 'today':
                previousStartDate.setDate(startDate.getDate() - 1);
                previousEndDate.setDate(endDate.getDate() - 1);
                break;
            case 'last7days':
                previousStartDate.setDate(startDate.getDate() - 7);
                previousEndDate.setDate(endDate.getDate() - 7);
                break;
            case 'last30days':
                previousStartDate.setDate(startDate.getDate() - 30);
                previousEndDate.setDate(endDate.getDate() - 30);
                break;
            case 'range':
            case 'lastYear':
                previousStartDate.setFullYear(startDate.getFullYear() - 1);
                previousEndDate.setFullYear(endDate.getFullYear() - 1);
                break;
            default:
                return 0;
        }

        return projectsData.filter(project => {
            const projectDate = new Date(project.createdAt);
            return projectDate >= previousStartDate && projectDate <= previousEndDate;
        }).length;
    };

    const calculateGrowthPercentage = (currentCount, previousCount) => {
        if (previousCount === 0) return currentCount > 0 ? 100 : 0;
        return (((currentCount - previousCount) / previousCount) * 100).toFixed(2);
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
            <div className="admin-projects-container">
                <div className="projects-box">
                    <div className="projects-summary">
                        <p className='projects-summary-title'><FontAwesomeIcon icon={faFolder} /> Loading... </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-projects-container">
            <div className="projects-box">
                <div className="projects-summary">
                    <p className='projects-summary-title'> <FontAwesomeIcon icon={faFolder} /> Projects Created </p>
                    <div className='projects-summary-count'>
                        <p className='projects-count'>{projectsInRange} </p>
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
