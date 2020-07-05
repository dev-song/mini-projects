const mobileNav = document.querySelector(".container-mobile-nav");
const btnMenu = document.querySelector(".button-menu");
const mobileMenuContainer = document.querySelector(
  ".container-mobile-nav > ul"
);
const mobileMenuLinks = document.querySelectorAll(
  ".container-mobile-nav > ul > li"
);
let isNavOn = false;

function mobileNavOn() {
  setTimeout(() => {
    mobileNav.style.width = "100%";
    mobileMenuContainer.style.display = "block";
  }, 0);

  isNavOn = true;
}

function mobileNavOff() {
  setTimeout(() => {
    mobileMenuLinks.forEach((elm) => {
      mobileMenuContainer.style.display = "none";
    });
  }, 400);
  mobileNav.style.width = "0";

  isNavOn = false;
}

function toggleNav() {
  isNavOn ? mobileNavOff() : mobileNavOn();
}

btnMenu.addEventListener("click", toggleNav);
