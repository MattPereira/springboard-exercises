import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
//jest-dom needed for .toBeInTheDocument()
import "@testing-library/jest-dom";
import { dogs } from "./App";
import Routes from "./Routes";

test("renders all dog names in the dog list", function () {
  render(
    <MemoryRouter initialEntries={["/dogs"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("DOGGY DOGGY WHAT NOW?")).toBeInTheDocument();

  const dogNames = dogs.map((d) => d.name);

  for (const name of dogNames) {
    const linkElement = screen.getAllByText(new RegExp(name, "i"));
    expect(linkElement[0]).toBeInTheDocument();
  }
});

test("renders only Whiskey's info", () => {
  render(
    <MemoryRouter initialEntries={["/dogs/whiskey"]}>
      <Routes dogs={dogs} />
    </MemoryRouter>
  );

  const whiskeyInfo = dogs.find((d) => d.name === "Whiskey");
  const dukeInfo = dogs.find((d) => d.name === "Duke");

  const liElement = screen.getByText(new RegExp(whiskeyInfo.facts[0], "i"));
  expect(liElement).toBeInTheDocument();

  expect(screen.queryByText(new RegExp(dukeInfo.facts[0], "i"))).toBeNull();
});

test("renders home on a bad route", () => {
  render(
    <MemoryRouter initialEntries={["/bad-route"]}>
      <Routes dogs={dogs} />
    </MemoryRouter>
  );

  const dogNames = dogs.map((d) => d.name);
  for (const name of dogNames) {
    const linkElement = screen.getByText(new RegExp(name, "i"));
    expect(linkElement).toBeInTheDocument();
  }
});
