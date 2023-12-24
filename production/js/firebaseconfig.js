  
//#region FIREBASE CONFIG
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  // import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
  import { getFirestore, setDoc , doc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
//#endregion
//#region DOCUMENT ACTIONS

document.getElementById('submit-button').addEventListener('click', () => {
  const data = captureData(currentStep);
  saveData(currentStep, data); // This function now correctly handles the 5th step data

  currentStep++;
  if (currentStep <= 5) {
    showStep(currentStep);
  } else {
    // window.location.href = "index.html";
  }
});


document.getElementById('ignore-button').addEventListener('click', () => {
  if (currentStep === 3 && isSolutionSelected()) {
    // If in step 3 and a solution is selected, do not allow navigation
    console.log('Navigation is blocked because a solution is selected.');
  } else {
    currentStep++;
    if (currentStep <= 4) {
      showStep(currentStep);
    } else {
      window.location.href = "index.html";    
    }
  }
});

function isSolutionSelected() {
  // Check if any solution card is selected in step 3
  return document.querySelector('#etape3 .solutions-card.selected') !== null;
}

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

// Call updateSubmitButtonState after each interaction
document.querySelectorAll('.selectable-button, .selectable-button-2, .solutions-card').forEach(element => {
element.addEventListener('click', updateSubmitButtonState);
});

// If there's input in step 4, you might want to check its state as well:
document.querySelector('#etape4 input[type="text"]').addEventListener('input', updateSubmitButtonState);

// Initialize the first step
showStep(1);


//#endregion 
//#region FUNCIONS AND 


// Call updateSubmitButtonState when showing a new step
function showStep(stepNumber) {
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`etape${i}`).style.display = i === stepNumber ? 'flex' : 'none';
  }
  // Ensure the submit button is in the correct state for the new step
  updateSubmitButtonState();
}

async function saveData(step, data) {
  const walletId = sessionStorage.getItem("walletID"); // Retrieve the wallet ID
  const walletType = sessionStorage.getItem("walletType"); // Retrieve the wallet type
  const stepKey = `step${step}`; // Key for the step data
  const docRef = doc(db, 'userSessions', walletId); // Reference to the document
  const newData = {
    [stepKey]: data,
    timestamp: new Date().toISOString(),
  };

  try {
    // Save the data to Firebase under the correct step key
    await setDoc(docRef, newData, { merge: true });
    if(walletId && walletType) {
      await saveWalletId(walletId, walletType); // Save or update the wallet info
    }
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
      if (step === 5) {
        // Capture feedback text from the input field in step 5
        const feedbackText = document.querySelector('#etape5 input[type="text"]').value.trim();
        if (feedbackText) data.feedback = feedbackText;
      }
      return data;
    }
  document.getElementById('feedback-button').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default anchor action
  
    const data = captureData(5); // Assuming this captures the feedback
    await saveData(5, data); // Save the data for step 5
  
    // Redirect or perform other actions after saving data
    window.location.href = "index.html"; // Redirect to a thank you page or back to the home page
  });
  function updateSubmitButtonState() {
    const submitButton = document.getElementById('submit-button');
    const nextButton = document.getElementById('ignore-button');
  
    let isAnyOptionSelected = false;
  
    // Check for selected options based on the current step
    switch (currentStep) {
      case 1:
        isAnyOptionSelected = document.querySelectorAll('#etape1 .selectable-button.selected').length > 0;
        break;
      case 2:
        isAnyOptionSelected = document.querySelectorAll('#etape2 .selectable-button-2.selected').length > 0;
        break;
        case 3:
          isAnyOptionSelected = document.querySelector('#etape3 .solutions-card.selected') !== null;
          nextButton.disabled = !isAnyOptionSelected; 
          if(!isAnyOptionSelected){
            nextButton.classList.add("disabled");
            
            // Select the ignore button and add a 'disabled' class to it
            var ignoreBtn = document.getElementById('ignore-button');
            ignoreBtn.classList.add('disabled');
            
            // Optionally, directly remove hover styles by modifying the style property
            ignoreBtn.style.cursor = "not-allowed";
          }
          break;
      case 4:
        const projectName = document.querySelector('#etape4 input[type="text"]').value.trim();
        isAnyOptionSelected = projectName.length > 0;
        break;
      case 5: 
        const feedbackText = document.querySelector('#etape5 input[type="text"]').value.trim();
        isAnyOptionSelected = feedbackText.length > 0;
        // Hide the submit and ignore buttons on the final step
        submitButton.style.display = 'none';
        nextButton.style.display = 'none';
        break;
      // Add conditions for other steps if necessary
    }

    // Enable or disable the submit button based on the selection
    submitButton.disabled = !isAnyOptionSelected;
    if (isAnyOptionSelected) {
      submitButton.classList.remove('disabled');
      submitButton.disabled = false;
    } else {
      submitButton.classList.add('disabled');
      submitButton.disabled = true;
    }
  
    // If it's not the 5th step, ensure buttons are visible
    if (currentStep < 5) {
      submitButton.style.display = 'block'; // or 'inline-block' depending on your styling
      nextButton.style.display = currentStep === 4 ? 'none' : 'block'; // Hide the ignore button on the last input step
    }
  }

//#endregion
//#region EXPORT .
export async function saveWalletId(walletId, walletType) {
  try {
      // Define the document reference in the 'wallets' collection
      const docRef = doc(db, "wallets", walletId);

      // Set the document data with walletId and walletType
      await setDoc(docRef, { walletId: walletId, walletType: walletType });

      console.log(`${walletType} Wallet ID (${walletId}) saved successfully`);
  } catch (error) {
      console.error(`Error saving ${walletType} wallet ID (${walletId}):`, error);
  }
}
//#endregion