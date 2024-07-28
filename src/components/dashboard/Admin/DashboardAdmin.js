import React, { useState, useEffect } from 'react';
import { setDoc, doc, db, getDoc } from "../../../firebaseConfig";
import Wallets from './cards/Wallets';
import Projects from './cards/Projects';
import './DashboardAdmin.css';
import DateDropdown from './DateDropdown';
import UserType from './UserType';
import NewUsers from './cards/NewUsers';
import NewsletterSubscription from './cards/NewsletterSubscription';
import DeployedProjects from './cards/DeployedProjects';
import SolutionSubscriptions from './cards/SolutionSubscriptions';
import WalletTypes from './cards/WalletTypes';

const DashboardAdmin = () => {
  const [username, setUsername] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [preciseDate, setPreciseDate] = useState(new Date());
  const [dateOption, setDateOption] = useState('range');
  const [userType, setUserType] = useState({ value: 'walletId', label: 'Wallet ID' });
  const walletId = localStorage.getItem("userAccount");

  const fetchProfile = async (walletId) => {
    try {
      console.log(walletId);
      const userDocRef = doc(db, "users", walletId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        setUsername(data.username || "My Username");
      } else {
        await setDoc(userDocRef, {
          username: walletId,
        });
        setUsername(walletId);
      }
    } catch (err) {
      console.error("Error fetching profile data from Firestore:", err);
    }
  };

  useEffect(() => {
    fetchProfile(walletId);
  }, [walletId]);

  const handleUserTypeChange = (selectedOption) => {
    setUserType(selectedOption);
  };

  return (
    <div className='admin-dashboard'>
      <h1>Welcome back, {username}</h1>
      <div className='admin-dashboard-header'>
        <h2>Reports Overview</h2>
        <div className="filter-container">
          <DateDropdown
            preciseDate={preciseDate}
            setPreciseDate={setPreciseDate}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            dateOption={dateOption}
            setDateOption={setDateOption}
          />
          <UserType value={userType} onChange={handleUserTypeChange} />
        </div>
      </div>
      <div className='admin-dashboard-content'>
        <div className='admin-dashboard-card'>
          <Wallets dateOption={dateOption} preciseDate={preciseDate} startDate={startDate} endDate={endDate} userType={userType.value} />
          <NewUsers dateOption={dateOption} preciseDate={preciseDate} startDate={startDate} endDate={endDate} userType={userType.value} />
          <NewsletterSubscription dateOption={dateOption} preciseDate={preciseDate} startDate={startDate} endDate={endDate} userType={userType.value} />
          <SolutionSubscriptions dateOption={dateOption} preciseDate={preciseDate} startDate={startDate} endDate={endDate} userType={userType.value} />

        </div>
        <div className='admin-dashboard-card'>
          <Projects dateOption={dateOption} preciseDate={preciseDate} startDate={startDate} endDate={endDate} userType={userType.value} />
          <DeployedProjects dateOption={dateOption} preciseDate={preciseDate} startDate={startDate} endDate={endDate} userType={userType.value} />
        </div>
      </div>

      <div className='admin-dashboard-header'>
        <h2>Wallet Overview</h2>
        <div className="filter-container">
          <DateDropdown
            preciseDate={preciseDate}
            setPreciseDate={setPreciseDate}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            dateOption={dateOption}
            setDateOption={setDateOption}
          />
          <UserType value={userType} onChange={handleUserTypeChange} />
        </div>
      </div>
      <div className='admin-dashboard-content center'>
        <div className='admin-dashboard-card'>
        <WalletTypes/>
        </div>        
      </div>
      <img className='SSS-logo-admin-dashboard' src='https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2F3s-logo.png?alt=media&token=8a69bcce-2e9f-463e-8cba-f4c2fec1a904'/>
    </div>
  );
};

export default DashboardAdmin;
