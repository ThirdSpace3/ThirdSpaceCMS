import NavBar from "../components/website/NavBar";
import Footer from "../components/website/Footer";
import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from '../firebaseConfig'; // Assuming Firestore is correctly imported and configured

export default function Agency() {
    const [hasWalletData, setHasWalletData] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [hasStepData, setHasStepData] = useState(false); // State to track if stepData is available

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

    /> 
  <div className="agency-content">
  <h1 className="agency-title">3S Agency</h1>

  </div>
  
    <Footer />
  </>
);
}