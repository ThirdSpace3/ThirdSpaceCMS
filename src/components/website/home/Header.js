import './Header.css'
import '../../Root.css'
import React, { useState } from 'react';
import PopupWallet from '../PopupWallet';
import { useNavigate } from 'react-router-dom';

function Header({checkWalletData }) {
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const navigate = useNavigate();
  const userIsLoggedIn = () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn;
  };

  const toggleWalletPopup = () => {
    console.log(userIsLoggedIn);
    if (!userIsLoggedIn()) { // If user is not logged in
      setShowWalletPopup(!showWalletPopup); // Toggle wallet popup
    } else { // If user is logged in
      navigate('./templatestep'); // Navigate to './templatestep' route
    }
  };
  

  const handleUserLogin = (userAccount) => {
    // Handle user login here
    console.log('User logged in:', userAccount);
  };
  return (
    <>

      <section className="header section">
        <div className="header__left">
          <h1 className="header__title">Web3's Easiest Builder. Dive in Code-Free.</h1>
          <p className="section__text">We, at Third Space, will co-construct the project with you! We want to give everyone the opportunity to boost their business on Web 3.</p>
          <div className="header__cta">
            <a className="purple-btn" id="getstarted-btn" onClick={toggleWalletPopup}>Get Started</a>
            <a href="https://discord.gg/dked3DEngT" className="purple-light-btn" target='_blank'>
              <img src="./images/logo-discord-1.png" alt="" className="cta-icon" />Join the community
            </a>
          </div>
        </div>
        <div className="header__right" >
        <img src="./images/header-img.png" alt=""/>

        </div>
        {/* <img src="./images/header-deco.png" alt="" className="header-deco" /> */}

      </section>
      {showWalletPopup && <PopupWallet onClose={toggleWalletPopup} onUserLogin={handleUserLogin} checkWalletData ={checkWalletData}/>}

    </>
    
  );
}

export default Header;
