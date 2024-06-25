// Header.js
import './Header.css';
import '../../Root.css';
import React, { useState } from 'react';
import PopupWallet from '../PopupWallet';
import { useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga';

function Header({ checkWalletData }) {
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const navigate = useNavigate();

  const userIsLoggedIn = () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn;
  };

  const toggleWalletPopup = () => {
    // Log the "Get Started" button click event to Google Analytics
    ReactGA.event({
      category: 'Button',
      action: 'Click',
      label: 'Get Started',
    });

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
        <p className='section-label'><img src='https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fsection-label-sparkle.png?alt=media&token=31fc9546-13f5-41a3-bc87-783242a39d4e'></img>BETA Version</p>
          <h1 className="header__title">Build Web 3 Projects Effortlessly with No-Code Tools</h1>
          <div className="">
            <a className="purple-btn" id="getstarted-btn" onClick={toggleWalletPopup}>Get Started</a>
          </div>
        </div>
        <div className="header__right">
          <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fhero-img.png?alt=media&token=8ae2a271-c649-4d1e-9e6d-ec40c468e74d" alt=""/>
        </div>
      </section>
      {showWalletPopup && <PopupWallet onClose={toggleWalletPopup} onUserLogin={handleUserLogin} checkWalletData={checkWalletData} />}
    </>
  );
}

export default Header;
