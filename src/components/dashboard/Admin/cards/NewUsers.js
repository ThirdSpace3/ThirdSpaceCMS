import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, query, where } from '../../../../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAngleUp, faAngleDown, faEquals } from '@fortawesome/free-solid-svg-icons';
import './NewUser.css';

const NewUsers = ({ dateOption, preciseDate, startDate, endDate, userType }) => {
    const [newUsers, setNewUsers] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [growthPercentage, setGrowthPercentage] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [previousNewUsers, setPreviousNewUsers] = useState(0);

    useEffect(() => {
        fetchNewUsers();
    }, [dateOption, preciseDate, startDate, endDate, userType]);

    const fetchNewUsers = async () => {
        setIsLoading(true);
        try {
            const walletsCollectionRef = collection(db, 'wallets');
            let walletsQuery = walletsCollectionRef;

            if (userType === 'email') {
                walletsQuery = query(walletsCollectionRef, where('email', '!=', null));
            } else if (userType === 'walletId') {
                walletsQuery = query(walletsCollectionRef, where('walletId', '!=', null));
            }

            const walletsSnapshot = await getDocs(walletsQuery);
            const walletsData = [];
            walletsSnapshot.forEach((doc) => {
                walletsData.push({ id: doc.id, ...doc.data() });
            });

            const newUsersCount = calculateNewUsers(walletsData);
            const previousNewUsersCount = await calculatePreviousNewUsers(walletsData);
            const totalUsersCount = walletsData.length;

            setTotalUsers(totalUsersCount);
            setNewUsers(newUsersCount);
            setPreviousNewUsers(previousNewUsersCount);
            setGrowthPercentage(calculateGrowthPercentage(newUsersCount, previousNewUsersCount));
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching new users data:", error);
            setIsLoading(false);
        }
    };

    const calculateNewUsers = (walletsData) => {
        const uniqueNewUsers = new Set();
        if (dateOption === 'precise') {
            walletsData.filter(wallet => new Date(wallet.lastLogin).toDateString() === preciseDate.toDateString()).forEach(wallet => uniqueNewUsers.add(wallet.id));
        } else if (dateOption === 'all') {
            walletsData.forEach(wallet => uniqueNewUsers.add(wallet.id));
        } else {
            walletsData.filter(wallet => new Date(wallet.lastLogin) >= startDate && new Date(wallet.lastLogin) <= endDate).forEach(wallet => uniqueNewUsers.add(wallet.id));
        }
        return uniqueNewUsers.size;
    };

    const calculatePreviousNewUsers = async (walletsData) => {
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

        return walletsData.filter(wallet => {
            const walletDate = new Date(wallet.lastLogin);
            return walletDate >= previousStartDate && walletDate <= previousEndDate;
        }).length;
    };

    const calculateGrowthPercentage = (currentCount, previousCount) => {
        if (previousCount === 0) return currentCount > 0 ? 100 : 0;
        return (((currentCount - previousCount) / previousCount) * 100).toFixed(2);
    };

    const getGrowthClass = (growthPercentage) => {
        if (growthPercentage > 0) {
            return 'new-users-growth-positive';
        } else if (growthPercentage < 0) {
            return 'new-users-growth-negative';
        } else {
            return 'new-users-growth-null';
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
        return <div>Loading...</div>;
    }

    return (
        <div className="new-users-container">
            <div className="new-users-box">
                <div className="new-users-summary">
                    <p className='new-users-summary-title'> <FontAwesomeIcon icon={faUser} /> New Users</p>
                    <div className='new-users-summary-count'>
                        <p className='new-users-count'>{newUsers}</p>
                        <p className={`new-users-growth ${getGrowthClass(growthPercentage)}`}>
                            {growthPercentage}% <FontAwesomeIcon icon={getGrowthIcon(growthPercentage)} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewUsers;
