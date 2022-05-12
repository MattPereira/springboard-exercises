import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

function addTodo(todoList, task = "Feed chickens!") {
  const taskInput = screen.queryByLabelText("Task");
  fireEvent.change(taskInput, { target: { value: task } });
  const submitBtn = screen.queryByText("Add Todo");
  fireEvent.click(submitBtn);
}

describe("<TodoList /> rendering", function () {
  it("renders without crashing", function () {
    render(<TodoList />);
  });

  it("matches snapshot", function () {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("TodoList functionality", function () {
  it("can add a new todo", function () {
    const view = render(<TodoList />);

    //expect todolist to be empty by checking for any delete buttons on page
    expect(screen.queryByText("X")).not.toBeInTheDocument();

    //add a todo and check document for newly added todo
    addTodo(view);
    const newTodo = screen.getByText("Feed chickens!");
    expect(newTodo).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("✓")).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();

    //expect form input to be empty after submission
    const taskInput = screen.queryByLabelText("Task");
    expect(taskInput.value).toBe("");
  });

  it("can edit a todo", function () {
    const view = render(<TodoList />);
    addTodo(view);

    //click the edit button
    const editBtn = screen.getByText("Edit");
    fireEvent.click(editBtn);
    //change input value from "Feed chickens!" to "Wash the miata"
    const editInput = screen.getByDisplayValue("Feed chickens!");
    fireEvent.change(editInput, { target: { value: "Wash the miata" } });
    //click the update button
    const updateBtn = screen.getByText("Update");
    fireEvent.click(updateBtn);
    //expect "Wash the miata" to be in the document now
    expect(screen.getByText("Wash the miata")).toBeInTheDocument();
  });

  it("can remove a todo", function () {
    addTodo(render(<TodoList />));

    //check for todo in document
    const todo = screen.getByText("Feed chickens!");
    expect(todo).toBeInTheDocument();

    //click on delete button
    const deleteBtn = screen.queryByText("X");
    fireEvent.click(deleteBtn);

    //expect todo to not be in document anymore
    expect(todo).not.toBeInTheDocument();
  });
});
