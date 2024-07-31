import React, { useState, useEffect } from 'react';
import { setDoc, doc, db, getDoc } from "../../../firebaseConfig";
import {  useLocation } from "react-router-dom";

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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [preciseDate, setPreciseDate] = useState(new Date());
  const [dateOption, setDateOption] = useState('all');
  const [WalletText, setWalletText] = useState('');
  const [startDate2, setStartDate2] = useState(null);
  const [endDate2, setEndDate2] = useState(null);
  const [preciseDate2, setPreciseDate2] = useState(new Date());
  const [dateOption2, setDateOption2] = useState('all');
  const [userType2, setUserType2] = useState({ value: 'all', label: 'All' });
  const [usertypechoose, setusertypechoose] = useState('');
  const [userType, setUserType] = useState({ value: 'all', label: 'All' });
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const getWalletIdFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('walletId');
  };

  const walletId = getWalletIdFromQuery();

  const fetchProfile = async (walletId) => {
    try {
      const userDocRef = doc(db, "users", walletId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        setUsername(data.profile.username || "My Username");
      } else {
        await setDoc(userDocRef.profile, {
          username: walletId,
        });
        setUsername(walletId);
      }
    } catch (err) {
      console.error("Error fetching profile data from Firestore:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile(walletId);
  }, [walletId]);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isLoading]);

  const handleUserTypeChange = (selectedOption) => {
    setIsLoading(true);
    setUserType(selectedOption);
    setTimeout(() => setIsLoading(false), 1000); // Simulate data fetch delay
  };

  const handleUserTypeChange2 = (selectedOption) => {
    setIsLoading(true);
    setUserType2(selectedOption);
    setTimeout(() => setIsLoading(false), 1000); // Simulate data fetch delay
  };


  const handleDateChange = (newDateOption, newPreciseDate, newStartDate, newEndDate) => {
    setIsLoading(true);
    setDateOption(newDateOption);
    setPreciseDate(newPreciseDate);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setTimeout(() => setIsLoading(false), 1500); // Simulate data fetch delay
  };

  const handleDateChange2 = (newDateOption, newPreciseDate, newStartDate, newEndDate) => {
    setIsLoading(true);
    setDateOption2(newDateOption);
    setPreciseDate2(newPreciseDate);
    setStartDate2(newStartDate);
    setEndDate2(newEndDate);
    setTimeout(() => setIsLoading(false), 1500); // Simulate data fetch delay
  };


  useEffect(() => {
    if (userType.value === 'walletId' ) {
      setusertypechoose(' : Wallet');
    }  if (userType.value === 'email') {
      setusertypechoose(' : Email Users');
    }
     if (userType2.value === 'walletId') {
      setWalletText('Wallet');
    }
     if ( userType2.value === 'email') {
      setWalletText('Email Users');
    } 
  }, [userType2, userType]);
  return (
    <>
      {isLoading && <div className="loading-overlay">
        <div className="spinner-wrapper">
          <div className="spinner"></div>
          <img className='static-image' src='https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2FPopup%2F3s-logo-picto.png?alt=media&token=eccaecaa-e624-4bb4-a1ad-54f181d09510' alt='Loading' />
        </div>
      </div>}

      <div className='admin-dashboard'>
        <h1>Welcome back, {username}</h1>
        <div className='admin-dashboard-header'>
          <h2> Reports Overview {usertypechoose}</h2>
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
              onChange={handleDateChange}
            />
            <UserType value={userType} onChange={handleUserTypeChange} />
          </div>
        </div>
        <div className={`admin-dashboard-content ${isLoading ? 'loading' : ''}`}>
          <div className='admin-dashboard-card-container'>
            <Wallets dateOption={dateOption} preciseDate={preciseDate} startDate={startDate} endDate={endDate} userType={userType.value} />
            <NewUsers dateOption={dateOption} preciseDate={preciseDate} startDate={startDate} endDate={endDate} userType={userType.value} />
            <NewsletterSubscription dateOption={dateOption} preciseDate={preciseDate} startDate={startDate} endDate={endDate} userType={userType.value} />
            <SolutionSubscriptions dateOption={dateOption} preciseDate={preciseDate} startDate={startDate} endDate={endDate} userType={userType.value} />
            <Projects dateOption={dateOption} preciseDate={preciseDate} startDate={startDate} endDate={endDate} userType={userType.value} />
            <DeployedProjects dateOption={dateOption} preciseDate={preciseDate} startDate={startDate} endDate={endDate} userType={userType.value} />
          </div>
        </div>
        <div className='admin-dashboard-header'>
            <h2>{WalletText} Overview</h2>
          <div className="filter-container">
            <DateDropdown
              preciseDate={preciseDate2}
              setPreciseDate={setPreciseDate2}
              startDate={startDate2}
              setStartDate={setStartDate2}
              endDate={endDate2}
              setEndDate={setEndDate2}
              dateOption={dateOption2}
              setDateOption={setDateOption2}
              onChange={handleDateChange2}
            />
            <UserType value={userType2} onChange={handleUserTypeChange2} />
          </div>
        </div>
        <div className='admin-dashboard-content center'>
          <div className='admin-dashboard-card-container2'>
            <WalletTypes
              dateOption={dateOption2}
              preciseDate={preciseDate2}
              startDate={startDate2}
              endDate={endDate2}
              userType={userType2.value}
            />
          </div>
        </div>
        <img className='SSS-logo-admin-dashboard' src='https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2F3s-logo.png?alt=media&token=8a69bcce-2e9f-463e-8cba-f4c2fec1a904' alt='Logo' />
      </div>
    </>
  );
};

export default DashboardAdmin;
