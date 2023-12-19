  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
  import { getFirestore, collection, addDoc, setDoc ,updateDoc, doc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

let currentStep = 1;
const sessionId = Date.now().toString(); // Simple example, consider using a more robust method for production

function showStep(stepNumber) {
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`etape${i}`).style.display = i === stepNumber ? 'block' : 'none';
  }
}

async function saveData(step, data) {
    const stepKey = `step${step}`; // Key for the step data
    const docRef = doc(db, 'userSessions', sessionId); // Reference to the document
    const timestamp = new Date(); // Get the current timestamp
    const newData = {
      [stepKey]: data,
      timestamp: timestamp.toISOString(), // Convert the timestamp to ISO string format
    };
    try {
        await setDoc(docRef, newData, { merge: true }); // Merge new data with existing document
      console.log("Document updated with ID: ", sessionId);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }


function captureData(step) {
    let data = {};
    if (step === 1) {
      // Capture selected options from buttons
      const selectedOptions = [];
      document.querySelectorAll('#etape1 .selectable-button.selected').forEach(button => {
        selectedOptions.push(button.id);
      });
      data.selectedOptions = selectedOptions;
  
      // Capture text from the input field
      const inputText = document.querySelector('#etape1 input[type="text"]').value;
      if (inputText) data.customOption = inputText;
    }
    if (step === 2) {
        const selectedObjectives = [];
        document.querySelectorAll('#etape2 .selectable-button-2.selected').forEach(button => {
          selectedObjectives.push(button.id);
        });
        data.selectedObjectives = selectedObjectives;
    
        // Capture text from the input field in step 2
        const inputText = document.querySelector('#etape2 input[type="text"]').value;
        if (inputText) data.customObjective = inputText;
    }

    if (step === 3) {
        // Capture selected solution card
        const selectedCard = document.querySelector('#etape3 .solutions-card.selected');
        data.selectedSolution = selectedCard ? selectedCard.id : null;
      } 
    if (step === 4) {
        // Capture project name from input field
        const projectName = document.querySelector('#etape4 input[type="text"]').value;
        data.projectName = projectName;
      }
    // Add logic for other steps if needed
    return data;
  }
    

document.getElementById('submit-button').addEventListener('click', () => {
    const data = captureData(currentStep);
    saveData(currentStep, data);
  
    currentStep++;
    if (currentStep <= 4) {
      showStep(currentStep);
    } else {
        window.location.href = "index.html";    
    }
});

document.querySelectorAll('.selectable-button').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('selected'); // 'selected' is a class that indicates the button is selected
      updateSubmitButtonState();
    });
  });

document.querySelectorAll('#etape2 .selectable-button-2').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('selected');
    });
  });
  

document.querySelectorAll('#etape3 .solutions-card').forEach(card => {
    card.addEventListener('click', () => {
      // Deselect other cards
      document.querySelectorAll('#etape3 .solutions-card').forEach(otherCard => {
        otherCard.classList.remove('selected');
      });
      // Select this card
      card.classList.add('selected');
    });
  });
  

showStep(1);

function updateSubmitButtonState() {
  const submitButton = document.getElementById('submit-button');
  const isAnyOptionSelected = document.querySelectorAll('#etape1 .selectable-button.selected').length > 0;

  if (isAnyOptionSelected) {
    submitButton.disabled = false;
    submitButton.classList.remove('disabled'); // Remove the 'disabled' class when the button is enabled
    submitButton.classList.remove('purple-light-btn');
    submitButton.classList.add('purple-btn');

  } else {
    submitButton.disabled = true;
    submitButton.classList.add('disabled'); // Add the 'disabled' class when the button is disabled
    submitButton.classList.add('purple-light-btn');
    submitButton.classList.remove('purple-btn');
  }
}


export async function saveWalletId(walletId) {
    try {
        // Define the document reference (e.g., users collection, document named after wallet ID)
        const docRef = doc(db, "users", walletId);

        // Set the document data
        await setDoc(docRef, { walletId: walletId });

        console.log("Wallet ID saved successfully");
    } catch (error) {
        console.error("Error saving wallet ID:", error);
    }
}
