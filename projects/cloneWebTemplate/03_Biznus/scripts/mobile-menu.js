const mobileNav = document.querySelector(".container-mobile-nav");
const btnMenu = document.querySelector(".button-menu");
const mobileMenuContainer = document.querySelector(
  ".container-mobile-nav > ul"
);
let isNavOn = false;

function mobileNavOn() {
  setTimeout(() => {
    mobileNav.style.width = "100%";
    mobileMenuContainer.style.width = "100%";
  }, 0);
  mobileMenuContainer.style.display = "block";

  isNavOn = true;
}

function mobileNavOff() {
  setTimeout(() => {
    mobileMenuContainer.style.display = "hidden";
  }, 400);
  mobileNav.style.width = "0";
  mobileMenuContainer.style.width = "0";

  isNavOn = false;
}

function toggleNav() {
  isNavOn ? mobileNavOff() : mobileNavOn();
}

btnMenu.addEventListener("click", toggleNav);
