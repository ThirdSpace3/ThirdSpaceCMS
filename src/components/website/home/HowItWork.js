import React, { useState, useEffect } from 'react';
import './HowItWork.css';
import '../../Root.css';
import PopupWallet from '../PopupWallet';
import { useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga';

function HowItWork({ checkWalletData }) {
  const [activeTab, setActiveTab] = useState('TabA');
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab('TabA');
  }, []);

  const openTab = (tabName) => {
    setActiveTab(tabName);
    setShowWalletPopup(false); // Reset showWalletPopup state
  };

  const userIsLoggedIn = () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn;
  };

  const toggleWalletPopup = () => {
    // Log the "Get Started" button click event to Google Analytics
    ReactGA.event({
      category: 'Button',
      action: 'Click',
      label: 'Get Started from How It Work',
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
    <section className="functionnement section">
      <p className="section-label">How It Work</p>
      <h2 className="section-title">Connect yourself and start propeling...</h2>

      <div className="functionnement-content">
        <div className="tab">
          <button className={`tablinks ${activeTab === 'TabA' ? 'active' : ''}`} onClick={() => openTab('TabA')}>01<span>. Connect your wallet</span></button>
          <button className={`tablinks ${activeTab === 'TabB' ? 'active' : ''}`} onClick={() => openTab('TabB')}>02<span>. Choose your solution</span></button>
          <button className={`tablinks ${activeTab === 'TabC' ? 'active' : ''}`} onClick={() => openTab('TabC')}>03<span>. Create & Deploy easily</span></button>
        </div>
        {activeTab === 'TabA' && (
          <div id="TabA" className="tabcontent">
            <div className="tabcontent-content">
              <div className="tabcontent-left">
                <h3>Create your account & Start imagining</h3>
                <p>Using and easy process, create an account with your wallets and start creating your own space.</p>
                <button className="purple-light-btn mobile-get-started" onClick={toggleWalletPopup}>Get Started</button>
              </div>
              <img src="./images/howitworkd-1.png" alt=""/>
            </div>
          </div>
        )}
        {activeTab === 'TabB' && (
          <div id="TabB" className="tabcontent">
            <div className="tabcontent-content">
              <div className="tabcontent-left">
                <h3>Choose your solution & Let the magic happen</h3>
                <p>Choose between our solutions what work best for you. Be accompanied at each step of the process.</p>
                <button className="purple-light-btn mobile-get-started" onClick={toggleWalletPopup}>Get Started</button>
              </div>
              <img src="./images/howitworkd-2.png" alt=""/>
            </div>
          </div>
        )}
        {activeTab === 'TabC' && (
          <div id="TabC" className="tabcontent">
            <div className="tabcontent-content">
              <div className="tabcontent-left">
                <h3>Design your website & Propel it</h3>
                <p>Now that your solution is defined, you can start to put your imagination and creativity to work to bring your new project to life.</p>
                <button className="purple-light-btn mobile-get-started" onClick={toggleWalletPopup}>Get Started</button>
              </div>
              <img src="./images/howitworkd-3.png" alt=""/>
            </div>
          </div>
        )}
      </div>
      {showWalletPopup && <PopupWallet onClose={toggleWalletPopup} onUserLogin={handleUserLogin} checkWalletData={checkWalletData} />}
    </section>
  );
}

export default HowItWork;
