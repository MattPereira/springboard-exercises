import React from "react";
import { render } from "@testing-library/react";
import Coin from "./Coin";

it("renders without crashing", function () {
  render(<Coin />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Coin />);
  expect(asFragment()).toMatchSnapshot();
});
