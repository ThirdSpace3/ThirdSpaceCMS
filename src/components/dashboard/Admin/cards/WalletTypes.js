import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../../../../firebaseConfig';
import './WalletTypes.css';

const WalletTypes = () => {
  const [walletCounts, setWalletCounts] = useState({
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
  }, []);

  const fetchWalletTypes = async () => {
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

      setWalletCounts({
        solana: counts.solana,
        metamask: counts.metamask,
        unstoppabledomains: counts.unstoppabledomains
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching wallet types data:", error);
      setIsLoading(false);
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
            <div className='wallet-summary-title'>
              <img src={walletImages[walletType]} alt={`${walletType} logo`} className='wallet-logo' />
            </div>
            <div className='wallet-summary-count'>
              <p className='wallet-count'>{walletCounts[walletType]}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletTypes;
