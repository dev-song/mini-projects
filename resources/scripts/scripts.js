const buttonMobileMenu = document.querySelector('.button-menu-mobile');
let isNavOn = false;

buttonMobileMenu.addEventListener('click', function () {
  const navlink = document.querySelector('.nav-link');

  if (!isNavOn) {
    isNavOn = true;
    navlink.classList.add('active');
    setTimeout(() => {
      navlink.style.width = '100%';
    }, 0);
  } else {
    isNavOn = false;
    navlink.classList.remove('active');
  }
});
