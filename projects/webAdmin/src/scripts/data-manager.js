const path = './get-products';

function readJson(json, callback) {
  fetch(json)
    .then(res => res.json())
    .then(json => callback(json));
}

// products 정보를 불러와 data-box 섹션에 추가
function showProductData(path, parent) {
  const container = document.createElement('div');
  container.classList.add('data-box__items--container');

  readJson(path, data => {
    if (!data) {
      console.error('There is no data');
      return;
    }

    data.forEach(item => {
      for (const property in item) {
        const elm = document.createElement('p');
        elm.textContent = item[property];
        container.appendChild(elm);
      }
    });

    parent.appendChild(container);
  })
}

function init() {
  const dataBox = document.querySelector('.data-box');
  showProductData(path, dataBox);
}

init();