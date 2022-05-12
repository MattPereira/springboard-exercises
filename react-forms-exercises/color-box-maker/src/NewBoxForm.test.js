import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import NewBoxForm from "./NewBoxForm";

it("renders without crashing", function () {
  render(<NewBoxForm />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<NewBoxForm />);
  expect(asFragment()).toMatchSnapshot();
});

it("should accept input data", function () {
  render(<NewBoxForm />);

  //select the form inputs and submit button
  const widthInput = screen.getByLabelText("Width");
  const heightInput = screen.getByLabelText("Height");
  const colorInput = screen.getByLabelText("Color");
  // const submitBtn = screen.getByText("Add Box");

  //enter data into form inputs
  fireEvent.change(widthInput, { target: { value: "7" } });
  expect(widthInput.value).toBe("7");
  fireEvent.change(heightInput, { target: { value: "7" } });
  expect(heightInput.value).toBe("7");
  fireEvent.change(colorInput, { target: { value: "indigo" } });
  expect(colorInput.value).toBe("indigo");
});

it("runs the add function on form submit", function () {
  const createMock = jest.fn();
  render(<NewBoxForm addBox={createMock} />);
  const addBtn = screen.getByText("Add Box");
  fireEvent.click(addBtn);
  expect(createMock).toHaveBeenCalled();
});
