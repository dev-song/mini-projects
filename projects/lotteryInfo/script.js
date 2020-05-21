const userNumbers = document.querySelectorAll('.user-number');
const resultNumbers = document.querySelectorAll('.result-number');
const selectNumbers = document.querySelectorAll('.selection-number');
const overlay = document.querySelector('#overlayNumberSelection');
let userSelection = [];

userNumbers.forEach(elm => elm.addEventListener('click', e => {
    toggleElm(overlay);
}));

selectNumbers.forEach(elm => elm.addEventListener('click', e => {
    const isAddedWithoutErr = addUserSelection(e.target);
    if (isAddedWithoutErr) {
        toggleElm(overlay);
        userSelection.sort((a, b) => a - b);
    }
}));

// changes elements' color by its number
function setColorByNum(elm) {
    // color list and corresponding numbers
        // none, 1-10, 11-20, 21-30, 31-40, 41-45, 46-
        // white, #F1C40F, #2980B9, #C0392B, #BDC3C7, #27AE60, black
    const number = parseInt(elm.textContent);
    let numColor = "";
    if (number < 1 || !number) {
        numColor = 'white';
    } else if (number <= 10) {
        numColor = '#F1C40F';
    } else if (number <= 20) {
        numColor = '#2980B9'
    } else if (number <= 30) {
        numColor = '#C0392B';
    } else if (number <= 40) {
        numColor = '#BDC3C7';
    } else if (number <= 45) {
        numColor = '#27AE60';
    } else {
        numColor = 'black';
        console.error(`Error occured on the element with a text of '${elm.textContent}'!`)
    }

    elm.style.background = numColor;
}

// make certain DOM element visible or invisible
function toggleElm(elm) {
    const isVisible = elm.style.display === "block";
    elm.style.display = isVisible ? "none" : "block";
}

// add element's number to the selection
function addUserSelection(elm) {
    const num = parseInt(elm.textContent);
    if (userSelection.length >= 6) {
        excessAlert();
        return false;
    }
    if (userSelection.includes(num)) {
        sameAlert();
        return false;
    }
    userSelection.push(num);

    return true;
}

// show alert when user selects more than 6 numbers
function excessAlert() {
    alert("You selected more than 6 numbers! Remove certain number by click it or reset the whole numbers.");
}

function sameAlert() {
    alert("You selected the same number! Choose another number.");
}