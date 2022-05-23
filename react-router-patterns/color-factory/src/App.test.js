import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
//jest-dom needed for .toBeInTheDocument()
import "@testing-library/jest-dom";

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText("Welcome to the Color Factory")).toBeInTheDocument();
});
