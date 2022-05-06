import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./Card";

//smoke test
it("renders without crashing", () => {
  render(<Card />);
});

//snapshot test
it("should match snapshot", () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
