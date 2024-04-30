// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc , doc, setDoc } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHVhd30FIhlOPKoQSP6vZ2slkwtcLsRKU",
  authDomain: "third--space.firebaseapp.com",
  databaseURL: "https://third--space-default-rtdb.firebaseio.com",
  projectId: "third--space",
  storageBucket: "third--space.appspot.com",
  messagingSenderId: "99453910780",
  appId: "1:99453910780:web:bb6bebd9df84f81e7e6179",
  measurementId: "G-83NKPT3B9E"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);


export { db, doc, setDoc, updateDoc  };