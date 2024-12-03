const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

const toDoData = [];

const render = () => {
  todoCompleted.innerHTML = "";
  todoList.innerHTML = "";

  toDoData.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo"></span>' +
      item.text +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", () => {
      item.completed = !item.completed;
      render();

      localStorage.setItem("toDoData", JSON.stringify(toDoData));
    });

    li.querySelector(".todo-remove").addEventListener("click", () => {
      toDoData.splice(toDoData.indexOf(item), 1);
      render();
    });
  });
};

todoControl.addEventListener("submit", (e) => {
  e.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };

  const check = () => {
    if (newToDo.text === "") {
      alert("Please enter your deal");
    } else {
      toDoData.push(newToDo);
      headerInput.value = "";
    }
  };
  localStorage.setItem("toDoData", JSON.stringify(toDoData));

  check();
  render();
});

const showToDoData = () => {
  const data = localStorage.getItem("toDoData");
  if (data) {
    toDoData.push(...JSON.parse(data));
    render();
  }
};

showToDoData();
