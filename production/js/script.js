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

//POPUP WALLET

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

