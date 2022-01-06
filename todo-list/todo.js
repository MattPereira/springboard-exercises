document.addEventListener("DOMContentLoaded", function () {
  let todoForm = document.getElementById("addTodoForm");
  let todoList = document.getElementById("todoList");

  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    //add a new todo with buttons
    let newToDo = document.createElement("li");
    newToDo.innerText = document.getElementById("task").value;

    let completeBtn = document.createElement("button");
    completeBtn.innerHTML = "&check; complete";
    completeBtn.classList.add("btn", "btn-success");

    let removeBtn = document.createElement("button");
    removeBtn.innerHTML = "&#10005; delete";
    removeBtn.classList.add("btn", "btn-danger");

    todoList.append(newToDo);
    newToDo.append(completeBtn, removeBtn);

    //mark todo as completed
    completeBtn.addEventListener("click", function () {
      completeBtn.parentElement.classList.toggle(
        "text-decoration-line-through"
      );
    });

    //remove a todo
    removeBtn.addEventListener("click", function () {
      removeBtn.parentElement.remove();
    });

    todoForm.reset();
  });
});
