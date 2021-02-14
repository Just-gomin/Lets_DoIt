const todoForm = document.querySelector(".js-todoForm"),
  todoInput = document.querySelector(".js-todoInput");
const todoList = document.querySelector(".js-todoList");

const TODOLIST = "todoList";

const SHOWING_OFF = "showing-off";
const SHOWING_ON = "showing-on";

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

function handleDoneBtn(event) {
  const doneBtn = event.target;
  const li = doneBtn.parentNode;
}

function handleEditSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector("input");
  const span = form.parentNode;
  const li = span.parentNode;
  const doneBtn = li.querySelector(".todo-doneBtn");
  const editBtn = li.querySelector(".todo-editBtn");
  const delBtn = li.querySelector(".todo-delBtn");

  const currentTxt = input.value;

  input.removeEventListener("blur", handleEditBlur);
  form.remove();

  span.innerText = currentTxt;
  doneBtn.classList.remove(SHOWING_OFF);
  editBtn.classList.remove(SHOWING_OFF);
  delBtn.classList.remove(SHOWING_OFF);

  const updatedList = todos.map((todo) => {
    if (todo.id === parseInt(li.id)) {
      todo.text = currentTxt;
    }
    return todo;
  });
  todos = updatedList;
  saveToDos();
}

function handleEditBlur(event) {
  const editInput = event.target;
  const editForm = editInput.parentNode;
  const span = editForm.parentNode;
  const li = span.parentNode;

  const doneBtn = li.querySelector(".todo-doneBtn");
  const editBtn = li.querySelector(".todo-editBtn");
  const delBtn = li.querySelector(".todo-delBtn");

  span.innerText = editInput.placeholder;
  doneBtn.classList.remove(SHOWING_OFF);
  editBtn.classList.remove(SHOWING_OFF);
  delBtn.classList.remove(SHOWING_OFF);

  editForm.remove();
}

function handleEditBtn(event) {
  const editBtn = event.target;
  const li = editBtn.parentNode;
  const doneBtn = li.querySelector(".todo-doneBtn");
  const delBtn = li.querySelector(".todo-delBtn");
  const span = li.querySelector("span");

  const form = document.createElement("form");
  const input = document.createElement("input");

  const currentTxt = span.innerText;

  form.addEventListener("submit", handleEditSubmit);
  input.placeholder = currentTxt;
  form.appendChild(input);
  input.addEventListener("blur", handleEditBlur);

  span.innerText = "";
  span.appendChild(form);
  input.focus();

  doneBtn.classList.add(SHOWING_OFF);
  editBtn.classList.add(SHOWING_OFF);
  delBtn.classList.add(SHOWING_OFF);
}

function paintTodos(todoObj) {
  const li = document.createElement("li");
  const deletebtn = document.createElement("button");
  const donebtn = document.createElement("button");
  const editbtn = document.createElement("button");
  const span = document.createElement("span");

  deletebtn.innerText = "✕";
  deletebtn.classList.add("todo-delBtn");
  deletebtn.addEventListener("click", handleDeleteBtn);

  donebtn.innerText = "✔︎";
  donebtn.classList.add("todo-doneBtn");
  donebtn.addEventListener("click", handleDoneBtn);

  editbtn.innerText = "✎";
  editbtn.classList.add("todo-editBtn");
  editbtn.addEventListener("click", handleEditBtn);

  span.innerText = todoObj.text;

  li.appendChild(donebtn);
  li.appendChild(span);
  li.appendChild(editbtn);
  li.appendChild(deletebtn);
  li.id = todoObj.id;

  todoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const currentVal = todoInput.value;
  const newID = createNewID();
  const todoObj = {
    id: newID,
    text: currentVal,
    isDone: false,
  };

  paintTodos(todoObj);
  todoInput.value = "";

  todos.push(todoObj);
  saveToDos();
}

function loadToDos() {
  const todols = localStorage.getItem(TODOLIST);
  if (todols !== null) {
    const parsedTodols = JSON.parse(todols);
    parsedTodols.forEach((todo) => {
      paintTodos(todo);
    });
    todos = parsedTodols;
  }
}

function init() {
  loadToDos();
  todoForm.addEventListener("submit", handleToDoSubmit);
}

init();
