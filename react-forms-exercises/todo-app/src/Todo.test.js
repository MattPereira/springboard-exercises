import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Todo from "./Todo";

it("renders without crashing", function () {
  render(<Todo />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Todo />);
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when editing", function () {
  const { asFragment } = render(<Todo />);

  const editBtn = screen.getByText("✓");
  fireEvent.click(editBtn);
  expect(asFragment()).toMatchSnapshot();
});

it("calls the update function on form submission", function () {
  const updateMock = jest.fn();
  render(<Todo update={updateMock} />);
  const editBtn = screen.getByText("Edit");
  fireEvent.click(editBtn);
  const updateBtn = screen.getByText("Update");
  fireEvent.click(updateBtn);
  expect(updateMock).toHaveBeenCalled();
});

it("calls the delete function on button click", function () {
  const removeMock = jest.fn();
  render(<Todo remove={removeMock} />);
  const deleteBtn = screen.getByText("X");
  fireEvent.click(deleteBtn);
  expect(removeMock).toHaveBeenCalled();
});
