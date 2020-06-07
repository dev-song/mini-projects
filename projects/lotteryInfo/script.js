const userNumbers = document.querySelectorAll('.user-number');
const resultNumbers = document.querySelectorAll('.result-number');
const selectNumbers = document.querySelectorAll('.selection-number');
const overlay = document.querySelector('#overlayNumberSelection');
const btnOverlayClose = document.querySelector('#btnOverlayClose');
let userSelection = [];

// JSON related variables (JSON source path)
const jsonPath = "./drawData.json";

userNumbers.forEach(elm => elm.addEventListener('click', e => {
    toggleElm(overlay);
}));

selectNumbers.forEach(elm => elm.addEventListener('click', e => {
    const isAddedWithoutErr = addUserSelection(e.target);
    if (isAddedWithoutErr) {
        userSelection.sort((a, b) => a - b);
        displayUserSelection();
    }
}));

btnOverlayClose.addEventListener('click', () => {
    toggleElm(overlay);
});

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
    // fadein & fadeout effect using setTimeout
function toggleElm(elm) {
    const isVisible = elm.style.display === "block";
    
    if (isVisible) {
        elm.style.opacity = "0";
        setTimeout(() => { elm.style.display = "none"; }, 400);
    } else {
        elm.style.display = "block";
        setTimeout(() => { elm.style.opacity = "1"; }, 0);
    }
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

// display userSelection on .user-number
function displayUserSelection() {
    userNumbers.forEach((number, index) => number.textContent = userSelection[index]);
}

// show alert when user selects more than 6 numbers
function excessAlert() {
    alert("You selected more than 6 numbers! Remove certain number by click it or reset the whole numbers.");
}

function sameAlert() {
    alert("You selected the same number! Choose another number.");
}

/**
 * GET JSON-type data from the path and store it into the global variable
 * @param {String} path Where the JSON data is gotten from.
 * @param {Function} callback Function that accepts loaded JSON data as an argument
 */
function getJSON(path, callback) {
    const oReq = new XMLHttpRequest();

    oReq.addEventListener('load', function() {
        const json = JSON.parse(this.responseText);
        callback(json);
    });

    oReq.open('GET', path);
    oReq.send();
}

function displayJSON(json) {
    const resultSet = document.querySelectorAll('.draw-result');

    resultSet.forEach((set, setIndex) => {
        const currentDrawData = json[setIndex];

        const drawSequence = set.querySelector('.draw-sequence');
        const sequenceText = drawSequence.textContent;
        drawSequence.textContent = sequenceText.replace('000', currentDrawData.draw);

        const resultNums = set.querySelectorAll('.result-number');
        resultNums.forEach((num, numIndex) => num.textContent = currentDrawData.balls[numIndex]);

        const bonusNum = set.querySelector('.bonus');
        bonusNum.textContent = currentDrawData.bonus;
    })
}

function init() {
    getJSON(jsonPath, displayJSON);
    setTimeout(() => resultNumbers.forEach(setColorByNum), 100);
}

/////////////////////////////////////////////////////////////
// 홈페이지 로드 이후 자동 실행
window.addEventListener('DOMContentLoaded', init);