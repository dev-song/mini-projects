function ToDo(id, content) {
  this.id = id;
  this.todo = content;
  this.regDate = new Date();
}

const data = {
  toDo: [],
  toDoId: 1,
  updateToDoId: function() {
    this.toDoId++;
  },
  addToDo: function(content) {
    const todo = new ToDo(this.toDoId, content);
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
  resetToDo: function() {
    this.toDo = [];
    this.toDoId = 1;
  }
};

const view = {
  addItem: function(parent, {id, todo}) {
    const html = `
      <div class="todo-list__item-container" data-todo-id=${id}>
        <p class="todo-list__item-content">${todo}</p>
        <button type="button" class="todo-list__delete-button">지우기</button>
      </div>
    `;
    parent.insertAdjacentHTML('beforeend', html);
  },
  removeItem: function(parent, item) {
    parent.removeChild(item);
  },
  toggleItemComplete: function(item) {
    item.classList.toggle('completed');
  }
}