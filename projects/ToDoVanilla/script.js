function ToDo(id, content) {
  this.id = id;
  this.todo = content;
  this.regDate = new Date();
}

const data = {
  toDo: [],
  nextToDoId: 1,
  updateToDoId: function() {
    this.nextToDoId++;
  },
  addToDo: function(content) {
    const todo = new ToDo(this.nextToDoId, content);
    this.toDo.push(todo);
    this.updateToDoId();

    return todo;
  },
  findToDo: function(id) {
    const targetIndex = this.toDo.findIndex(elm => elm.id === id);
    return targetIndex;
  },
  updateToDo: function(id, content) {
    const toDoIndex = this.findToDo(id);
    this.toDo[toDoIndex].todo = content;
  },
  deleteToDo: function(id) {
    const toDoIndex = this.findToDo(id);
    this.toDo.splice(toDoIndex, 1);
    
    if (this.toDo.length === 0) {
      this.resetToDo();
    }
  },
  saveLocal: function() {
    if (this.toDo.length === 0) return;
    window.localStorage.setItem('toDoList', JSON.stringify(this.toDo));
    window.localStorage.setItem('nextToDoId', this.nextToDoId);
  },
  loadLocal: function() {
    this.toDo = JSON.parse(window.localStorage.getItem('toDoList'));
    this.nextToDoId = parseInt(window.localStorage.getItem('nextToDoId'))
  },
  resetToDo: function() {
    this.toDo = [];
    this.nextToDoId = 1;
    window.localStorage.clear();
  },
  getDataSizeInByte: function() {
    let allStrings = '';
    for (let key in window.localStorage) {
      // 객체 내부 hasOwnProperty 속성에 다른 값을 지정할 수 있으므로 외부에서 끌어다 쓰는 것이 권장됨 
      if (Object.prototype.hasOwnProperty.call(window.localStorage, key)) {
        allStrings += window.localStorage[key];
      }
    }

    const dataSize = allStrings ? (allStrings.length * 2) : 0;
    return dataSize;
  }
};

const view = {
  showToDoItem: function(parent, {id, todo}) {
    const html = `
      <div class="todo-list__item-container" data-todo-id=${id}>
        <p class="todo-list__item-content">${todo}</p>
        <button type="button" class="todo-list__delete-button">삭제</button>
      </div>
    `;
    parent.insertAdjacentHTML('beforeend', html);
  },
  hideItem: function(elm) {
    elm.remove();
  },
  showList: function(parent, list) {
    list.forEach(elm => this.showToDoItem(parent, elm))
  },
  toggleItemComplete: function(item) {
    item.classList.toggle('completed');
  },
  showText: function(elm, size) {
    elm.textContent = size;
  },
  alert: function(msg) {
    alert(msg);
  }
}

const controller = {
  DOMElements: {
    list: document.querySelector('.todo-list__list-container'),
    input: document.querySelector('.todo-list__todo-input'),
    submit: document.querySelector('.todo-list__todo-submit'),
    reset: document.querySelector('.todo-list__reset-button'),
    dataSize: document.querySelector('.storage-info__using-size'),
    totalSize: document.querySelector('.storage-info__total-size'),
    usagePercent: document.querySelector('.storage-info__summary'),
    usageGraphicBar: document.querySelector('.storage-info__graphic-bar')
  },
  addToDoItem: function() {
    if (this.DOMElements.input.value.length === 0) {
      alert('한 글자 이상 입력해야 합니다');
      return false;
    }
    const newItem = data.addToDo(this.DOMElements.input.value);
    view.showToDoItem(this.DOMElements.list, newItem);
    this.resetInput();
  },
  resetInput: function() {
    this.DOMElements.input.value = '';
    this.DOMElements.input.focus();
  },
  removeToDoItem: function(id, elm) {
    data.deleteToDo(parseInt(id));
    view.hideItem(elm);
  },
  resetList: function() {
    const items = [...this.DOMElements.list.children];
    data.resetToDo();
    items.forEach(item => item.remove());
  },
  displayDataSize: function() {
    const currentSizeInKB = ( (data.getDataSizeInByte())/1024 ).toFixed(2);
    const totalSizeInKB = 5 * 1024;  // localStorage capacity is 5MB
    const usagePercent = currentSizeInKB / totalSizeInKB * 100;
    const formattedUsagePercent = usagePercent < 0.1 ? 0 : usagePercent.toFixed(1);
    this.DOMElements.dataSize.textContent = currentSizeInKB;
    this.DOMElements.totalSize.textContent = totalSizeInKB;
    this.DOMElements.usagePercent.textContent = formattedUsagePercent;
    this.DOMElements.usageGraphicBar.style.width = `${formattedUsagePercent}%`;
  },
  init: function() {
    if (window.localStorage.length !== 0) {
      data.loadLocal();
      view.showList(this.DOMElements.list, data.toDo);
    }
    this.displayDataSize();
    document.addEventListener('click', e => {
      e.preventDefault();
      if (e.target === this.DOMElements.submit)
        this.addToDoItem();
      if (e.target.className === "todo-list__delete-button")
        this.removeToDoItem(e.target.parentNode.dataset.todoId, e.target.parentNode);
      if (e.target === this.DOMElements.reset)
        this.resetList();
      data.saveLocal();
      this.displayDataSize();
    })
  }
}

document.addEventListener('DOMContentLoaded', controller.init.bind(controller));