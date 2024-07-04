import NavBar from "../components/website/NavBar"
import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from '../firebaseConfig'; // Assuming Firestore is correctly imported and configured
import Footer from "../components/website/Footer";

export default function NoPage() {
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
        const docRef = collection(db, 'projects', userAccount, 'projectData');
        const docSnap = await getDocs(docRef);
        if (!docSnap.empty) { // Check if the snapshot is not empty
          setHasWalletData(true);
          let userData = [];
          docSnap.forEach((doc) => {
            userData.push(doc.data());
          });
          console.log(userData);
          if (userData.length > 0) { // Check if userData is present
            setHasStepData(true);
          }
          // navigate("/dashboard"); // Redirect to dashboard if wallet data exists
        } else {
          setHasWalletData(false);
        }
        setAccounts([userAccount]);
      }
    };
    return (
        <>
<NavBar
        checkWalletData={checkWalletData}
        hasWalletData={hasWalletData}
        accounts={accounts}
        setAccounts={setAccounts}

      />                        <div className="comingsoon-container">
        <h1 className="section-title">Error 404: Not found</h1>
        <p>
          Sorry we could not find the page you were looking for!
        </p>
        <a href="/home" className="purple-btn">
          Go Back Home
        </a>
      </div>

      <Footer />

        </>
    )
}