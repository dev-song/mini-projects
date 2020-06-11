const wrapper = document.querySelector('aside');
const background = document.querySelector('.page-background');
const cart = document.querySelector('.cart-side');
const btnCart = document.querySelector('.button-cart');
const btnClose = document.querySelector('.button-cart-close');
let isCartOn = false;

function cartOn() {
    wrapper.style.display = 'flex';
    
    setTimeout(() => {
        background.style.opacity = 1;
        cart.style.opacity = 1;
        cart.style.transform = 'translateX(0)';
    }, 0);

    isCartOn = true;
}

function cartOff() {
    setTimeout(() => {
        wrapper.style.display = 'none';
    }, 300);
    background.style.opacity = 0;
    cart.style.opacity = 0;
    cart.style.transform = 'translateX(1rem)';
    
    isCartOn = false;
}

function toggleCart() {
    isCartOn ? cartOff() : cartOn();
}