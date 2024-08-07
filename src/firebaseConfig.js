import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp, updateDoc , doc, setDoc, where, getDocs, getDoc, collection, query, deleteDoc, addDoc } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

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

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);
const storage = getStorage(firebaseApp);

export {analytics, db, storage,listAll, serverTimestamp, addDoc, doc, setDoc, updateDoc, where, getDocs, collection, query, getDoc, deleteDoc, getStorage, ref, uploadBytes, getDownloadURL };
