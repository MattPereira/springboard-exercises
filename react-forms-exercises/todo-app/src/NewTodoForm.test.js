import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";

it("renders without crashing", function () {
  render(<NewTodoForm />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<NewTodoForm />);
  expect(asFragment()).toMatchSnapshot();
});

it("allows form input to be changed", function () {
  render(<NewTodoForm />);

  //form input should start empty
  const taskInput = screen.queryByLabelText("Task");
  expect(taskInput.value).toBe("");

  //form input should allow for text to be entered
  fireEvent.change(taskInput, { target: { value: "Feed chickens!" } });
  expect(taskInput.value).toBe("Feed chickens!");
});

it("runs the add function on form submit", function () {
  const createMock = jest.fn();
  render(<NewTodoForm addTodo={createMock} />);
  const addBtn = screen.getByText("Add Todo");
  fireEvent.click(addBtn);
  expect(createMock).toHaveBeenCalled();
});
