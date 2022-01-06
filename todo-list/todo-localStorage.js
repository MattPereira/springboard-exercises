const todoForm = document.getElementById("addTodoForm");
const todoList = document.getElementById("todoList");

// retrieve from localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < savedTodos.length; i++) {
  let newTodo = document.createElement("li");
  newTodo.innerText = savedTodos[i].task;
  todoList.append(newTodo);

  let completeBtn = document.createElement("button");
  completeBtn.innerHTML = "&check; complete";
  completeBtn.classList.add("btn", "btn-success");

  let removeBtn = document.createElement("button");
  removeBtn.innerHTML = "&#10005; delete";
  removeBtn.classList.add("btn", "btn-danger");

  newTodo.append(completeBtn, removeBtn);

  //mark todo as completed
  completeBtn.addEventListener("click", function () {
    completeBtn.parentElement.classList.toggle("text-decoration-line-through");
  });

  //remove a todo
  removeBtn.addEventListener("click", function () {
    removeBtn.parentElement.remove();
    savedTodos.pop();
  });
}

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let taskValue = document.getElementById("task").value;

  // save to localStorage
  savedTodos.push({ task: taskValue });
  localStorage.setItem("todos", JSON.stringify(savedTodos));
});
