import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"
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
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase(app);

  document.addEventListener('DOMContentLoaded', () => {
    // Event listener for the first set of buttons
    document.querySelectorAll('.selectable-button').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('selected');
        });
    });

    // Event listener for the second set of buttons
    document.querySelectorAll('.selectable-button-2').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('selected');
        });
    });
});

// Function to get the IDs of selected buttons
function getSelectedButtons() {
    return Array.from(document.querySelectorAll('.selectable-button.selected'))
                .map(button => button.id);
}

// Function to save selected button IDs to Firebase
function saveSelectedButtonsToFirebase(selectedButtons) {
    const dbRef = ref(database, 'selectedButtons');
    set(dbRef, selectedButtons)
        .then(() => console.log('Data saved successfully'))
        .catch(error => console.error('Error saving data:', error));
}

// Event listener for the submit button
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('submit-button').addEventListener('click', () => {
      const selectedButtons = getSelectedButtons();
      saveSelectedButtonsToFirebase(selectedButtons);
      const step1 = document.getElementById("etape1");
      const step2 = document.getElementById("etape2");
      step1.style.display = "none";
      step2.style.display = "block";
  });
});