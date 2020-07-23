const randomCatImage = 'https://api.thecatapi.com/v1/images/search';
let todaysCatId, todaysCatName;

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
  })
}

function showTodaysCatName() {
  if (!todaysCatName) throw new Error(`There isn't today's cat... Reload the page!`);

  const todaysCatElement = document.querySelector('.page-title__cat-of-the-day');
  todaysCatElement.textContent = todaysCatName;
}

function addCatImage(breedId, imgLimit = 4) {
  const imageContainer = document.querySelector('.cat-container');

  const api = `https://api.thecatapi.com/v1/images/search?limit=${imgLimit}&breed_id=${breedId}`;

  getDataAjax(api, function (data) {
    if (data.length === 0) throw new Error(`There's no image... Something's wrong!`);

    data.forEach(elm => {
      console.log(elm);

      const IMG = createImgElement(elm.url);
      imageContainer.appendChild(IMG);
    });
  })
}

function createImgElement(src, classNames = []) {
  if (!src) {
    throw new Error(`Invalid image source!`);
    return;
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
    addCatImage(todaysCatId);
    showTodaysCatName();
  });
}

init();