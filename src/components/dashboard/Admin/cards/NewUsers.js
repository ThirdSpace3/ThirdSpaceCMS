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

    useEffect(() => {
        fetchNewUsers();
    }, [dateOption, preciseDate, startDate, endDate, userType]);

    const fetchNewUsers = async () => {
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
            const totalUsersCount = walletsData.length;

            setTotalUsers(totalUsersCount);
            setNewUsers(newUsersCount);
            setGrowthPercentage(calculateGrowthPercentage(newUsersCount, totalUsersCount));
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

    const calculateGrowthPercentage = (newUsersCount, totalUsersCount) => {
        if (totalUsersCount === 0) return 0;
        return ((newUsersCount / totalUsersCount) * 100).toFixed(2);
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
