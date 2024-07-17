// Header.js
import './Header.css';
import '../../Root.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga';

function Header({ checkWalletData }) {
  const navigate = useNavigate();

  const userIsLoggedIn = () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn;
  };

  const handleGetStartedClick = () => {
    if (!userIsLoggedIn()) {
      navigate('/login'); // Navigate to the login page
    } else {
      navigate('/dashboard'); // Navigate to the dashboard page
    }
  };

  return (
    <section className="header section">
      <div className="header__left">
        <p className='section-label'><img src='https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fsection-label-sparkle.png?alt=media&token=31fc9546-13f5-41a3-bc87-783242a39d4e'></img>BETA Version</p>
        <h1 className="header__title">Build Web 3 Projects Effortlessly with No-Code Tools</h1>
        <div className="">
          <a className="purple-btn ga-getstarted-btn-hero-hp" id='getstarted-btn' onClick={handleGetStartedClick}>Get Started</a>
        </div>
      </div>
      <div className="header__right">
        <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fhero-img.png?alt=media&token=8ae2a271-c649-4d1e-9e6d-ec40c468e74d" alt='third space builder web 3 no-code tools web3 platform'/>
      </div>
    </section>
  );
}

export default Header;
