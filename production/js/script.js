//#region TOGGLE MENU
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const burgerIconSrc = 'img/navbar-burger.png';
    const closeIconSrc = 'img/navbar-close.png';
    const body = document.body;
  
    if (menu.classList.contains('menu-open')) {
      menu.classList.remove('menu-open');
      body.classList.remove('no-scroll');
      menuIcon.src = burgerIconSrc;
    } else {
      menu.classList.add('menu-open');
      body.classList.add('no-scroll');
      menuIcon.src = closeIconSrc;
    }
  }
  //#endregion
//#region POPUP WALLET

  function openPopup() {
    document.getElementById("popup").style.display = "block";
}


function closePopup() {
    document.getElementById("popup").style.display = "none";
}

document.querySelector('.popup .popup-more-btn').addEventListener('click', function(event) {
  event.preventDefault();

  // Sélectionnez seulement les boutons avec les classes '.wallet-btn' et '.wallet-more'
  var walletMoreButtons = document.querySelectorAll('.popup .wallet-btn.wallet-more');

  if (this.textContent === 'Show More') {
      // Si le texte est "Show More", changez-le en "Show Less" et retirez '.wallet-hide'
      walletMoreButtons.forEach(function(button) {
          button.classList.remove('wallet-hide');
      });
      this.textContent = 'Show Less';
  } else {
      // Si le texte est "Show Less", changez-le en "Show More" et ajoutez '.wallet-hide'
      walletMoreButtons.forEach(function(button) {
          button.classList.add('wallet-hide');
      });
      this.textContent = 'Show More';
  }
});


//#endregion

//#region CONNECT WALLET 

// Provider Phantom
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
async function signInwithphantom() {
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



async function signInWithMetaMask() {
  if (typeof window.ethereum === 'undefined') {
      console.error("MetaMask is not installed");
      return;
  }

  try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      const message = `Sign in with Ethereum to the app. Address: ${account}`;
      const signature = await ethereum.request({ 
          method: 'personal_sign', 
          params: [message, account] 
      });

      console.log("Signed Message:", signature);
      // Handle the signature here (e.g., send it to your server for verification)
  } catch (error) {
      console.error("Error in MetaMask sign-in:", error);
  }
}

async function signInWithOpera() {
  if (window.ethereum && window.ethereum.isOpera) {
      try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          const message = `Sign in with Opera to the app. Address: ${account}`;
          const signature = await window.ethereum.request({ 
              method: 'personal_sign', 
              params: [message, account] 
          });

          console.log("Signed Message:", signature);
          // Handle the signature here
      } catch (error) {
          console.error("Error in Opera sign-in:", error);
      }
  } else {
      console.error("Opera Wallet not detected");
  }
}

// Ledger integration is more complex due to its hardware nature
// This is a basic outline; refer to Ledger's documentation for complete integration
async function signInWithLedger() {
  const transport = await Transport.create();
  const eth = new Eth(transport);
  const path = "44'/60'/0'/0"; // Standard Ethereum HD path
  const account = await eth.getAddress(path);

  try {
      const message = `Sign in with Ledger to the app. Address: ${account.address}`;
      // Convert message to hex format for Ledger
      const hexMessage = Buffer.from(message).toString("hex");
      const signature = await eth.signPersonalMessage(path, hexMessage);

      console.log("Signed Message:", signature);
      // Handle the signature here
  } catch (error) {
      console.error("Error in Ledger sign-in:", error);
  }
}


// Add event listener to the metamask button
document.getElementById("metamask").addEventListener("click",signInWithMetaMask);
// Add event listener to the phantom button
document.getElementById("phantom").addEventListener("click", signInwithphantom);
// Add event listener to the coinbase button
document.getElementById("ledger").addEventListener("click", signInWithLedger);
// Add event listener to the walletcoin button
document.getElementById("operatouch").addEventListener("click", signInWithOpera);


//#endregion


// document.querySelectorAll('.selectable-button').forEach(function(button) {
//     button.addEventListener('click', function() {
//         this.classList.toggle('selected');
//         console.log(getSelectedButtons()); // Log the selected buttons
//     });
// });

// function getSelectedButtons() {
//     var selectedButtons = [];
//     var buttons = document.querySelectorAll('.selectable-button');

//     buttons.forEach(function(button) {
//         if (button.classList.contains('selected')) {
//             selectedButtons.push(button.id);
//         }
//     });

//     return selectedButtons;
// }

