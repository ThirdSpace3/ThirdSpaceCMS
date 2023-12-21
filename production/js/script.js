//#region TOGGLE MENU
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const navbar = document.querySelector('nav'); // ou tout autre sélecteur pour votre navbar
    const burgerIconSrc = 'img/navbar-burger.png';
    const closeIconSrc = 'img/navbar-close.png';
    const body = document.body;

    if (menu.classList.contains('menu-open')) {
        menu.classList.remove('menu-open');
        body.classList.remove('no-scroll');
        menuIcon.src = burgerIconSrc;

        // Restaurer la couleur d'origine si la page n'a pas été défilée
        if (window.scrollY === 0) {
            navbar.style.backgroundColor = ""; // ou votre couleur d'origine
        }
    } else {
        menu.classList.add('menu-open');
        body.classList.add('no-scroll');
        menuIcon.src = closeIconSrc;

        // Changer la couleur de fond si la page n'a pas été défilée
        if (window.scrollY === 0) {
            navbar.style.backgroundColor = "#131313";
        }
    }
}

  //#endregion

//#region POPUP WALLET

function openPopup() {

    const menuIcon = document.getElementById('menuIcon');
    const burgerIconSrc = 'img/navbar-burger.png';

    const menu = document.getElementById('mobileMenu');
    document.getElementById("popup").style.display = "block";
    
    if (menu.classList.contains('menu-open')) {
        menu.classList.remove('menu-open');
        document.body.classList.remove('no-scroll');
        menuIcon.src = burgerIconSrc;

        // You can optionally change the menu icon here if needed
    }
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    menu.classList.remove('menu-open');
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
    console.log("Phantom sign-in triggered");

    try {
        // Check if the wallet is connected
        if (!provider.isConnected) {
            // Connect the wallet if not already connected
            await provider.connect();
        }
  
        const message = `Your custom sign-in message`;
        const encodedMessage = new TextEncoder().encode(message);
  
        if (typeof provider.signMessage !== "function") {
            console.error("signMessage method is not available on the provider.");
            return;
        }
  
        const signedMessage = await provider.signMessage(encodedMessage, "utf8");
        console.log("Signed Message:", signedMessage);
  
        // Now retrieve the wallet ID and log it to the console
        if (provider.publicKey) {
            const walletId = provider.publicKey.toString();

            sessionStorage.setItem("walletID", walletId);
            sessionStorage.setItem("walletType", "phantom");

            document.getElementById("account-btn").style.display ="block";
            document.getElementById("wallet-btn").style.display ="none";
            window.location.href = "templates.html";

        } else {
            console.error("Unable to retrieve wallet ID.");
        }
  
        // Handle the signed message and wallet ID here (e.g., send it to your server for verification)
    } catch (error) {
        console.error("Error in signing message:", error);
        // Handle errors (e.g., user refused to sign the message or wallet not connected)
    }
  }


  async function signInWithMetaMask() {
    if (typeof window.ethereum === 'undefined') {
      console.error("MetaMask is not installed");
      return;
    }
  
    try {
      // Request account access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const walletId = accounts[0]; // Get the first account
  
      // Define the message to sign
      const message = `Sign in with Ethereum to the app. Address: ${walletId}`;
      // Request the user to sign the message
      const signature = await ethereum.request({
        method: 'personal_sign',
        params: [message, walletId]
      });
  
      console.log("Signed Message:", signature);
  
      // Save the account to session storage for later use
      sessionStorage.setItem("walletID", walletId);
      sessionStorage.setItem("walletType", "metamask");
      // Update UI: Hide 'Sign in with MetaMask' button and show account related information
      document.getElementById("account-btn").style.display = "block";
      document.getElementById("wallet-btn").style.display = "none";
  
      // Redirect to a new page after successful sign in
      window.location.href = "templates.html"; // Change 'dashboard.html' to the path of your choice
  
      // You might also want to handle the signature here (e.g., send it to your server for verification)
  
    } catch (error) {
      console.error("Error in MetaMask sign-in:", error);
      // Handle errors (e.g., user refused to sign the message)
    }
  }
  
  async function signInWithCoinbase() {
    console.log("Coinbase sign-in triggered");

    if (!window.ethereum) {
        console.error("Coinbase Wallet is not installed or not detected");
        return;
    }
    try {
      // Request account access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0]; // Get the first account
  
      // Define the message to sign
      const message = `Sign in with Ethereum to the app. Address: ${account}`;
      // Request the user to sign the message
      const signature = await ethereum.request({
        method: 'personal_sign',
        params: [message, account]
      });
  
      console.log("Signed Message:", signature);
  
      // Save the account to session storage for later use
      sessionStorage.setItem("walletID", account);
      sessionStorage.setItem("walletType", "coinbase");
      // Update UI: Hide 'Sign in with Coinbase' button and show account related information
      document.getElementById("account-btn").style.display = "block";
      document.getElementById("wallet-btn").style.display = "none";
  
      // Redirect to a new page after successful sign in
      window.location.href = "templates.html"; // Change 'dashboard.html' to the path of your choice
  
      // You might also want to handle the signature here (e.g., send it to your server for verification)
  
    } catch (error) {
      console.error("Error in Coinbase Wallet sign-in:", error);
      // Handle errors (e.g., user refused to sign the message or other errors)
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

// This function can now be part of a traditional script, without module syntax


async function signInWithWalletConnect() {
    console.log("WalletConnect sign-in triggered");

    // Create WalletConnect Provider using the global variable
    const provider = new WalletConnectProvider.default({
        infuraId: "065dcf3394a94a4cab29ac97be680697", // Replace with your Infura Project ID
    });

    try {
        await provider.enable();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        const message = `Sign in with Ethereum to the app. Address: ${account}`;
        const signature = await web3.eth.personal.sign(message, account);

        console.log("Signed Message:", signature);
        sessionStorage.setItem("walletID", account);
        sessionStorage.setItem("walletType", "walletconnect");

        document.getElementById("account-btn").style.display = "block";
        document.getElementById("wallet-btn").style.display = "none";
        window.location.href = "dashboard.html";

    } catch (error) {
        console.error("Error in WalletConnect sign-in:", error);
    }
}

// Other functions or event listeners

document.getElementById("Walletconnect").addEventListener("click",signInWithWalletConnect);

// Add event listener to the metamask button
document.getElementById("metamask").addEventListener("click",signInWithMetaMask);
// Add event listener to the phantom button
document.getElementById("phantom").addEventListener("click", signInwithphantom);
// Add event listener to the coinbase button
 document.getElementById("coinbase").addEventListener("click", signInWithCoinbase);
// Add event listener to the walletcoin button
 document.getElementById("operatouch").addEventListener("click", signInWithOpera);



//#region TAB HTML
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  // Fonction pour ouvrir l'onglet par défaut
  function openDefaultTab() {
    document.getElementById("defaultOpen").click();
  }
  
  // Ajouter l'écouteur d'événement pour charger l'onglet par défaut au chargement de la page
  window.onload = openDefaultTab;
  
 //#endregion 



// // Ledger integration is more complex due to its hardware nature
// // This is a basic outline; refer to Ledger's documentation for complete integration
// async function signInWithLedger() {
//   const transport = await Transport.create();
//   const eth = new Eth(transport);
//   const path = "44'/60'/0'/0"; // Standard Ethereum HD path
//   const account = await eth.getAddress(path);

//   try {
//       const message = `Sign in with Ledger to the app. Address: ${account.address}`;
//       // Convert message to hex format for Ledger
//       const hexMessage = Buffer.from(message).toString("hex");
//       const signature = await eth.signPersonalMessage(path, hexMessage);

//       console.log("Signed Message:", signature);
//       // Handle the signature here
//   } catch (error) {
//       console.error("Error in Ledger sign-in:", error);
//   }
// }




//#endregion

//#region EDIT HOME PAGE AFTER CONNECTION
function EditWalletButton() {
    var walletId = sessionStorage.getItem("walletID");
    if (walletId !== null) {
        document.getElementById("account-btn").style.display ="block";
        document.getElementById("wallet-btn").style.display ="none";
        document.getElementById("account-btn").href = "#";
        document.getElementById("getstarted-btn").onclick = "#";
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    EditWalletButton();
});
//#endregion
