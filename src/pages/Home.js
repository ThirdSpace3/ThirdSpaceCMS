import NavBar from "../components/website/NavBar";
import Header from "../components/website/home/Header";
import Solutions from "../components/website/home/Solutions";
import HowItWork from "../components/website/home/HowItWork";
import Roadmap from "../components/website/home/Roadmap";
import GetInTouch from "../components/website/home/GetInTouch";
import Footer from "../components/website/Footer";
import ReportBugBTN from "../components/website/ReportBugBTN";
import React, { useState, useEffect } from "react";
import { db, collection, getDocs, doc, getDoc } from '../firebaseConfig'; // Assuming Firestore is correctly imported and configured

export default function Home() {
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
      <NavBar
        checkWalletData={checkWalletData}
        hasWalletData={hasWalletData}
        accounts={accounts}
        setAccounts={setAccounts}

      />
      <Header
        checkWalletData={checkWalletData}

      />
      <Solutions />
      <HowItWork
        checkWalletData={checkWalletData}
      />
      <Roadmap />
      <GetInTouch />
      <Footer />
      <ReportBugBTN />
    </>
  );
}
