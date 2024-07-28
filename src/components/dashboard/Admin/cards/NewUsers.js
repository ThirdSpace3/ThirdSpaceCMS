import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, query, where } from '../../../../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAngleUp, faAngleDown, faEquals } from '@fortawesome/free-solid-svg-icons';
import './NewUser.css';

const NewUsers = ({ dateOption, preciseDate, startDate, endDate, userType }) => {
    const [newUsers, setNewUsers] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [growthPercentage, setGrowthPercentage] = useState(0);

    useEffect(() => {
        fetchNewUsers();
    }, [dateOption, preciseDate, startDate, endDate, userType]);

    const fetchNewUsers = async () => {
        try {
            const usersCollectionRef = collection(db, 'users');
            const walletsCollectionRef = collection(db, 'wallets');
            let usersQuery = usersCollectionRef;
            let walletsQuery = walletsCollectionRef;

            if (userType === 'email') {
                usersQuery = query(usersCollectionRef, where('email', '!=', null));
                walletsQuery = query(walletsCollectionRef, where('email', '!=', null));
            } else if (userType === 'walletId') {
                usersQuery = query(usersCollectionRef, where('walletId', '!=', null));
                walletsQuery = query(walletsCollectionRef, where('walletId', '!=', null));
            }

            const [usersSnapshot, walletsSnapshot] = await Promise.all([
                getDocs(usersQuery),
                getDocs(walletsQuery)
            ]);

            const uniqueAccounts = new Set();
            const usersData = [];
            const walletsData = [];

            usersSnapshot.forEach((doc) => {
                const userAccount = doc.id;
                if (!uniqueAccounts.has(userAccount)) {
                    uniqueAccounts.add(userAccount);
                    usersData.push({ id: doc.id, ...doc.data() });
                }
            });

            walletsSnapshot.forEach((doc) => {
                const walletAccount = doc.id;
                if (!uniqueAccounts.has(walletAccount)) {
                    uniqueAccounts.add(walletAccount);
                    walletsData.push({ id: doc.id, ...doc.data() });
                }
            });

            const totalUsersCount = usersData.length + walletsData.length;
            const newUsersCount = calculateNewUsers(usersData, walletsData);
            const previousNewUsersCount = calculatePreviousNewUsers(usersData, walletsData);

            setNewUsers(newUsersCount);
            setGrowthPercentage(calculateGrowthPercentage(newUsersCount, previousNewUsersCount));
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching new users data:", error);
            setIsLoading(false);
        }
    };

    const calculateNewUsers = (usersData, walletsData) => {
        const uniqueNewUsers = new Set();
        if (dateOption === 'precise') {
            usersData.filter(user => new Date(user.createdAt).toDateString() === preciseDate.toDateString()).forEach(user => uniqueNewUsers.add(user.id));
            walletsData.filter(wallet => new Date(wallet.date).toDateString() === preciseDate.toDateString()).forEach(wallet => uniqueNewUsers.add(wallet.id));
        } else if (dateOption === 'all') {
            usersData.forEach(user => uniqueNewUsers.add(user.id));
            walletsData.forEach(wallet => uniqueNewUsers.add(wallet.id));
        } else {
            usersData.filter(user => new Date(user.createdAt) >= startDate && new Date(user.createdAt) <= endDate).forEach(user => uniqueNewUsers.add(user.id));
            walletsData.filter(wallet => new Date(wallet.date) >= startDate && new Date(wallet.date) <= endDate).forEach(wallet => uniqueNewUsers.add(wallet.id));
        }
        return uniqueNewUsers.size;
    };

    const calculatePreviousNewUsers = (usersData, walletsData) => {
        const uniquePreviousNewUsers = new Set();
        if (dateOption === 'all') {
            return 0;
        }

        const previousStartDate = new Date(startDate);
        const previousEndDate = new Date(endDate);

        switch (dateOption) {
            case 'today':
                previousStartDate.setDate(previousStartDate.getDate() - 1);
                previousEndDate.setDate(previousEndDate.getDate() - 1);
                break;
            case 'last7days':
                previousStartDate.setDate(previousStartDate.getDate() - 7);
                previousEndDate.setDate(previousEndDate.getDate() - 7);
                break;
            case 'last30days':
                previousStartDate.setDate(previousStartDate.getDate() - 30);
                previousEndDate.setDate(previousEndDate.getDate() - 30);
                break;
            case 'lastYear':
                previousStartDate.setFullYear(previousStartDate.getFullYear() - 1);
                previousEndDate.setFullYear(previousEndDate.getFullYear() - 1);
                break;
            default:
                return 0;
        }

        usersData.filter(user => new Date(user.createdAt) >= previousStartDate && new Date(user.createdAt) <= previousEndDate).forEach(user => uniquePreviousNewUsers.add(user.id));
        walletsData.filter(wallet => new Date(wallet.date) >= previousStartDate && new Date(wallet.date) <= previousEndDate).forEach(wallet => uniquePreviousNewUsers.add(wallet.id));

        return uniquePreviousNewUsers.size;
    };

    const calculateGrowthPercentage = (currentCount, previousCount) => {
        if (previousCount === 0) return currentCount === 0 ? 0 : 100;
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
