const data = {
  toDo: [],
  toDoId: 1,
  updateToDoId: function() {
    this.toDoId++;
  },
  addToDo: function(content) {
    this.toDo.push(new ToDo(this.toDoId, content));
    this.updateToDoId();
  },
  findToDo: function(id) {
    const targetIndex = this.toDo.findIndex(elm => elm.id === id);
    return targetIndex;
  },
  updateToDo: function(id, content) {
    const toDoId = this.findToDo(id);
    this.toDo[toDoId].todo = content;
  },
  deleteToDo: function(id) {
    const toDoId = this.findToDo(id);
    this.toDo.splice(toDoId, 1);
  },
  resetToDo: function() {
    this.toDo = [];
    this.toDoId = 1;
  }
};

function ToDo(id, content) {
  this.id = id;
  this.todo = content;
  this.regDate = new Date();
}