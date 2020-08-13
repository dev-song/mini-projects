const path = './get-products';
const formData = {    // 각 property는 [설명, input 형식, 표시 여부]를 값으로 가짐
  id: ['일련번호', 'number', false],
  cluster: ['단지 번호', 'number', false],
  building: ['동 번호', 'number', true],
  space: ['넓이(평형)', 'number', true],
  description: ['설명', 'text', true],
  img: ['이미지 경로', 'text', false]
}

// formData 양식에 따라 form HTML을 생성
function createForm() {
  const form = document.createElement('form');
  const formOptions = {
    className: 'add-product',
    action: '/add-product',
    method: 'post'
  }
  form.classList.add(formOptions.className);
  form.action = formOptions.action;
  form.method = formOptions.method;

  for (const property in formData) {
    const input = document.createElement('input');

    const values = formData[property];
    const inputOptions = {
      className: `add-product__input-${property}`,
      description: values[0],
      type: values[1],
      visible: values[2]
    }

    input.classList.add(inputOptions.className);
    input.name = property;
    input.type = inputOptions.type;
    input.placeholder = `${inputOptions.description}을 입력하세요`; // 종성에 따른 조사 변화 추가 필요

    if (!inputOptions.visible) {
      input.style.display = 'none';
    }

    form.appendChild(input);
  }

  const submit = document.createElement('input');
  submit.classList.add('add-product__submit');
  submit.type = 'submit';
  submit.value = '등록';
  form.appendChild(submit);

  return form;
}

function renderForm(parent) {
  const form = createForm();

  parent.appendChild(form);
}

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
        if (property === 'id') {
          itemContainer.id = `item-${item[property]}`;
          continue;
        }

        const elm = document.createElement('p');
        elm.classList.add(`data-box__item-${property}`);
        elm.textContent = item[property];
        itemContainer.appendChild(elm);
      }

      itemsContainer.prepend(itemContainer);
    });

    parent.appendChild(itemsContainer);
  })
}

function init() {
  const formParentNode = document.querySelector('.form-box');
  renderForm(formParentNode);

  const dataBox = document.querySelector('.data-box');
  showProductData(path, dataBox);
}

init();