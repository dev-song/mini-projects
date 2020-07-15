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
  },
  saveLocal: function() {
    localStorage.setItem('toDoList', JSON.stringify(this.toDo));
    localStorage.setItem('nextToDoId', this.nextToDoId);
  },
  loadLocal: function() {
    this.toDo = JSON.parse(localStorage.getItem('toDoList'));
    this.nextToDoId = parseInt(localStorage.getItem('nextToDoId'))
  },
  resetToDo: function() {
    this.toDo = [];
    this.nextToDoId = 1;
    localStorage.clear();
  },
};

const view = {
  showItem: function(parent, {id, todo}) {
    const html = `
      <div class="todo-list__item-container" data-todo-id=${id}>
        <p class="todo-list__item-content">${todo}</p>
        <button type="button" class="todo-list__delete-button">지우기</button>
      </div>
    `;
    parent.insertAdjacentHTML('beforeend', html);
  },
  hideItem: function(elm) {
    elm.remove();
  },
  showTotalList: function(parent, list) {
    list.forEach(elm => this.showItem(parent, elm))
  },
  toggleItemComplete: function(item) {
    item.classList.toggle('completed');
  }
}

const controller = {
  DOMElements: {
    list: document.querySelector('.todo-list__list-container'),
    input: document.querySelector('.todo-list__todo-input'),
    submit: document.querySelector('.todo-list__todo-submit'),
  },
  addToDoItem: function() {
    const newItem = data.addToDo(this.DOMElements.input.value);
    view.showItem(this.DOMElements.list, newItem);
    this.resetInput();
    
    data.saveLocal();
  },
  resetInput: function() {
    this.DOMElements.input.value = '';
    this.DOMElements.input.focus();
  },
  removeToDoItem: function(id, elm) {
    data.deleteToDo(parseInt(id));
    view.hideItem(elm);
    
    data.saveLocal();
  },
  init: function() {
    if (localStorage.length !== 0) {
      data.loadLocal();
      view.showTotalList(this.DOMElements.list, data.toDo);
    }
    this.DOMElements.submit.addEventListener('click', e => {
      e.preventDefault();
      this.addToDoItem();
    });
    this.DOMElements.list.addEventListener('click', e => {
      if (e.target.className === "todo-list__delete-button") {
        this.removeToDoItem(e.target.parentNode.dataset.todoId, e.target.parentNode);
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', controller.init.bind(controller));