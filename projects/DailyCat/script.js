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
        break;
      }

      const IMG = createImgElement(data[i].url);
      imageContainer.appendChild(IMG);
    }

    addSequence++;
  })
}

function createImgElement(src, classNames = []) {
  if (!src) {
    throw new Error(`Invalid image source!`);
  }

  const img = document.createElement('img');
  const defaultClass = 'cat-image';
  if (classNames) {
    classNames.forEach(elm => img.classList.add(elm));
  }
  img.classList.add(defaultClass);
  img.setAttribute('src', src);

  return img;
}

function init() {
  selectTodaysCat();

  const moreButton = document.querySelector('.button-more-cats');
  moreButton.addEventListener('click', () => {
    loadCatImage(todaysCatId);
    showTodaysCatName();
  });
}

init();