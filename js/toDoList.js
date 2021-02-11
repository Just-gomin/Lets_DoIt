const todoForm = document.querySelector(".js-todoForm"),
  todoInput = document.querySelector(".js-todoInput");
const todoList = document.querySelector(".js-todoList");

const TODOLIST = "todoList";

let todos = []; // fake DB

function saveToDos() {
  localStorage.setItem(TODOLIST, JSON.stringify(todos));
}

function createNewID() {
  const date = new Date();
  const month = date.getMonth() + 81;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const newID = `${month}${day < 10 ? "0" + day : day}${
    hour < 10 ? "0" + hour : hour
  }${min < 10 ? "0" + min : min}${sec < 10 ? "0" + sec : sec}`;

  return parseInt(newID);
}

function handleDeleteBtn(event) {
  const delBtn = event.target;
  const li = delBtn.parentNode;

  todoList.removeChild(li);

  const filteredList = todos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  todos = filteredList;
  saveToDos();
}

function handleDoneBtn(event) {}

function handleEditBtn(event) {}

function paintTodos(todo) {
  const li = document.createElement("li");
  const deletebtn = document.createElement("button");
  const donebtn = document.createElement("button");
  const editbtn = document.createElement("button");
  const span = document.createElement("span");
  const newID = createNewID();

  deletebtn.innerText = "✕";
  deletebtn.addEventListener("click", handleDeleteBtn);

  donebtn.addEventListener("click", handleDoneBtn);
  donebtn.innerText = "✔︎";

  editbtn.innerText = "✎";
  editbtn.addEventListener("click", handleEditBtn);

  span.innerText = todo;

  li.appendChild(donebtn);
  li.appendChild(span);
  li.appendChild(editbtn);
  li.appendChild(deletebtn);
  li.id = newID;

  todoList.appendChild(li);

  const todoObj = {
    id: newID,
    text: todo,
    isDone: false,
  };

  todos.push(todoObj);
  saveToDos();
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const currentVal = todoInput.value;
  paintTodos(currentVal);
  todoInput.value = "";
}

function loadToDos() {
  const todols = localStorage.getItem(TODOLIST);
  if (todols !== null) {
    const parsedTodols = JSON.parse(todols);
    parsedTodols.forEach((todo) => {
      paintTodos(todo.text);
    });
  }
}

function init() {
  loadToDos();
  todoForm.addEventListener("submit", handleToDoSubmit);
}

init();
