import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, query, where, Timestamp } from '../../../../firebaseConfig';
import './WalletTypes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faAngleUp, faAngleDown, faEquals, faRocket } from '@fortawesome/free-solid-svg-icons';

const WalletTypes = ({ dateOption, preciseDate, startDate, endDate, userType }) => {
  const [walletCounts, setWalletCounts] = useState({
    solana: 0,
    metamask: 0,
    unstoppabledomains: 0
  });
  const [totalWalletCounts, setTotalWalletCounts] = useState({
    solana: 0,
    metamask: 0,
    unstoppabledomains: 0
  });
  const [growthPercentages, setGrowthPercentages] = useState({
    solana: 0,
    metamask: 0,
    unstoppabledomains: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const walletImages = {
    solana: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageDashboard%2FAdmin%2Fphantomprovider.png?alt=media&token=c2477ff5-11df-4477-bcb0-0af9d4a08eac',
    metamask: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageDashboard%2FAdmin%2Fmetamaskprovider.png?alt=media&token=facc3390-5d65-41e7-af89-91239fd149cc',
    unstoppabledomains: 'https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageDashboard%2FAdmin%2Funstoppableprovider.png?alt=media&token=3c87c0ae-e02d-4429-8b99-df765c7ba96c'
  };

  useEffect(() => {
    fetchWalletTypes();
    fetchTotalWalletTypes();
  }, [dateOption, preciseDate, startDate, endDate, userType]);

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
        others: 0
      };

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.walletType === 'Solana' || data.walletType === 'phantom') {
          counts.solana += 1;
        } else if (data.walletType === 'Ethereum' || data.walletType === 'metamask') {
          counts.metamask += 1;
        } else if (data.walletType === 'Unstoppable') {
          counts.unstoppabledomains += 1;
        } else {
          counts.others += 1;
        }
        console.log(counts.others)
      });

      setWalletCounts({
        solana: counts.solana,
        metamask: counts.metamask,
        unstoppabledomains: counts.unstoppabledomains
      });
      calculateGrowthPercentages(counts, totalWalletCounts);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching wallet types data:", error);
      setIsLoading(false);
    }
  };

  const fetchTotalWalletTypes = async () => {
    try {
      const walletsCollectionRef = collection(db, 'wallets');
      const querySnapshot = await getDocs(walletsCollectionRef);

      let counts = {
        solana: 0,
        metamask: 0,
        unstoppabledomains: 0,
        others: 0
      };

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.walletType === 'Solana' || data.walletType === 'phantom') {
          counts.solana += 1;
        } else if (data.walletType === 'Ethereum' || data.walletType === 'metamask') {
          counts.metamask += 1;
        } else if (data.walletType === 'Unstoppable') {
          counts.unstoppabledomains += 1;
        } else {
          counts.others += 1;
        }
      });

      setTotalWalletCounts({
        solana: counts.solana,
        metamask: counts.metamask,
        unstoppabledomains: counts.unstoppabledomains
      });
    } catch (error) {
      console.error("Error fetching total wallet types data:", error);
    }
  };

  const calculateGrowthPercentages = (currentCounts, totalCounts) => {
    const calculateGrowth = (current, total) => {
      if (total === 0) return 0;
      return ((current / total) * 100).toFixed(2);
    };

    const growth = {
      solana: calculateGrowth(currentCounts.solana, totalCounts.solana),
      metamask: calculateGrowth(currentCounts.metamask, totalCounts.metamask),
      unstoppabledomains: calculateGrowth(currentCounts.unstoppabledomains, totalCounts.unstoppabledomains)
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
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wallet-types-container">
      {['solana', 'metamask', 'unstoppabledomains'].map((walletType) => (
        <div className="wallet-box" key={walletType}>
          <div className="wallet-summary">
            <div className='wallettypes-summary-title'>
              <img src={walletImages[walletType]} alt={`${walletType} logo`} className='wallet-logo' />
            </div>
            <div className='wallet-summary-count'>
              <p className='wallet-count'>{walletCounts[walletType]}</p>
              <p className={`wallet-growth ${growthPercentages[walletType] >= 0 ? 'positive' : 'negative'}`}>
              {growthPercentages[walletType]}%<FontAwesomeIcon icon={getGrowthIcon(growthPercentages)} />
              </p>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletTypes;
