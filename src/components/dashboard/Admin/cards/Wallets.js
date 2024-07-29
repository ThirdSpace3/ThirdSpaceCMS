import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, query, where } from '../../../../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faEquals, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import './Wallets.css';

const Wallets = ({ dateOption, preciseDate, startDate, endDate, userType }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalWallets, setTotalWallets] = useState(0);
  const [walletsInRange, setWalletsInRange] = useState(0);
  const [previousWalletsInRange, setPreviousWalletsInRange] = useState(0);
  const [growthPercentage, setGrowthPercentage] = useState(0);

  useEffect(() => {
    fetchWallets();
  }, [dateOption, preciseDate, startDate, endDate, userType]);

  const fetchWallets = async () => {
    setIsLoading(true);
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

      const walletsData = [];
      userDocs.forEach((doc) => {
        walletsData.push({ id: doc.id, ...doc.data() });
      });

      const totalWalletsCount = walletsData.length;
      const walletsInRangeCount = calculateWalletsInRange(walletsData);
      const previousWalletsInRangeCount = await calculatePreviousWalletsInRange(walletsData);

      setTotalWallets(totalWalletsCount);
      setWalletsInRange(walletsInRangeCount);
      setPreviousWalletsInRange(previousWalletsInRangeCount);
      setGrowthPercentage(calculateGrowthPercentage(walletsInRangeCount, previousWalletsInRangeCount));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching wallets data:", error);
      setIsLoading(false);
    }
  };

  const calculateWalletsInRange = (walletsData) => {
    if (dateOption === 'precise') {
      const preciseDateStart = new Date(preciseDate);
      preciseDateStart.setHours(0, 0, 0, 0);
      const preciseDateEnd = new Date(preciseDate);
      preciseDateEnd.setHours(23, 59, 59, 999);
      return walletsData.filter(wallet => {
        const walletDate = new Date(wallet.lastLogin);
        return walletDate >= preciseDateStart && walletDate <= preciseDateEnd;
      }).length;
    } else if (startDate && endDate) {
      return walletsData.filter(wallet => {
        const walletDate = new Date(wallet.lastLogin);
        return walletDate >= new Date(startDate) && walletDate <= new Date(endDate);
      }).length;
    }
    return walletsData.length;
  };

  const calculatePreviousWalletsInRange = async (walletsData) => {
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
    return ((( previousCount) / currentCount) * 100).toFixed(2);
  };

  const getGrowthClass = (growthPercentage) => {
    if (growthPercentage > 0) {
      return 'wallet-growth-positive';
    } else if (growthPercentage < 0) {
      return 'wallet-growth-negative';
    } else {
      return 'wallet-growth-null';
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
    <div className="wallets-container">
      <div className="wallets-box">
        <div className="wallets-summary">
          <p className='wallet-summary-title'><FontAwesomeIcon icon={faUserGroup} />Total Users </p>
          <div className='wallet-summary-count'>
            <p className='wallet-count'>{totalWallets}</p>
            <p className={`wallet-growth ${getGrowthClass(growthPercentage)}`}>
              {growthPercentage}% <FontAwesomeIcon icon={getGrowthIcon(growthPercentage)} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallets;
