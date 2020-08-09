const path = './get-products';

function readJson(json, callback) {
  fetch(json)
    .then(res => res.json())
    .then(json => callback(json));
}

// products 정보를 불러와 data-box 섹션에 추가
function showProductData(path, parent) {
  const itemsContainer = document.createElement('div');
  itemsContainer.classList.add('data-box__items--container');

  readJson(path, data => {
    if (!data) {
      console.error('There is no data');
      return;
    }

    data.forEach(item => {
      const itemContainer = document.createElement('div');
      itemContainer.classList.add('data-box__item--container');

      for (const property in item) {
        const elm = document.createElement('p');
        elm.classList.add(`data-box__item-${property}`);
        elm.textContent = item[property];
        itemContainer.appendChild(elm);
      }

      itemsContainer.appendChild(itemContainer);
    });

    parent.appendChild(itemsContainer);
  })
}

function init() {
  const dataBox = document.querySelector('.data-box');
  showProductData(path, dataBox);
}

init();