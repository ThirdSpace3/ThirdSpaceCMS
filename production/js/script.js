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

