const mobileNav = document.querySelector('.container-mobile-nav');
const btnMenu = document.querySelector('.button-menu');
let isNavOn = false;

function mobileNavOn() {
    mobileNav.style.display = 'flex';
    
    setTimeout(() => {
        mobileNav.style.transform = 'translateX(0)';
    }, 0);

    isNavOn = true;
}

function mobileNavOff() {
    setTimeout(() => {
        mobileNav.style.display = 'none';
    }, 400);
    mobileNav.style.transform = 'translateX(100%)';
    
    isNavOn = false;
}

function toggleNav() {
    isNavOn ? mobileNavOff() : mobileNavOn();
}

btnMenu.addEventListener('click', toggleNav);