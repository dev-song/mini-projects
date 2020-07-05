const mobileNav = document.querySelector(".container-mobile-nav");
const btnMenu = document.querySelector(".button-menu");
const mobileMenuLinks = document.querySelectorAll(
  ".container-mobile-nav > ul > li"
);
let isNavOn = false;

function mobileNavOn() {
  setTimeout(() => {
    mobileNav.style.width = "100%";
    mobileMenuLinks.forEach((elm) => {
      elm.style.visibility = "visible";
    });
  }, 0);

  isNavOn = true;
}

function mobileNavOff() {
  setTimeout(() => {
    mobileMenuLinks.forEach((elm) => {
      elm.style.visibility = "hidden";
    });
  }, 400);
  mobileNav.style.width = "0";

  isNavOn = false;
}

function toggleNav() {
  isNavOn ? mobileNavOff() : mobileNavOn();
}

btnMenu.addEventListener("click", toggleNav);
