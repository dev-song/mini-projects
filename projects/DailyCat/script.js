const randomCatImage = 'https://api.thecatapi.com/v1/images/search';
let todaysCatId, todaysCatName;
let addSequence = 0;

function getDataAjax(url, callback) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(json => callback(json));
}

function getBreedInfo(callback) {
  const breedInfoApi = 'https://api.thecatapi.com/v1/breeds/';
  getDataAjax(breedInfoApi, function (breedInfo) {
    callback(breedInfo);
  })
}

function selectTodaysCat() {
  getBreedInfo(function (breedInfo) {
    const randomIndex = Math.floor(Math.random() * breedInfo.length);
    const todaysCatInfo = breedInfo[randomIndex];
    todaysCatId = todaysCatInfo.id;
    todaysCatName = todaysCatInfo.name;

    console.log(`Cat of the day is... ${todaysCatName} of which id is ${todaysCatId}!`);
  })
}

function showTodaysCatName() {
  if (!todaysCatName) throw new Error(`There isn't today's cat... Reload the page!`);

  const todaysCatElement = document.querySelector('.page-title__cat-of-the-day');
  todaysCatElement.textContent = todaysCatName;
}

function loadCatImage(breedId, imgCount = 4) {
  const imageContainer = document.querySelector('.cat-container');

  const images = 100;   // API's official limit is 100
  const api = `https://api.thecatapi.com/v1/images/search?limit=${images}&breed_id=${breedId}`;

  getDataAjax(api, function (data) {
    const len = data.length;
    if (len === 0) throw new Error(`There's no data for a cat... Searched cat is: ${breedId}`);

    const startIndex = imgCount * addSequence;
    const endIndex = imgCount * (addSequence + 1);

    for (let i = startIndex; i < endIndex; i++) {
      if (i >= len) {
        console.warn(`There's no more pictures for ${todaysCatName}!`);
        hideMoreButton();
        break;
      }

      const imgElm = createImgElement(data[i].url);
      imageContainer.appendChild(imgElm);
    }

    addSequence++;
  })
}

function hideMoreButton() {
  const moreButton = document.querySelector('.button-more-cats');
  moreButton.style.display = 'none';
}

function createImgElement(src, classNames = []) {
  if (!src) {
    throw new Error(`Invalid image source!`);
  }

  const img = document.createElement('img');
  const defaultClass = 'cat-image';
  if (classNames.length !== 0) {
    classNames.forEach(elm => img.classList.add(elm));
  }
  if (classNames.length === 0) {
    img.classList.add(defaultClass);
  }
  img.setAttribute('src', src);

  return img;
}

function openImgPopUp(src) {
  const main = document.querySelector('main');

  const popUp = document.createElement('div');
  popUp.classList.add('pop-up');

  const imgPopUpElm = createImgElement(src, ['pop-up__image']);
  const closeButton = document.createElement('button');
  closeButton.classList.add('pop-up__close-button');
  closeButton.textContent = 'X';

  popUp.appendChild(imgPopUpElm);
  popUp.appendChild(closeButton);

  main.appendChild(popUp);
}

function closeImgPopUp() {
  const popUp = document.querySelector('.pop-up');
  popUp.classList.remove('active');
  setTimeout(() => {
    popUp.remove();
  }, 500);
}

function init() {
  const moreButton = document.querySelector('.button-more-cats');
  moreButton.addEventListener('click', () => {
    loadCatImage(todaysCatId);
    showTodaysCatName();
  });

  document.addEventListener('click', e => {
    const isPopUpOpen = document.querySelector('.pop-up');

    if (!isPopUpOpen && e.target.className === 'cat-image') {
      openImgPopUp(e.target.src);
      setTimeout(() => {
        document.querySelector('.pop-up').classList.add('active')
      }, 0);
    }
    if (isPopUpOpen && (e.target.className !== 'pop-up' && e.target.className !== 'pop-up__image')) {
      closeImgPopUp();
    }
  })
}

selectTodaysCat();
document.addEventListener('DOMContentLoaded', init);