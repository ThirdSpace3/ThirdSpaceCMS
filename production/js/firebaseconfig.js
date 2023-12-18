  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
  import { getFirestore, collection, addDoc, updateDoc, doc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
  
  // Required for side-effects
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
// Firebase Initialization (Assuming firebaseConfig is already defined)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let savedDocId = null; // Variable to store the document ID
let isSecondSetSaved = false; // Flag to indicate if the second set is saved

// Function to toggle button selection
const toggleButtonSelection = (button) => {
    if (!isSecondSetSaved) { // Allow toggle only if second set is not saved
        button.classList.toggle('selected');
    }
};

// Add event listeners to buttons
const buttons = document.querySelectorAll('.selectable-button, .selectable-button-2');
buttons.forEach(button => {
    button.addEventListener('click', () => toggleButtonSelection(button));
});

// Function to get the state of each button
const getButtonStates = (selector) => {
    const states = {};
    const selectedButtons = document.querySelectorAll(selector);
    selectedButtons.forEach(button => {
        states[button.id] = button.classList.contains('selected');
    });
    return states;
};

// Combined function to handle submit button click
const handleSubmitButtonClick = async () => {
    if (!savedDocId) {
        // Save the initial button states
        await saveInitialButtonStates();
        displayEtape2(); // Move to the next step
    } else if (!isSecondSetSaved) {
        // Update the document with the second set of button states
        await updateButtonStatesInFirestore();
    } else {
        console.log("Both sets of buttons have already been saved.");
    }
};

// Function to save initial button states to Firestore
const saveInitialButtonStates = async () => {
    const buttonStates = getButtonStates('.selectable-button');

    try {
        const docRef = await addDoc(collection(db, "Etapes Buttons"), {
            firstSetButtons: buttonStates
        });
        console.log("Document written with ID: ", docRef.id);
        savedDocId = docRef.id; // Save the document ID
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

// Function to update the document with the second set of button states
const updateButtonStatesInFirestore = async () => {
    if (!savedDocId) {
        console.error("No document ID found. First set of buttons must be saved first.");
        return;
    }

    const buttonStates = getButtonStates('.selectable-button-2');

    try {
        await updateDoc(doc(db, "Etapes Buttons", savedDocId), {
            secondSetButtons: buttonStates
        });
        console.log("Document updated with second set of buttons");
        isSecondSetSaved = true; // Set the flag to true
        disableButtons(); // Disable all buttons
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};

