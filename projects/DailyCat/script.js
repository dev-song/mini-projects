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

function selectTodaysCat(callback) {
  getBreedInfo(function (breedInfo) {
    const randomIndex = Math.floor(Math.random() * breedInfo.length);
    const todaysCatInfo = breedInfo[randomIndex];
    todaysCatId = todaysCatInfo.id;
    todaysCatName = todaysCatInfo.name;

    console.log(`Cat of the day is... ${todaysCatName} of which id is ${todaysCatId}!`);
    callback();
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

    for (let i = 0; i < len; i++) {
      let imgElm;
      if (i < imgCount) {
        imgElm = createImgElement(true, data[i].url);
      } else {
        imgElm = createImgElement(false, data[i].url);
        imgElm.classList.add('inactive');
      }
      imageContainer.appendChild(imgElm);
    }
  })
}

function hideMoreButton() {
  const moreButton = document.querySelector('.button-more-cats');
  moreButton.style.display = 'none';
}

function createImgElement(initial = true, src, classNames = []) {
  const img = document.createElement('img');
  const defaultClass = 'cat-image';
  if (classNames.length !== 0) {
    classNames.forEach(elm => img.classList.add(elm));
  }
  if (classNames.length === 0) {
    img.classList.add(defaultClass);
  }
  if (initial) {
    img.setAttribute('src', src);
  }
  if (!initial) {
    img.setAttribute('data-src', src);
  }

  return img;
}

function openImgPopUp(src) {
  const main = document.querySelector('main');

  const popUp = document.createElement('div');
  popUp.classList.add('pop-up');

  const imgPopUpElm = createImgElement(true, src, ['pop-up__image']);
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

function lazyLoad(previouslyLoadedImages = 0) {
  const options = {
    root: null,
    rootMargin: '0px 0px 30px 0px',
    threshold: 0
  };

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        entry.target.classList.remove('inactive');
        observer.unobserve(entry.target);

        console.log(`loading new image...`);
        console.dir(entry.target);
      }
    })
  }, options);

  const imgList = document.querySelectorAll('.cat-image');
  imgList.forEach((elm, index) => {
    if (index >= previouslyLoadedImages) {
      io.observe(elm);
    };
  });
}

function animateLoadingPage() {
  return setInterval(() => {
    const dots = document.querySelector('.loading__text-more');
    if (dots.textContent === '...') {
      dots.textContent = '.';
    } else if (dots.textContent === '.') {
      dots.textContent = '..';
    } else if (dots.textContent === '..') {
      dots.textContent = '...';
    }
    console.log('text update!');
  }, 400);
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

const loadingPageTextAnimation = animateLoadingPage();
selectTodaysCat(() => {
  clearInterval(loadingPageTextAnimation);

  const loadingPage = document.querySelector('.loading');
  loadingPage.style.display = 'none';
});
document.addEventListener('DOMContentLoaded', init);