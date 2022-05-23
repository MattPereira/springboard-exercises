import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
//jest-dom needed for .toBeInTheDocument()
import "@testing-library/jest-dom";
import Routes from "./Routes";

it("renders /colors", () => {
  render(
    <MemoryRouter initialEntries={["/colors"]}>
      <Routes />
    </MemoryRouter>
  );

  expect(screen.getByText("Welcome to the Color Factory")).toBeInTheDocument();

  const greenLink = screen.getByText("green");
  fireEvent.click(greenLink);
  expect(screen.getByText("This is green!")).toBeInTheDocument();
});

it("renders /colors/:color", () => {
  render(
    <MemoryRouter initialEntries={["/colors/red"]}>
      <Routes />
    </MemoryRouter>
  );

  expect(screen.getByText("This is red!")).toBeInTheDocument();

  //test clicking on back link
  const backLink = screen.getByText("GO BACK");
  fireEvent.click(backLink);
  expect(screen.getByText("Welcome to the Color Factory")).toBeInTheDocument();
});

it("renders /colors/new", () => {
  render(
    <MemoryRouter initialEntries={["/colors/new"]}>
      <Routes />
    </MemoryRouter>
  );

  expect(screen.getByText("Create A Color!")).toBeInTheDocument();
});
