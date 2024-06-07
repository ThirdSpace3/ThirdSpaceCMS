import React,{  useState, useEffect} from "react";
import "./ComingSoon.css";
import "../Root.css";
import Navbar from "./NavBar";
import { db, doc, getDoc } from '../../firebaseConfig'; // Assuming Firestore is correctly imported and configured

export default function GetStartedMobile() {
  const [hasStepData, setHasStepData] = useState(false); // State to track if stepData is available
  const [hasWalletData, setHasWalletData] = useState(false);
  const [accounts, setAccounts] = useState([]);
  console.log(accounts);
  // localStorage.clear();
  // sessionStorage.clear(); 
  // Clearing the entire session storage
  const checkWalletData = async () => {
    const userAccount = sessionStorage.getItem("userAccount");
    if (userAccount) {
      try {
        const docRef = doc(db, 'wallets', userAccount); // Correctly reference the document
        const docSnap = await getDoc(docRef); // Use getDoc to fetch the document snapshot
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.selectedButtons && Object.keys(data.selectedButtons).length > 0) {
            setHasWalletData(true);
            setHasStepData(true); // Assume step data availability correlates with wallet data
          } else {
            setHasWalletData(false);
            setHasStepData(false);
          }
        } else {
          setHasWalletData(false);
          setHasStepData(false);
        }
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        setHasWalletData(false);
        setHasStepData(false);
      }
      setAccounts([userAccount]); // Ensure user account is set
    }
  };
  
  useEffect(() => {
    console.log("Accounts:", accounts);
    console.log("Has Wallet Data:", hasWalletData);
  }, [accounts, hasWalletData]);
  
  return (
    <>
      <Navbar
        checkWalletData={checkWalletData}
        hasWalletData={hasWalletData}
        accounts={accounts}
        setAccounts={setAccounts}

      />

      <div className="comingsoon-container">
        <h1>Coming Soon</h1>
        <p>
        We are not yet available on mobile. We'll be here
          soon!
        </p>
        <a href="../" className="purple-btn">
          Go Back Home
        </a>
        <img src="https://firebasestorage.googleapis.com/v0/b/third--space.appspot.com/o/ImageWebSite%2Fheader-deco.png?alt=media&token=45950dca-a838-4d9f-875e-c3b08d228e44" className="comingsoon-bg" />
      </div>
    </>
  );
}
