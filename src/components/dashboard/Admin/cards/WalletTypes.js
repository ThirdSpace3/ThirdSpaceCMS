import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, query, where, Timestamp } from '../../../../firebaseConfig';
import './WalletTypes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faEquals } from '@fortawesome/free-solid-svg-icons';

const WalletTypes = ({ dateOption, preciseDate, startDate, endDate, userType }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [walletCounts, setWalletCounts] = useState({
    solana: 0,
    metamask: 0,
    unstoppabledomains: 0,
    emailUsers: 0
  });
  const [previousWalletCounts, setPreviousWalletCounts] = useState({
    solana: 0,
    metamask: 0,
    unstoppabledomains: 0,
    emailUsers: 0
  });
  const [growthPercentages, setGrowthPercentages] = useState({
    solana: 0,
    metamask: 0,
    unstoppabledomains: 0,
    emailUsers: 0
  });

  const walletImages = {
    solana: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageDashboard%2FAdmin%2Fphantomprovider.png?alt=media&token=c2477ff5-11df-4477-bcb0-0af9d4a08eac',
    metamask: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageDashboard%2FAdmin%2Fmetamaskprovider.png?alt=media&token=facc3390-5d65-41e7-af89-91239fd149cc',
    unstoppabledomains: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageDashboard%2FAdmin%2Funstoppableprovider.png?alt=media&token=3c87c0ae-e02d-4429-8b99-df765c7ba96c'
  };

  useEffect(() => {
    fetchWalletData();
  }, [dateOption, preciseDate, startDate, endDate, userType]);

  const fetchWalletData = async () => {
    setIsLoading(true);
    const currentCounts = await fetchWalletTypes();
    const previousCounts = await fetchPreviousWalletTypes();
    calculateGrowthPercentages(currentCounts, previousCounts);
    setIsLoading(false);
  };

  const fetchWalletTypes = async () => {
    try {
      const walletsCollectionRef = collection(db, 'wallets');
      let q;

      const startDateObj = startDate ? Timestamp.fromDate(new Date(startDate)) : null;
      const endDateObj = endDate ? Timestamp.fromDate(new Date(endDate)) : null;
      const preciseDateObj = preciseDate ? Timestamp.fromDate(new Date(preciseDate)) : null;

      if (dateOption === 'range' && startDateObj && endDateObj) {
        q = query(walletsCollectionRef, where('lastLogin', '>=', startDateObj), where('lastLogin', '<=', endDateObj));
      } else if (dateOption === 'precise' && preciseDateObj) {
        q = query(walletsCollectionRef, where('lastLogin', '==', preciseDateObj));
      } else {
        q = walletsCollectionRef;
      }

      const querySnapshot = await getDocs(q);

      let counts = {
        solana: 0,
        metamask: 0,
        unstoppabledomains: 0,
        emailUsers: 0
      };

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.walletType === 'Solana' || data.walletType === 'phantom') {
          counts.solana += 1;
        } else if (data.walletType === 'Ethereum' || data.walletType === 'metamask') {
          counts.metamask += 1;
        } else if (data.walletType === 'Unstoppable') {
          counts.unstoppabledomains += 1;
        }
        if (data.email) {
          counts.emailUsers += 1;
        }
      });

      setWalletCounts(counts);
      return counts;
    } catch (error) {
      console.error("Error fetching wallet types data:", error);
      setIsLoading(false);
    }
  };

  const fetchPreviousWalletTypes = async () => {
    try {
      const walletsCollectionRef = collection(db, 'wallets');
      let q;

      let previousStartDate = startDate ? new Date(startDate) : null;
      let previousEndDate = endDate ? new Date(endDate) : null;

      switch (dateOption) {
        case 'today':
          if (previousStartDate && previousEndDate) {
            previousStartDate.setDate(previousStartDate.getDate() - 1);
            previousEndDate.setDate(previousEndDate.getDate() - 1);
          }
          break;
        case 'last7days':
          if (previousStartDate && previousEndDate) {
            previousStartDate.setDate(previousStartDate.getDate() - 7);
            previousEndDate.setDate(previousEndDate.getDate() - 7);
          }
          break;
        case 'last30days':
          if (previousStartDate && previousEndDate) {
            previousStartDate.setDate(previousStartDate.getDate() - 30);
            previousEndDate.setDate(previousEndDate.getDate() - 30);
          }
          break;
        case 'range':
        case 'lastYear':
          if (previousStartDate && previousEndDate) {
            previousStartDate.setFullYear(previousStartDate.getFullYear() - 1);
            previousEndDate.setFullYear(previousEndDate.getFullYear() - 1);
          }
          break;
        default:
          break;
      }

      const previousStartDateObj = previousStartDate ? Timestamp.fromDate(previousStartDate) : null;
      const previousEndDateObj = previousEndDate ? Timestamp.fromDate(previousEndDate) : null;

      if ((dateOption === 'range' || dateOption === 'lastYear') && previousStartDateObj && previousEndDateObj) {
        q = query(walletsCollectionRef, where('lastLogin', '>=', previousStartDateObj), where('lastLogin', '<=', previousEndDateObj));
      } else if (dateOption === 'precise' && preciseDate) {
        q = query(walletsCollectionRef, where('lastLogin', '==', preciseDate));
      } else {
        q = walletsCollectionRef;
      }

      const querySnapshot = await getDocs(q);

      let previousCounts = {
        solana: 0,
        metamask: 0,
        unstoppabledomains: 0,
        emailUsers: 0
      };

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.walletType === 'Solana' || data.walletType === 'phantom') {
          previousCounts.solana += 1;
        } else if (data.walletType === 'Ethereum' || data.walletType === 'metamask') {
          previousCounts.metamask += 1;
        } else if (data.walletType === 'Unstoppable') {
          previousCounts.unstoppabledomains += 1;
        }
        if (data.email) {
          previousCounts.emailUsers += 1;
        }
      });

      setPreviousWalletCounts(previousCounts);
      return previousCounts;
    } catch (error) {
      console.error("Error fetching previous wallet types data:", error);
    }
  };

  const calculateGrowthPercentages = (currentCounts, previousCounts) => {
    const calculateGrowth = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return (((current - previous) / previous) * 100).toFixed(2);
    };

    const growth = {
      solana: calculateGrowth(currentCounts.solana, previousCounts.solana),
      metamask: calculateGrowth(currentCounts.metamask, previousCounts.metamask),
      unstoppabledomains: calculateGrowth(currentCounts.unstoppabledomains, previousCounts.unstoppabledomains),
      emailUsers: calculateGrowth(currentCounts.emailUsers, previousCounts.emailUsers)
    };

    setGrowthPercentages(growth);
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

  const getGrowthClass = (growthPercentage) => {
    if (growthPercentage > 0) {
      return 'wallet-growth-positive';
    } else if (growthPercentage < 0) {
      return 'wallet-growth-negative';
    } else {
      return 'wallet-growth-null';
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wallet-types-container">
      {userType === 'email' ? (
        <div className="wallet-box">
          <div className="wallet-summary">
            <div className='wallettypes-summary-title'>
              <span className='wallet-logo'>Email Users</span>
            </div>
            <div className='wallet-summary-count'>
              <p className='wallet-count'>{walletCounts.emailUsers}</p>
              <p className={`wallet-growth ${getGrowthClass(growthPercentages.emailUsers)}`}>
                {growthPercentages.emailUsers}% <FontAwesomeIcon icon={getGrowthIcon(growthPercentages.emailUsers)} />
              </p>
            </div>
          </div>
        </div>
      ) : (
        ['solana', 'metamask', 'unstoppabledomains'].map((walletType) => (
          <div className="wallet-box" key={walletType}>
            <div className="wallet-summary">
              <div className='wallettypes-summary-title'>
                <img src={walletImages[walletType]} alt={`${walletType} logo`} className='wallet-logo' />
              </div>
              <div className='wallet-summary-count'>
                <p className='wallet-count'>{walletCounts[walletType]}</p>
                <p className={`wallet-growth ${getGrowthClass(growthPercentages[walletType])}`}>
                  {/* {growthPercentages[walletType]}% <FontAwesomeIcon icon={getGrowthIcon(growthPercentages[walletType])} /> */}
                  on do
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WalletTypes;
