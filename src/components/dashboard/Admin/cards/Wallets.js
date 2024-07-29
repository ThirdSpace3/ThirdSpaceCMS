import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, query, where } from '../../../../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faEquals, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import './Wallets.css';

const Wallets = ({ dateOption, preciseDate, startDate, endDate, userType }) => {
  const [wallets, setWallets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalWallets, setTotalWallets] = useState(0);
  const [walletsInRange, setWalletsInRange] = useState(0);
  const [growthPercentage, setGrowthPercentage] = useState(0);

  useEffect(() => {
    fetchWallets();
  }, [dateOption, preciseDate, startDate, endDate, userType]);

  const fetchWallets = async () => {
    try {
      const walletsCollectionRef = collection(db, 'wallets');
      let q = walletsCollectionRef;

      if (userType === 'email') {
        q = query(walletsCollectionRef, where('email', '!=', null));
      } else if (userType === 'walletId') {
        q = query(walletsCollectionRef, where('walletId', '!=', null));
      }

      const querySnapshot = await getDocs(q);
      const walletsData = [];
      querySnapshot.forEach((doc) => {
        walletsData.push({ id: doc.id, ...doc.data() });
      });

      const totalWalletsCount = walletsData.length;
      const walletsInRangeCount = calculateWalletsInRange(walletsData);
      const previousWalletsInRangeCount = await calculatePreviousWalletsInRange(walletsData);

      setWallets(walletsData);
      setTotalWallets(totalWalletsCount);
      setWalletsInRange(walletsInRangeCount);
      setGrowthPercentage(calculateGrowthPercentage(walletsInRangeCount, totalWalletsCount));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching wallets data:", error);
      setIsLoading(false);
    }
  };

  const calculateWalletsInRange = (walletsData) => {
    if (dateOption === 'precise') {
      return walletsData.filter(wallet => new Date(wallet.lastLogin).toDateString() === preciseDate.toDateString()).length;
    } else if (dateOption === 'all') {
      return walletsData.length;
    } else {
      return walletsData.filter(wallet => new Date(wallet.lastLogin) >= startDate && new Date(wallet.lastLogin) <= endDate).length;
    }
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
      case 'lastYear':
      case 'range':
        previousStartDate.setFullYear(startDate.getFullYear() - 1);
        previousEndDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        return 0;
    }

    const previousQuery = query(collection(db, 'wallets'), where('lastLogin', '>=', previousStartDate), where('lastLogin', '<=', previousEndDate));
    const previousSnapshot = await getDocs(previousQuery);
    return previousSnapshot.size;
  };

  const calculateGrowthPercentage = (walletsInRangeCount, totalWalletsCount) => {
    if (totalWalletsCount === 0) return 0;
    return ((walletsInRangeCount / totalWalletsCount) * 100).toFixed(2);
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
            <p className='wallet-count'>{walletsInRange} / {totalWallets}</p>
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
