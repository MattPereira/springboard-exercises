import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CoinFlipper from "./CoinFlipper";

//mock the return value of Math.random
beforeEach(function () {
  jest
    .spyOn(Math, "random")
    .mockReturnValueOnce(0.25)
    .mockReturnValueOnce(0.75);
});

/* SMOKE TEST*/
it("renders without crashing", function () {
  render(<CoinFlipper />);
});

/* SNAPSHOT TEST*/
it("matches snapshot", function () {
  const { asFragment } = render(<CoinFlipper />);
  expect(asFragment()).toMatchSnapshot();
});

/* SPECIALIZED TESTING*/
it("shows no coin image on page load", function () {
  render(<CoinFlipper />);
  expect(screen.queryByTestId("coin")).toBeNull();
});

it("shows coin when button clicked", function () {
  render(<CoinFlipper />);
  const btn = screen.queryByText("FLIP COIN");
  fireEvent.click(btn);

  expect(screen.getByTestId("coin")).not.toBeNull();
});

it("counts correctly when heads", function () {
  render(<CoinFlipper />);

  const btn = screen.queryByText("FLIP COIN");
  fireEvent.click(btn);

  expect(screen.getByAltText("heads")).toBeInTheDocument();
  expect(screen.queryByAltText("tails")).not.toBeInTheDocument();

  expect(
    screen.getByText("Out of 1 flips, there have been 1 heads and 0 tails!")
  ).toBeInTheDocument();
});

it("counts correctly when tails", function () {
  render(<CoinFlipper />);

  const btn = screen.queryByText("FLIP COIN");
  fireEvent.click(btn);
  fireEvent.click(btn);

  expect(screen.queryByAltText("heads")).not.toBeInTheDocument();
  expect(screen.getByAltText("tails")).toBeInTheDocument();

  expect(
    screen.getByText("Out of 2 flips, there have been 1 heads and 1 tails!")
  ).toBeInTheDocument();
});

//resets the mock return values of Math.random
afterEach(function () {
  Math.random.mockRestore();
});
