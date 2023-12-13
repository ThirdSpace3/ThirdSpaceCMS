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

// Function to disable all buttons
const disableButtons = () => {
    buttons.forEach(button => {
        button.disabled = true; // Disable the button
    });
};

// Function to display etape2
function displayEtape2() {
    const etape1 = document.getElementById("etape1");
    const etape2 = document.getElementById("etape2");

    etape1.style.display = "none";
    etape2.style.display = "block";
}

// Event listener for the submit button
document.getElementById("submit-button").addEventListener("click", handleSubmitButtonClick);

//#region Provider Phantom
function getProvider() {
    if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
            return provider;
        } else {
            console.error("Phantom wallet found, but it is not the right provider.");
        }
    } else {
        console.error("Phantom wallet not found. Please install it.");
    }
    return null;
}

// Sign in function
async function signIn() {
    const provider = getProvider();
    if (!provider) {
        console.error("No provider found.");
        return;
    }

    try {
        const message = `Your custom sign-in message`;
        const encodedMessage = new TextEncoder().encode(message);

        // Check if the 'signMessage' method is available
        if (typeof provider.signMessage !== "function") {
            console.error("signMessage method is not available on the provider.");
            return;
        }

        const signedMessage = await provider.signMessage(encodedMessage, "utf8");
        console.log("Signed Message:", signedMessage);
        // Handle the signed message here (e.g., send it to your server for verification)
    } catch (error) {
        console.error("Error in signing message:", error);
        // Handle errors (e.g., user refused to sign the message)
    }
}

// Add event listener to the Sign In button
document.getElementById("phantom").addEventListener("click", signIn);
